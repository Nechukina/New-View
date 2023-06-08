import { createSlice } from '@reduxjs/toolkit';
import { getPromoAction } from '../api-actions';
import { NameSpace, Status } from '../../const';
import { PromoCamera } from '../../types/promo';


export type PromoSlice = {
  camera: PromoCamera | null;
  status: Status;
  };

export const initialState: PromoSlice = {
  camera: null,
  status: Status.Idle
};

export const promoSlice = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getPromoAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(getPromoAction.fulfilled, (state, action) => {
        state.camera = action.payload;
        state.status = Status.Success;
      })
      .addCase(getPromoAction.rejected, (state) => {
        state.status = Status.Error;
      });
  }
});
