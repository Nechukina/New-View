import { Route, Routes } from 'react-router-dom';
import Catalog from '../../pages/catalog/catalog';
import { AppRoute } from '../../const';
import Basket from '../../pages/basket/basket';
import Product from '../../pages/product/product';
import Page404 from '../../pages/page-404/page-404';

function App(): JSX.Element {
  return (
    <Routes>
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
        path='*'
        element={<Page404 />}
      />
    </Routes>
  );
}

export default App;
