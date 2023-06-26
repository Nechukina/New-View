import { Link, generatePath } from 'react-router-dom';
import { AppRoute } from '../../const';
import { getPromo, getPromoDescription } from '../../store/promo/promo.selectors';
import { useAppSelector } from '../../hooks';

function Banner(): JSX.Element {
  const promo = useAppSelector(getPromo);
  const description = useAppSelector(getPromoDescription);

  if (!promo) {
    return (
      <div></div>
    );
  }

  return (
    <div className="banner">
      <picture>
        <source type="image/webp" srcSet={`/${promo.previewImgWebp}, /${promo.previewImgWebp2x} 2x`}/>
        <img src={`/${promo.previewImg}`} srcSet={`/${promo.previewImg2x} 2x`} width="1280" height="280" alt="баннер"/>
      </picture>
      <p className="banner__info">
        <span className="banner__message">Новинка!</span>
        <span className="title title--h1">{promo.name}</span>
        <span className="banner__text">{description}</span>
        <Link className="btn" to={generatePath(AppRoute.Product, { id: promo.id.toString() })}>Подробнее</Link>
      </p>
    </div>
  );
}


export default Banner;
