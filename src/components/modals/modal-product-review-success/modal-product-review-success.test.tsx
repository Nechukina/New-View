import { render, screen} from '@testing-library/react';
import ModalProductReviewSuccess from './modal-product-review-success';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../history-router/history-router';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace, Status } from '../../../const';
import { Provider } from 'react-redux';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.Reviews]: {
    reviews: [],
    status: Status.Idle
  }
});
describe('Component: modal product review success', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ModalProductReviewSuccess />
        </HistoryRouter>
      </Provider>
    );

    const containerElement = screen.getByText(/Спасибо за отзыв/i);

    expect(containerElement).toBeInTheDocument();
  });
});
