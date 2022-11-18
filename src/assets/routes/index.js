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

const AllRoutes = [
  <Route path="/" exact element={<WelcomePage />} />,

  // Customer Routes

  // allrooms => room => confirm => history
  <Route path="/login" exact element={<LoginPage />} />,
  <Route path="/signup" exact element={<SignUpPage />} />,
  <Route path="/rooms" exact element={<AllRoomsPage />} />,
  <Route path="/room/:type" exact element={<RoomDetails />} />,
  <Route path="/room/:type/confirm" exact element={<ConfirmToBook />} />,
  <Route path="/history" exact element={<BookingHistory />} />,

  // Admin Routes

  <Route path="/admin/hotel" exact element={<Hotel />} />,
  <Route path="/admin/rooms" exact element={<Rooms />} />,
  <Route path="/admin/staff" exact element={<Staff />} />,
  <Route path="/admin/changePassword" exact element={<ChangePassword />} />,
  <Route path="/admin/bookings" exact element={<ListBookings />} />,

  // Staff Routes
  <Route path="/staff/changePassword" exact element={<ChangePassword />} />,
  <Route path="/staff/bookings" exact element={<ListBookings />} />,
];

export default AllRoutes;
