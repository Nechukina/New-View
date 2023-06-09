import { getProduct } from '../../store/product/product.selectors';
import Loader from '../loader/loader';
import { useAppSelector } from '../../hooks';
import ProductTabs from '../product-tabs/product-tabs';

function ProductInfo(): JSX.Element {
  const product = useAppSelector(getProduct);

  if (!product) {
    return <Loader />;
  }
  return (
    <section className="product" data-testid="product-info">
      <div className="container">
        <div className="product__img">
          <picture>
            <source type="image/webp" srcSet={`/${product.previewImgWebp}, /${product.previewImgWebp2x} 2x`}/>
            <img src={`/${product.previewImg}`} srcSet={`/${product.previewImg2x} 2x`} width="560" height="480" alt={product.name}/>
          </picture>
        </div>
        <div className="product__content">
          <h1 className="title title--h3">{product.name}</h1>
          <div className="rate product__rate">
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
          <p className="product__price"><span className="visually-hidden">Цена:</span>{`${product.price} ₽`}</p>
          <button className="btn btn--purple" type="button">
            <svg width="24" height="16" aria-hidden="true">
              <use xlinkHref="#icon-add-basket"></use>
            </svg>Добавить в корзину
          </button>
          <ProductTabs camera={product} />
        </div>
      </div>
    </section>
  );
}

export default ProductInfo;
