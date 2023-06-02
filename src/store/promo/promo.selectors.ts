import { NameSpace, Status } from '../../const';
import { PromoCamera } from '../../types/promo';
import { State } from '../../types/state';


export const getPromo = (state: State): PromoCamera | null => state[NameSpace.Promo].camera;
export const getStatus = (state: State): Status => state[NameSpace.Promo].status;
