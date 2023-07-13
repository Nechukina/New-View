import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { createMockStore} from '../../utils/mocks';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import ProductPage from './product-page';
import { createMockStoreWithAPI } from '../../utils/jest';


const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

const history = createMemoryHistory();

describe('Page: Product', () => {
  it('should render correctly', () => {
    window.scrollTo = jest.fn();

    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <ProductPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('product-page')).toBeInTheDocument();
  });
});
