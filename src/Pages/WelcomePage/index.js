import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import welcomeImage from "../../assets/images/welcome.jpg";

function WelcomePage() {
  const navigate = useNavigate();
  const handleLogin = () => navigate("/login");
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        height: "85vh",
      }}
    >
      <img
        style={{
          maxHeight: "85%",
          minWidth: "70%",
          maxWidth: "90%",
        }}
        src={welcomeImage}
      />
      <Typography
        variant="caption"
        color="secondary"
        onClick={handleLogin}
        sx={{ cursor: "pointer" }}
      >
        Please Login To Continue...
      </Typography>
    </Box>
  );
}

export default WelcomePage;
