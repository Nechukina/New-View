import { Status } from '../../const';
import { makeFakeAddReview, makeFakeReview } from '../../utils/mocks';
import { postAddReviewAction } from '../api-actions';
import { addReviewSlice, initialState } from './add-review.slice';


describe('Reducer: addReviewSlice', () => {
  it('without additional parameters should return initial state', () => {
    expect(addReviewSlice.reducer(initialState, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should add new review to array of reviews objects', () => {
    const fakeAddReview = makeFakeAddReview();
    const fakeAddReviews = [makeFakeReview(), makeFakeReview()];
    expect(addReviewSlice.reducer({...initialState, reviews: fakeAddReviews}, {
      type: postAddReviewAction.fulfilled.type,
      payload: fakeAddReview
    }))
      .toEqual({
        ...initialState,
        reviews: fakeAddReview,
        status: Status.Success
      });
  });

  it('should return status loading when fetch is pending', () => {
    expect(addReviewSlice.reducer(initialState, {
      type: postAddReviewAction.pending.type,
    }))
      .toEqual({
        ...initialState,
        status: Status.Loading
      });
  });

  it('should return status error when fetch failed', () => {
    expect(addReviewSlice.reducer(initialState, {
      type: postAddReviewAction.rejected.type,
    }))
      .toEqual({
        ...initialState,
        status: Status.Error
      });
  });

});
