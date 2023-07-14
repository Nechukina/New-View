import { render, screen } from '@testing-library/react';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import HistoryRouter from '../../history-router/history-router';
import ReviewForm from './review-form';

const mockStore = configureMockStore();

describe('Component: ReviewForm', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const store = mockStore({});

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewForm onClose={jest.fn()} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('form-review')).toBeInTheDocument();
  });
});
