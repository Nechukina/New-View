import { createSelector } from '@reduxjs/toolkit';
import { Coupon, NameSpace, Status } from '../../const';
import { Cameras } from '../../types/camera';
import { State } from '../../types/state';
import { productsAdapter } from './basket.slice';

export const {
  selectIds,
  selectById: selectProductById,
  selectAll: selectAllBasketProducts,
} = productsAdapter.getSelectors<State>((state) => state[NameSpace.Basket]);
export const getBasketCameras = (state: State): Cameras => state[NameSpace.Basket].basketCameras;
export const getTotalCount = (state: State): number => state[NameSpace.Basket].totalCount;
export const getTotalPrice = (state: State): number => state[NameSpace.Basket].totalPrice;
export const getDiscountPercent = (state: State): number => state[NameSpace.Basket].discount;
export const getPostDiscountStatus = (state: State): Status => state[NameSpace.Basket].discountStatus;
export const getCoupon = (state: State): Coupon | 0 => state[NameSpace.Basket].coupon;
export const getPostOrderStatus = (state: State): Status => state[NameSpace.Basket].orderStatus;

export const getDiscountStatus = createSelector([getPostDiscountStatus], (status) => ({
  isLoading: status === Status.Loading,
  isSuccess: status === Status.Success,
  isError: status === Status.Error
}));

export const getOrderStatus = createSelector([getPostOrderStatus], (status) => ({
  isLoading: status === Status.Loading,
  isSuccess: status === Status.Success,
  isError: status === Status.Error
}));

