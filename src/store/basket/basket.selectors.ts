import { NameSpace } from '../../const';
import { Cameras } from '../../types/camera';
import { State } from '../../types/state';


export const getBasketCameras = (state: State): Cameras => state[NameSpace.Basket].basketCameras;
export const getTotalCount = (state: State): number => state[NameSpace.Basket].totalCount;

