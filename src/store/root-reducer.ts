import {combineReducers} from '@reduxjs/toolkit';
import { NameSpace } from '../const';
import { notificationsSlice } from './notifications/notifications.slice';

export const rootReducer = combineReducers({
  [NameSpace.Notification]: notificationsSlice.reducer,
});
