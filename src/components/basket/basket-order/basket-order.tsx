import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { postOrder } from '../../../store/api-actions';
import { getCoupon, getDiscountPercent, getOrderStatus, selectAllBasketProducts } from '../../../store/basket/basket.selectors';
import { getDiscount, getFinalPrice, getTotalPrice } from '../../../utils/basket';
import Loader from '../../loader/loader';

function BasketOrder(): JSX.Element {
  const dispatch = useAppDispatch();
  const basketCameras = useAppSelector(selectAllBasketProducts);
  const discountPercent = useAppSelector(getDiscountPercent);
  const currentCoupon = useAppSelector(getCoupon);
  const orderStatus = useAppSelector(getOrderStatus);

  const camerasIds = basketCameras.reduce((acc: number[], camera) => {
    acc.push(camera.id);

    return acc;
  }, []);

  const totalPrice = getTotalPrice(basketCameras);
  const discount = getDiscount(totalPrice, discountPercent);
  const finalPrice = getFinalPrice(totalPrice, discount);


  const handleClick = () => {
    dispatch(postOrder({ camerasIds: camerasIds, coupon: currentCoupon }));
  };

  return (
    <div className="basket__summary-order">
      <p className="basket__summary-item">
        <span className="basket__summary-text">Всего:</span>
        <span className="basket__summary-value">{totalPrice} ₽</span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text">Скидка:</span>
        <span className={clsx('basket__summary-value', discount && 'basket__summary-value--bonus')}>{discount} ₽</span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text basket__summary-text--total">К оплате:</span>
        <span className="basket__summary-value basket__summary-value--total">{finalPrice} ₽</span>
      </p>
      <button className="btn btn--purple" onClick={handleClick}>
        {orderStatus.isLoading ? <Loader isSmall /> : 'Оформить заказ'}
      </button>
    </div>
  );
}

export default BasketOrder;
