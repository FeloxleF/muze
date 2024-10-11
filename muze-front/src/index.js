import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '@fontsource/nunito';

const theme = createTheme({
  typography: {
    fontFamily: 'Nunito, sans-serif',
  },
  palette: {
    primary: {
      main: '#a06cd5', // Couleur primaire personnalisée
      light: '#F0E6F8'
    },
    secondary: {
      main: '#36453b', // Couleur secondaire personnalisée
    },
    three: {
      main: '#f5f9e9', // Couleur pour les erreurs
    },
    four: {
      main: '#c2c1a5'
    }
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
