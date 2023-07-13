import { render, screen} from '@testing-library/react';
import BasketList from './basket-list';
import { createMockStore } from '../../../utils/mocks';
import { Provider } from 'react-redux';
import { createMockStoreWithAPI } from '../../../utils/jest';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);

describe('Component: basket list', () => {
  it('should render correctly', () => {

    render(
      <Provider store={fakeStore}>
        <BasketList/>
      </Provider>,
    );

    const containerElement = screen.getByTestId('basket-list');

    expect(containerElement).toBeInTheDocument();
  });
});
