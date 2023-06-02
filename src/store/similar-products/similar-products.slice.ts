import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../const';
import { Cameras } from '../../types/camera';
import { getSimilarProductsAction } from '../api-actions';


export type SimilarProductsSlice = {
  similarProducts: Cameras;
  status: Status;
};

const initialState: SimilarProductsSlice = {
  similarProducts: [],
  status: Status.Idle
};

export const similarProductsSlice = createSlice({
  name: NameSpace.Similar,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getSimilarProductsAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(getSimilarProductsAction.fulfilled, (state, action) => {
        state.similarProducts = action.payload;
        state.status = Status.Success;
      })
      .addCase(getSimilarProductsAction.rejected, (state) => {
        state.status = Status.Error;
      });
  }
});
