import { useAppSelector } from '../../hooks';
import { getSimilarProducts } from '../../store/similar-products/similar-products.selectors';
import ProductSimilarCard from '../product-similar-card/product-similar-card';

function ProductSimilar(): JSX.Element {
  const similarProducts = useAppSelector(getSimilarProducts);

  if (!similarProducts.length) {
    return (<div></div>);
  }

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            {
              // TODO: slider
              similarProducts
                .slice(0,3)
                .map((camera) =>
                  <ProductSimilarCard key={camera.id} product={camera}/>
                )
            }
          </div>
          <button className="slider-controls slider-controls--prev" type="button" aria-label="Предыдущий слайд" disabled>
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <button className="slider-controls slider-controls--next" type="button" aria-label="Следующий слайд">
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductSimilar;
