import React from 'react';
import ReactDOM from 'react-dom/client';
import {Route, Routes, BrowserRouter} from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Toaster } from 'react-hot-toast';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './Styles/main.scss'
import { AuthContextProvider } from "./Context/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="775684727138-f5rg9sobok9jp63n2pgg1pgnv4c15k9r.apps.googleusercontent.com">
        <AuthContextProvider>
          {/* <SocketContextProvider> */}
            <Toaster />
            <Routes>
              <Route path="/*" element={<App/>}/>
            </Routes>
          {/* </SocketContextProvider> */}
        </AuthContextProvider>
      </GoogleOAuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();