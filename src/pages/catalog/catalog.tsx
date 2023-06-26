import { Helmet } from 'react-helmet-async';
import { useEffect, useMemo} from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Banner from '../../components/banner/banner';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { CAMERAS_PER_PAGE, SortOrder, SortType, Status, sortOrderQueryValue } from '../../const';
import CatalogSection from '../../components/catalog-section/catalog-section';
import { changeSortOrder, changeSortType } from '../../store/sort/sort.slice';
import Footer from '../../components/footer/footer';
import { getCamerasStatus, getSortedCameras } from '../../store/catalog/catalog.selectors';
import { getCatalogAction, getPromoAction } from '../../store/api-actions';
import { getCurrentSortOrder, getCurrentSortType } from '../../store/sort/sort.selectors';
import { getPromoStatus } from '../../store/promo/promo.selectors';
import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';
import { QueryParams } from '../../types/query-params';
import { useAppDispatch, useAppSelector } from '../../hooks';

function Catalog(): JSX.Element {
  const dispatch = useAppDispatch();
  const cameras = useAppSelector(getSortedCameras);
  const camerasStatus = useAppSelector(getCamerasStatus);
  const promoStatus = useAppSelector(getPromoStatus);
  const currentSortOrder = useAppSelector(getCurrentSortOrder);
  const currentSortType = useAppSelector(getCurrentSortType);

  const param = useParams().page;
  let currentPage = Number(param?.replace(/[^\d]/g, ''));

  if (!currentPage) {
    currentPage = 1;
  }

  const [searchParams, setSearchParams] = useSearchParams();
  const sortType = searchParams.get('sortBy');
  const sortOrder = searchParams.get('order');

  const currentParams = useMemo(() => {
    const params: QueryParams = {};

    if (currentSortOrder && currentSortType) {
      params.sortBy = currentSortType;
      params.order = sortOrderQueryValue[currentSortOrder];
    }

    return params;
  }, [currentSortType, currentSortOrder]);

  useEffect(() => {
    if (sortType && sortOrder) {
      dispatch(changeSortType(sortType as SortType));
      dispatch(changeSortOrder(sortOrder === sortOrderQueryValue[SortOrder.Up] ? SortOrder.Up : SortOrder.Down));
    }
  }, [sortType, sortOrder, dispatch]);

  useEffect(() => {
    setSearchParams(currentParams);
  }, [setSearchParams, currentParams]);

  useEffect(() => {
    let isMounted = true;

    if (isMounted) {
      if(camerasStatus === Status.Idle) {
        dispatch(getCatalogAction());
      }
      if(camerasStatus === Status.Success){
        dispatch(getPromoAction());

      }
    }

    return () => {
      isMounted = false;
    };
  }, [camerasStatus, dispatch]);

  if (camerasStatus === Status.Idle || camerasStatus === Status.Loading || promoStatus === Status.Loading){
    return <Loader />;
  }


  const pageCount = Math.ceil(cameras.length / CAMERAS_PER_PAGE);
  const renderedCameras = cameras.slice((currentPage - 1) * CAMERAS_PER_PAGE, currentPage * CAMERAS_PER_PAGE);


  return (
    <>
      <Helmet>
        <title>Каталог - Фотошоп</title>
      </Helmet>
      <div className="wrapper">
        <Header />
        <main data-testid="catalog-page">
          <Banner />
          <div className="page-content">
            <Breadcrumbs />
            <CatalogSection
              renderedCameras={renderedCameras}
              currentPage={currentPage}
              pageCount={pageCount}
            />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Catalog;
