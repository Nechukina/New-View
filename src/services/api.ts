import axios, {AxiosInstance} from 'axios';
import { Camera, Cameras } from '../types/camera';
import { APIRoute, Coupon } from '../const';
import { PromoCamera } from '../types/promo';
import { generatePath } from 'react-router-dom';
import { AddReview, Review, Reviews } from '../types/review';


const BACKEND_URL = 'https://camera-shop.accelerator.pages.academy';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  return api;
};

export const client = {
  getCatalogAction: () =>
    createAPI().get<Cameras>(APIRoute.Catalog),
  getPromoAction: () =>
    createAPI().get<PromoCamera>(APIRoute.Promo),
  getCameraInfoAction: (cameraId: string) => {
    createAPI().get<Camera>(generatePath(APIRoute.Product, { cameraId: cameraId.toString() }));
    createAPI().get<Reviews>(generatePath(APIRoute.Reviews, { cameraId: String(cameraId) }));
  },
  getSimilarProductsAction: (cameraId: string) =>
    createAPI().get<Cameras>(generatePath(APIRoute.Similar, { cameraId: cameraId.toString() })),
  getReviewsAction: (cameraId: string) =>
    createAPI().get<Reviews>(generatePath(APIRoute.Reviews, { cameraId: cameraId.toString() })),
  postAddReviewAction: (body: AddReview) =>
    createAPI().post<Review>(`${APIRoute.AddReview}`,body),
  postDiscount: (coupon: Coupon) =>
    createAPI().post<number>(APIRoute.Coupon, { coupon }),
  postOrder: (camerasIds: number[], coupon: Coupon | 0 | null) =>
    createAPI().post<number>(APIRoute.Order, { camerasIds, coupon }),
};
