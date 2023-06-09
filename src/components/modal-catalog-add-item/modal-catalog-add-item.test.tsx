import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { makeFakeCamera } from '../../utils/mocks';
import ModalCatalogAddItem from './modal-catalog-add-item';


const mockProduct = makeFakeCamera();

const fakeFunction = (camera: null) => jest.fn();

const history = createMemoryHistory();

const fakeApp = (
  <HistoryRouter history={history}>
    <ModalCatalogAddItem isOpened product={mockProduct} onCloseButtonClick={fakeFunction} />
  </HistoryRouter>
);

describe('Component: modal catalog add item', () => {

  it('should render modal correctly', () => {

    render(fakeApp);

    expect(screen.getByTestId('modal-add-item')).toBeInTheDocument();
  });
});
