import clsx from 'clsx';

type SpinnerProps = {
  isSmall?: boolean;
}

function Spinner({isSmall}: SpinnerProps): JSX.Element {
  return (
    <div className={clsx('loader', isSmall && 'small')} data-testid="spinner" style = {{display: 'block', marginLeft: 'auto', marginRight: 'auto'}}></div>
  );
}

export default Spinner;
