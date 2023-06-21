import { useCallback, useState } from 'react';
import dayjs from 'dayjs';
import { DEFAULT_REVIEWS_COUNT } from '../../const';
import { getReviews } from '../../store/reviews/reviews.selectors';
import ReviewCard from '../review-card/review-card';
import { useAppSelector } from '../../hooks';
import ModalProductReviewSuccess from '../modal-product-review-success/modal-product-review-success';
import ModalProductReview from '../modal-product-review/modal-product-review';


function ReviewBlock(): JSX.Element {
  const reviews = useAppSelector(getReviews);
  const [currentReviewsCount, setCurrentReviewsCount] = useState(DEFAULT_REVIEWS_COUNT);
  const sortedReviews = [...reviews].sort((a, b) => dayjs(b.createAt).diff(a.createAt));

  const [isAddReviewModalOpened, setAddReviewModalOpened] = useState(false);

  const handleAddReviewModalShow = useCallback((() => {
    setAddReviewModalOpened(true);
  }),[]);

  const handleAddReviewModalHide = useCallback(() => {
    setAddReviewModalOpened(false);
  },[setAddReviewModalOpened]);


  return (
    <>
      <div className="page-content__section">
        <section className="review-block" data-testid="review-block">
          <div className="container">
            <div className="page-content__headed">
              <h2 className="title title--h3">Отзывы</h2>
              <button onClick={() => handleAddReviewModalShow()} className="btn" type="button">Оставить свой отзыв</button>
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
      </div>
      <ModalProductReview
        isOpened={isAddReviewModalOpened}
        onCloseButtonClick={handleAddReviewModalHide}
      />
      <ModalProductReviewSuccess />
    </>
  );
}

export default ReviewBlock;
