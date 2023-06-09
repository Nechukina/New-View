import { render, screen} from '@testing-library/react';
import Loader from './loader';

describe('Component: loader', () => {
  it('should render correctly', () => {

    render(
      <Loader/>,
    );

    const containerElement = screen.getByText(/Loading .../i);

    expect(containerElement).toBeInTheDocument();
  });
});
