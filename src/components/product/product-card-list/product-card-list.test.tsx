import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../history-router/history-router';
import { makeFakeBasketCamera } from '../../../utils/mocks';
import ProductCardList from './product-card-list';


const history = createMemoryHistory();
const mockCameras = [makeFakeBasketCamera()];

const fakeApp = (
  <HistoryRouter history={history}>
    <ProductCardList cameras={mockCameras}/>
  </HistoryRouter>
);

describe('Component: product card list', () => {

  it('should render correctly', () => {

    render(fakeApp);

    expect(screen.getByTestId('product-card-list')).toBeInTheDocument();
  });
});
