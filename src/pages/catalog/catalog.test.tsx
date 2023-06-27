import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import thunk from 'redux-thunk';
import { NameSpace, SortOrder, SortType, Status } from '../../const';
import { createAPI } from '../../services/api';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../components/history-router/history-router';
import { makeFakeCameras, makeFakePromo } from '../../utils/mocks';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';
import Catalog from './catalog';


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const mockCameras = makeFakeCameras();
const mockPromo = makeFakePromo();
const store = mockStore({
  [NameSpace.Cameras]: {catalog: mockCameras, status: Status.Success},
  [NameSpace.Promo]: {camera: mockPromo, status: Status.Success},
  [NameSpace.Sort]: {sortOrder: SortOrder.Up, sortType: SortType.SortPrice},
  [NameSpace.Filter]: {
    category: null,
    types: [],
    levels: [],
    minPrice: 0,
    maxPrice: Infinity
  }
});

const history = createMemoryHistory();

describe('Page: Catalog', () => {
  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <HelmetProvider>
            <Catalog />
          </HelmetProvider>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('catalog-page')).toBeInTheDocument();
  });
});
