import { HelmetProvider } from 'react-helmet-async';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import Basket from '../../pages/basket/basket';
import Catalog from '../../pages/catalog/catalog';
import Product from '../../pages/product/product';
import Page404 from '../../pages/page-404/page-404';

function App(): JSX.Element {
  return (
    <HelmetProvider>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Catalog />}
        />
        <Route
          path={AppRoute.Catalog}
          element={<Catalog />}
        />
        <Route
          path={AppRoute.Basket}
          element={<Basket />}
        />
        <Route
          path={AppRoute.Product}
          element={<Product />}
        />
        <Route
          path={AppRoute.Features}
          element={<Product />}
        />
        <Route
          path={AppRoute.Description}
          element={<Product />}
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
