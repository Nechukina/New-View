import { createSlice } from '@reduxjs/toolkit';
import { Camera, Cameras } from '../../types/camera';
import { NameSpace } from '../../const';

export type BasketSlice = {
  basketCameras: Cameras;
  totalCount: number;
};

export const initialState: BasketSlice = {
  basketCameras: [],
  totalCount: 0,
};

export const basketSlice = createSlice({
  name: NameSpace.Basket,
  initialState,
  reducers: {
    addCamera: (state, action: {payload: Camera}) => {
      const findedCamera = state.basketCameras.find((camera) => camera.id === action.payload.id);

      if (findedCamera && findedCamera.count) {
        findedCamera.count++;
        state.totalCount++;
      } else {
        state.basketCameras.push({ ...action.payload, count: 1 });
        state.totalCount++;
      }
    },
  },
//   extraReducers(builder) {
//     builder
//       .addCase(getCatalogAction.pending, (state) => {
//         state.status = Status.Loading;
//       })
//       .addCase(getCatalogAction.fulfilled, (state, action) => {
//         state.catalog = action.payload;
//         state.status = Status.Success;
//       })
//       .addCase(getCatalogAction.rejected, (state) => {
//         state.status = Status.Error;
//       });
//   }
});

export const {addCamera} = basketSlice.actions;
