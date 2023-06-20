import { render, screen } from '@testing-library/react';
import FilterByCategory from './filter-by-category';


describe('Component: FilterByCategory', () => {
  it('should render correctly', () => {

    render(
      <FilterByCategory />
    );

    expect(screen.getByText(/Категория/i)).toBeInTheDocument();
  });
});
