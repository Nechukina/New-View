import { CameraLevel, levelQueryValue } from '../../const';
import { changeLevel } from '../../store/filter/filter.slice';
import { getCurrentLevels } from '../../store/filter/filter.selectors';
import { useAppDispatch, useAppSelector } from '../../hooks';

function FilterByLevel(): JSX.Element {
  const currentLevels = useAppSelector(getCurrentLevels);

  const dispatch = useAppDispatch();

  const handleCnange = (level: CameraLevel) => {
    dispatch(changeLevel(level));
  };

  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Уровень</legend>
      {Object.values(CameraLevel).map((level) => (
        <div className="custom-checkbox catalog-filter__item" key={level}>
          <label>
            <input
              type="checkbox"
              name={levelQueryValue[level]}
              checked={currentLevels.includes(level)}
              onChange={() => handleCnange(level)}
            />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">{level}</span>
          </label>
        </div>
      )
      )}
    </fieldset>
  );
}

export default FilterByLevel;
