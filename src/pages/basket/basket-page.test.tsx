import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../../components/history-router/history-router';
import { createMockStore } from '../../utils/mocks';
import BasketPage from './basket-page';
import { createMockStoreWithAPI } from '../../utils/jest';

const history = createMemoryHistory();
const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);


describe('Page: Basket', () => {
  it('should render correctly', () => {

    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <BasketPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('basket-page')).toBeInTheDocument();
  });
});
