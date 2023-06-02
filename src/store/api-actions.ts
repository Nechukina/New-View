import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkOptions } from '../types/state';
import { Cameras } from '../types/camera';
import { APIRoute } from '../const';
import { pushNotification } from './notifications/notifications.slice';
import { PromoCamera } from '../types/promo';


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
