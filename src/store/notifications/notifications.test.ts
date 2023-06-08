import { makeFakeNotification } from '../../utils/mocks';
import { clearNotification, initialState, notificationsSlice, pushNotification } from './notifications.slice';


describe('Reducer: notificationsSlice', () => {
  it('without additional parameters should return initial state', () => {
    expect(notificationsSlice.reducer(initialState, {type: 'UNKNOWN_ACTION'}))
      .toEqual(initialState);
  });

  it('should push notification to initial state', () => {
    const notifications = [makeFakeNotification()];
    expect(notificationsSlice.reducer(initialState, pushNotification(notifications[0])))
      .toEqual({...initialState, notifications});
  });

  it('should clear notification from notifications array', () => {
    const notifications = [makeFakeNotification()];
    expect(notificationsSlice.reducer(initialState, clearNotification(notifications[0].id)))
      .toEqual({...initialState, notifications: []});
  });
});
