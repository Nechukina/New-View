import { render, screen} from '@testing-library/react';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import Header from './header';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { NameSpace, Status } from '../../const';
import { makeFakeCameras } from '../../utils/mocks';
import { Provider } from 'react-redux';

const history = createMemoryHistory();
const mockStore = configureMockStore();
const cameras = makeFakeCameras();

const store = mockStore({
  [NameSpace.Cameras]: {catalog: cameras, status: Status.Success},
});
describe('Component: header', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Header/>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
  });
});
