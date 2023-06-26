import { SortOrder, SortType } from '../../const';
import { changeSortOrder, changeSortType, sortSlice, SortSlice } from './sort.slice';

describe('Reducer: sortSlice', () => {
  let state: SortSlice;

  beforeEach(() => {
    state = {
      sortType: null,
      sortOrder: null
    };
  });

  it('Should return initial state without additional parameters', () => {
    expect(sortSlice.reducer(undefined, { type: 'UNKNOWN_ACTION' }))
      .toEqual(state);
  });

  it('Should change current sort type and sort order by a given sort type', () => {
    expect(sortSlice.reducer(state, changeSortType(SortType.SortPopular)))
      .toEqual({
        ...state,
        sortType: SortType.SortPopular,
        sortOrder: SortOrder.Up
      });
  });

  it('Should change current sort order and sort type by a given sort order', () => {
    expect(sortSlice.reducer(state, changeSortOrder(SortOrder.Up)))
      .toEqual({
        ...state,
        sortType: SortType.SortPrice,
        sortOrder: SortOrder.Up
      });
  });
});
