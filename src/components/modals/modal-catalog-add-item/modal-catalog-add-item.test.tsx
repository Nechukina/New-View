import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../history-router/history-router';
import { makeFakeCamera } from '../../../utils/mocks';
import ModalCatalogAddItem from './modal-catalog-add-item';
import { Provider } from 'react-redux';
import { configureMockStore } from '@jedmao/redux-mock-store';


const mockProduct = makeFakeCamera();


const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({});

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <ModalCatalogAddItem isOpened product={mockProduct} onCloseButtonClick={jest.fn()} setAddToCartModalSuccess={jest.fn()}/>
    </HistoryRouter>
  </Provider>
);

describe('Component: modal catalog add item', () => {

  it('should render modal correctly', () => {

    render(fakeApp);

    expect(screen.getByText(/Добавить товар в корзину/i)).toBeInTheDocument();
  });
});
