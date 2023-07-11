import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import BasketListEmpty from './basket-list-empty';
import HistoryRouter from '../../history-router/history-router';

const mockStore = configureMockStore();

describe('Component: BasketListEmpty', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <BasketListEmpty />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Корзина пуста/i)).toBeInTheDocument();
  });
});
