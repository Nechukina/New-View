import { makeFakeCamera } from '../../utils/mocks';
import { productsAdapter, initialState, basketSlice, addCamera, decrementCameraCount, removeCamera, setCameraCount, setCoupon, resetOrderStatus, resetBasket } from './basket.slice';
import { Coupon, Status } from '../../const';


const camera = makeFakeCamera();
const mockState = productsAdapter.addOne(productsAdapter.getInitialState({
  ...initialState,
  basketCameras: [{...camera, count: 1, price: 1}],
  totalCount: 1,
  totalPrice: 1,
  discount: 0,
  discountStatus: Status.Success,
  coupon: Coupon.First,
  orderStatus: Status.Success,
}), {
  ...camera,
  price: 1,
  count: 1,
  totalPrice: 1
});

describe('Slice: basket', () => {
  it('without additional parameters should return initial state', () => {

    expect(basketSlice.reducer(mockState, { type: 'UNKNOWN_ACTION' }))
      .toEqual(mockState);
  });

  it('should add camera to basket when dispatch addCamera', () => {
    const product = makeFakeCamera();
    product.id = 2;
    product.count = 1;
    product.totalPrice = 1;
    product.price = 1;
    const newState = productsAdapter.addOne({...mockState, basketCameras: [{...camera, count: 1, price: 1}, product]}, { ...product, count: 1, totalPrice: product.price});

    expect(basketSlice.reducer(mockState, addCamera(product)))
      .toEqual({ ...newState, totalPrice: 2, totalCount: 2});
  });

  it('should decrease product count on dispatch decrementCount', () => {
    const newState = productsAdapter.upsertOne({...mockState, basketCameras: [{...camera, count: 0, price: 1}]}, { ...camera, count: 0, totalPrice: 0, price: 1 });

    expect(basketSlice.reducer(mockState, decrementCameraCount(camera)))
      .toEqual({ ...newState, totalPrice: 0, totalCount: 0 });
  });

  it('should remove product  on dispatch removeCamera', () => {
    const newState = productsAdapter.removeOne({...mockState, basketCameras: []}, 1);

    expect(basketSlice.reducer(mockState, removeCamera(camera)))
      .toEqual({ ...newState, totalPrice: 0, totalCount: 0 });
  });

  it('should change product count on dispatch setCameraCount', () => {
    const newState = productsAdapter.upsertOne({...mockState, basketCameras: [{...camera, count: 5, price: 1}]}, { ...camera, count: 5, totalPrice: 5, price: 1 });

    expect(basketSlice.reducer(mockState, setCameraCount({ id: 1, count: 5 })))
      .toEqual({ ...newState, totalPrice: 5, totalCount: 5 });
  });

  it('Should change coupon by a given coupon', () => {
    expect(basketSlice.reducer(mockState, setCoupon(Coupon.Second)))
      .toEqual({
        ...mockState,
        coupon: Coupon.Second
      });
  });

  it('Should reset orderStatus by a given reset order status', () => {
    expect(basketSlice.reducer(mockState, resetOrderStatus()))
      .toEqual({...mockState, orderStatus: Status.Idle});
  });


  it('should reset state', () => {
    const newState = productsAdapter.removeOne({...mockState, basketCameras: []}, 1);

    expect(basketSlice.reducer(mockState, resetBasket()))
      .toEqual({ ...newState, totalPrice: 0, totalCount: 0, coupon: 0, discountStatus: Status.Idle, orderStatus: Status.Idle });
  });

});
