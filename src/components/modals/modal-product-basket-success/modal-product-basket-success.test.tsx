import { render, screen} from '@testing-library/react';
import ModalProductBasketSuccess from './modal-product-basket-success';
import { createMockStore } from '../../../utils/mocks';
import { createMockStoreWithAPI } from '../../../utils/jest';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../history-router/history-router';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);
const history = createMemoryHistory();
describe('Component: modal product basket success', () => {
  it('should render correctly', () => {

    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <ModalProductBasketSuccess/>
        </HistoryRouter>
      </Provider>,
    );

    const screenElement = screen.getByText(/Спасибо за покупку/i);

    expect(screenElement).toBeInTheDocument();
  });
});
