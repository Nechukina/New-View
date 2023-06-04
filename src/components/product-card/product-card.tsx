import { Link, generatePath } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Camera } from '../../types/camera';

export type ProductCardProps = {
  camera: Camera;
  onBuyButtonClick: (camera: Camera) => void;
}

function ProductCard({camera, onBuyButtonClick}: ProductCardProps): JSX.Element {


  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${camera.previewImgWebp}, /${camera.previewImgWebp2x} 2x`}/>
          <img src={`/${camera.previewImg}`} srcSet={`/${camera.previewImg2x} 2x`} width="280" height="240" alt={camera.name}/>
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <p className="visually-hidden">Рейтинг: 3</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{camera.reviewCount}</p>
        </div>
        <p className="product-card__title">{camera.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{`${camera.price} ₽`}
        </p>
      </div>
      <div className="product-card__buttons">
        <button
          onClick={() => onBuyButtonClick(camera)}
          className="btn btn--purple product-card__btn"
          type="button"
        >
          Купить
        </button>
        <Link className="btn btn--transparent" to={generatePath(AppRoute.Description, { id: camera.id.toString() })}>Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
