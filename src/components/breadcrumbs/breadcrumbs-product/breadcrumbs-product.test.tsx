import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../history-router/history-router';
import { Provider } from 'react-redux';
import BreadcrumbsProduct from './breadcrumbs-product';
import { createMockStore } from '../../../utils/mocks';
import { createMockStoreWithAPI } from '../../../utils/jest';


const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);
const history = createMemoryHistory();

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <BreadcrumbsProduct />
    </HistoryRouter>
  </Provider>
);

describe('Component: breadcrumbs product', () => {
  it('should render correctly', () => {

    render(fakeApp);

    expect(screen.getByTestId('breadcrumbs-product')).toBeInTheDocument();
  });
});
