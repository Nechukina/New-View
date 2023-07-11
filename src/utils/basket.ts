export const getTotalProductPrice = (price: number, count?: number) => {
  if (!count) {
    return price;
  }

  return price * count;
};
