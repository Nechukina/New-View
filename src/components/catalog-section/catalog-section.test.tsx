import { render, screen} from '@testing-library/react';
import thunk from 'redux-thunk';
import CatalogSection from './catalog-section';
import { makeFakeCameras } from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import { createMemoryHistory } from 'history';
import { createAPI } from '../../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import { NameSpace, SortOrder, SortType } from '../../const';

const mockCameras = makeFakeCameras();
const history = createMemoryHistory();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const store = mockStore({
  [NameSpace.Sort]: {sortOrder: SortOrder.Up, sortType: SortType.SortPrice},
});


const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <CatalogSection renderedCameras={mockCameras} pageCount={1} currentPage={1}/>,
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
