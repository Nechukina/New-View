import CatalogFilter from '../catalog-filter/catalog-filter';
import CatalogSort from '../catalog-sort/catalog-sort';
import EmptyList from '../../empty-list/empty-list';
import Pagination from '../../pagination/pagination';
import ProductCardList from '../../product/product-card-list/product-card-list';
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../hooks';
import { getfilteredCameras } from '../../../store/catalog/catalog.selectors';
import { CAMERAS_PER_PAGE } from '../../../const';


function CatalogSection(): JSX.Element {
  const cameras = useAppSelector(getfilteredCameras);

  const param = useParams().page;
  let currentPage = Number(param?.replace(/[^\d]/g, ''));

  if (!currentPage) {
    currentPage = 1;
  }

  const pageCount = Math.ceil(cameras.length / CAMERAS_PER_PAGE);
  const renderedCameras = cameras.slice((currentPage - 1) * CAMERAS_PER_PAGE, currentPage * CAMERAS_PER_PAGE);

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
