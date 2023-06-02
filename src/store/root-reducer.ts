import {combineReducers} from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { notificationsSlice } from './notifications/notifications.slice';
import { catalogSlice } from './catalog/catalog.slice';
import { promoSlice } from './promo/promo.slice';

export const rootReducer = combineReducers({
  [NameSpace.Notification]: notificationsSlice.reducer,
  [NameSpace.Camera]: catalogSlice.reducer,
  [NameSpace.Promo]: promoSlice.reducer,
});
