import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import thunk from 'redux-thunk';
import { NameSpace, Status } from '../../const';
import { createAPI } from '../../services/api';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { makeFakeCamera } from '../../utils/mocks';
import { Provider } from 'react-redux';
import ModalProductReview from './modal-product-review';


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const mockProduct = makeFakeCamera();
const store = mockStore({
  [NameSpace.Product]: {product: mockProduct, status: Status.Success},
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <ModalProductReview isOpened onCloseButtonClick={jest.fn()}/>
    </HistoryRouter>
  </Provider>
);

describe('Component: modal product review', () => {

  it('should render modal correctly', () => {

    render(fakeApp);

    expect(screen.getByText(/Оставить отзыв/i)).toBeInTheDocument();
  });
});
