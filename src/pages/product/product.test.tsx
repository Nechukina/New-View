import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import thunk from 'redux-thunk';
import { NameSpace, Status } from '../../const';
import { createAPI } from '../../services/api';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { makeFakeCamera, makeFakeCameras, makeFakeReviews } from '../../utils/mocks';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import Product from './product';


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const mockCameras = makeFakeCameras();
const mockProduct = makeFakeCamera();
const mockReviews = makeFakeReviews();

const store = mockStore({
  [NameSpace.Cameras]: {catalog: mockCameras, status: Status.Success},
  [NameSpace.Product]: {product: mockProduct, status: Status.Success},
  [NameSpace.Similar] : {similarProducts: mockCameras, status: Status.Success},
  [NameSpace.Reviews]: {reviews: mockReviews, status: Status.Success},

});

const history = createMemoryHistory();

describe('Page: Product', () => {
  it('should render correctly', () => {
    window.scrollTo = jest.fn();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Product />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('product-page')).toBeInTheDocument();
  });
});
