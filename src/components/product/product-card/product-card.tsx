import { Link, generatePath } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { Camera } from '../../../types/camera';
import Rating from '../../rating/rating';
import { useAppSelector } from '../../../hooks';
import { getBasketCameras } from '../../../store/basket/basket.selectors';

export type ProductCardProps = {
  camera: Camera;
  setBuyModalOpened?: (arg: boolean) => void;
  setCurrentCamera?: (camera: Camera) => void;
}

function ProductCard({camera, setBuyModalOpened, setCurrentCamera}: ProductCardProps): JSX.Element {
  const basketCameras = useAppSelector(getBasketCameras);
  const inBasket = basketCameras.find((basketCamera) => basketCamera.id === camera.id);


  const handleClick = () => {
    if (setBuyModalOpened && setCurrentCamera) {
      setBuyModalOpened(true);
      setCurrentCamera(camera);
    }
  };

  return (
    <div className="product-card" data-testid="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${camera.previewImgWebp}, /${camera.previewImgWebp2x} 2x`}/>
          <img src={`/${camera.previewImg}`} srcSet={`/${camera.previewImg2x} 2x`} width="280" height="240" alt={camera.name}/>
        </picture>
      </div>
      <div className="product-card__info">
        <Rating reviewCount={camera.reviewCount} rating={camera.rating} />
        <p className="product-card__title">{camera.name}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{`${camera.price} ₽`}
        </p>
      </div>
      <div className="product-card__buttons">
        {inBasket ?
          <Link className="btn btn--purple-border" to={AppRoute.Basket}>
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg>В корзине
          </Link> :
          <button
            className="btn btn--purple product-card__btn"
            type="button"
            onClick={handleClick}
          >
            Купить
          </button>}
        <Link className="btn btn--transparent" to={generatePath(AppRoute.Description, { id: camera.id.toString() })}>Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
