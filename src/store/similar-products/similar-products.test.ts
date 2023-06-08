import { Status } from '../../const';
import { makeFakeCameras } from '../../utils/mocks';
import { getSimilarProductsAction } from '../api-actions';
import { initialState, similarProductsSlice } from './similar-products.slice';


describe('Reducer: similarProductsSlice', () => {
  it('without additional parameters should return initial state', () => {
    expect(similarProductsSlice.reducer(initialState, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should return camera object', () => {
    const similarProducts = makeFakeCameras();
    expect(similarProductsSlice.reducer(initialState, {
      type: getSimilarProductsAction.fulfilled.type,
      payload: similarProducts
    }))
      .toEqual({
        ...initialState,
        similarProducts,
        status: Status.Success
      });
  });

  it('should return status loading when fetch is pending', () => {
    expect(similarProductsSlice.reducer(initialState, {
      type: getSimilarProductsAction.pending.type,
    }))
      .toEqual({
        ...initialState,
        status: Status.Loading
      });
  });

  it('should return status error when fetch failed', () => {
    expect(similarProductsSlice.reducer(initialState, {
      type: getSimilarProductsAction.rejected.type,
    }))
      .toEqual({
        ...initialState,
        status: Status.Error
      });
  });

});
