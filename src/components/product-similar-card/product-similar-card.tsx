import { Link, generatePath } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Camera } from '../../types/camera';

type ProductSimilarCardProps = {
  product: Camera;
}

function ProductSimilarCard({product}: ProductSimilarCardProps): JSX.Element {
  return (
    <div className="product-card is-active">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${product.previewImgWebp}, /${product.previewImgWebp2x} 2x`}/>
          <img src={`/${product.previewImg}`} srcSet={`/${product.previewImg2x} 2x`} width="280" height="240" alt={product.name}/>
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
            <use xlinkHref="#icon-full-star"></use>
          </svg>
          <svg width="17" height="16" aria-hidden="true">
            <use xlinkHref="#icon-star"></use>
          </svg>
          <p className="visually-hidden">Рейтинг: 4</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{product.reviewCount}</p>
        </div>
        <p className="product-card__title">{product.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{`${product.price} ₽`}</p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button">Купить
        </button>
        <Link className="btn btn--transparent" to={generatePath(AppRoute.Product, { id: product.id.toString() })}>Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductSimilarCard;
