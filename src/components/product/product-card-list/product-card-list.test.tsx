import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../history-router/history-router';
import { createMockStore, makeFakeCameras } from '../../../utils/mocks';
import ProductCardList from './product-card-list';
import { Provider } from 'react-redux';
import { createMockStoreWithAPI } from '../../../utils/jest';

const mockCameras = makeFakeCameras();
const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);
const history = createMemoryHistory();

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <ProductCardList cameras={mockCameras}/>
    </HistoryRouter>
  </Provider>
);

describe('Component: product card list', () => {

  it('should render correctly', () => {

    render(fakeApp);

    expect(screen.getByTestId('product-card-list')).toBeInTheDocument();
  });
});
