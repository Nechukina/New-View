import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../history-router/history-router';
import { createMockStore, makeFakeCamera } from '../../../utils/mocks';
import ProductCard from './product-card';
import { Provider } from 'react-redux';
import { createMockStoreWithAPI } from '../../../utils/jest';


const mockCamera = makeFakeCamera();
const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);
const history = createMemoryHistory();

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <ProductCard camera={mockCamera} />
    </HistoryRouter>
  </Provider>
);

describe('Component: product  card', () => {

  it('should render product card correctly', () => {

    render(fakeApp);

    expect(screen.getByTestId('product-card')).toBeInTheDocument();
  });
});
