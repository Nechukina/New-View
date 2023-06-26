import {combineReducers} from '@reduxjs/toolkit';
import { catalogSlice } from './catalog/catalog.slice';
import { filterSlice } from './filter/filter.slice';
import { NameSpace } from '../const';
import { notificationsSlice } from './notifications/notifications.slice';
import { promoSlice } from './promo/promo.slice';
import { productSlice } from './product/product.slice';
import { reviewsSlice } from './reviews/reviews.slice';
import { similarProductsSlice } from './similar-products/similar-products.slice';
import { sortSlice } from './sort/sort.slice';

export const rootReducer = combineReducers({
  [NameSpace.Cameras]: catalogSlice.reducer,
  [NameSpace.Filter]: filterSlice.reducer,
  [NameSpace.Notification]: notificationsSlice.reducer,
  [NameSpace.Promo]: promoSlice.reducer,
  [NameSpace.Product]: productSlice.reducer,
  [NameSpace.Reviews]: reviewsSlice.reducer,
  [NameSpace.Similar]: similarProductsSlice.reducer,
  [NameSpace.Sort]: sortSlice.reducer,
});
