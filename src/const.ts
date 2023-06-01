export enum AppRoute {
  Catalog = '/',
  Basket = '/basket',
  Product = '/product',
}

export enum APIRoute {
  Catalog = '/cameras',
  Product = '/cameras/:cameraId',
  Similar = '/cameras/:cameraId/similar',
  Promo = '/promo',
  Reviews = '/cameras/:cameraId/reviews',
  AddReview = '/reviews',
  Coupon = '/coupons',
  Order = '/orders',
}

export enum NameSpace {
  Camera = 'CAMERA',
  Promo = 'PROMO',
  Review = 'REVIEW',
  Coupon = 'COUPON',
  Order = 'ORDER',
  Notification = 'NOTIFICATION',
  Filter = 'FILTER',
}

export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error'
}

export enum CameraType {
  Коллекционная = 'Коллекционная',
  Моментальная = 'Моментальная',
  Цифровая = 'Цифровая',
  Плёночная = 'Плёночная',
}

export enum CameraCategory {
  Видеокамера = 'Видеокамера',
  Фотоаппарат = 'Фотоаппарат',
}

export enum CameraLevel {
  Нулевой = 'Нулевой',
  Любительский = 'Любительский',
  Профессиональный = 'Профессиональный',
}
