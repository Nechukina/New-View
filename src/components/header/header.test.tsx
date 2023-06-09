import { render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import Header from './header';

const history = createMemoryHistory();

describe('Component: breadcrumbs basket', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <Header/>
      </HistoryRouter>,
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
