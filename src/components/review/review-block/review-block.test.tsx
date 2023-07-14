import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../history-router/history-router';
import { Provider } from 'react-redux';
import ReviewBlock from './review-block';
import { createMockStore } from '../../../utils/mocks';
import { createMockStoreWithAPI } from '../../../utils/jest';


const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);
const history = createMemoryHistory();

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <ReviewBlock />
    </HistoryRouter>
  </Provider>
);

describe('Component: review block', () => {

  it('should render review block correctly', () => {

    render(fakeApp);

    expect(screen.getByTestId('review-block')).toBeInTheDocument();
  });
});
