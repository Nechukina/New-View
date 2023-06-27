import { configureMockStore } from '@jedmao/redux-mock-store';
import { render, screen} from '@testing-library/react';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import CatalogSection from './catalog-section';
import { createMemoryHistory } from 'history';
import { createAPI } from '../../../services/api';
import HistoryRouter from '../../history-router/history-router';
import { NameSpace, SortOrder, SortType, Status } from '../../../const';
import { makeFakeCameras } from '../../../utils/mocks';

const mockCameras = makeFakeCameras();
const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  [NameSpace.Cameras]: {catalog: mockCameras, status: Status.Success},
  [NameSpace.Sort]: {sortOrder: SortOrder.Up, sortType: SortType.SortPrice},
  [NameSpace.Filter]: {
    category: null,
    types: [],
    levels: [],
    minPrice: 0,
    maxPrice: Infinity
  }
});


const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <CatalogSection />,
    </HistoryRouter>
  </Provider>
);

describe('Component: catalog section', () => {
  it('should render correctly', () => {

    render(fakeApp);

    const containerElement = screen.getByTestId('catalog-section');

    expect(containerElement).toBeInTheDocument();
  });
});
