import { render, screen} from '@testing-library/react';
import BasketItem from './basket-item';

describe('Component: basket item', () => {
  it('should render correctly', () => {

    render(
      <BasketItem/>,
    );

    const containerElement = screen.getByTestId('basket-item');

    expect(containerElement).toBeInTheDocument();
  });
});
