import { render, screen} from '@testing-library/react';
import BasketItem from './basket-item';
import { createMockStore, makeFakeCamera } from '../../../utils/mocks';
import { Provider } from 'react-redux';
import { createMockStoreWithAPI } from '../../../utils/jest';

const store = createMockStore();
const { fakeStore } = createMockStoreWithAPI(store);
const camera = makeFakeCamera();
describe('Component: basket item', () => {
  it('should render correctly', () => {

    render(
      <Provider store={fakeStore}>
        <BasketItem camera={camera}/>
      </Provider>,
    );

    const containerElement = screen.getByTestId('basket-item');

    expect(containerElement).toBeInTheDocument();
  });
});
