import { Status } from '../../const';
import { makeFakeCamera } from '../../utils/mocks';
import { getCameraInfoAction } from '../api-actions';
import { initialState, productSlice } from './product.slice';


describe('Reducer: productSlice', () => {
  it('without additional parameters should return initial state', () => {
    expect(productSlice.reducer(initialState, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should return camera object', () => {
    const product = makeFakeCamera();
    expect(productSlice.reducer(initialState, {
      type: getCameraInfoAction.fulfilled.type,
      payload: product
    }))
      .toEqual({
        ...initialState,
        product,
        status: Status.Success
      });
  });

  it('should return status loading when fetch is pending', () => {
    expect(productSlice.reducer(initialState, {
      type: getCameraInfoAction.pending.type,
    }))
      .toEqual({
        ...initialState,
        status: Status.Loading
      });
  });

  it('should return status error when fetch failed', () => {
    expect(productSlice.reducer(initialState, {
      type: getCameraInfoAction.rejected.type,
    }))
      .toEqual({
        ...initialState,
        status: Status.Error
      });
  });

});
