import { createSelector } from '@reduxjs/toolkit';
import { NameSpace, Status } from '../../const';
import { Cameras } from '../../types/camera';
import { State } from '../../types/state';
import { getCurrentSortOrder, getCurrentSortType } from '../sort/sort.selectors';
import { sortCameras } from '../../utils/sort';


export const getCameras = (state: State): Cameras => state[NameSpace.Cameras].catalog;
export const getCamerasStatus = (state: State): Status => state[NameSpace.Cameras].status;

export const getSortedCameras = createSelector(
  [getCameras, getCurrentSortType, getCurrentSortOrder],
  (cameras, sortType, sortOrder) => sortCameras(cameras, sortType, sortOrder)
);
