import { render, screen} from '@testing-library/react';
import ModalCatalogAddItemSuccess from './modal-catalog-add-item-success';
import { createMockStore } from '../../../utils/mocks';
import { createMockStoreWithAPI } from '../../../utils/jest';
import { Provider } from 'react-redux';
import HistoryRouter from '../../history-router/history-router';
import { createMemoryHistory } from 'history';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);
const history = createMemoryHistory();

describe('Component: modal catalog add to cart item success', () => {
  it('should render correctly', () => {

    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <ModalCatalogAddItemSuccess isOpened onClose={jest.fn()}/>
        </HistoryRouter>
      </Provider>,
    );

    const screenElement = screen.getByText(/Товар успешно добавлен в корзину/i);

    expect(screenElement).toBeInTheDocument();
  });
});
