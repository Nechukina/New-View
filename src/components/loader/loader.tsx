import Spinner from '../spinner/spinner';
import '../spinner/spinner.css';


//TODO: сделать маленький лоадер
function Loader(): JSX.Element {
  return (
    <section className="catalog">
      <p>Loading ...</p>
      <Spinner />
    </section>
  );
}

export default Loader;
