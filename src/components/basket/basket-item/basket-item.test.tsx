import { render, screen} from '@testing-library/react';
import BasketItem from './basket-item';
import { makeFakeCamera } from '../../../utils/mocks';

const camera = makeFakeCamera();

describe('Component: basket item', () => {
  it('should render correctly', () => {

    render(
      <BasketItem camera={camera}/>,
    );

    const containerElement = screen.getByTestId('basket-item');

    expect(containerElement).toBeInTheDocument();
  });
});
