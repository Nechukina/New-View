import { NameSpace, Status } from '../../const';
import { Reviews } from '../../types/review';
import { State } from '../../types/state';


export const getAddReviews = (state: State): Reviews => state[NameSpace.Review].reviews;
export const getAddReviewStatus = (state: State): Status => state[NameSpace.Review].status;
