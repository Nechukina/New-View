import { render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import Header from './header';
import { createMockStore } from '../../utils/mocks';
import { Provider } from 'react-redux';
import { createMockStoreWithAPI } from '../../utils/jest';

const history = createMemoryHistory();
const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);
describe('Component: header', () => {
  it('should render correctly', () => {

    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <Header/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
