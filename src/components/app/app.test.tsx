import { generatePath } from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import App from './app';
import { AppRoute } from '../../const';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { createMockStore} from '../../utils/mocks';
import { Provider } from 'react-redux';
import { createMockStoreWithAPI } from '../../utils/jest';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={fakeStore}>
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
