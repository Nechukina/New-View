import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { createMockStore, } from '../../utils/mocks';
import { Provider } from 'react-redux';
import Banner from './banner';
import { createMockStoreWithAPI } from '../../utils/jest';


const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <Banner />
    </HistoryRouter>
  </Provider>
);

describe('Component: banner', () => {

  it('should render banner correctly', () => {

    render(fakeApp);

    expect(screen.getByText(/Новинка/i)).toBeInTheDocument();
  });
});
