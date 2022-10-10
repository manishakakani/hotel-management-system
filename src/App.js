import { BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AllRoutes from "./assets/routes";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>{AllRoutes.map((route) => route)}</Routes>
    </Router>
  );
}

export default App;
