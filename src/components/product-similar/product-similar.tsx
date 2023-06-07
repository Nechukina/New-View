import { useRef, useState } from 'react';
import ProductSimilarCard from '../product-similar-card/product-similar-card';
import { Cameras } from '../../types/camera';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import clsx from 'clsx';

type ProductSimilarProps = {
  products: Cameras;
}

function ProductSimilar({products}: ProductSimilarProps): JSX.Element {
  const swiperRef = useRef<SwiperRef['swiper']>();
  const [{ isBeginning, isEnd }, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  });

  return (
    <section className="product-similar">
      <div className="container">
        <h2 className="title title--h3">Похожие товары</h2>
        <div className="product-similar__slider">
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onSlideChange={(swiper) => {
              setSliderState({ isBeginning: swiper.isBeginning, isEnd: swiper.isEnd });
            }}
            className="product-similar__slider-list"
            slidesPerView={3}
            slidesPerGroup={3}
            spaceBetween={30}
            allowTouchMove={false}
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductSimilarCard product={product}/>
              </SwiperSlide>
            ))}
          </Swiper>
          <button
            style={{
              pointerEvents: isBeginning ? 'none' : 'auto'
            }}
            onClick={() => swiperRef.current?.slidePrev()}
            className={clsx('slider-controls slider-controls--prev', isBeginning && 'disabled')}
            type="button"
            aria-label="Предыдущий слайд"
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <button
            style={{
              pointerEvents: isEnd ? 'none' : 'auto'
            }}
            onClick={() => swiperRef.current?.slideNext()}
            className={clsx('slider-controls slider-controls--next', isEnd && 'disabled')}
            type="button"
            aria-label="Следующий слайд"
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
