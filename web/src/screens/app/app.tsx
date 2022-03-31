import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { store } from '@store/store';
import { GlobalStyle } from '@styles/theme/globalStyle';
import { theme } from '@styles/theme/theme';
import { AppRouter } from './app.router';

export const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};
