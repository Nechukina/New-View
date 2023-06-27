import { Link, generatePath } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { Camera } from '../../../types/camera';
import { CSSProperties } from 'react';
import Rating from '../../rating/rating';

type ProductSimilarCardProps = {
  product: Camera;
  style?: CSSProperties;

}

function ProductSimilarCard({product, style}: ProductSimilarCardProps): JSX.Element {
  return (
    <div className="product-card is-active" style={style} data-testid="similar-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${product.previewImgWebp}, /${product.previewImgWebp2x} 2x`}/>
          <img src={`/${product.previewImg}`} srcSet={`/${product.previewImg2x} 2x`} width="280" height="240" alt={product.name}/>
        </picture>
      </div>
      <div className="product-card__info">
        <Rating rating={product.rating} reviewCount={product.reviewCount} />
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
