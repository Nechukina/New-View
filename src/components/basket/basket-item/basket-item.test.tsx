import { render, screen} from '@testing-library/react';
import BasketItem from './basket-item';
import { makeFakeBasketCamera } from '../../../utils/mocks';

const camera = makeFakeBasketCamera();

describe('Component: basket item', () => {
  it('should render correctly', () => {

    render(
      <BasketItem camera={camera}/>,
    );

    const containerElement = screen.getByTestId('basket-item');

    expect(containerElement).toBeInTheDocument();
  });
});
