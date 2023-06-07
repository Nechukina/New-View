import { useEffect, MouseEvent, useState, useCallback } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, generatePath, useParams } from 'react-router-dom';
import ReactFocusLock from 'react-focus-lock';
import { AppRoute, Status } from '../../const';
import BreadcrumbsProduct from '../../components/breadcrumbs/breadcrumbs-product';
import { Camera } from '../../types/camera';
import Footer from '../../components/footer/footer';
import { getCameraInfoAction, getReviewsAction, getSimilarProductsAction } from '../../store/api-actions';
import { getProduct, getProductStatus } from '../../store/product/product.selectors';
import { getSimilarProducts } from '../../store/similar-products/similar-products.selectors';
import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';
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
  const similarProducts = useAppSelector(getSimilarProducts);
  const productStatus = useAppSelector(getProductStatus);

  const [isAddReviewModalOpened, setAddReviewModalOpened] = useState(false);
  const [product, setProduct] = useState<Camera | null>(null);
  const [isAddReviewSuccessModalOpened, setAddReviewSuccessModalOpened] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if(productStatus === Status.Idle){
        dispatch(getCameraInfoAction(cameraId));
        dispatch(getSimilarProductsAction(cameraId));
        dispatch(getReviewsAction(cameraId));
      }
    }

    return () => {
      isMounted = false;
    };
  }, [cameraId, dispatch, isAddReviewModalOpened, productStatus]);


  const scrollToTop = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  const handleAddReviewModalShow = useCallback(((camera: Camera | null) => {
    document.body.style.overflow = 'hidden';
    setAddReviewModalOpened(true);
    setProduct(camera);
  }),[setAddReviewModalOpened]);

  const handleAddReviewModalHide = useCallback(() => {
    document.body.style.overflow = '';
    setAddReviewModalOpened(false);
  },[setAddReviewModalOpened]);

  const handleAddReviewModalSuccessShow = useCallback(() => {
    document.body.style.overflow = 'hidden';
    setAddReviewSuccessModalOpened(true);
  },[setAddReviewSuccessModalOpened]);

  const handleAddReviewModalSuccessHide = useCallback(() => {
    document.body.style.overflow = '';
    setAddReviewSuccessModalOpened(false);
  },[setAddReviewSuccessModalOpened]);

  if(!choosedProduct) {
    return <Loader />;
  }


  return (
    <>
      <Helmet>
        <title>Продукт - Фотошоп</title>
      </Helmet>
      <div className="wrapper">
        <Header />
        <main>
          <div className="page-content">
            {choosedProduct && <BreadcrumbsProduct />}
            <div className="page-content__section">
              {choosedProduct && <ProductInfo />}
            </div>
            <div className="page-content__section">
              {similarProducts.length && <ProductSimilar products={similarProducts} />}
            </div>
            <div className="page-content__section">
              <ReviewBlock camera={choosedProduct} onAddReviewButtonClick={handleAddReviewModalShow}/>
            </div>
          </div>
          <ReactFocusLock disabled={!isAddReviewModalOpened} returnFocus>
            <ModalProductReview
              isOpened={isAddReviewModalOpened}
              product={product}
              onCloseButtonClick={handleAddReviewModalHide}
              onAddReviewSuccess={handleAddReviewModalSuccessShow}
            />
          </ReactFocusLock>
          <ReactFocusLock disabled={!isAddReviewSuccessModalOpened} returnFocus>
            <ModalProductReviewSuccess
              isOpened={isAddReviewSuccessModalOpened}
              onCloseButtonClick={handleAddReviewModalSuccessHide}
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
