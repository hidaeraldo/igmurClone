import { createAsyncThunk } from "@reduxjs/toolkit";
import { GalleryService } from "../../services/GalleryService";
import { GetAllGalleryParams } from "../../types";
import { setGalleryList } from "./gallerySlice";

export const getAllGalleryData = createAsyncThunk(
  "gallery/getAllGalleryData",
  async (params: GetAllGalleryParams, { rejectWithValue }) => {
    try {
      const response = await GalleryService.getAllGallery<any>(params);
      return response.data;
    } catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err);
    }
    // dispatch(setGalleryList(response?.data));
  }
);
export const fetchMoreGalleryData = createAsyncThunk(
  "gallery/fetchMoreGalleryData",
  async (params: GetAllGalleryParams, { rejectWithValue }) => {
    try {
      const response = await GalleryService.getAllGallery<any>(params);
      return response.data;
    } catch (err) {
      // Use `err.response.data` as `action.payload` for a `rejected` action,
      // by explicitly returning it using the `rejectWithValue()` utility
      return rejectWithValue(err);
    }
    // dispatch(setGalleryList(response?.data));
  }
);
