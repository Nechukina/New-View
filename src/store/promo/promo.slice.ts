import { createSlice } from '@reduxjs/toolkit';
import { getPromoAction } from '../api-actions';
import { NameSpace, Status } from '../../const';
import { PromoCamera } from '../../types/promo';


export type PromoSlice = {
  camera: PromoCamera | null;
  status: Status;
  description: string | null;
  };

export const initialState: PromoSlice = {
  camera: null,
  status: Status.Idle,
  description: null,
};

export const promoSlice = createSlice({
  name: NameSpace.Promo,
  initialState,
  reducers: {
    setDescription(state, action: { payload: string }) {
      state.description = action.payload;
    }
  },
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

export const { setDescription } = promoSlice.actions;

