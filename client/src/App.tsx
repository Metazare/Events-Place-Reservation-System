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
import Chat from './Chat/Chat';
// Admin
import Renters from './Pages/Admin/Renters';
import Hosts from './Pages/Admin/Hosts';
import EventsPlace from './Pages/Admin/EventsPlace';
import ReservationLogs from './Pages/Admin/ReservationLogs';
import TransactionLogs from './Pages/Admin/TransactionLogs';
import HelpDeskAdmin from './Pages/Admin/HelpDesk';

// Hooks
import { ProtectedRoute, PublicRoute } from './Hooks/useAuth';

function App() {
  return (
    <Routes>
        <Route element={<Base />} >

          {/* Public routes accessible by anyone */}
          <Route path="/" element={<Default/>} />
          <Route path="/eventsplace/view/:id" element={<ViewEventsPlace/>} />
          <Route path="/profile/:userId" element={<Profile/>} />
          <Route path="/host" element={<BecomeHost/>} />

          {/* Public routes accessible only by non-logged in users */}
          <Route element={<PublicRoute/>}>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/forgetpassword" element={<ForgetPassword/>} />
            <Route path="/resetpassword/:hash" element={<ResetPassword/>} />
          </Route>

          {/* Protected routes accessible only by Renters */}
          <Route element={<ProtectedRoute allowedRoles={["Renter"]}/>}>
            <Route path="/host/register" element={<HostRegister/>} />
          </Route>

          {/* Protected routes accessible only by Hosts */}
          <Route element={<ProtectedRoute allowedRoles={["Host"]}/>}>
            <Route path="/eventsplace/create" element={<CreateEventsPlace/>} />
            <Route path="/eventsplace/update/:id" element={<UpdateEventsPlace/>} />
            <Route path="/eventsplace/delete" element={<DeleteEventsPlace/>} />
          </Route>
          
          {/* Protected routes accessible by both Renters and Hosts */}
          <Route element={<ProtectedRoute allowedRoles={["Renter", "Host"]}/>}>
            <Route path="/profile" element={<Profile/>} />
            <Route path="/listing" element={<MyListings/>} />
            <Route path="/invoice/:id" element={<Invoice/>} />
            <Route path="/helpdesk" element={<HelpDesk/>} />
            <Route path="/chat" element={<Chat/>} />
            <Route path="/chat/:id" element={<Chat/>} />
          </Route>
        </Route>

        {/* Protected routes accessible only by Admin */}
        <Route element={<ProtectedRoute allowedRoles={["Admin"]}/>}>
          <Route element={<AdminBase />} >
            <Route path="/admin/renters" element={<Renters/>} />
            <Route path="/admin/hosts" element={<Hosts/>} />
            <Route path="/admin/eventsplace" element={<EventsPlace/>} />
            <Route path="/admin/reservationlogs" element={<ReservationLogs/>} />
            <Route path="/admin/transactions" element={<TransactionLogs/>} />
            <Route path="/admin/helpdesk" element={<HelpDeskAdmin/>} />
          </Route>
        </Route>
    </Routes>
  );
}

export default App;