import { Link, useNavigate } from 'react-router-dom';
import Modal from '../modal/modal';
import { AppRoute } from '../../../const';

type ModalCatalogAddItemSuccessProps = {
  isOpened: boolean;
  onClose: () => void;
}

function ModalCatalogAddItemSuccess({isOpened, onClose}:ModalCatalogAddItemSuccessProps): JSX.Element {
  const navigate = useNavigate();
  const handleBackToCatalog = () => {
    navigate(AppRoute.Main);
    onClose();
  };
  return (
    <Modal isOpen={isOpened} onCloseClick={onClose}>
      <p className="title title--h4">Товар успешно добавлен в корзину</p>
      <svg className="modal__icon" width="86" height="80" aria-hidden="true">
        <use xlinkHref="#icon-success"></use>
      </svg>
      <div className="modal__buttons">
        <button className="btn btn--transparent modal__btn" onClick={handleBackToCatalog}>Продолжить покупки</button>
        <Link className="btn btn--purple modal__btn modal__btn--fit-width" to={AppRoute.Basket}>Перейти в корзину</Link>
      </div>
      <button className="cross-btn" type="button" aria-label="Закрыть попап">
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </Modal>
  );
}

export default ModalCatalogAddItemSuccess;
