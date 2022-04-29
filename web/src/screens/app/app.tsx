import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { persistStore } from 'redux-persist';
import { ThemeProvider } from 'styled-components';

import { store } from '@store/store';
import { GlobalStyle } from '@styles/theme/globalStyle';
import { theme } from '@styles/theme/theme';
import { PersistGate } from 'redux-persist/integration/react';
import { AppRouter } from './app.router';

const persistor = persistStore(store);

export const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};
