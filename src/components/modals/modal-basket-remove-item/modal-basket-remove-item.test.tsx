import { render, screen} from '@testing-library/react';
import ModalBasketRemoveItem from './modal-basket-remove-item';

describe('Component: modal basket remove item', () => {
  it('should render correctly', () => {

    render(
      <ModalBasketRemoveItem/>,
    );

    const containerElement = screen.getByTestId('modal-remove-item');

    expect(containerElement).toBeInTheDocument();
  });
});
