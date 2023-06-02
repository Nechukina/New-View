import { createSlice } from '@reduxjs/toolkit';
import { Camera } from '../../types/camera';
import { getCameraInfoAction } from '../api-actions';
import { NameSpace, Status } from '../../const';


export type ProductSlice = {
  product: Camera | null;
  status: Status;
};

const initialState: ProductSlice = {
  product: null,
  status: Status.Idle
};

export const productSlice = createSlice({
  name: NameSpace.Product,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCameraInfoAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(getCameraInfoAction.fulfilled, (state, action) => {
        state.product = action.payload;
        state.status = Status.Success;
      })
      .addCase(getCameraInfoAction.rejected, (state) => {
        state.status = Status.Error;
      });
  }
});
