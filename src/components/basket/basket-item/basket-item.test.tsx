import { render, screen} from '@testing-library/react';
import BasketItem from './basket-item';
import { makeFakeCamera } from '../../../utils/mocks';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { configureMockStore } from '@jedmao/redux-mock-store';
import { createAPI } from '../../../services/api';

const camera = makeFakeCamera();
const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const store = mockStore({});

describe('Component: basket item', () => {
  it('should render correctly', () => {

    render(
      <Provider store={store}>
        <BasketItem camera={camera}/>
      </Provider>,
    );

    const containerElement = screen.getByTestId('basket-item');

    expect(containerElement).toBeInTheDocument();
  });
});
