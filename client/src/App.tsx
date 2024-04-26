import { Route, Routes } from 'react-router-dom';

// Layouts
import Base from './Layouts/Base/Base';

// Pages
import Default from './Pages/LandingPage/LandingPage';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Profile from './Pages/UserProfile/Profile';
import ResetPassword from './Pages/ResetPassword';
import ForgetPassword from './Pages/ForgetPassword';
import ViewEventsPlace from './Pages/EventsPlace/ViewEventsPlace';
import MyListings from './Pages/EventsPlace/MyListings';
import CreateEventsPlace from './Pages/EventsPlace/CreateEventsPlace';

// Hooks
import { ProtectedRoute } from './Hooks/useAuth';

// Test
import TestChat from './Test/TestChat';

function App() {
  return (
    <Routes>
        <Route element={<Base />} >
          <Route path="/" element={<Default/>} />
          
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/forgetpassword" element={<ForgetPassword/>} />
          <Route path="/resetpassword/:hash" element={<ResetPassword/>} />

          <Route path="/view/:id" element={<ViewEventsPlace/>} />
          <Route path="/profile/:userId" element={<Profile/>} />

          <Route element={<ProtectedRoute allowedRoles={["admin"]}/>}>
            <Route path="/create" element={<CreateEventsPlace/>} />
            <Route path="/listing" element={<MyListings/>} />
            <Route path="/profile" element={<Profile/>} />
          </Route>
        </Route>

        <Route path="/testchat" element={<TestChat/>} />
    </Routes>
  );
}

export default App;