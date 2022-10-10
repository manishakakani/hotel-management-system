import { AppBar, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleToHome = () => navigate("/");
  const handleLogin = () => navigate("/login");
  return (
    <AppBar
      sx={{
        width: "100%",
        backgroundColor: "primary",
        height: "10%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingX: "1rem",
      }}
    >
      <Typography
        variant="h5"
        color={"tertiary"}
        onClick={handleToHome}
        sx={{ cursor: "pointer" }}
      >
        Hotel Management System
      </Typography>
      <Typography
        component={Button}
        sx={{ color: "#F5F5F5" }}
        onClick={handleLogin}
      >
        Login
      </Typography>
    </AppBar>
  );
}

export default Navbar;
