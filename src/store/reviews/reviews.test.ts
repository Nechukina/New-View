import { Status } from '../../const';
import { makeFakeAddReview, makeFakeReviews } from '../../utils/mocks';
import { getReviewsAction, postAddReviewAction } from '../api-actions';
import { initialState, reviewsSlice } from './reviews.slice';


describe('Reducer: reviewsSlice', () => {
  it('without additional parameters should return initial state', () => {
    expect(reviewsSlice.reducer(initialState, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should return array of reviews objects', () => {
    const reviews = makeFakeReviews();
    expect(reviewsSlice.reducer(initialState, {
      type: getReviewsAction.fulfilled.type,
      payload: reviews
    }))
      .toEqual({
        ...initialState,
        reviews,
        status: Status.Success
      });
  });

  it('should return status loading when fetch is pending', () => {
    expect(reviewsSlice.reducer(initialState, {
      type: getReviewsAction.pending.type,
    }))
      .toEqual({
        ...initialState,
        status: Status.Loading
      });
  });

  it('should return status error when fetch failed', () => {
    expect(reviewsSlice.reducer(initialState, {
      type: getReviewsAction.rejected.type,
    }))
      .toEqual({
        ...initialState,
        status: Status.Error
      });
  });

  it('should add new review to array of reviews objects', () => {
    const fakeAddReview = makeFakeAddReview();
    expect(reviewsSlice.reducer({...initialState, reviews: []}, {
      type: postAddReviewAction.fulfilled.type,
      payload: fakeAddReview
    }))
      .toEqual({
        ...initialState,
        reviews: [fakeAddReview],
        postStatus: Status.Success
      });
  });

  it('should return post status loading when fetch is pending', () => {
    expect(reviewsSlice.reducer(initialState, {
      type: postAddReviewAction.pending.type,
    }))
      .toEqual({
        ...initialState,
        postStatus: Status.Loading
      });
  });

  it('should return post status error when fetch failed', () => {
    expect(reviewsSlice.reducer(initialState, {
      type: postAddReviewAction.rejected.type,
    }))
      .toEqual({
        ...initialState,
        postStatus: Status.Error
      });
  });

});
