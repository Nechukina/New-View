import { CameraCategory, CameraType, typeQueryValue } from '../../const';
import { changeType } from '../../store/filter/filter.slice';
import { getCurrentCategory, getCurrentTypes } from '../../store/filter/filter.selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';

function FilterByType(): JSX.Element {
  const currentTypes = useAppSelector(getCurrentTypes);
  const currentCategory = useAppSelector(getCurrentCategory);

  const isVideocamera = currentCategory === CameraCategory.Videocamera;

  const dispatch = useAppDispatch();

  const handleCnange = (type: CameraType) => {
    dispatch(changeType(type));
  };
  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Тип камеры</legend>
      {Object.values(CameraType).map((type) => (
        <div className="custom-checkbox catalog-filter__item" key={type}>
          <label>
            <input
              type="checkbox"
              name={typeQueryValue[type]}
              checked={currentTypes.includes(type)}
              onChange={() => handleCnange(type)}
              disabled={isVideocamera && (type === CameraType.Instant || type === CameraType.Film)}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">{type}</span>
          </label>
        </div>
      )
      )}
    </fieldset>
  );
}

export default FilterByType;
