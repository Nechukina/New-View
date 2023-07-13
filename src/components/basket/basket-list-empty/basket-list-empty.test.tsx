import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import BasketListEmpty from './basket-list-empty';
import HistoryRouter from '../../history-router/history-router';
import { createMockStore } from '../../../utils/mocks';
import { createMockStoreWithAPI } from '../../../utils/jest';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);
const history = createMemoryHistory();

describe('Component: BasketListEmpty', () => {
  it('should render correctly', () => {

    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <BasketListEmpty />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Корзина пуста/i)).toBeInTheDocument();
  });
});
