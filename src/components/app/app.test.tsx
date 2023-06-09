import {render, screen} from '@testing-library/react';
import thunk from 'redux-thunk';
import App from './app';
import { createAPI } from '../../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCamera, makeFakeCameras, makeFakePromo } from '../../utils/mocks';
import { AppRoute, NameSpace } from '../../const';
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
  [NameSpace.Cameras]: mockCameras,
  [NameSpace.Promo]: mockPromo,
  [NameSpace.Product]: mockProduct,
  [NameSpace.Similar] : mockCameras,
  [NameSpace.Notification]: [],
  [NameSpace.Reviews]: mockReviews,
  [NameSpace.Review]: mockReview
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
    console.log();
    history.push(AppRoute.Main);
    render(fakeApp);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
    expect(screen.getByText(/Новинка!/i)).toBeInTheDocument();
    expect(screen.getByText(/Сортировать/i)).toBeInTheDocument();
  });

});
