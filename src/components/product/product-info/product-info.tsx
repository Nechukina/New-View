import { getProduct } from '../../../store/product/product.selectors';
import Loader from '../../loader/loader';
import Rating from '../../rating/rating';
import { useAppSelector } from '../../../hooks';
import ProductTabs from '../product-tabs/product-tabs';

export type ProductInfoProps = {
  setBuyModalOpened: (arg: boolean) => void;
}

function ProductInfo({setBuyModalOpened}: ProductInfoProps): JSX.Element {
  const product = useAppSelector(getProduct);

  const handleBuyModalOpened = () => {
    setBuyModalOpened(true);
  };

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
          <Rating rating={product.rating} reviewCount={product.reviewCount} />
          <p className="product__price"><span className="visually-hidden">Цена:</span>{`${product.price} ₽`}</p>
          <button
            className="btn btn--purple"
            type="button"
            onClick={handleBuyModalOpened}
          >
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
