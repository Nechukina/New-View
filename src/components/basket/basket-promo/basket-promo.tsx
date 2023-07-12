import { SubmitHandler, useForm } from 'react-hook-form';
import { Coupon } from '../../../const';
import { useAppDispatch, useAppSelector } from '../../../hooks';
import { getCoupon, getDiscountStatus } from '../../../store/basket/basket.selectors';
import { fetchDiscount } from '../../../store/api-actions';
import clsx from 'clsx';
import Loader from '../../loader/loader';
import { setCoupon } from '../../../store/basket/basket.slice';

type PromoFormField = {
  promo: Coupon;
};

function BasketPromo(): JSX.Element {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isValid
    },
  } = useForm<PromoFormField>({
    mode: 'onSubmit'
  });
  const coupon = useAppSelector(getCoupon);
  const discountStatus = useAppSelector(getDiscountStatus);


  const onSubmit: SubmitHandler<PromoFormField> = (data) => {

    dispatch(fetchDiscount(data.promo));
  };

  return (
    <div className="basket__promo">
      <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
      <div className="basket-form">
        <form
          action="#"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={clsx('custom-input', errors.promo && 'is-invalid', isValid && 'is-valid')}>
            <label>
              <span className="custom-input__label">Промокод</span>
              <input
                {...register('promo', {
                  validate: {
                    positive: (value) => {

                      if (value === Coupon.First || value === Coupon.Second || value === Coupon.Third){
                        dispatch(setCoupon(value));
                        return true;
                      } else {
                        return false;
                      }
                    }
                  }
                })}
                type="text"
                name="promo"
                defaultValue={coupon || ''}
                placeholder="Введите промокод"
              />
            </label>
            <p className="custom-input__error">Промокод неверный</p>
            <p className="custom-input__success">Промокод принят!</p>
          </div>
          <button className="btn" type="submit">
            {discountStatus.isLoading ? <Loader isSmall /> : 'Применить'}
          </button>
        </form>
      </div>
    </div>
  );
}


export default BasketPromo;
