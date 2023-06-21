import thunk from 'redux-thunk';
import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { makeFakeReviews } from '../../utils/mocks';
import { createAPI } from '../../services/api';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace, Status } from '../../const';
import { Provider } from 'react-redux';
import ReviewBlock from './review-block';


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const mockReviews = makeFakeReviews();

const store = mockStore({
  [NameSpace.Reviews]: {reviews: mockReviews, status: Status.Success},
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <ReviewBlock />
    </HistoryRouter>
  </Provider>
);

describe('Component: review block', () => {

  it('should render review block correctly', () => {

    render(fakeApp);

    expect(screen.getByTestId('review-block')).toBeInTheDocument();
  });
});
