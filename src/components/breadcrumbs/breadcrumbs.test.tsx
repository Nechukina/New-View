import { render, screen} from '@testing-library/react';
import Breadcrumbs from './breadcrumbs';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';

const history = createMemoryHistory();

describe('Component: breadcrumbs', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <Breadcrumbs/>
      </HistoryRouter>,
    );

    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
  });
});
