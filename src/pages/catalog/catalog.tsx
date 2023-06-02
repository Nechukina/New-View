import { useEffect } from 'react';
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
import { getCameras } from '../../store/catalog/catalog.selectors';

function Catalog(): JSX.Element {
  const dispatch = useAppDispatch();
  const cameras = useAppSelector(getCameras);


  useEffect(() => {
    dispatch(getCatalogAction());
    dispatch(getPromoAction());
  }, [dispatch]);
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
                          .map((camera) =>
                            <ProductCard key={camera.id} camera={camera}/>
                          )
                      }
                    </div>
                    <Pagination />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Catalog;
