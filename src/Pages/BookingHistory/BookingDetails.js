import { Close } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { useContext } from "react";
import WindowsWidthContext from "../../Contexts/WindowsWidthContext";

function BookingDetails({ closeDialog }) {
  const winWidth = useContext(WindowsWidthContext);
  const amenities = [
    "WiFi",
    "Indoor games",
    "Breakfast",
    "Swimming Pool",
    "Basketball court",
  ];
  return (
    <Box
      width={winWidth < 500 ? "300px" : "500px"}
      margin={8}
      display="flex"
      flexDirection="column"
      alignItems="flex-start"
    >
      <IconButton
        sx={{ position: "absolute", top: 1, right: 1 }}
        onClick={closeDialog}
      >
        <Close />
      </IconButton>
      <Box display="flex" justifyContext="space-between">
        <Typography variant="h5" color="primary">
          Reservation Number :
        </Typography>
        <Typography variant="h5"> TBHRN5678 </Typography>
      </Box>
      <Box display="flex" justifyContext="space-between">
        <Typography variant="h6" color="primary">
          Room No. :
        </Typography>
        <Typography variant="h6"> {201} </Typography>
      </Box>
      <Box display="flex" justifyContext="space-between">
        <Typography variant="h6" color="primary">
          Room Type :
        </Typography>
        <Typography variant="h6"> Deluxe </Typography>
      </Box>
      <Box display="flex" justifyContext="space-between">
        <Typography variant="h6" color="primary">
          Cost Per Day :
        </Typography>
        <Typography variant="h6"> $9.99 </Typography>
      </Box>
      <Box display="flex" justifyContext="space-between">
        <Typography variant="h6" color="primary">
          Arrival Date :
        </Typography>
        <Typography variant="h6"> 17-10-2022 </Typography>
      </Box>
      <Box display="flex" justifyContext="space-between">
        <Typography variant="h6" color="primary">
          Duration :
        </Typography>
        <Typography variant="h6"> 2 Days </Typography>
      </Box>
      <Box display="flex" justifyContext="space-between">
        <Typography variant="h6" color="primary">
          Additional Charges :
        </Typography>
        <Typography variant="h6"> $8.89 </Typography>
      </Box>
      <Divider />
      <Box display="flex" justifyContext="space-between">
        <Typography variant="h6" color="primary">
          Sub Total :
        </Typography>
        <Typography variant="h6"> $18.98 </Typography>
      </Box>
      <Divider />
      <Box display="flex" justifyContext="space-between">
        <Typography variant="h6" color="primary">
          Grand Total :
        </Typography>
        <Typography variant="h6"> $27.87 </Typography>
      </Box>
      <Divider />
    </Box>
  );
}

export default BookingDetails;
