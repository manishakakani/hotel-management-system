import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import {
  InitialRoutes,
  CustomerRoutes,
  AdminRoutes,
  StaffRoutes,
} from "./assets/routes";
import Navbar from "./Components/Navbar";
import RoomToBookContext from "./Contexts/RoomToBookContext";
import UserContext from "./Contexts/UserContext";
import WindowsWidthContext from "./Contexts/WindowsWidthContext";

function App() {
  const [winWidth, setWinWidth] = useState(window.innerWidth);
  const [roomBookContext, setRoomToBookContext] = useState();
  const [userContext, setUserContext] = useState();

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

  useEffect(() => {
    const userinfo = localStorage.getItem("userinfo");
    if (userinfo) {
      setUserContext(JSON.parse(userinfo));
    }
  }, []);

  return (
    <Router>
      <WindowsWidthContext.Provider value={winWidth}>
        <UserContext.Provider value={[userContext, setUserContext]}>
          <RoomToBookContext.Provider
            value={[roomBookContext, setRoomToBookContext]}
          >
            <Navbar />
            <Routes>
              {userContext && userContext.Role == "Customer"
                ? CustomerRoutes.map((route) => route)
                : null}
              {userContext && userContext.Role == "Admin"
                ? AdminRoutes.map((route) => route)
                : null}
              {userContext && userContext.Role == "Staff"
                ? StaffRoutes.map((route) => route)
                : null}
              {!userContext ? InitialRoutes.map((route) => route) : null}
            </Routes>
          </RoomToBookContext.Provider>
        </UserContext.Provider>
      </WindowsWidthContext.Provider>
    </Router>
  );
}

export default App;
