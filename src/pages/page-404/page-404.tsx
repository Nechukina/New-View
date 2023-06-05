import { Link } from 'react-router-dom';
import Header from '../../components/header/header';
import { AppRoute } from '../../const';
import Footer from '../../components/footer/footer';
import { Helmet } from 'react-helmet-async';

function Page404(): JSX.Element {
  return (
    <>
      <Helmet>
        <title>Ошибка - Фотошоп</title>
      </Helmet>
      <div className="wrapper">
        <Header />
        <main>
          <section className="catalog">
            <div className="container" style={{marginTop: 100}}>
              <h1 className="title title--h2" style={{textAlign: 'center'}}>Упс! Что-то пошло не так...</h1>
              <div className="product__tabs-text" style={{textAlign: 'center'}}>
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
