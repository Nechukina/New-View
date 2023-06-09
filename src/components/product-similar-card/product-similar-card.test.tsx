import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { makeFakeCamera } from '../../utils/mocks';
import ProductSimilarCard from './product-similar-card';


const mockCamera = makeFakeCamera();

const history = createMemoryHistory();

const fakeApp = (
  <HistoryRouter history={history}>
    <ProductSimilarCard product={mockCamera}/>
  </HistoryRouter>
);

describe('Component: product similar card', () => {

  it('should render product similar card correctly', () => {

    render(fakeApp);

    expect(screen.getByTestId('similar-card')).toBeInTheDocument();
  });
});
