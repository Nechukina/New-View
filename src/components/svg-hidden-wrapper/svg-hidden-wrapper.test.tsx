import { render, screen } from '@testing-library/react';
import SvgHiddenWrapper from './svg-hidden-wrapper';

describe('Component: svg hidden wrapper', () => {
  it('should render correctly', () => {

    render(
      <SvgHiddenWrapper/>,
    );

    const containerElement = screen.getByTestId('svg-hidden-wrapper');

    expect(containerElement).toBeInTheDocument();
  });
});
