import { NameSpace, Status } from '../../const';
import { PromoCamera } from '../../types/promo';
import { State } from '../../types/state';


export const getPromo = (state: State): PromoCamera[] => state[NameSpace.Promo].camera;
export const getPromoDescription = (state: State): string | null => state[NameSpace.Promo].description;
export const getPromoStatus = (state: State): Status => state[NameSpace.Promo].status;
