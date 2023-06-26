import { SortOrder, SortType } from '../const';
import { Cameras } from '../types/camera';

export const sortCameras = (cameras: Cameras, sortType: SortType | null, sortOrder: SortOrder | null): Cameras => {
  let sortedCamerasByType: Cameras = [];

  switch (sortType) {
    case SortType.SortPopular:
      sortedCamerasByType = [...cameras].sort((a, b) => a.rating - b.rating);
      break;
    case SortType.SortPrice:
      sortedCamerasByType = [...cameras].sort((a, b) => b.price - a.price);
      break;
    default:
      sortedCamerasByType = [...cameras];
      break;
  }

  let sortedCamerasByOrder: Cameras = [];

  switch (sortOrder) {
    case SortOrder.Up:
      sortedCamerasByOrder = sortedCamerasByType.reverse();
      break;
    case SortOrder.Down:
      sortedCamerasByOrder = sortedCamerasByType;
      break;
    default:
      sortedCamerasByOrder = [...cameras];
      break;
  }

  return sortedCamerasByOrder;
};
