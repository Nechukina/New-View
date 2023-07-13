import { Helmet } from 'react-helmet-async';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import BreadcrumbsBasket from '../../components/breadcrumbs/breadcrumbs-basket/breadcrumbs-basket';
import BasketList from '../../components/basket/basket-list/basket-list';
import BasketPromo from '../../components/basket/basket-promo/basket-promo';
import BasketOrder from '../../components/basket/basket-order/basket-order';
import ModalProductBasketSuccess from '../../components/modals/modal-product-basket-success/modal-product-basket-success';

function BasketPage(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Корзина - Фотошоп</title>
      </Helmet>
      <div className="wrapper">
        <Header />
        <main data-testid="basket-page">
          <div className="page-content">
            <BreadcrumbsBasket />
            <section className="basket">
              <div className="container">
                <h1 className="title title--h2">Корзина</h1>
                <BasketList />
                <div className="basket__summary">
                  <BasketPromo />
                  <BasketOrder />
                </div>
              </div>
            </section>
          </div>
          <ModalProductBasketSuccess />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default BasketPage;
