import { Route } from "react-router-dom";
import AdditionalAmenities from "../../Pages/AdditionalAmenities";
import AllRoomsPage from "../../Pages/AllRoomsPage";
import ConfirmToBook from "../../Pages/ConfirmToBook";
import LoginPage from "../../Pages/LoginPage";
import RoomDetails from "../../Pages/RoomDetails";
import SignUpPage from "../../Pages/SignupPage";
import WelcomePage from "../../Pages/WelcomePage";

const AllRoutes = [
  <Route path="/" exact element={<WelcomePage />} />,
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
];

export default AllRoutes;
