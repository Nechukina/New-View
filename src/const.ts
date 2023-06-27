export enum AppRoute {
  Main = '/',
  Catalog = '/catalog/:page',
  Basket = '/basket',
  Product = '/product/:id',
  Description = '/product/:id/description',
  Features = '/product/:id/features',
  NotFound = '*'
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
  Cameras = 'CAMERAS',
  Product = 'PRODUCT',
  Similar = 'SIMILAR',
  Promo = 'PROMO',
  Review = 'REVIEW',
  Reviews = 'REVIEWS',
  Coupon = 'COUPON',
  Order = 'ORDER',
  Notification = 'NOTIFICATION',
  Filter = 'FILTER',
  Sort = 'SORT'
}

export enum Status {
  Idle = 'idle',
  Loading = 'loading',
  Success = 'success',
  Error = 'error'
}

export enum CameraType {
  Collection = 'Коллекционная',
  Instant = 'Моментальная',
  Digital = 'Цифровая',
  Film = 'Плёночная',
}

export enum CameraCategory {
  Videocamera = 'Видеокамера',
  Photocamera = 'Фотоаппарат',
}

export enum CameraLevel {
  Zero = 'Нулевой',
  Amateur = 'Любительский',
  Professional = 'Профессиональный',
}

export const categoryQueryValue = {
  [CameraCategory.Videocamera]: 'videocamera',
  [CameraCategory.Photocamera]: 'photocamera'
};

export const typeQueryValue = {
  [CameraType.Collection]: 'collection',
  [CameraType.Instant]: 'instant',
  [CameraType.Digital]: 'digital',
  [CameraType.Film]: 'film',
};

export const levelQueryValue = {
  [CameraLevel.Zero]: 'zero',
  [CameraLevel.Amateur]: 'amateur',
  [CameraLevel.Professional]: 'professional'
};


export enum SortType {
  SortPrice = 'по цене',
  SortPopular = 'по популярности'
}

export enum SortOrder {
  Up = 'По возрастанию',
  Down = 'По убыванию'
}

export const sortOrderQueryValue = {
  [SortOrder.Up]: 'up',
  [SortOrder.Down]: 'down'
};

export const CAMERAS_PER_PAGE = 9;
export const STARS_COUNT = 5;
export const DEFAULT_REVIEWS_COUNT = 3;
export const DISPLAYED_SEARCH_RESULT_COUNT = 4;

export enum KeyCode {
  Enter = 'Enter',
  ArrowUp = 'ArrowUp',
  ArrowDown = 'ArrowDown',
  Esc = 'Escape'
}
