import {datatype, random, image, lorem, name, date} from 'faker';
import { AddReview, Review, Reviews } from '../types/review';
import { BasketCamera, Camera, Cameras } from '../types/camera';
import { PromoCamera } from '../types/promo';
import { Notification } from '../types/notifications';
import { NameSpace, SortOrder, SortType, Status } from '../const';
import { State } from '../types/state';
import { createEntityAdapter } from '@reduxjs/toolkit';


const MOCK_DEFAULT_NUMBER = 1;
const CAMERAS_AMOUNT = 30;
const REVIEWS_AMOUNT = 10;

export const makeFakeCamera = (id = MOCK_DEFAULT_NUMBER):Camera=>({
  id,
  name: random.words(2),
  vendorCode: random.alpha({count: 10}),
  type: lorem.word(),
  category: random.word(),
  description: lorem.sentences(),
  level: random.word(),
  price: datatype.number({min: 0, max: 150000, precision: 1}),
  reviewCount: datatype.number({min: 0, max: 100, precision: 1}),
  previewImg: image.technics(),
  previewImg2x: image.abstract(),
  previewImgWebp: image.animals(),
  previewImgWebp2x: image.city()
} as Camera);

// export const makeFakeBasketCamera = (id = MOCK_DEFAULT_NUMBER):BasketCamera=>({
//   id,
//   name: random.words(2),
//   vendorCode: random.alpha({count: 10}),
//   type: lorem.word(),
//   category: random.word(),
//   description: lorem.sentences(),
//   level: random.word(),
//   price: datatype.number({min: 0, max: 150000, precision: 1}),
//   reviewCount: datatype.number({min: 0, max: 100, precision: 1}),
//   previewImg: image.technics(),
//   previewImg2x: image.abstract(),
//   previewImgWebp: image.animals(),
//   previewImgWebp2x: image.city(),
//   count: 1,
//   totalPrice: 1
// } as BasketCamera);
//TODO
export const makeFakeCameras = (amount = CAMERAS_AMOUNT):Cameras=> Array.from({length:amount},(_, i)=> makeFakeCamera(i + 1));

export const makeFakeReview = (): Review => ({
  id: random.alpha({count: 36}),
  createAt: date.recent().toISOString(),
  cameraId: datatype.number({min: 1, max: 30}),
  userName: name.firstName(),
  advantage: lorem.sentences(1),
  disadvantage: lorem.sentences(1),
  review: lorem.sentences(2),
  rating: datatype.number({min: 1, max: 5})
} as Review);

export const makeFakeReviews = (amount = REVIEWS_AMOUNT):Reviews=> Array.from({length:amount},(_)=> makeFakeReview());


export const makeFakeAddReview = (): AddReview => ({
  cameraId: datatype.number({min: 1, max: 15}),
  userName: name.firstName(),
  advantage: lorem.sentences(1),
  disadvantage: lorem.sentences(1),
  review: lorem.sentences(2),
  rating: datatype.number({min: 1, max: 5})
} as AddReview);

export const makeFakePromo = () : PromoCamera => ({
  id: datatype.number({min: 1, max: 15}),
  name: random.words(2),
  previewImg: image.technics(),
  previewImg2x: image.abstract(),
  previewImgWebp: image.animals(),
  previewImgWebp2x: image.city()
} as PromoCamera);

export const makeFakeNotification = (): Notification => ({
  id: random.alpha({count: 10}),
  type: random.word(),
  message: random.words(2),
  duration: datatype.number({min: 1, max: 15}),
} as Notification);

const productsAdapter = createEntityAdapter<BasketCamera>();
const mockCameras = makeFakeCameras();
const mockPromo = [makeFakePromo()];
const mockProduct = makeFakeCamera();
const mockReviews = makeFakeReviews();
export const createMockStore = (): State => ({
  [NameSpace.Basket]: {
    ...productsAdapter.getInitialState(),
    basketCameras: [mockProduct],
    totalCount: 1,
    totalPrice: 1,
    discount: 0,
    discountStatus: Status.Success,
    coupon: 0,
    orderStatus: Status.Success
  },
  [NameSpace.Cameras]: {catalog: mockCameras, status: Status.Success},
  [NameSpace.Promo]: {camera: mockPromo, status: Status.Success, description: mockProduct.description},
  [NameSpace.Product]: {product: mockProduct, status: Status.Success},
  [NameSpace.Similar] : {similarProducts: mockCameras, status: Status.Success},
  [NameSpace.Notification]: {notifications: []},
  [NameSpace.Reviews]: {reviews: mockReviews, status: Status.Success, postStatus: Status.Success},
  [NameSpace.Sort]: {sortOrder: SortOrder.Up, sortType: SortType.SortPrice},
  [NameSpace.Filter]: {
    category: null,
    types: [],
    levels: [],
    minPrice: 0,
    maxPrice: Infinity
  }
});
