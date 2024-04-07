import React from 'react';
import { Route, Routes } from 'react-router-dom';
import io from 'socket.io-client';

// Layouts
import Base from './Layouts/Base/Base';

// Pages
import Default from './Pages/LandingPage/Default';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';

// Test
import TestHelpdesk from './Test/TestHelpdesk';
import TestNotification from './Test/TestNotification';

// Hooks
import { ProtectedRoute } from './Hooks/useAuth';


const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');

function App() {
  return (
    <Routes>
        <Route element={<Base />} >
            <Route path="/" element={<Default/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
        </Route>

        <Route path="/test/helpdesk" element={<TestHelpdesk/>} />
        <Route path="/test/notification" element={<TestNotification socket={socket}/>} />

        {/* Sample usage of Protected Route */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]}/>}>
          <Route path="/private" element={<Default/>} />
        </Route>

    </Routes>
  );
}

export default App;