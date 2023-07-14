import { render, screen} from '@testing-library/react';
import ModalProductReviewSuccess from './modal-product-review-success';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../history-router/history-router';
import { Provider } from 'react-redux';
import { createMockStore } from '../../../utils/mocks';
import { createMockStoreWithAPI } from '../../../utils/jest';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);
const history = createMemoryHistory();
describe('Component: modal product review success', () => {
  it('should render correctly', () => {

    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <ModalProductReviewSuccess />
        </HistoryRouter>
      </Provider>
    );

    const containerElement = screen.getByText(/Спасибо за отзыв/i);

    expect(containerElement).toBeInTheDocument();
  });
});
