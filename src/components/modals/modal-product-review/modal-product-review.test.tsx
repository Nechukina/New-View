import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../history-router/history-router';
import { Provider } from 'react-redux';
import ModalProductReview from './modal-product-review';
import { createMockStore } from '../../../utils/mocks';
import { createMockStoreWithAPI } from '../../../utils/jest';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);
const history = createMemoryHistory();

const fakeApp = (
  <Provider store={fakeStore}>
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
