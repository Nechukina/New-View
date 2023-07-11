import { Helmet } from 'react-helmet-async';
import { useEffect, useMemo} from 'react';
import { useSearchParams } from 'react-router-dom';
import Banner from '../../components/banner/banner';
import BreadcrumbsMain from '../../components/breadcrumbs/breadcrumbs-main/breadcrumbs-main';
import { CameraCategory, CameraLevel, CameraType, SortOrder, SortType, Status, sortOrderQueryValue } from '../../const';
import { capitalizeFirstLetter } from '../../utils/filter';
import CatalogSection from '../../components/catalog/catalog-section/catalog-section';
import { changeCategory, changeLevel, changeType, setMaxPrice, setMinPrice } from '../../store/filter/filter.slice';
import { changeSortOrder, changeSortType } from '../../store/sort/sort.slice';
import Footer from '../../components/footer/footer';
import { getCamerasStatus} from '../../store/catalog/catalog.selectors';
import { getCatalogAction, getPromoAction } from '../../store/api-actions';
import { getCurrentCategory, getCurrentLevels, getCurrentMaxPrice, getCurrentMinPrice, getCurrentTypes } from '../../store/filter/filter.selectors';
import { getCurrentSortOrder, getCurrentSortType } from '../../store/sort/sort.selectors';
import { getPromoStatus } from '../../store/promo/promo.selectors';
import Header from '../../components/header/header';
import Loader from '../../components/loader/loader';
import { QueryParams } from '../../types/query-params';
import { useAppDispatch, useAppSelector } from '../../hooks';

function CatalogPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const camerasStatus = useAppSelector(getCamerasStatus);
  const promoStatus = useAppSelector(getPromoStatus);
  const currentSortOrder = useAppSelector(getCurrentSortOrder);
  const currentSortType = useAppSelector(getCurrentSortType);
  const currentCategory = useAppSelector(getCurrentCategory);
  const currentTypes = useAppSelector(getCurrentTypes);
  const currentLevels = useAppSelector(getCurrentLevels);
  const currentMinPrice = useAppSelector(getCurrentMinPrice);
  const currentMaxPrice = useAppSelector(getCurrentMaxPrice);


  const [searchParams, setSearchParams] = useSearchParams();
  const sortType = searchParams.get('sortBy');
  const sortOrder = searchParams.get('order');

  const category = searchParams.get('category');
  const type: string[] = [];
  const level: string[] = [];
  const priceGt = searchParams.get('price_gt');
  const priceLt = searchParams.get('price_lt');

  for (const [key, value] of searchParams.entries()) {
    if (key === 'type' && !type.includes(value)) {
      type.push(value);
    }

    if (key === 'level' && !level.includes(value)) {
      level.push(value);
    }
  }

  const currentParams = useMemo(() => {
    const params: QueryParams = {};

    if (currentSortOrder && currentSortType) {
      params.sortBy = currentSortType;
      params.order = sortOrderQueryValue[currentSortOrder];
    } else if (!currentCategory && !currentTypes.length && !currentLevels.length && !currentMinPrice && !currentMaxPrice) {
      return;
    }

    if (currentCategory) { params.category = currentCategory; }
    if (currentTypes) { params.type = currentTypes; }
    if (currentLevels) { params.level = currentLevels; }
    if (currentMinPrice) { params['price_gt'] = currentMinPrice.toString(); }
    if (currentMaxPrice) { params['price_lt'] = currentMaxPrice.toString(); }

    return params;
  }, [currentSortType, currentSortOrder, currentCategory, currentTypes, currentLevels, currentMinPrice, currentMaxPrice]);


  useEffect(() => {
    if (sortType && sortOrder) {
      dispatch(changeSortType(sortType as SortType));
      dispatch(changeSortOrder(sortOrder === sortOrderQueryValue[SortOrder.Up] ? SortOrder.Up : SortOrder.Down));
    }

    if (category) {
      dispatch(changeCategory(capitalizeFirstLetter(category) as CameraCategory));
    }

    if (priceGt) {
      dispatch(setMinPrice(+priceGt));
    }

    if (priceLt) {
      dispatch(setMaxPrice(+priceLt));
    }
  }, [sortType, sortOrder, dispatch, category, priceGt, priceLt]);


  useEffect(() => {
    if (type.length) {
      type.forEach((item) => {
        dispatch(changeType(capitalizeFirstLetter(item) as CameraType));
      });
    }
    if (level.length) {
      level.forEach((item) => {
        dispatch(changeLevel(capitalizeFirstLetter(item) as CameraLevel));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);


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
            <BreadcrumbsMain />
            <CatalogSection />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default CatalogPage;
