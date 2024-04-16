import React from 'react';
import { Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';

// Layouts
import Base from './Layouts/Base/Base';

// Pages
import Default from './Pages/LandingPage/Default';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Chat from './Pages/Chat/Chat';
import Profile from './Pages/UserProfile/Profile';
import ForgotPassword from './Pages/ForgotPassword';
// Test
import TestHelpdesk from './Test/TestHelpdesk';
import TestNotification from './Test/TestNotification';
import TestToast from './Test/TestToast';

// const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:4000');

function App() {
  return (
    <Routes>
        <Route element={<Base />} >
          <Route path="/" element={<Default/>} />
          <Route path="/forgotpassword" element={<ForgotPassword/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/chat" element={<Chat/>} />
          <Route path="/profile" element={<Profile/>} />
        </Route>
        <Route path="/test/helpdesk" element={<TestHelpdesk/>} />
        <Route path="/test/toast" element={<TestToast/>} />
        {/* <Route path="/test/notification" element={<TestNotification socket={socket}/>} /> */}

    </Routes>
  );
}

export default App;