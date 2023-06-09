import { render, screen} from '@testing-library/react';
import BasketPromo from './basket-promo';

describe('Component: basket list', () => {
  it('should render correctly', () => {

    render(
      <BasketPromo/>,
    );

    const containerElement = screen.getByText(/Если у вас есть промокод на скидку, примените его в этом поле/i);

    expect(containerElement).toBeInTheDocument();
  });
});
