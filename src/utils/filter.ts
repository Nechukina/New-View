import { CameraCategory, CameraLevel, CameraType } from '../const';
import { Cameras } from '../types/camera';

export const filterCamerasByCategory = (cameras: Cameras, category: CameraCategory | null): Cameras => {
  if (!category) {
    return cameras;
  }

  const filteredCameras = cameras.filter((camera) => camera.category === category);

  return filteredCameras;
};

export const filterCamerasByTypes = (cameras: Cameras, types: CameraType[]): Cameras => {
  if (!types.length) {
    return cameras;
  }

  const filteredCameras = cameras.filter((camera) => types.includes(camera.type));

  return filteredCameras;
};

export const filterCamerasByLevels = (cameras: Cameras, levels: CameraLevel[]): Cameras => {
  if (!levels.length) {
    return cameras;
  }

  const filteredCameras = cameras.filter((camera) => levels.includes(camera.level));

  return filteredCameras;
};

export const getPrice = (cameras: Cameras, type: 'max' | 'min'): string => {
  if (!cameras.length) {
    return '';
  }

  const sortedCameras = [...cameras].sort((a, b) => a.price - b.price);

  if (type === 'max' && sortedCameras.length) {
    return sortedCameras[sortedCameras.length - 1].price.toString();
  } else {
    return sortedCameras[0].price.toString();
  }
};

export const filterCamerasByPrice = (cameras: Cameras, minPrice: number, maxPrice: number): Cameras => {
  if (!minPrice && !maxPrice) {
    return cameras;
  }

  if (!maxPrice) {
    maxPrice = Infinity;
  }

  const filteredCameras = cameras.filter((camera) => camera.price >= minPrice && camera.price <= maxPrice);

  return filteredCameras;
};

export const filterCameras = (
  cameras: Cameras,
  category: CameraCategory | null,
  types: CameraType[],
  levels: CameraLevel[],
  minPrice: number,
  maxPrice: number
): Cameras => {
  const filteredCamerasByCategory = filterCamerasByCategory(cameras, category);
  const filteredCamerasByTypes = filterCamerasByTypes(filteredCamerasByCategory, types);
  const filteredCamerasByLevels = filterCamerasByLevels(filteredCamerasByTypes, levels);
  const filteredCamerasByPrice = filterCamerasByPrice(filteredCamerasByLevels, minPrice, maxPrice);

  return filteredCamerasByPrice;
};

export const capitalizeFirstLetter = (str: string): string => str[0].toUpperCase() + str.slice(1);
