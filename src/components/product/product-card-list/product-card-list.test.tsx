import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../history-router/history-router';
import { makeFakeCamera } from '../../../utils/mocks';
import ProductCardList from './product-card-list';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace } from '../../../const';
import { Provider } from 'react-redux';


const history = createMemoryHistory();
const mockCameras = [makeFakeCamera()];
const mockStore = configureMockStore();
const store = mockStore({
  [NameSpace.Basket]: {basketCameras: [mockCameras]}
});

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <ProductCardList cameras={mockCameras}/>
    </HistoryRouter>
  </Provider>
);

describe('Component: product card list', () => {

  it('should render correctly', () => {

    render(fakeApp);

    expect(screen.getByTestId('product-card-list')).toBeInTheDocument();
  });
});
