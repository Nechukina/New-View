
function ModalCatalogAddItemSuccess(): JSX.Element {
  return (
    <div className="modal is-active modal--narrow" data-testid='modal-add-to-cart-success'>
      <div className="modal__wrapper">
        <div className="modal__overlay"></div>
        <div className="modal__content">
          <p className="title title--h4">Товар успешно добавлен в корзину</p>
          <svg className="modal__icon" width="86" height="80" aria-hidden="true">
            <use xlinkHref="#icon-success"></use>
          </svg>
          <div className="modal__buttons">
            <a className="btn btn--transparent modal__btn" href="#todo">Продолжить покупки</a>
            <button className="btn btn--purple modal__btn modal__btn--fit-width">Перейти в корзину</button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап">
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalCatalogAddItemSuccess;
