import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import AllRoutes from "./assets/routes";
import Navbar from "./Components/Navbar";
import RoomToBookContext from "./Contexts/RoomToBookContext";
import WindowsWidthContext from "./Contexts/WindowsWidthContext";

function App() {
  const [winWidth, setWinWidth] = useState(window.innerWidth);
  const [roomBookContext, setRoomToBookContext] = useState();

  useEffect(() => {
    const handleResize = () => {
      setWinWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  return (
    <Router>
      <Navbar />
      <WindowsWidthContext.Provider value={winWidth}>
        <RoomToBookContext.Provider
          value={[roomBookContext, setRoomToBookContext]}
        >
          <Routes>{AllRoutes.map((route) => route)}</Routes>
        </RoomToBookContext.Provider>
      </WindowsWidthContext.Provider>
    </Router>
  );
}

export default App;
