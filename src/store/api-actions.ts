import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkOptions } from '../types/state';
import { Camera, Cameras } from '../types/camera';
import { APIRoute } from '../const';
import { pushNotification } from './notifications/notifications.slice';
import { PromoCamera } from '../types/promo';
import { generatePath } from 'react-router-dom';


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

export const getPromoAction = createAsyncThunk<PromoCamera, undefined, ThunkOptions>(
  'data/getPromo',
  async (_arg, { dispatch, extra: api }) => {
    try {
      const { data } = await api.get<PromoCamera>(APIRoute.Promo);

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
