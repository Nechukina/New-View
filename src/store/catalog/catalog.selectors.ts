import { NameSpace, Status } from '../../const';
import { Cameras } from '../../types/camera';
import { State } from '../../types/state';


export const getCameras = (state: State): Cameras => state[NameSpace.Cameras].catalog;
export const getStatus = (state: State): Status => state[NameSpace.Cameras].status;
