import { Helmet } from 'react-helmet-async';
import BasketList from '../../components/basket-list/basket-list';
import BasketOrder from '../../components/basket-order/basket-order';
import BasketPromo from '../../components/basket-promo/basket-promo';
import BreadcrumbsBasket from '../../components/breadcrumbs/breadcrumbs-basket';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';

function Basket(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Корзина - Фотошоп</title>
      </Helmet>
      <div className="wrapper">
        <Header />
        <main>
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
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Basket;
