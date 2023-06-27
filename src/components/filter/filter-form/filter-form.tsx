import { useEffect, useState } from 'react';
import FilterByCategory from '../filter-by-category/filter-by-category';
import FilterByLevel from '../filter-by-level/filter-by-level';
import FilterByPrice from '../filter-by-price/filter-by-price';
import FilterByType from '../filter-by-type/filter-by-type';
import { resetFilters } from '../../../store/filter/filter.slice';
import { useAppDispatch } from '../../../hooks';

function FilterForm(): JSX.Element {
  const [isReset, setIsReset] = useState(false);
  const dispatch = useAppDispatch();

  const handleClick = () => {
    setIsReset(true);
    dispatch(resetFilters());
  };

  useEffect(() => {
    if (isReset) {
      setIsReset(false);
    }
  }, [isReset]);
  return (
    <form action="#" data-testid="filter-form" onSubmit={(evt) => { evt.preventDefault(); }}>
      <h2 className="visually-hidden">Фильтр</h2>
      <FilterByPrice resetFilters={isReset}/>
      <FilterByCategory />
      <FilterByType />
      <FilterByLevel />
      <button className="btn catalog-filter__reset-btn" type="reset" onClick={handleClick}>Сбросить фильтры</button>
    </form>
  );
}

export default FilterForm;
