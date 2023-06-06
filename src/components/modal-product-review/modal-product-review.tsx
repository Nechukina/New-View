import clsx from 'clsx';
import { Camera } from '../../types/camera';
import { useForm } from 'react-hook-form';
import { AddReview } from '../../types/review';
import { postAddReviewAction } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';
import { useEffect, useState } from 'react';

type ModalProductReviewProps = {
  isOpened: boolean;
  product: Camera | null;
  onCloseButtonClick: (camera: null) => void;
  onAddReviewSuccess: () => void;
}

function ModalProductReview({isOpened, product, onCloseButtonClick, onAddReviewSuccess}: ModalProductReviewProps): JSX.Element {

  const dispatch = useAppDispatch();
  const [rate, setRate] = useState(0);

  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Esc' || event.key === 'Escape') {
        onCloseButtonClick(null);
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onCloseButtonClick]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AddReview>({
    mode: 'onChange'
  });


  const onSubmit = (data: AddReview) => {
    (async () => {
      const id = product?.id;
      const cameraId = Number(id);
      const rating = Number(data.rating);
      const action = await dispatch(postAddReviewAction({...data, cameraId, rating}));
      if(postAddReviewAction.fulfilled.match(action)){
        onCloseButtonClick(null);
        onAddReviewSuccess();
        reset();
      }
    })();

  };

  return (
    <div className={clsx('modal', isOpened && 'is-active')}>
      <div className="modal__wrapper">
        <div className="modal__overlay" onClick={() => onCloseButtonClick(null)}></div>
        <div className="modal__content">
          <p className="title title--h4">Оставить отзыв</p>
          <div className="form-review">
            <form method="post" onSubmit={handleSubmit(onSubmit)}>
              <div className="form-review__rate">
                <fieldset className={clsx('rate form-review__item', errors.rating && 'is-invalid')}>
                  <legend className="rate__caption">Рейтинг
                    <svg width="9" height="9" aria-hidden="true">
                      <use xlinkHref="#icon-snowflake"></use>
                    </svg>
                  </legend>
                  <div className="rate__bar">
                    <div className="rate__group">
                      <input onClick={() => setRate(5)} className="visually-hidden" id="star-5" type="radio" value="5" {...register('rating', {required: true})}/>
                      <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                      <input onClick={() => setRate(4)} className="visually-hidden" id="star-4" type="radio" value="4"{...register('rating', {required: true})}/>
                      <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                      <input onClick={() => setRate(3)} className="visually-hidden" id="star-3" type="radio" value="3"{...register('rating', {required: true})}/>
                      <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                      <input onClick={() => setRate(2)} className="visually-hidden" id="star-2" type="radio" value="2"{...register('rating', {required: true})}/>
                      <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                      <input onClick={() => setRate(1)} className="visually-hidden" id="star-1" type="radio" value="1"{...register('rating', {required: true})}/>
                      <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
                    </div>
                    <div className="rate__progress"><span className="rate__stars">{rate}</span> <span>/</span> <span className="rate__all-stars">5</span>
                    </div>
                  </div>
                  <p className="rate__message">Нужно оценить товар</p>
                </fieldset>
                <div className={clsx('custom-input form-review__item', errors.userName && 'is-invalid')}>
                  <label>
                    <span className="custom-input__label">Ваше имя
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input type="text" placeholder="Введите ваше имя" {...register('userName', {required: true})}/>
                  </label>
                  {errors.userName && <p className="custom-input__error">Нужно указать имя</p>}
                </div>
                <div className={clsx('custom-input form-review__item', errors.advantage && 'is-invalid')}>
                  <label>
                    <span className="custom-input__label">Достоинства
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input type="text" placeholder="Основные преимущества товара" {...register('advantage', {required: true})}/>
                  </label>
                  {errors.advantage && <p className="custom-input__error">Нужно указать достоинства</p>}
                </div>
                <div className={clsx('custom-input form-review__item', errors.disadvantage && 'is-invalid')}>
                  <label>
                    <span className="custom-input__label">Недостатки
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <input type="text" placeholder="Главные недостатки товара" {...register('disadvantage', {required: true})}/>
                  </label>
                  {errors.disadvantage && <p className="custom-input__error">Нужно указать недостатки</p>}
                </div>
                <div className={clsx('custom-textarea form-review__item', errors.review && 'is-invalid')}>
                  <label>
                    <span className="custom-textarea__label">Комментарий
                      <svg width="9" height="9" aria-hidden="true">
                        <use xlinkHref="#icon-snowflake"></use>
                      </svg>
                    </span>
                    <textarea minLength={5} placeholder="Поделитесь своим опытом покупки" {...register('review', {required: true})}></textarea>
                  </label>
                  {errors.review && <div className="custom-textarea__error">Нужно добавить комментарий</div>}
                </div>
              </div>
              <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
            </form>
          </div>
          <button onClick={() => onCloseButtonClick(null)} className="cross-btn" type="button" aria-label="Закрыть попап">
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalProductReview;
