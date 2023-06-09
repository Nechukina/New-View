import { configureMockStore } from '@jedmao/redux-mock-store';
import {render, screen} from '@testing-library/react';
import thunk from 'redux-thunk';
import { NameSpace, Status } from '../../const';
import { createAPI } from '../../services/api';
import { createMemoryHistory } from 'history';
import HistoryRouter from '../history-router/history-router';
import { makeFakeCameras, makeFakePromo } from '../../utils/mocks';
import { Provider } from 'react-redux';
import Banner from './banner';


const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const mockCameras = makeFakeCameras();
const mockPromo = makeFakePromo();
const store = mockStore({
  [NameSpace.Cameras]: {catalog: mockCameras, status: Status.Success},
  [NameSpace.Promo]: {camera: mockPromo, status: Status.Success}
});

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <HistoryRouter history={history}>
      <Banner />
    </HistoryRouter>
  </Provider>
);

describe('Component: banner', () => {

  it('should render banner correctly', () => {

    render(fakeApp);

    expect(screen.getByText(/Новинка/i)).toBeInTheDocument();
  });
});
