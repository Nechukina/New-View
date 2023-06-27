import { render, screen } from '@testing-library/react';
import FilterByCategory from './filter-by-category';
import { createMemoryHistory } from 'history';
import { NameSpace } from '../../../const';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';
import HistoryRouter from '../../history-router/history-router';

const history = createMemoryHistory();
const mockStore = configureMockStore();

const store = mockStore({
  [NameSpace.Filter]: {
    category: null,
    types: [],
    levels: [],
    minPrice: 0,
    maxPrice: Infinity
  }
});
describe('Component: FilterByCategory', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilterByCategory />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Категория/i)).toBeInTheDocument();
  });
});


