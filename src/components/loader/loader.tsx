import clsx from 'clsx';
import Spinner from '../spinner/spinner';
import '../spinner/spinner.css';

export type LoaderProps = {
  isSmall?: boolean;
}

function Loader({isSmall}: LoaderProps): JSX.Element {
  return (
    <section className={clsx(!isSmall && 'catalog')}>
      {!isSmall && <p>Loading ...</p>}
      <Spinner isSmall={isSmall} />
    </section>
  );
}

export default Loader;
