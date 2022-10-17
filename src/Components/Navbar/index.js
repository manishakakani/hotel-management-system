import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import WindowsWidthContext from "../../Contexts/WindowsWidthContext";

function Navbar() {
  const winWidth = useContext(WindowsWidthContext);
  const navigate = useNavigate();
  const handleToHome = () => navigate("/");
  const handleLogin = () => navigate("/login");
  return (
    <nav
      style={{
        width: "100%",
        "background-color": "#e86537",
        height: "64px",
        display: "flex",
        "flex-direction": "row",
        "align-items": "center",
        "justify-content": "space-between",
      }}
    >
      <Typography
        variant="h5"
        color={"#fff"}
        onClick={handleToHome}
        sx={{ cursor: "pointer", paddingX: "0.2rem" }}
        marginLeft={winWidth < 500 ? 2 : 8}
      >
        Hotel Management System
      </Typography>
      <Typography
        component={Button}
        variant="button"
        sx={{ color: "#F5F5F5" }}
        onClick={handleLogin}
        paddingRight={4}
      >
        Login
      </Typography>
    </nav>
  );
}

export default Navbar;
