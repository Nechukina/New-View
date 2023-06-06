import { useEffect, MouseEvent, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, generatePath, useParams } from 'react-router-dom';
import ReactFocusLock from 'react-focus-lock';
import { AppRoute } from '../../const';
import BreadcrumbsProduct from '../../components/breadcrumbs/breadcrumbs-product';
import { Camera } from '../../types/camera';
import Footer from '../../components/footer/footer';
import { getCameraInfoAction, getReviewsAction, getSimilarProductsAction } from '../../store/api-actions';
import { getProduct } from '../../store/product/product.selectors';
import Header from '../../components/header/header';
import ModalProductReview from '../../components/modal-product-review/modal-product-review';
import ModalProductReviewSuccess from '../../components/modal-product-review-success/modal-product-review-success';
import ProductInfo from '../../components/product-info/product-info';
import ProductSimilar from '../../components/product-similar/product-similar';
import ReviewBlock from '../../components/review-block/review-block';
import { useAppDispatch, useAppSelector } from '../../hooks';

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


  const scrollToTop = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  //TODO: двойной esc в модалках
  const handleAddReviewModalShow = useCallback((camera: Camera | null) => {
    document.body.style.overflow = isAddReviewModalOpened ? '' : 'hidden';

    setAddReviewModalOpened(!isAddReviewModalOpened);
    setProduct(camera);
  }, [isAddReviewModalOpened]);

  const handleAddReviewSuccess = useCallback(() => {
    document.body.style.overflow = isAddReviewSuccessModalOpened ? '' : 'hidden';

    setAddReviewSuccessModalOpened(!isAddReviewSuccessModalOpened);
  },[isAddReviewSuccessModalOpened]);

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
          <ReactFocusLock disabled={!isAddReviewModalOpened} returnFocus>
            <ModalProductReview
              isOpened={isAddReviewModalOpened}
              product={product}
              onCloseButtonClick={handleAddReviewModalShow}
              onAddReviewSuccess={handleAddReviewSuccess}
            />
          </ReactFocusLock>
          <ReactFocusLock disabled={!isAddReviewSuccessModalOpened} returnFocus>
            <ModalProductReviewSuccess
              isOpened={isAddReviewSuccessModalOpened}
              onCloseButtonClick={handleAddReviewSuccess}
            />
          </ReactFocusLock>
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
