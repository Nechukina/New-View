import { useState } from 'react';
import { getSimilarProducts } from '../../store/similar-products/similar-products.selectors';
import ProductSimilarCard from '../product-similar-card/product-similar-card';
import { SIMILAR_CAMERAS_PER_VIEW } from '../../const';
import { useAppSelector } from '../../hooks';


function ProductSimilar(): JSX.Element {
  const similarProducts = useAppSelector(getSimilarProducts);

  const [currentIndex, setCurrentIndex] = useState<number>(1);

  if (!similarProducts.length) {
    return (<div></div>);
  }

  const slideCount = Math.ceil(similarProducts.length / SIMILAR_CAMERAS_PER_VIEW);
  const renderedCameras = similarProducts.slice((currentIndex - 1) * SIMILAR_CAMERAS_PER_VIEW, currentIndex * SIMILAR_CAMERAS_PER_VIEW);

  //TODO: почему для работы карусели нужно снимать фокус с window?
  //TODO: как сделать плавный скролл???
  const handleNextClick = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrevClick = () => {
    setCurrentIndex(currentIndex - 1);
  };

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <div className="product-similar__slider-list">
            {
              renderedCameras
                .map((camera) =>
                  <ProductSimilarCard key={camera.id} product={camera}/>
                )
            }
          </div>
          <button
            onClick={handlePrevClick}
            className="slider-controls slider-controls--prev"
            type="button"
            aria-label="Предыдущий слайд"
            disabled = {currentIndex === 1}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <button
            onClick={handleNextClick}
            className="slider-controls slider-controls--next"
            type="button"
            aria-label="Следующий слайд"
            disabled = {currentIndex === slideCount}
          >
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
