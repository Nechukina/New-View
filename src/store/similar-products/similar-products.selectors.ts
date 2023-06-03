import { Cameras } from '../../types/camera';
import { NameSpace, Status } from '../../const';
import { State } from '../../types/state';


export const getSimilarProducts = (state: State): Cameras => state[NameSpace.Similar].similarProducts;
export const getSimilarProductsStatus = (state: State): Status => state[NameSpace.Similar].status;
