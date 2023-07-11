import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import Page404 from '../../pages/page-404/page-404';
import BasketPage from '../../pages/basket/basket-page';
import CatalogPage from '../../pages/catalog/catalog-page';
import ProductPage from '../../pages/product/product-page';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<CatalogPage />}
        />
        <Route
          path={AppRoute.Catalog}
          element={<CatalogPage />}
        />
        <Route
          path={AppRoute.Basket}
          element={<BasketPage/>}
        />
        <Route
          path={AppRoute.Product}
          element={<ProductPage />}
        />
        <Route
          path={AppRoute.Features}
          element={<ProductPage />}
        />
        <Route
          path={AppRoute.Description}
          element={<ProductPage />}
        />
        <Route
          path='*'
          element={<Page404 />}
        />
      </Routes>
    </HelmetProvider>
  );
}

export default App;
