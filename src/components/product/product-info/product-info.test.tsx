import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../history-router/history-router';
import { Provider } from 'react-redux';
import ProductInfo from './product-info';
import { createMockStore } from '../../../utils/mocks';
import { createMockStoreWithAPI } from '../../../utils/jest';


const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);
const history = createMemoryHistory();

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <ProductInfo setBuyModalOpened={jest.fn()}/>
    </HistoryRouter>
  </Provider>
);

describe('Component: product info', () => {
  it('should render correctly', () => {

    render(fakeApp);

    expect(screen.getByTestId('product-info')).toBeInTheDocument();
  });
});
