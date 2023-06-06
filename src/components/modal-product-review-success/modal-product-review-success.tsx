import clsx from 'clsx';
import { Link, generatePath, useParams } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useEffect } from 'react';

type ModalProductReviewSuccessProps = {
  isOpened: boolean;
  onCloseButtonClick: () => void;
}

function ModalProductReviewSuccess({isOpened, onCloseButtonClick}: ModalProductReviewSuccessProps): JSX.Element {
  const id = useParams().id;
  const cameraId = Number(id);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Esc' || event.key === 'Escape') {
        onCloseButtonClick();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onCloseButtonClick]);


  return (
    <div className={clsx('modal', isOpened && 'is-active', 'modal--narrow')}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={() => onCloseButtonClick()}></div>
        <div className="modal__content">
          <p className="title title--h4">Спасибо за отзыв</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <Link
              to={generatePath(AppRoute.Product, {id: cameraId.toString()})}
              onClick={() => onCloseButtonClick()}
              className="btn btn--purple modal__btn modal__btn--fit-width"
              type="button"
            >
              Вернуться к покупкам
            </Link>
          </div>
          <button className="cross-btn" onClick={() => onCloseButtonClick()} type="button" aria-label="Закрыть попап">
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalProductReviewSuccess;
