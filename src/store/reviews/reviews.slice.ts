import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../const';
import { Reviews } from '../../types/review';
import { getReviewsAction, postAddReviewAction } from '../api-actions';

export type ReviewsSlice = {
  reviews: Reviews;
  status: Status;
  postStatus: Status;
};

export const initialState: ReviewsSlice = {
  reviews: [],
  status: Status.Idle,
  postStatus: Status.Idle,
};

export const reviewsSlice = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {
    changePostStatus: (state) => {
      state.postStatus = Status.Idle;
    }},
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
      })
      .addCase(postAddReviewAction.pending, (state) => {
        state.postStatus = Status.Loading;
      })
      .addCase(postAddReviewAction.fulfilled, (state, action) => {
        state.reviews.push(action.payload);
        state.postStatus = Status.Success;
      })
      .addCase(postAddReviewAction.rejected, (state) => {
        state.postStatus = Status.Error;
      });
  }
});

export const { changePostStatus } = reviewsSlice.actions;
