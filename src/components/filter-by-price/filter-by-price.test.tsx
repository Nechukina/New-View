import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import FilterByPrice from './filter-by-price';
import HistoryRouter from '../history-router/history-router';
import { NameSpace, SortOrder, SortType, Status } from '../../const';
import { makeFakeCameras } from '../../utils/mocks';

const mockStore = configureMockStore();
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
const history = createMemoryHistory();


const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <FilterByPrice resetFilters/>
    </HistoryRouter>
  </Provider>
);
describe('Component: FilterByPrice', () => {
  it('should render correctly', () => {

    render(fakeApp);

    expect(screen.getByText(/Цена, ₽/i)).toBeInTheDocument();
  });
});
