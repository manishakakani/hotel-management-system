import { Box, Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const handleChangePassword = () => navigate("/admin/changepassword");
  return (
    <Box display="flex" flexDirection="column" alignItems="center" my={4}>
      <Typography variant="h3" color="primary">
        Srutha Keerthi
      </Typography>
      <Typography variant="h6" color="secondary">
        (Admin)
      </Typography>
      <Grid container spacing={2} alignItems="center" my={2} maxWidth={400}>
        <Grid item xs={6}>
          <Typography variant="h6" fontWeight={600}>
            Email ID:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">srutha@gmail.com</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" fontWeight={600}>
            Phone Number:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">9876784534</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" fontWeight={600}>
            Address:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">
            2-3/45, Road no 3, Bharat Nagar, Hyderabad - 500056
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" fontWeight={600}>
            SSN:
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">425-11-2428</Typography>
        </Grid>
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
