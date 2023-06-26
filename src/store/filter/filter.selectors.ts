import { CameraCategory, CameraLevel, CameraType, NameSpace } from '../../const';
import { State } from '../../types/state';


export const getCurrentCategory = (state: State): CameraCategory | null => state[NameSpace.Filter].category;
export const getCurrentTypes = (state: State): CameraType[] => state[NameSpace.Filter].types;
export const getCurrentLevels = (state: State): CameraLevel[] => state[NameSpace.Filter].levels;
export const getCurrentMinPrice = (state: State): number => state[NameSpace.Filter].minPrice;
export const getCurrentMaxPrice = (state: State): number => state[NameSpace.Filter].maxPrice;
