import { NameSpace, Status } from '../../const';
import { Reviews } from '../../types/review';
import { State } from '../../types/state';


export const getReviews = (state: State): Reviews => state[NameSpace.Reviews].reviews;
export const getReviewsStatus = (state: State): Status => state[NameSpace.Reviews].status;
