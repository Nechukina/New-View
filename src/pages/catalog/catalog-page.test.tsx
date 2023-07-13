import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { createMockStore } from '../../utils/mocks';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import CatalogPage from './catalog-page';
import { createMockStoreWithAPI } from '../../utils/jest';


const history = createMemoryHistory();
const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);
describe('Page: Catalog', () => {
  it('should render correctly', () => {
    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <CatalogPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('catalog-page')).toBeInTheDocument();
  });
});
