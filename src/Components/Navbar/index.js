import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Navbar() {
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
        paddingLeft={6}
      >
        Hotel Management System
      </Typography>
      <Typography
        component={Button}
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
