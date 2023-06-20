import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { makeFakeCameras } from '../../utils/mocks';
import ProductSimilar from './product-similar';

const history = createMemoryHistory();
const similarCameras = makeFakeCameras();

const fakeApp = (
  <HistoryRouter history={history}>
    <ProductSimilar products={similarCameras}/>
  </HistoryRouter>
);

describe('Component: SimilarProducts', () => {
  it('should render correctly', () => {

    render(fakeApp);

    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
  });
});
