import { useEffect, MouseEvent, useState, useCallback} from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, generatePath, useParams } from 'react-router-dom';
import { AppRoute, Status } from '../../const';
import Footer from '../../components/footer/footer';
import { getCameraInfoAction, getReviewsAction, getSimilarProductsAction } from '../../store/api-actions';
import { getProduct, getProductStatus } from '../../store/product/product.selectors';
import { getSimilarProducts, getSimilarProductsStatus } from '../../store/similar-products/similar-products.selectors';
import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';
import ReviewBlock from '../../components/review/review-block/review-block';
import { useAppDispatch, useAppSelector } from '../../hooks';
import ScrollToTop from '../../utils/scroll-to-top';
import { getReviewsStatus } from '../../store/reviews/reviews.selectors';
import ProductInfo from '../../components/product/product-info/product-info';
import ProductSimilar from '../../components/product/product-similar/product-similar';
import BreadcrumbsProduct from '../../components/breadcrumbs/breadcrumbs-product/breadcrumbs-product';
import ModalCatalogAddItem from '../../components/modals/modal-catalog-add-item/modal-catalog-add-item';
import ModalCatalogAddItemSuccess from '../../components/modals/modal-catalog-add-item-success/modal-catalog-add-item-success';

function ProductPage(): JSX.Element {
  const id = useParams().id;
  const cameraId = String(id);
  const dispatch = useAppDispatch();
  const choosedProduct = useAppSelector(getProduct);
  const similarProducts = useAppSelector(getSimilarProducts);
  const productStatus = useAppSelector(getProductStatus);
  const similarProductStatus = useAppSelector(getSimilarProductsStatus);
  const reviewsStatus = useAppSelector(getReviewsStatus);

  const [isBuyModalOpened, setBuyModalOpened] = useState(false);
  const [isAddToCartModalSuccessOpened, setAddToCartModalSuccessOpened] = useState(false);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if(!cameraId){
        return;
      }
      dispatch(getCameraInfoAction(cameraId));
      dispatch(getSimilarProductsAction(cameraId));
      dispatch(getReviewsAction(cameraId));
    }

    return () => {
      isMounted = false;
    };
  }, [cameraId, dispatch]);


  const scrollToTop = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleBuyModalHide = useCallback(() => {
    setBuyModalOpened(false);
  },[]);

  const handleAddToCartModalHide = useCallback(() => {
    setAddToCartModalSuccessOpened(false);
  },[]);


  if(!choosedProduct || productStatus === Status.Loading || similarProductStatus === Status.Loading || reviewsStatus === Status.Loading) {
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <title>Продукт - Фотошоп</title>
      </Helmet>
      <div className="wrapper">
        <Header />
        <main data-testid='product-page'>
          <ScrollToTop />
          <div className="page-content">
            {choosedProduct && <BreadcrumbsProduct />}
            <div className="page-content__section">
              {choosedProduct && <ProductInfo setBuyModalOpened={setBuyModalOpened} />}
            </div>
            <div className="page-content__section">
              {similarProducts.length && <ProductSimilar products={similarProducts} />}
            </div>
            <ReviewBlock />
          </div>

        </main>
        <Link className="up-btn" onClick={scrollToTop} to={generatePath(AppRoute.Product, {id: cameraId.toString()})}>
          <svg width="12" height="18" aria-hidden="true">
            <use xlinkHref="#icon-arrow2"></use>
          </svg>
        </Link>
        <ModalCatalogAddItem
          isOpened={isBuyModalOpened}
          onCloseButtonClick={handleBuyModalHide}
          product={choosedProduct}
          setAddToCartModalSuccess={setAddToCartModalSuccessOpened}
        />
        <ModalCatalogAddItemSuccess
          isOpened={isAddToCartModalSuccessOpened}
          onClose={handleAddToCartModalHide}
        />
        <Footer />
      </div>
    </>
  );
}

export default ProductPage;
