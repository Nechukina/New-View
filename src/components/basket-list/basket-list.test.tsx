import { render, screen} from '@testing-library/react';
import BasketList from './basket-list';

describe('Component: basket list', () => {
  it('should render correctly', () => {

    render(
      <BasketList/>,
    );

    const containerElement = screen.getByTestId('basket-list');

    expect(containerElement).toBeInTheDocument();
  });
});
