import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../history-router/history-router';
import { makeFakeReview } from '../../../utils/mocks';
import ReviewCard from './review-card';


const mockReview = makeFakeReview();

const history = createMemoryHistory();

const fakeApp = (
  <HistoryRouter history={history}>
    <ReviewCard review={mockReview}/>
  </HistoryRouter>
);

describe('Component: review card', () => {

  it('should render review card correctly', () => {

    render(fakeApp);

    expect(screen.getByTestId('review-card')).toBeInTheDocument();
  });
});
