import {render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../../history-router/history-router';
import Modal from './modal';


const history = createMemoryHistory();

const fakeApp = (
  <HistoryRouter history={history}>
    <Modal isOpen onCloseClick={jest.fn()} >
      <p>modal</p>
    </Modal>
  </HistoryRouter>
);

describe('Component: modal', () => {

  it('should render correctly', () => {

    render(fakeApp);

    expect(screen.getByTestId('modal')).toBeInTheDocument();
  });
});
