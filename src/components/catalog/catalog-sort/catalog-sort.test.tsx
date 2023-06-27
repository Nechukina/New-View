import { render, screen} from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import CatalogSort from './catalog-sort';
import { createAPI } from '../../../services/api';
import HistoryRouter from '../../history-router/history-router';
import { NameSpace, SortOrder, SortType } from '../../../const';


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  [NameSpace.Sort]: {sortOrder: SortOrder.Up, sortType: SortType.SortPrice},
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <CatalogSort />
    </HistoryRouter>
  </Provider>
);
describe('Component: catalog sort', () => {
  it('should render correctly', () => {

    render(fakeApp);

    const containerElement = screen.getByTestId('catalog-sort');

    expect(containerElement).toBeInTheDocument();
  });
});
