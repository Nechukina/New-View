import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkOptions } from '../types/state';
import { Camera, Cameras } from '../types/camera';
import { APIRoute } from '../const';
import { pushNotification } from './notifications/notifications.slice';
import { PromoCamera } from '../types/promo';
import { generatePath } from 'react-router-dom';
import { AddReview, Review, Reviews } from '../types/review';
import { setDescription } from './promo/promo.slice';


export const getCatalogAction = createAsyncThunk<Cameras, undefined, ThunkOptions>(
  'data/getCatalog',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Cameras>(APIRoute.Catalog);

      return data;
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Не удалось загрузить информацию о товарах' }));
      throw err;
    }
  }
);

export const getPromoAction = createAsyncThunk<PromoCamera , undefined, ThunkOptions>(
  'data/getPromo',
  async (_arg, { dispatch, extra: api, getState}) => {
    try {
      const { data } = await api.get<PromoCamera>(APIRoute.Promo);

      const {catalog} = getState().CAMERAS;

      const description = catalog.find((camera) => camera.name === data.name)?.description;

      dispatch(setDescription(description as string));

      return data;
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Не удалось загрузить информацию о промо предложении' }));
      throw err;
    }
  }
);

export const getCameraInfoAction = createAsyncThunk<Camera, string, ThunkOptions>(
  'data/getCameraInfo',
  async (cameraId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Camera>(generatePath(APIRoute.Product, { cameraId: cameraId.toString() }));

      return data;
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Не удалось загрузить информацию о товарае' }));
      throw err;
    }
  }
);

export const getSimilarProductsAction = createAsyncThunk<Cameras, string, ThunkOptions>(
  'data/getSimilarProducts',
  async (cameraId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Cameras>(generatePath(APIRoute.Similar, { cameraId: cameraId.toString() }));

      return data;
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Не удалось загрузить информацию о похожих товарах' }));
      throw err;
    }
  }
);

export const getReviewsAction = createAsyncThunk<Reviews, string, ThunkOptions>(
  'data/getReviews',
  async (cameraId, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<Reviews>(generatePath(APIRoute.Reviews, { cameraId: cameraId.toString() }));
      return data;
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Не удалось загрузить информацию об отзывах' }));
      throw err;
    }
  }
);

export const postAddReviewAction = createAsyncThunk<Review, AddReview, ThunkOptions>(
  'data/postReview',
  async ({cameraId, userName, advantage, disadvantage, review, rating}, { dispatch, extra: api}) => {
    try {
      const {data} = await api.post<Review>(`${APIRoute.AddReview}`, {cameraId, userName, advantage, disadvantage, review, rating});
      return data;
    } catch (err) {
      dispatch(pushNotification({ type: 'error', message: 'Ошибка публикации отзыва' }));
      throw err;
    }
  },
);
