import { Route } from "react-router-dom";
import Hotel from "../../AdminPages/Hotel";
import Rooms from "../../AdminPages/Rooms";
import Staff from "../../AdminPages/Staff";
import AllRoomsPage from "../../Pages/AllRoomsPage";
import BookingHistory from "../../Pages/BookingHistory";
import ConfirmToBook from "../../Pages/ConfirmToBook";
import LoginPage from "../../Pages/LoginPage";
import RoomDetails from "../../Pages/RoomDetails";
import SignUpPage from "../../Pages/SignupPage";
import WelcomePage from "../../Pages/WelcomePage";
import ChangePassword from "../../SharedPages/ChangePassword";
import ListBookings from "../../SharedPages/ListBookings";
import Profile from "../../SharedPages/Profile";
import ServiceRequested from "../../StaffPages/ServiceRequested";

export const InitialRoutes = [
  <Route path="/" exact element={<WelcomePage />} />,
  <Route path="/login" exact element={<LoginPage />} />,
  <Route path="/signup" exact element={<SignUpPage />} />,
];

export const CustomerRoutes = [
  <Route path="/rooms" exact element={<AllRoomsPage />} />,
  <Route path="/room/:type" exact element={<RoomDetails />} />,
  <Route path="/room/:type/confirm" exact element={<ConfirmToBook />} />,
  <Route path="/history" exact element={<BookingHistory />} />,
  <Route path="/profile" exact element={<Profile />} />,
  // <Route path="/changePassword" exact element={<ChangePassword />} />,
];

export const AdminRoutes = [
  // <Route path="/admin/hotel" exact element={<Hotel />} />,
  <Route path="/admin/rooms" exact element={<Rooms />} />,
  <Route path="/admin/staff" exact element={<Staff />} />,
  // <Route path="/admin/changePassword" exact element={<ChangePassword />} />,
  <Route path="/admin/bookings" exact element={<ListBookings />} />,
  <Route path="/admin/profile" exact element={<Profile />} />,
];

export const StaffRoutes = [
  // <Route path="/staff/changePassword" exact element={<ChangePassword />} />,
  <Route path="/staff/bookings" exact element={<ListBookings />} />,
  <Route path="/staff/profile" exact element={<Profile />} />,
  <Route path="/staff/serviceRequested" exact element={<ServiceRequested />} />,
];
