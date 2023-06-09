import { render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import Pagination from './pagination';

const history = createMemoryHistory();

describe('Component: breadcrumbs basket', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <Pagination currentPage={1} pageCount={1}/>
      </HistoryRouter>,
    );

    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});
