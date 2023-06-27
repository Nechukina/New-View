import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { Review } from '../../../types/review';
import { useMemo } from 'react';

type ReviewCardProps = {
  review: Review;
}

function ReviewCard({ review }: ReviewCardProps) {
  return (
    <li className="review-card" data-testid="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{review.userName}</p>
        <time
          className="review-card__data"
          dateTime={review.createAt}
        >
          {dayjs(review.createAt, { locale: 'ru' }).format('D MMMM')}
        </time>
      </div>
      <div className="rate review-card__rate">
        {useMemo(() => (Array(5).fill('').map((_, index) => (
          <svg
            key={`${index.toString()}`}
            width="17"
            height="16"
            aria-hidden="true"
          >
            <use xlinkHref={index + 1 <= review.rating ? '#icon-full-star' : '#icon-star'}></use>
          </svg>
        ))), [review.rating])}
        <p className="visually-hidden">Оценка: {review.rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{review.advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{review.disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">
            {review.review}
          </p>
        </li>
      </ul>
    </li>
  );
}

export default ReviewCard;
