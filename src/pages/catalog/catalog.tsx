import { Helmet } from 'react-helmet-async';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { Camera } from '../../types/camera';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import Footer from '../../components/footer/footer';
import { getCameras, getCamerasStatus } from '../../store/catalog/catalog.selectors';
import { getCatalogAction, getPromoAction } from '../../store/api-actions';
import { getPromoStatus } from '../../store/promo/promo.selectors';
import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';
import ModalCatalogAddItem from '../../components/modal-catalog-add-item/modal-catalog-add-item';
import Pagination from '../../components/pagination/pagination';
import ProductCard from '../../components/product-card/product-card';
import { CAMERAS_PER_PAGE, Status } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import Page404 from '../page-404/page-404';

function Catalog(): JSX.Element {
  const dispatch = useAppDispatch();
  const cameras = useAppSelector(getCameras);
  const camerasStatus = useAppSelector(getCamerasStatus);
  const promoStatus = useAppSelector(getPromoStatus);

  const param = useParams().page;
  let currentPage = Number(param?.replace(/[^\d]/g, ''));

  if (!currentPage) {
    currentPage = 1;
  }

  const [isBuyModalOpened, setBuyModalOpened] = useState(false);
  const [product, setProduct] = useState<Camera | null>(null);


  const handleBuyModalShow = useCallback((camera: Camera | null) => {
    document.body.style.overflow = isBuyModalOpened ? '' : 'hidden';

    setBuyModalOpened(!isBuyModalOpened);
    setProduct(camera);
  }, [isBuyModalOpened]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if(camerasStatus === Status.Idle) {
        dispatch(getCatalogAction());
        dispatch(getPromoAction());
      }
    }

    return () => {
      isMounted = false;
    };
  }, [camerasStatus, dispatch]);

  if (camerasStatus === Status.Idle || camerasStatus === Status.Loading || promoStatus === Status.Idle || promoStatus === Status.Loading){
    return <Loader />;
  }

  if (!cameras) {
    return <Page404 />;
  }

  const pageCount = Math.ceil(cameras.length / CAMERAS_PER_PAGE);
  const renderedCameras = cameras.slice((currentPage - 1) * CAMERAS_PER_PAGE, currentPage * CAMERAS_PER_PAGE);

  if (currentPage > pageCount || !currentPage || !cameras) {
    return <Page404 />;
  }


  return (
    <>
      <Helmet>
        <title>Каталог - Фотошоп</title>
      </Helmet>
      <div className="wrapper">
        <Header />
        <main data-testid="catalog-page">
          <Banner />
          <div className="page-content">
            <Breadcrumbs />
            <section className="catalog">
              <div className="container">
                <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
                <div className="page-content__columns">
                  <div className="catalog__aside">
                    <CatalogFilter />
                  </div>
                  <div className="catalog__content">
                    <CatalogSort />
                    <div className="cards catalog__cards">
                      {
                        renderedCameras
                          .map((camera) =>(
                            <ProductCard
                              key={camera.id}
                              camera={camera}
                              onBuyButtonClick={handleBuyModalShow}
                            />)
                          )
                      }
                    </div>
                    {pageCount > 1 && <Pagination currentPage={currentPage} pageCount={pageCount} />}
                  </div>
                </div>
              </div>
            </section>
          </div>
          <ModalCatalogAddItem
            isOpened={isBuyModalOpened}
            product={product}
            onCloseButtonClick={handleBuyModalShow}
          />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Catalog;
