import { createSlice } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../const';
import { Cameras } from '../../types/camera';
import { getCatalogAction } from '../api-actions';


export type CatalogSlice = {
  catalog: Cameras;
  status: Status;
};

const initialState: CatalogSlice = {
  catalog: [],
  status: Status.Idle
};

export const catalogSlice = createSlice({
  name: NameSpace.Cameras,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCatalogAction.pending, (state) => {
        state.status = Status.Loading;
      })
      .addCase(getCatalogAction.fulfilled, (state, action) => {
        state.catalog = action.payload;
        state.status = Status.Success;
      })
      .addCase(getCatalogAction.rejected, (state) => {
        state.status = Status.Error;
      });
  }
});
