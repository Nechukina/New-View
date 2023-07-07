import { useAppDispatch } from '../../../hooks';
import { addCamera } from '../../../store/basket/basket.slice';
import { Camera } from '../../../types/camera';
import Modal from '../modal/modal';

type ModalCatalogAddItemProps = {
  isOpened: boolean;
  product: Camera;
  onCloseButtonClick: () => void;
  setAddToCartModalSuccess: (arg: boolean) => void;
}

function ModalCatalogAddItem({isOpened, product, onCloseButtonClick, setAddToCartModalSuccess}: ModalCatalogAddItemProps): JSX.Element {
  const dispatch = useAppDispatch();

  if(!product) {
    return <div></div>;
  }

  const handleClick = () => {
    dispatch(addCamera(product));

    setAddToCartModalSuccess(true);
    onCloseButtonClick();
  };
  return (
    <Modal isOpen={isOpened} onCloseClick={onCloseButtonClick}>
      <p className="title title--h4">Добавить товар в корзину</p>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            <source type="image/webp" srcSet={`/${product.previewImgWebp}, /${product.previewImgWebp2x} 2x`} />
            <img src={`/${product.previewImg}`} srcSet={`/${product.previewImg2x} 2x`} width="140" height="120" alt={product.name} />
          </picture>
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">{product.name}</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item">
              <span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{product.vendorCode}</span>
            </li>
            <li className="basket-item__list-item">{product.type} камера</li>
            <li className="basket-item__list-item">{product.level} уровень</li>
          </ul>
          <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{`${product.price} ₽`}</p>
        </div>
      </div>
      <div className="modal__buttons">
        <button onClick={handleClick} className="btn btn--purple modal__btn modal__btn--fit-width" type="button">
          <svg width="24" height="16" aria-hidden="true">
            <use xlinkHref="#icon-add-basket"></use>
          </svg>Добавить в корзину
        </button>
      </div>
      <button onClick={() => onCloseButtonClick()} className="cross-btn" type="button" aria-label="Закрыть попап">
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </Modal>
  );
}

export default ModalCatalogAddItem;
