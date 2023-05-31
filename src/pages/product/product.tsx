import BreadcrumbsProduct from '../../components/breadcrumbs/breadcrumbs-product';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import ProductInfo from '../../components/product-info/product-info';
import ProductSimilar from '../../components/product-similar/product-similar';
import ReviewBlock from '../../components/review-block/review-block';

function Product(): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">
          <BreadcrumbsProduct />
          <div className="page-content__section">
            <ProductInfo />
          </div>
          <div className="page-content__section">
            <ProductSimilar />
          </div>
          <div className="page-content__section">
            <ReviewBlock />
          </div>
        </div>
      </main>
      <a className="up-btn" href="#header">
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </a>
      <Footer />
    </div>
  );
}

export default Product;
