import { Route } from "react-router-dom";
import AllRoomsPage from "../../Pages/AllRoomsPage";
import LoginPage from "../../Pages/LoginPage";
import SignUpPage from "../../Pages/SignupPage";
import WelcomePage from "../../Pages/WelcomePage";

const AllRoutes = [
  <Route path="/" exact element={<WelcomePage />} />,
  <Route path="/login" exact element={<LoginPage />} />,
  <Route path="/signup" exact element={<SignUpPage />} />,
  <Route path="/rooms" exact element={<AllRoomsPage />} />,
];

export default AllRoutes;
