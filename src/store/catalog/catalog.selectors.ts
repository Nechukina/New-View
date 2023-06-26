import { createSelector } from '@reduxjs/toolkit';
import { Cameras } from '../../types/camera';
import { filterCameras } from '../../utils/filter';
import { getCurrentCategory, getCurrentLevels, getCurrentMaxPrice, getCurrentMinPrice, getCurrentTypes } from '../filter/filter.selectors';
import { getCurrentSortOrder, getCurrentSortType } from '../sort/sort.selectors';
import { NameSpace, Status } from '../../const';
import { sortCameras } from '../../utils/sort';
import { State } from '../../types/state';


export const getCameras = (state: State): Cameras => state[NameSpace.Cameras].catalog;
export const getCamerasStatus = (state: State): Status => state[NameSpace.Cameras].status;

export const getSortedCameras = createSelector(
  [getCameras, getCurrentSortType, getCurrentSortOrder],
  (cameras, sortType, sortOrder) => sortCameras(cameras, sortType, sortOrder)
);

export const getfilteredCameras = createSelector(
  [getSortedCameras, getCurrentCategory, getCurrentTypes, getCurrentLevels, getCurrentMinPrice, getCurrentMaxPrice],
  (cameras, category, types, levels, minPrice, maxPrice) => filterCameras(cameras, category, types, levels, minPrice, maxPrice)
);
