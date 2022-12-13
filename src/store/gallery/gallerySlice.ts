import { getIsFetchingMore } from "./gallerySelector";
import { fetchMoreGalleryData, getAllGalleryData } from "./galleryThunk";
import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { uniqBy } from "lodash";
import { GallerySliceType } from "./../../types/index";
import { useAppSelector } from "../hooks";
const initialState: GallerySliceType = {
  params: {
    page: 1,
    section: "user",
    window: "day",
    sort: "viral",
    viral: false,
  },
  galleryList: [],
  loading: true,
  isFetchingMore: false,
};

const gallerySlice: Slice<GallerySliceType> = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    setParams(state, action) {
      state.params = { ...state.params, ...action.payload };
    },
    setIsFetchingMore(state, action) {
      state.params = action.payload;
    },
    setGalleryList(state, action) {
      state.galleryList = action.payload;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllGalleryData.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getAllGalleryData.fulfilled, (state, action) => {
      // if (useAppSelector(getIsFetchingMore)) {
      //   state.galleryList = action.payload;
      // }
      state.galleryList = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchMoreGalleryData.pending, (state, action) => {
      state.isFetchingMore = true;
    });
    builder.addCase(fetchMoreGalleryData.fulfilled, (state, action) => {
      // if (useAppSelector(getIsFetchingMore)) {
      //   state.galleryList = action.payload;
      // }
      (state.galleryList = uniqBy(
        [...state?.galleryList, ...action.payload],
        "id"
      )),
        (state.isFetchingMore = false);
    });
  },
});

export const { setParams, setGalleryList, setIsFetchingMore } =
  gallerySlice.actions;

export default gallerySlice.reducer;
