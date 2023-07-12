import { EntityAdapter, EntityId, EntityState } from '@reduxjs/toolkit';
import { LOCAL_STORAGE, Status } from '../const';
import { State } from '../types/state';


export const getInitialEntityAdapterState = <T, S extends object>(
  adapter: EntityAdapter<T>,
  initialState: S,
  localStorageResult?: string | null
) => {
  // eslint-disable-next-line no-debugger
//   debugger;
  if (localStorageResult) {
    const result = JSON.parse(localStorageResult) as EntityState<T> & S;
    // eslint-disable-next-line no-console
    // console.log(result, 'result');
    return adapter.setAll(
      adapter.getInitialState({ ...result }),
      result.entities as Record<EntityId, T>
    );
  }
  // eslint-disable-next-line no-console
  //   console.log(adapter.getInitialState<S>(initialState), 'initial');

  return adapter.getInitialState<S>(initialState);
};

export const saveToLocalStorage = (state: State['BASKET']) => {
  const data = {
    ...state,
    discount: 0,
    discountStatus: Status.Idle,
    coupon: 0,
    orderStatus: Status.Idle
  } as State['BASKET'];
  localStorage.setItem(LOCAL_STORAGE, JSON.stringify(data));

};
