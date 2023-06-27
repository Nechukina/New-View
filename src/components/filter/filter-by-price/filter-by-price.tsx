import { ChangeEvent, useEffect, useState } from 'react';
import { getCurrentMaxPrice, getCurrentMinPrice } from '../../../store/filter/filter.selectors';
import { getfilteredCameras } from '../../../store/catalog/catalog.selectors';
import { getPrice } from '../../../utils/filter';
import { setMaxPrice, setMinPrice } from '../../../store/filter/filter.slice';
import { useAppDispatch, useAppSelector } from '../../../hooks';

type FilterByPriceProps = {
  resetFilters: boolean;
};

function FilterByPrice({resetFilters}: FilterByPriceProps): JSX.Element {
  const cameras = useAppSelector(getfilteredCameras);
  const currentMinPrice = useAppSelector(getCurrentMinPrice);
  const currentMaxPrice = useAppSelector(getCurrentMaxPrice);

  const minPrice = getPrice(cameras, 'min');
  const maxPrice = getPrice(cameras, 'max');

  const [minPriceValue, setMinPriceValue] = useState(0 || currentMinPrice);
  const [maxPriceValue, setMaxPriceValue] = useState(0 || currentMaxPrice);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (resetFilters) {
      setMinPriceValue(0);
      setMaxPriceValue(0);
    }
  }, [resetFilters]);

  const handleMinPriceInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    setMinPriceValue(+value);
  };

  const handleMaxPriceInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;

    setMaxPriceValue(+value);
  };

  const handleMinPriceBlur = () => {
    if (!minPriceValue) {
      setMinPriceValue(0);
      dispatch(setMinPrice(0));

      return;
    }

    if (minPriceValue < +minPrice) {
      setMinPriceValue(+minPrice);
      dispatch(setMinPrice(+minPrice));

      return;
    }

    if (minPriceValue > +maxPrice) {
      setMinPriceValue(+maxPrice);
      dispatch(setMinPrice(+maxPrice));

      return;
    }

    dispatch(setMinPrice(minPriceValue));
  };

  const handleMaxPriceBlur = () => {
    if (!maxPriceValue) {
      setMaxPriceValue(0);
      dispatch(setMaxPrice(0));

      return;
    }

    if (maxPriceValue > +maxPrice) {
      setMaxPriceValue(+maxPrice);
      dispatch(setMaxPrice(+maxPrice));

      return;
    }

    if (maxPriceValue < minPriceValue) {
      setMaxPriceValue(minPriceValue);
      dispatch(setMaxPrice(minPriceValue));

      return;
    }

    dispatch(setMaxPrice(maxPriceValue));
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Цена, ₽</legend>
      <div className="catalog-filter__price-range">
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="price"
              placeholder={minPrice}
              onChange={handleMinPriceInputChange}
              onBlur={handleMinPriceBlur}
              value={minPriceValue || ''}
            />
          </label>
        </div>
        <div className="custom-input">
          <label>
            <input
              type="number"
              name="priceUp"
              placeholder={maxPrice}
              onChange={handleMaxPriceInputChange}
              onBlur={handleMaxPriceBlur}
              value={maxPriceValue || ''}
            />
          </label>
        </div>
      </div>
    </fieldset>
  );
}

export default FilterByPrice;
