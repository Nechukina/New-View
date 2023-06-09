import {render, screen} from '@testing-library/react';
import thunk from 'redux-thunk';
import App from './app';
import { createAPI } from '../../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCamera, makeFakeCameras, makeFakePromo } from '../../utils/mocks';
import { AppRoute, NameSpace, Status } from '../../const';
import { makeFakeReviews } from '../../utils/mocks';
import { makeFakeAddReview } from '../../utils/mocks';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../history-router/history-router';


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
  [NameSpace.Similar] : {similarProsucts: mockCameras, status: Status.Success},
  [NameSpace.Notification]: {notifications: []},
  [NameSpace.Reviews]: {reviews: mockReviews, status: Status.Success},
  [NameSpace.Review]: {reviews: mockReview, status: Status.Success}
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
    // eslint-disable-next-line no-console
    console.log(store.getState()[NameSpace.Cameras]);
    history.push(AppRoute.Main);
    render(fakeApp);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
    expect(screen.getByText(/Новинка!/i)).toBeInTheDocument();
    expect(screen.getByText(/Сортировать/i)).toBeInTheDocument();
  });

});
