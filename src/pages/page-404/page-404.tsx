import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import { AppRoute } from '../../const';
import Footer from '../../components/footer/footer';
import { Helmet } from 'react-helmet-async';
import styles from './page-404.module.scss';

function Page404(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Ошибка - Фотошоп</title>
      </Helmet>
      <div className="wrapper">
        <Header />
        <main data-testid="page-404">
          <section className="catalog">
            <div className={styles.container} >
              <h1 className={`${styles.text} title title--h2`} >Упс! Что-то пошло не так...</h1>
              <div className={`${styles.text} product__tabs-text`}>
                <p>Похоже, Вы попали на несуществующую страницу. Попробуйте вернуться на главную...</p>
                <Link className="btn btn--purple" type="button" to={AppRoute.Main}>Вернуться на главную</Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default Page404;
