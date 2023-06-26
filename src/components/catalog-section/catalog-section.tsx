import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import EmptyList from '../empty-list/empty-list';
import ProductCardList from '../product-card-list/product-card-list';
import { Cameras } from '../../types/camera';
import Pagination from '../pagination/pagination';

type CatalogSectionProps = {
  renderedCameras: Cameras;
  pageCount: number;
  currentPage: number;
}

function CatalogSection({renderedCameras, pageCount, currentPage}: CatalogSectionProps): JSX.Element {
  return (
    <section className="catalog" data-testid="catalog-section">
      <div className="container">
        <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
        <div className="page-content__columns">
          <div className="catalog__aside">
            <CatalogFilter />
          </div>
          <div className="catalog__content">
            <CatalogSort />
            {!renderedCameras.length
              ?
              <EmptyList />
              :
              <ProductCardList cameras={renderedCameras} />}
            {pageCount > 1 && <Pagination currentPage={currentPage} pageCount={pageCount} />}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CatalogSection;
