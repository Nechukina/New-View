import { useState } from 'react';
import { Link, generatePath } from 'react-router-dom';
import clsx from 'clsx';
import { AppRoute } from '../../const';
import { Camera } from '../../types/camera';

type ProductTabsProps = {
  camera: Camera;
};

function ProductTabs({ camera }: ProductTabsProps): JSX.Element {
  const [featuresOpened, setFeaturesOpened] = useState(false);
  const [descriptionOpened, setDescriptionOpened] = useState(true);

  const handleClick = () => {
    setDescriptionOpened(!descriptionOpened);
    setFeaturesOpened(!featuresOpened);
  };

  return (
    <div className="tabs product__tabs" data-testid="tabs">
      <div className="tabs__controls product__tabs-controls">
        <Link to={generatePath(AppRoute.Features, {id: camera.id.toString()})}>
          <button
            className={clsx('tabs__control', featuresOpened && 'is-active')}
            type="button"
            onClick={handleClick}
          >
          Характеристики
          </button>
        </Link>
        <Link to={generatePath(AppRoute.Description, {id: camera.id.toString()})}>
          <button
            className={clsx('tabs__control', descriptionOpened && 'is-active')}
            type="button"
            onClick={handleClick}
          >
          Описание
          </button>
        </Link>
      </div>
      <div className="tabs__content">
        <div className={clsx('tabs__element', featuresOpened && 'is-active')}>
          <ul className="product__tabs-list">
            <li className="item-list"><span className="item-list__title">Артикул:</span>
              <p className="item-list__text">{camera.vendorCode}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Категория:</span>
              <p className="item-list__text">{camera.category}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Тип камеры:</span>
              <p className="item-list__text">{camera.type}</p>
            </li>
            <li className="item-list"><span className="item-list__title">Уровень:</span>
              <p className="item-list__text">{camera.level}</p>
            </li>
          </ul>
        </div>
        <div className={clsx('tabs__element', descriptionOpened && 'is-active')}>
          <div className="product__tabs-text">
            <p>{camera.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductTabs;
