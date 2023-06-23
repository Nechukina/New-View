import { STARS_COUNT } from '../const';
import { Reviews } from '../types/review';

export const getAverageRate = (reviews: Reviews): number => {
  const sumRate = reviews.reduce((acc, review) => acc + review.rating, 0);

  return Math.ceil(sumRate / reviews.length);
};

export const getStarsArray = (rating: number): boolean[] => {
  let count = rating;
  const result: boolean[] = [];

  while (result.length !== STARS_COUNT) {
    if (count) {
      result.push(true);
      count--;
    } else {
      result.push(false);
    }
  }

  return result;
};
