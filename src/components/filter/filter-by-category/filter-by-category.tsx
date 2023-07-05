import { CameraCategory, CameraType, categoryQueryValue } from '../../../const';
import { changeCategory } from '../../../store/filter/filter.slice';
import { getCurrentCategory, getCurrentTypes } from '../../../store/filter/filter.selectors';
import { useAppDispatch, useAppSelector } from '../../../hooks';

function FilterByCategory(): JSX.Element {
  const currentCategory = useAppSelector(getCurrentCategory);
  const currentTypes = useAppSelector(getCurrentTypes);

  const isInstantType = currentTypes.includes(CameraType.Instant);
  const isFilmType = currentTypes.includes(CameraType.Film);

  const dispatch = useAppDispatch();

  const handleCnange = (category: CameraCategory) => {
    if (currentCategory === category) {
      dispatch(changeCategory(null));

      return;
    }

    dispatch(changeCategory(category));
  };
  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Категория</legend>
      {Object.values(CameraCategory).map((category) => (
        <div className="custom-checkbox catalog-filter__item" key={category}>
          <label>
            <input
              type="checkbox"
              name={categoryQueryValue[category]}
              checked={currentCategory === category}
              onChange={() => handleCnange(category)}
              disabled={category === CameraCategory.Videocamera && (isFilmType || isInstantType)}
            />
            <span className="custom-checkbox__icon"></span>
            {category === CameraCategory.Photocamera
              ?
              <span className="custom-checkbox__label">Фотокамера</span>
              :
              <span className="custom-checkbox__label">Видеокамера</span>}

          </label>
        </div>
      )
      )}
    </fieldset>
  );
}

export default FilterByCategory;
