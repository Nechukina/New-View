import { render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import CatalogSection from './catalog-section';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../history-router/history-router';
import { createMockStore } from '../../../utils/mocks';
import { createMockStoreWithAPI } from '../../../utils/jest';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);
const history = createMemoryHistory();

const fakeApp = (
  <Provider store={fakeStore}>
    <HistoryRouter history={history}>
      <CatalogSection />,
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
