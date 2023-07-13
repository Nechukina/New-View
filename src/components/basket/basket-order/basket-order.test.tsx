import { render, screen} from '@testing-library/react';
import BasketOrder from './basket-order';
import { createMockStoreWithAPI } from '../../../utils/jest';
import { createMockStore } from '../../../utils/mocks';
import { Provider } from 'react-redux';


const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

describe('Component: basket order', () => {
  it('should render correctly', () => {

    render(
      <Provider store={fakeStore}>
        <BasketOrder/>
      </Provider>,
    );

    const containerElement = screen.getByTestId('basket_summary-order');

    expect(containerElement).toBeInTheDocument();
  });
});
