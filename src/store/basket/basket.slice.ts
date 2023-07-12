import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { BasketCamera, Camera, Cameras } from '../../types/camera';
import { Coupon, LOCAL_STORAGE, NameSpace, Status } from '../../const';
import { fetchDiscount, postOrder } from '../api-actions';
import { getInitialEntityAdapterState, saveToLocalStorage } from '../../utils/local-storage';

export type BasketSlice = {
  basketCameras: Cameras;
  totalCount: number;
  totalPrice: number;
  discount: number;
  discountStatus: Status;
  coupon: Coupon | 0;
  orderStatus: Status;
};

export const initialState: BasketSlice = {
  basketCameras: [],
  totalCount: 0,
  totalPrice: 0,
  discount: 0,
  discountStatus: Status.Idle,
  coupon: 0,
  orderStatus: Status.Idle
};

export const productsAdapter = createEntityAdapter<BasketCamera>();

const localStorageResult = localStorage.getItem(LOCAL_STORAGE);

const stateWithAdapter = getInitialEntityAdapterState(productsAdapter, initialState, localStorageResult);

export const basketSlice = createSlice({
  name: NameSpace.Basket,
  initialState: stateWithAdapter,
  reducers: {
    addCamera: (state, action: {payload: Camera}) => {
      // const findedCamera = state.basketCameras.find((camera) => camera.id === action.payload.id);
      const product = state.entities[action.payload.id];

      if (product) {
        product.count ++;
        product.totalPrice = product.count * product.price;

        state.totalPrice += product.price;
      // if (findedCamera && findedCamera.count) {
      //   // eslint-disable-next-line no-debugger
      //   // debugger;
      //   findedCamera.count++;
      //   findedCamera.totalPrice = findedCamera.count * findedCamera.price;
      //   state.totalPrice += findedCamera.totalPrice;
      } else {
        state.basketCameras.push({ ...action.payload, count: 1 });
        state.totalPrice += action.payload.price;
        productsAdapter.addOne(state, { ...action.payload, count: 1, totalPrice: action.payload.price });
      }

      state.totalCount++;

      saveToLocalStorage(state);
    },
    decrementCameraCount: (state, action: {payload: Camera}) => {
      const findedCamera = state.basketCameras.find((camera) => camera.id === action.payload.id);

      if (findedCamera && findedCamera.count) {
        findedCamera.count--;
        state.totalCount--;
      }
    },
    removeCamera: (state, action: {payload: Camera}) => {
      const product = state.entities[action.payload.id];
      if (product) {
        state.totalCount -= product.count;
        state.totalPrice -= product.totalPrice;
      }

      state.basketCameras = state.basketCameras.filter((camera) => camera.id !== action.payload.id);
      state.totalCount -= state.basketCameras.find((camera) => camera.id === action.payload.id)?.count as number;
      state.totalPrice -= state.basketCameras.find((camera) => camera.id === action.payload.id)?.totalPrice as number;

      productsAdapter.removeOne(state, action.payload.id);
      saveToLocalStorage(state);

    },
    setCameraCount: (state, action: {payload: { id: number; count: number }}) => {
      const findedCamera = state.basketCameras.find((camera) => camera.id === action.payload.id);

      if (findedCamera) {
        findedCamera.count = action.payload.count;
        state.totalCount = state.basketCameras.reduce((acc, camera) => acc + (camera.count as number), 0);
      }
    },
    setCoupon: (state, action: {payload: Coupon}) => {
      state.coupon = action.payload;
    },
    resetOrderStatus: (state) => {
      state.orderStatus = Status.Idle;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDiscount.pending, (state) => {
        state.discountStatus = Status.Loading;
      })
      .addCase(fetchDiscount.fulfilled, (state, action) => {
        state.discount = action.payload;
        state.discountStatus = Status.Success;
      })
      .addCase(fetchDiscount.rejected, (state) => {
        state.discountStatus = Status.Error;
      })
      .addCase(postOrder.pending, (state) => {
        state.orderStatus = Status.Loading;
      })
      .addCase(postOrder.fulfilled, (state) => {
        state.basketCameras = [];
        state.totalCount = 0;
        state.discount = 0;
        state.coupon = 0;
        state.orderStatus = Status.Success;
      })
      .addCase(postOrder.rejected, (state) => {
        state.orderStatus = Status.Error;
      });
  }
});

export const {addCamera, decrementCameraCount, removeCamera, setCameraCount, setCoupon, resetOrderStatus} = basketSlice.actions;
