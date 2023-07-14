import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../history-router/history-router';
import SortByType from './sort-by-type';
import { createMockStore } from '../../../utils/mocks';
import { createMockStoreWithAPI } from '../../../utils/jest';


const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);
const history = createMemoryHistory();

describe('Component: SortByType', () => {
  it('should render correctly', () => {

    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <SortByType />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('sort-by-type')).toBeInTheDocument();
  });
});
