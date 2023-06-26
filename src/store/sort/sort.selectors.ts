import { NameSpace, SortOrder, SortType } from '../../const';
import { State } from '../../types/state';

export const getCurrentSortType = (state: State): SortType | null => state[NameSpace.Sort].sortType;
export const getCurrentSortOrder = (state: State): SortOrder | null => state[NameSpace.Sort].sortOrder;
