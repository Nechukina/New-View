import { render, screen} from '@testing-library/react';
import ModalProductReviewSuccess from './modal-product-review-success';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';

const history = createMemoryHistory();

describe('Component: modal product review success', () => {
  it('should render correctly', () => {

    render(
      <HistoryRouter history={history}>
        <ModalProductReviewSuccess isOpened onCloseButtonClick={jest.fn()}/>
      </HistoryRouter>
    );

    const containerElement = screen.getByText(/Спасибо за отзыв/i);

    expect(containerElement).toBeInTheDocument();
  });
});
