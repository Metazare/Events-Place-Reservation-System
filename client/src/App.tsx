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
import TransactionLogs from './Pages/Admin/TransactionLogs';
import HelpDeskAdmin from './Pages/Admin/HelpDesk';

// Hooks
import { ProtectedRoute } from './Hooks/useAuth';

// Test
import TestHelpdesk from './Test/TestHelpdesk';
import TestNotification from './Test/TestNotification';
import TestToast from './Test/TestToast';
import TestReservation from './Test/TestReservation';

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

          <Route path="/eventsplace/create" element={<CreateEventsPlace/>} />
          <Route path="/eventsplace/update/:id" element={<UpdateEventsPlace/>} />
          <Route path="/eventsplace/delete" element={<DeleteEventsPlace/>} />
          <Route path="/eventsplace/view/:id" element={<ViewEventsPlace/>} />

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
            <Route path="/admin/transactions" element={<TransactionLogs/>} />
            <Route path="/admin/helpdesk" element={<HelpDeskAdmin/>} />
          </Route>
        </Route>

        <Route path="/test/reservation" element={<TestReservation/>} />
    </Routes>
  );
}

export default App;