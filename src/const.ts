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
  Filter = 'FILTER'
}
