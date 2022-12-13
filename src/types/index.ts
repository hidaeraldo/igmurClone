export interface GetAllGalleryParams {
  section?: keyof typeof SectionTypeEnum;
  sort?: keyof typeof SortTypeEnum;
  page?: number;
  window?: keyof typeof WindowTypeEnum;
  viral?: boolean;
}

export enum SectionTypeEnum {
  hot = "Section: Hot",
  top = "Section: Top",
  user = "Section: User",
}

export enum SortTypeEnum {
  viral = "Sort: Viral",
  top = "Sort: Top",
  time = "Sort: Time",
  rising = "Sort: rising",
}
export enum WindowTypeEnum {
  day = "Window: day",
  week = "Window: week",
  month = "Window: month",
  year = "Window: year",
  all = "Window: all",
}

export interface GallerySliceType {
  params: GetAllGalleryParams;
  galleryList: GalleryItem[];
  loading: boolean;
  isFetchingMore: boolean;
}

export interface GalleryItem {
  account_id: number;
  account_url: string;
  ad_config: any;
  ad_type: number;
  ad_url: string;
  comment_count: number;
  cover: string;
  cover_height: number;
  cover_width: number;
  datetime: number;
  description: null;
  downs: number;
  favorite: boolean;
  favorite_count: number;
  id: string;
  images: any;
  images_count: number;
  in_gallery: boolean;
  in_most_viral: boolean;
  include_album_ads: boolean;
  is_ad: boolean;
  is_album: boolean;
  layout: string;
  link: string;
  nsfw: boolean;
  points: number;
  privacy: string;
  score: number;
  section: string;
  tags: any;
  title: string;
  topic: null;
  topic_id: null;
  ups: number;
  views: number;
  vote: null;
}
