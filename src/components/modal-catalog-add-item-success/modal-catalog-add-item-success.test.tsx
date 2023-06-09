import { render, screen} from '@testing-library/react';
import ModalCatalogAddItemSuccess from './modal-catalog-add-item-success';

describe('Component: modal catalog add to cart item success', () => {
  it('should render correctly', () => {

    render(
      <ModalCatalogAddItemSuccess/>,
    );

    const containerElement = screen.getByTestId('modal-add-to-cart-success');

    expect(containerElement).toBeInTheDocument();
  });
});
