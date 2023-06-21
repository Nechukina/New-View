import { useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { useForm } from 'react-hook-form';
import { AddReview } from '../../types/review';
import clsx from 'clsx';
import { useParams } from 'react-router-dom';
import { postAddReviewAction } from '../../store/api-actions';

type ReviewFormProps = {
    onClose: () => void;
  };

function ReviewForm({onClose}: ReviewFormProps): JSX.Element {
  const id = useParams().id;

  const dispatch = useAppDispatch();
  const [rate, setRate] = useState(0);


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AddReview>({
    mode: 'onSubmit'
  });


  const onSubmit = (data: AddReview) => {
    (async () => {
      const cameraId = Number(id);
      const rating = Number(data.rating);
      const action = await dispatch(postAddReviewAction({...data, cameraId, rating}));
      if(postAddReviewAction.fulfilled.match(action)){
        onClose();
        reset();
      }
    })();

  };
  return (
    <div className="form-review" data-testid="form-review">
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
              <div className="rate__progress">
                <span className="rate__stars">{rate}</span>
                <span>/</span>
                <span className="rate__all-stars">5</span>
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
              <input
                type="text"
                placeholder="Введите ваше имя"
                {...register('userName', {required: true})}
              />
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
              <input
                type="text"
                placeholder="Основные преимущества товара"
                {...register('advantage', {required: true})}
              />
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
              <input
                type="text"
                placeholder="Главные недостатки товара"
                {...register('disadvantage', {required: true})}
              />
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
              <textarea
                minLength={5}
                placeholder="Поделитесь своим опытом покупки"
                {...register('review', {required: 'Нужно добавить комментарий', minLength: {
                  value: 5,
                  message: 'Минимум 5 символов'
                }})}
              >
              </textarea>
            </label>
            {errors.review && <div className="custom-textarea__error">{errors.review.message}</div>}
          </div>
        </div>
        <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
      </form>
    </div>
  );
}

export default ReviewForm;
