import { Route } from "react-router-dom";
import Amenities from "../../AdminPages/Amenities";
import Hotel from "../../AdminPages/Hotel";
import Rooms from "../../AdminPages/Rooms";
import AdditionalAmenities from "../../Pages/AdditionalAmenities";
import AllRoomsPage from "../../Pages/AllRoomsPage";
import BookingHistory from "../../Pages/BookingHistory";
import ConfirmToBook from "../../Pages/ConfirmToBook";
import LoginPage from "../../Pages/LoginPage";
import RoomDetails from "../../Pages/RoomDetails";
import SignUpPage from "../../Pages/SignupPage";
import WelcomePage from "../../Pages/WelcomePage";

const AllRoutes = [
  <Route path="/" exact element={<WelcomePage />} />,

  // Customer Routes
  <Route path="/login" exact element={<LoginPage />} />,
  <Route path="/signup" exact element={<SignUpPage />} />,
  <Route path="/rooms" exact element={<AllRoomsPage />} />,
  <Route path="/room/:number" exact element={<RoomDetails />} />,
  <Route
    path="/room/:number/additional_amenities"
    exact
    element={<AdditionalAmenities />}
  />,
  <Route path="/room/:number/confirm" exact element={<ConfirmToBook />} />,
  <Route path="/history" exact element={<BookingHistory />} />,

  // Admin Routes

  <Route path="/admin/amenities" exact element={<Amenities />} />,
  <Route path="/admin/hotel" exact element={<Hotel />} />,
  <Route path="/admin/rooms" exact element={<Rooms />} />,
];

export default AllRoutes;
