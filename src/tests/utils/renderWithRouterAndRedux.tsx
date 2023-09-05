import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { legacy_createStore as createStore, Store } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../../redux/reducers';
import { ReactElement } from 'react';

type options = {
  initialState?: any,
  store?: Store,
  initialEntries?: string[],
  history?: any,
};

const renderWithRouterAndRedux = (
  component: ReactElement,
  {
    initialState,
    store = createStore(reducer, initialState),
    initialEntries = ['/'],
  }: options = {},
) => ({
  ...render(
    <MemoryRouter initialEntries={initialEntries}>
      <Provider store={ store }>
        {component}
      </Provider>
    </MemoryRouter>,
  ),
  store,
  history,
});

export default renderWithRouterAndRedux;
