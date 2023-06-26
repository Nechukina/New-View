import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, SortOrder, SortType } from '../../const';

export type SortSlice = {
  sortType: SortType | null;
  sortOrder: SortOrder | null;
}

export const initialState: SortSlice = {
  sortType: null,
  sortOrder: null
};

export const sortSlice = createSlice({
  name: NameSpace.Sort,
  initialState,
  reducers: {
    changeSortType: (state, action: {payload: SortType}) => {
      state.sortType = action.payload;

      if (!state.sortOrder) {
        state.sortOrder = SortOrder.Up;
      }
    },
    changeSortOrder: (state, action: {payload: SortOrder}) => {
      state.sortOrder = action.payload;

      if (!state.sortType) {
        state.sortType = SortType.SortPrice;
      }
    }
  }
});

export const {changeSortType, changeSortOrder} = sortSlice.actions;
