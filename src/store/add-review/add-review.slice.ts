import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../const';
import { Reviews } from '../../types/review';
import { postAddReviewAction } from '../api-actions';


export type AddReviewSlice = {
  reviews: Reviews;
  status: Status;
};

const initialState: AddReviewSlice = {
  reviews: [],
  status: Status.Idle
};

export const addReviewSlice = createSlice({
  name: NameSpace.Review,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(postAddReviewAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(postAddReviewAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.status = Status.Success;
      })
      .addCase(postAddReviewAction.rejected, (state) => {
        state.status = Status.Error;
      });
  }
});
