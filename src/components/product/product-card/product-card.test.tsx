import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../history-router/history-router';
import { makeFakeCamera } from '../../../utils/mocks';
import ProductCard from './product-card';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { NameSpace } from '../../../const';


const mockCamera = makeFakeCamera();

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.Basket]: {basketCameras: [mockCamera]}
});

const fakeApp = (
  <Provider store={store}>
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
