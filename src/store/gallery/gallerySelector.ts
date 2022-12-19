import { RootState } from "..";

export const getAllParams = (store: RootState) => {
  return store.gallery?.params;
};
export const isSectionUser = (store: RootState) => {
  return store.gallery?.params?.section === "user";
};
export const isSectionTop = (store: RootState) => {
  return store.gallery?.params?.section === "top";
};
export const getIsLoading = (store: RootState) => {
  return store.gallery?.loading;
};

export const getIsFetchingMore = (store: RootState) => {
  return store.gallery?.isFetchingMore;
};

export const getAllDataList = (store: RootState) => {
  return store.gallery?.galleryList;
};
