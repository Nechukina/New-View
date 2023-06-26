import { configureMockStore } from '@jedmao/redux-mock-store';
import { generatePath } from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import thunk from 'redux-thunk';
import App from './app';
import { AppRoute, NameSpace, SortOrder, SortType, Status } from '../../const';
import { createAPI } from '../../services/api';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { makeFakeCamera, makeFakeCameras, makeFakePromo } from '../../utils/mocks';
import { makeFakeReviews } from '../../utils/mocks';
import { makeFakeAddReview } from '../../utils/mocks';
import { Provider } from 'react-redux';


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const mockCameras = makeFakeCameras();
const mockPromo = makeFakePromo();
const mockProduct = makeFakeCamera();
const mockReviews = makeFakeReviews();
const mockReview = makeFakeAddReview();
const store = mockStore({
  [NameSpace.Cameras]: {catalog: mockCameras, status: Status.Success},
  [NameSpace.Promo]: {camera: mockPromo, status: Status.Success},
  [NameSpace.Product]: {product: mockProduct, status: Status.Success},
  [NameSpace.Similar] : {similarProducts: mockCameras, status: Status.Success},
  [NameSpace.Notification]: {notifications: []},
  [NameSpace.Reviews]: {reviews: mockReviews, status: Status.Success},
  [NameSpace.Review]: {reviews: mockReview, status: Status.Success},
  [NameSpace.Sort]: {sortOrder: SortOrder.Up, sortType: SortType.SortPrice},
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "Catalog" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
    expect(screen.getByText(/Новинка!/i)).toBeInTheDocument();
    expect(screen.getByText(/Сортировать/i)).toBeInTheDocument();
  });

  it('should render basket page when user navigate to "/basket"', () => {
    history.push(AppRoute.Basket);

    render(fakeApp);

    expect(screen.getAllByText(/Корзина/i)).toBeTruthy();
  });

  it('should render product page when user navigate to "/product"', () => {
    history.push(generatePath(AppRoute.Product, {id: '1'}));

    render(fakeApp);

    expect(screen.getByTestId('product-page')).toBeInTheDocument();
  });

  it('should render "ErrorPage" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeApp);

    expect(screen.getByText(/Упс/i)).toBeInTheDocument();
  });

});
