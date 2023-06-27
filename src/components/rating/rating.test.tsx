import { render, screen } from '@testing-library/react';
import Rating from './rating';


describe('Component: rating', () => {

  it('should render product tabs correctly', () => {

    render(<Rating rating={0} reviewCount={1}/>);

    expect(screen.getByTestId('rating')).toBeInTheDocument();
  });
});
