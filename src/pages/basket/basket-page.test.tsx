import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { HelmetProvider } from 'react-helmet-async';
import HistoryRouter from '../../components/history-router/history-router';
import { NameSpace, Status } from '../../const';
import { makeFakeCameras } from '../../utils/mocks';
import BasketPage from './basket-page';

const mockStore = configureMockStore([thunk]);
const mockCameras = makeFakeCameras();

describe('Page: Basket', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({
      [NameSpace.Cameras]: {catalog: mockCameras, status: Status.Success},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <BasketPage />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('basket-page')).toBeInTheDocument();
  });
});
