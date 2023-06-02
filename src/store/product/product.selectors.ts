import { NameSpace, Status } from '../../const';
import { Camera } from '../../types/camera';
import { State } from '../../types/state';


export const getProduct = (state: State): Camera | null => state[NameSpace.Product].product;
export const getStatus = (state: State): Status => state[NameSpace.Product].status;
