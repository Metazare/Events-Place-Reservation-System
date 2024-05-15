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
import UpdateEventsPlace from './Pages/EventsPlace/UpdateEventsPlace';
import HostRegister from './Pages/Register/HostRegister';
import Invoice from './Pages/EventsPlace/Invoice';
import HelpDesk from './Pages/HelpDesk';
import BecomeHost from './Pages/BecomeHost';
import DeleteEventsPlace from './Pages/EventsPlace/DeleteEventsPlace';
import AdminBase from './Layouts/Base/AdminBase';

// Admin
import Renters from './Pages/Admin/Renters';
import Hosts from './Pages/Admin/Hosts';
import EventsPlace from './Pages/Admin/EventsPlace';
import ReservationLogs from './Pages/Admin/ReservationLogs';
import Report from './Pages/Admin/Report';

// Hooks
import { ProtectedRoute } from './Hooks/useAuth';

function App() {
  return (
    <Routes>
        <Route element={<Base />} >
          <Route path="/" element={<Default/>} />

          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/forgetpassword" element={<ForgetPassword/>} />
          <Route path="/resetpassword/:hash" element={<ResetPassword/>} />

          <Route path="/profile" element={<Profile/>} />
          <Route path="/profile/:userId" element={<Profile/>} />

          <Route path="/host" element={<BecomeHost/>} />
          <Route path="/host/register" element={<HostRegister/>} />

          <Route path="/create" element={<CreateEventsPlace/>} />
          <Route path="/update" element={<UpdateEventsPlace/>} />
          <Route path="/delete" element={<DeleteEventsPlace/>} />
          <Route path="/view/:id" element={<ViewEventsPlace/>} />
          
          <Route path="/listing" element={<MyListings/>} />
          <Route path="/invoice" element={<Invoice/>} />
          <Route path="/helpdesk" element={<HelpDesk/>} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={["admin"]}/>}>
          <Route element={<AdminBase />} >
            <Route path="/admin/renters" element={<Renters/>} />
            <Route path="/admin/hosts" element={<Hosts/>} />
            <Route path="/admin/eventsplace" element={<EventsPlace/>} />
            <Route path="/admin/reservationlogs" element={<ReservationLogs/>} />
            <Route path="/admin/report" element={<Report/>} />
          </Route>
        </Route>
    </Routes>
  );
}

export default App;