import { Box, Button, Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";
import WinWidthContext from "../../Contexts/WindowsWidthContext";

function Profile() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const winWidth = useContext(WinWidthContext);
  const [user, setUser] = useContext(UserContext);

  const handleChangePassword = () => {
    let prefix = "";
    if (user.Role == "Admin") prefix = "/admin";
    else if (user.Role == "Staff") prefix = "/staff";
    navigate(prefix + "/changepassword");
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" my={4}>
      <Typography variant="h3" color="primary">
        {user.Name}
      </Typography>
      <Typography variant="h6" color="secondary">
        ({user.Role})
      </Typography>
      <Grid
        container
        spacing={2}
        alignItems="center"
        my={2}
        maxWidth={winWidth > 700 ? 500 : 320}
      >
        <Grid item xs={6}>
          <Typography variant="h6" fontWeight={600}>
            Email ID:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">{user.EmailID}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" fontWeight={600}>
            Phone Number:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">{user.PhoneNumber}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" fontWeight={600}>
            Address:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">{user.Address}</Typography>
        </Grid>
        {user?.SSN && user.SSN != "" ? (
          <>
            <Grid item xs={6}>
              <Typography variant="h6" fontWeight={600}>
                SSN:
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="h6">{user.SSN}</Typography>
            </Grid>
          </>
        ) : null}
      </Grid>
      <Typography
        variant="body1"
        fontWeight={550}
        m={3}
        component={Button}
        onClick={handleChangePassword}
      >
        Change Password
      </Typography>
    </Box>
  );
}

export default Profile;
