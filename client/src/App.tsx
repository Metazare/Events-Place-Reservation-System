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
import ResetPassword from './Pages/ResetPassword';
import ForgetPassword from './Pages/ForgetPassword';
import ViewEventsPlace from './Pages/EventsPlace/ViewEventsPlace';
import MyListings from './Pages/EventsPlace/MyListings';
import CreateEventsPlace from './Pages/EventsPlace/CreateEventsPlace';
import UpdateEventsPlace from './Pages/EventsPlace/UpdateEventsPlace';
import HostRegister from './Pages/Register/HostRegister';
import Invoice from './Pages/EventsPlace/Invoice';
import HelpDesk from './Pages/HelpDesk';
import BecomeHost from './Pages/BecomeHost';
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
          <Route path="/forgetpassword" element={<ForgetPassword/>} />
          <Route path="/resetpassword/:hash" element={<ResetPassword/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/chat" element={<Chat/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/create" element={<CreateEventsPlace/>} />
          <Route path="/update" element={<UpdateEventsPlace/>} />
          <Route path="/profile/:userId" element={<Profile/>} />
          <Route path="/view" element={<ViewEventsPlace/>} />
          <Route path="/listing" element={<MyListings/>} />
          <Route path="/becomehost/register" element={<HostRegister/>} />
          <Route path="/invoice" element={<Invoice/>} />
          <Route path="/helpdesk" element={<HelpDesk/>} />
          <Route path="/becomehost" element={<BecomeHost/>} />
        </Route>
        <Route path="/test/helpdesk" element={<TestHelpdesk/>} />
        <Route path="/test/toast" element={<TestToast/>} />

    </Routes>
  );
}

export default App;