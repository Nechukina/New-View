import { Link, generatePath } from 'react-router-dom';
import { AppRoute } from '../../../const';
import { Camera } from '../../../types/camera';
import Rating from '../../rating/rating';

export type ProductCardProps = {
  camera: Camera;
  setBuyModalOpened?: (arg: boolean) => void;
  setCurrentCamera?: (camera: Camera) => void;
}

function ProductCard({camera, setBuyModalOpened, setCurrentCamera}: ProductCardProps): JSX.Element {

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
        <button
          onClick={handleClick}
          className="btn btn--purple product-card__btn"
          type="button"
        >
          Купить
        </button>
        <Link className="btn btn--transparent" to={generatePath(AppRoute.Description, { id: camera.id.toString() })}>Подробнее
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
