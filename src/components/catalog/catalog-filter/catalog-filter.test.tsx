import { render, screen} from '@testing-library/react';
import CatalogFilter from './catalog-filter';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import HistoryRouter from '../../history-router/history-router';
import { createMemoryHistory } from 'history';
import { createAPI } from '../../../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { makeFakeCameras } from '../../../utils/mocks';
import { NameSpace, SortOrder, SortType, Status } from '../../../const';


const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const mockCameras = makeFakeCameras();

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
      <CatalogFilter />,
    </HistoryRouter>
  </Provider>
);
describe('Component: catalog filter', () => {
  it('should render correctly', () => {

    render(fakeApp);

    const containerElement = screen.getByTestId('catalog-filter');

    expect(containerElement).toBeInTheDocument();
  });
});
