import { render, screen} from '@testing-library/react';
import ModalProductBasketSuccess from './modal-product-basket-success';

describe('Component: modal product basket success', () => {
  it('should render correctly', () => {

    render(
      <ModalProductBasketSuccess/>,
    );

    const containerElement = screen.getByText(/Спасибо за покупк/i);

    expect(containerElement).toBeInTheDocument();
  });
});
