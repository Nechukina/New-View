import { CameraCategory } from '../../const';

function FilterByCategory(): JSX.Element {
  return (
    <fieldset className="catalog-filter__block">
      <legend className="title title--h5">Категория</legend>
      {Object.values(CameraCategory).map((category) => (
        <div className="custom-checkbox catalog-filter__item" key={category}>
          <label>
            <input type="checkbox" name={category} />
            <span className="custom-checkbox__icon"></span>
            <span className="custom-checkbox__label">{category}</span>
          </label>
        </div>
      )
      )}
    </fieldset>
  );
}

export default FilterByCategory;
