import { useAppDispatch } from '../../../hooks';
import { removeCamera } from '../../../store/basket/basket.slice';
import { Camera } from '../../../types/camera';
import Modal from '../modal/modal';

export type ModalBasketRemoveItemProps = {
  camera: Camera;
  isOpen: boolean;
  onCloseCLick: () => void;
}

function ModalBasketRemoveItem({camera, isOpen, onCloseCLick}: ModalBasketRemoveItemProps): JSX.Element {

  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(removeCamera(camera));
    onCloseCLick();
  };

  return (
    <Modal isOpen={isOpen} onCloseClick={onCloseCLick}>
      <p className="title title--h4">Удалить этот товар?</p>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            <source type="image/webp" srcSet={`${camera.previewImgWebp}, ${camera.previewImgWebp2x} 2x`} />
            <img
              src={camera.previewImg}
              srcSet={camera.previewImg2x}
              width="140"
              height="120"
              alt={camera.name}
            />
          </picture>
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">{camera.name}</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item">
              <span className="basket-item__article">Артикул: </span>
              <span className="basket-item__number">{camera.vendorCode}</span>
            </li>
            <li className="basket-item__list-item">{camera.type} камера</li>
            <li className="basket-item__list-item">{camera.level} уровень</li>
          </ul>
        </div>
      </div>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--half-width"
          type="button"
          onClick={handleClick}
        >
          Удалить
        </button>
        <button
          className="btn btn--transparent modal__btn modal__btn--half-width"
          onClick={onCloseCLick}
        >
          Продолжить покупки
        </button>
      </div>
    </Modal>
  );
}

export default ModalBasketRemoveItem;
