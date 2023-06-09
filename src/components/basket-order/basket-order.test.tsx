import { render, screen} from '@testing-library/react';
import BasketOrder from './basket-order';

describe('Component: basket order', () => {
  it('should render correctly', () => {

    render(
      <BasketOrder/>,
    );

    const containerElement = screen.getByTestId('basket_summary-order');

    expect(containerElement).toBeInTheDocument();
  });
});
