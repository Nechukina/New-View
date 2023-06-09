import { render, screen} from '@testing-library/react';
import Spinner from './spinner';

describe('Component: Spinner', () => {
  it('should render correctly', () => {

    render(
      <Spinner/>,
    );

    const containerElement = screen.getByTestId('spinner');

    expect(containerElement).toBeInTheDocument();
  });
});
