import { render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import BreadcrumbsMain from './breadcrumbs-main';
import HistoryRouter from '../../history-router/history-router';

const history = createMemoryHistory();

describe('Component: breadcrumbs', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <BreadcrumbsMain/>
      </HistoryRouter>,
    );

    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
  });
});
