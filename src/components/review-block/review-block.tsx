import { useState } from 'react';
import dayjs from 'dayjs';
import { DEFAULT_REVIEWS_COUNT } from '../../const';
import { getReviews } from '../../store/reviews/reviews.selectors';
import ReviewCard from '../review-card/review-card';
import { useAppSelector } from '../../hooks';

function ReviewBlock(): JSX.Element {
  const reviews = useAppSelector(getReviews);
  const [currentReviewsCount, setCurrentReviewsCount] = useState(DEFAULT_REVIEWS_COUNT);
  const sortedReviews = [...reviews].sort((a, b) => dayjs(b.createAt).diff(a.createAt));

  return (
    <section className="review-block">
      <div className="container">
        <div className="page-content__headed">
          <h2 className="title title--h3">Отзывы</h2>
          <button className="btn" type="button">Оставить свой отзыв</button>
        </div>
        <ul className="review-block__list">
          {sortedReviews
            .slice(0, currentReviewsCount)
            .map((comment) => (
              <ReviewCard
                key={comment.id}
                review={comment}
              />
            )
            )}
        </ul>
        <div className="review-block__buttons">
          {sortedReviews.length > currentReviewsCount &&
            <button
              onClick={() => setCurrentReviewsCount((count) => count + DEFAULT_REVIEWS_COUNT)}
              className="btn btn--purple"
              type="button"
            >
              Показать больше отзывов
            </button>}
        </div>
      </div>
    </section>
  );
}

export default ReviewBlock;
