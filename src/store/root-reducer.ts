import {combineReducers} from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { notificationsSlice } from './notifications/notifications.slice';
import { catalogSlice } from './catalog/catalog.slice';
import { promoSlice } from './promo/promo.slice';
import { productSlice } from './product/product.slice';
import { similarProductsSlice } from './similar-products/similar-products.slice';

export const rootReducer = combineReducers({
  [NameSpace.Notification]: notificationsSlice.reducer,
  [NameSpace.Cameras]: catalogSlice.reducer,
  [NameSpace.Promo]: promoSlice.reducer,
  [NameSpace.Product]: productSlice.reducer,
  [NameSpace.Similar]: similarProductsSlice.reducer,
});
