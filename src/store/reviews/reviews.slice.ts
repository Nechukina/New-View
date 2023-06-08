import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../const';
import { Reviews } from '../../types/review';
import { getReviewsAction } from '../api-actions';

export type ReviewsSlice = {
  reviews: Reviews;
  status: Status;
};

export const initialState: ReviewsSlice = {
  reviews: [],
  status: Status.Idle
};

export const reviewsSlice = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getReviewsAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(getReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.status = Status.Success;
      })
      .addCase(getReviewsAction.rejected, (state) => {
        state.status = Status.Error;
      });
  }
});
