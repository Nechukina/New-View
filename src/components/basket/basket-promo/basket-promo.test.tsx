import { render, screen} from '@testing-library/react';
import BasketPromo from './basket-promo';
import { createMockStore } from '../../../utils/mocks';
import { createMockStoreWithAPI } from '../../../utils/jest';
import { Provider } from 'react-redux';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);
describe('Component: basket list', () => {
  it('should render correctly', () => {

    render(
      <Provider store={fakeStore}>
        <BasketPromo/>
      </Provider>,
    );

    const containerElement = screen.getByText(/Если у вас есть промокод на скидку, примените его в этом поле/i);

    expect(containerElement).toBeInTheDocument();
  });
});
