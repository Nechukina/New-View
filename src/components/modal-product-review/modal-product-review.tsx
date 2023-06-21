import ReviewForm from '../review-form/review-form';
import Modal from '../modal/modal';

type ModalProductReviewProps = {
  isOpened: boolean;
  onCloseButtonClick: () => void;
}

function ModalProductReview({isOpened, onCloseButtonClick}: ModalProductReviewProps): JSX.Element {


  return (
    <Modal isOpen={isOpened} onCloseClick={onCloseButtonClick}>
      <p className="title title--h4">Оставить отзыв</p>
      <ReviewForm onClose={onCloseButtonClick}/>
    </Modal>
  );
}

export default ModalProductReview;
