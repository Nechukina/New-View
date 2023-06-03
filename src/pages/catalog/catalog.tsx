import { useCallback, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import Footer from '../../components/footer/footer';
import { getCatalogAction, getPromoAction } from '../../store/api-actions';
import Header from '../../components/header/header';
import Pagination from '../../components/pagination/pagination';
import ProductCard from '../../components/product-card/product-card';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getCameras, getCamerasStatus } from '../../store/catalog/catalog.selectors';
import { Camera } from '../../types/camera';
import { Status } from '../../const';
import { getPromoStatus } from '../../store/promo/promo.selectors';
import Loader from '../../components/loader/loader';
import ModalCatalogAddItem from '../../components/modal-catalog-add-item/modal-catalog-add-item';

function Catalog(): JSX.Element {
  const dispatch = useAppDispatch();
  const cameras = useAppSelector(getCameras);
  const camerasStatus = useAppSelector(getCamerasStatus);
  const promoStatus = useAppSelector(getPromoStatus);

  const [isBuyModalOpened, setBuyModalOpened] = useState(false);
  const [product, setProduct] = useState<Camera | null>(null);

  const handleBuyModalShow = useCallback((camera: Camera | null) => {
    //TODO: настроить поведение модальных окон: закрытие по esc, зацикливание табов на модальном окне
    //TODO как добавить класс родительскому контейнеру?
    document.body.style.overflow = isBuyModalOpened ? '' : 'hidden';

    setBuyModalOpened(!isBuyModalOpened);
    setProduct(camera);
  }, [isBuyModalOpened]);

  useEffect(() => {
    if(camerasStatus === Status.Idle) {
      dispatch(getCatalogAction());
      dispatch(getPromoAction());
    }
  }, [camerasStatus, dispatch]);

  if (camerasStatus === Status.Idle || camerasStatus === Status.Loading || promoStatus === Status.Idle || promoStatus === Status.Loading){
    return <Loader />;
  }

  return (
    <>
      <Helmet>
        <title>Каталог - Фотошоп</title>
      </Helmet>
      <div className="wrapper">
        <Header />
        <main>
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
                        cameras
                          .map((camera) =>(
                            <ProductCard
                              key={camera.id}
                              camera={camera}
                              onBuyButtonClick={handleBuyModalShow}
                            />)
                          )
                      }
                    </div>
                    {/* TODO: pagination */}
                    <Pagination />
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
