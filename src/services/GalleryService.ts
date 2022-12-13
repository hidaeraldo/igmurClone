import { GetAllGalleryParams } from "./../types/index";
import { ApiService } from "./ApiService";

export class GalleryService {
  static pathName = "gallery";
  static getAllGallery = <T>({
    page,
    window,
    section,
    sort,
    viral,
  }: GetAllGalleryParams): Promise<T> => {
    let path = `${this.pathName}/${section}/${sort}/${page}/${window}/?showViral=${viral}/album_previews=true'`;
    return ApiService.get(path);
  };
}
