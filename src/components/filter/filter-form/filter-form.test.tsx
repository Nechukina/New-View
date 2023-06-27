import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../history-router/history-router';
import FilterForm from './filter-form';
import { makeFakeCameras } from '../../../utils/mocks';
import { NameSpace, SortOrder, SortType, Status } from '../../../const';

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
      <FilterForm />
    </HistoryRouter>
  </Provider>
);
describe('Component: FilterForm', () => {
  it('should render correctly', () => {

    render(fakeApp);

    expect(screen.getByTestId('filter-form')).toBeInTheDocument();
  });
});
