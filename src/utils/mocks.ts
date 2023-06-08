import {datatype, random, image, lorem, name, date} from 'faker';
import { AddReview, Review, Reviews } from '../types/review';
import { Camera, Cameras } from '../types/camera';
import { PromoCamera } from '../types/promo';
import { Notification } from '../types/notifications';


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

