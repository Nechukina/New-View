import FilterForm from '../../filter/filter-form/filter-form';

function CatalogFilter(): JSX.Element {
  return (
    <div className="catalog-filter" data-testid='catalog-filter'>
      <FilterForm />
    </div>
  );
}

export default CatalogFilter;
