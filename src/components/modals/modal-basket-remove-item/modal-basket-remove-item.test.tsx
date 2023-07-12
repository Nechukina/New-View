import { render, screen} from '@testing-library/react';
import ModalBasketRemoveItem from './modal-basket-remove-item';
import { makeFakeBasketCamera } from '../../../utils/mocks';
import HistoryRouter from '../../history-router/history-router';
import { createMemoryHistory } from 'history';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { Provider } from 'react-redux';

const mockCamera = makeFakeBasketCamera();
const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({});

describe('Component: modal basket remove item', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalBasketRemoveItem isOpen camera={mockCamera} onCloseCLick={jest.fn()}/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Удалить этот товар?/i)).toBeInTheDocument();

  });
});
