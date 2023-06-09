import BasketItem from '../basket-item/basket-item';

function BasketList(): JSX.Element {
  return (
    <ul className="basket__list" data-testid='basket-list'>
      <BasketItem />
      <BasketItem />
      <BasketItem />
    </ul>
  );
}

export default BasketList;
