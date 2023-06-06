import { useEffect, MouseEvent, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, generatePath, useParams } from 'react-router-dom';
import BreadcrumbsProduct from '../../components/breadcrumbs/breadcrumbs-product';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import ProductInfo from '../../components/product-info/product-info';
import ProductSimilar from '../../components/product-similar/product-similar';
import ReviewBlock from '../../components/review-block/review-block';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCameraInfoAction, getReviewsAction, getSimilarProductsAction } from '../../store/api-actions';
import { AppRoute } from '../../const';
import ModalProductReview from '../../components/modal-product-review/modal-product-review';
import { Camera } from '../../types/camera';
import { getProduct } from '../../store/product/product.selectors';
import ModalProductReviewSuccess from '../../components/modal-product-review-success/modal-product-review-success';

function Product(): JSX.Element {
  const id = useParams().id;
  const cameraId = String(id);
  const dispatch = useAppDispatch();
  const choosedProduct = useAppSelector(getProduct);

  const [isAddReviewModalOpened, setAddReviewModalOpened] = useState(false);
  const [product, setProduct] = useState<Camera | null>(null);
  const [isAddReviewSuccessModalOpened, setAddReviewSuccessModalOpened] = useState(false);

  useEffect(() => {
    dispatch(getCameraInfoAction(cameraId));
    dispatch(getSimilarProductsAction(cameraId));
    dispatch(getReviewsAction(cameraId));
  }, [cameraId, dispatch, isAddReviewModalOpened]);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Esc' || event.key === 'Escape') {
        setAddReviewModalOpened(false);
        setAddReviewSuccessModalOpened(false);
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [setAddReviewModalOpened, setAddReviewSuccessModalOpened]);


  const scrollToTop = (evt: MouseEvent<HTMLAnchorElement>) => {
    //TODO: можно ли оставить обращение к window?
    evt.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleAddReviewModalShow = useCallback((camera: Camera | null) => {
    //TODO: настроить поведение модальных окон: зацикливание табов на модальном окне
    //TODO как добавить класс родительскому контейнеру?
    document.body.style.overflow = isAddReviewModalOpened ? '' : 'hidden';

    setAddReviewModalOpened(!isAddReviewModalOpened);
    setProduct(camera);
  }, [isAddReviewModalOpened]);

  const handleAddReviewSuccess = () => {
    // eslint-disable-next-line no-debugger
    debugger;
    document.body.style.overflow = isAddReviewSuccessModalOpened ? '' : 'hidden';
    setAddReviewSuccessModalOpened(!isAddReviewSuccessModalOpened);
  };

  return (
    <>
      <Helmet>
        <title>Продукт - Фотошоп</title>
      </Helmet>
      <div className="wrapper">
        <Header />
        <main>
          <div className="page-content">
            <BreadcrumbsProduct />
            <div className="page-content__section">
              <ProductInfo />
            </div>
            <div className="page-content__section">
              <ProductSimilar />
            </div>
            <div className="page-content__section">
              <ReviewBlock camera={choosedProduct as Camera} onAddReviewButtonClick={handleAddReviewModalShow}/>
            </div>
          </div>
          <ModalProductReview
            isOpened={isAddReviewModalOpened}
            product={product}
            onCloseButtonClick={handleAddReviewModalShow}
            onAddReviewSuccess={handleAddReviewSuccess}
          />
          <ModalProductReviewSuccess
            isOpened={isAddReviewSuccessModalOpened}
            onCloseButtonClick={handleAddReviewSuccess}
          />
        </main>
        <Link className="up-btn" onClick={scrollToTop} to={generatePath(AppRoute.Product, {id: cameraId.toString()})}>
          <svg width="12" height="18" aria-hidden="true">
            <use xlinkHref="#icon-arrow2"></use>
          </svg>
        </Link>
        <Footer />
      </div>
    </>
  );
}

export default Product;
