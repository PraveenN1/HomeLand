import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';
//importing BrowserRouter
import {BrowserRouter} from 'react-router-dom'
import HouseContextProvider from './components/HouseContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Auth0Provider
    domain="dev-38kr5z676p3nwbrn.us.auth0.com"
    clientId="vG5lZokTnbc4xuf08h44cB3Z4JdLy8fg"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
    <HouseContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>  
    </HouseContextProvider>
  </Auth0Provider>,
);
