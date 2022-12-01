import { Close } from "@mui/icons-material";
import { Box, Grid, Divider, IconButton, Typography } from "@mui/material";
import { useContext } from "react";
import WindowsWidthContext from "../../Contexts/WindowsWidthContext";

function BookingDetails({ details, roomNumbers, roomType, closeDialog }) {
  const winWidth = useContext(WindowsWidthContext);
  const getDate = (date) => {
    const tempDate = new Date(date);
    return (
      tempDate.getFullYear() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getDate()
    );
  };

  return (
    <Box
      width={winWidth < 500 ? "300px" : "500px"}
      margin={4}
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
      <Box display="flex" justifyContent="center" my={2}>
        <Typography variant="h4" color="primary">
          Booking Details
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Typography variant="h5" color="primary">
            Booking ID :
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h5"> {details.BookingID} </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" color="primary">
            Room No. :
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6">
            {" "}
            {roomNumbers.map((rmnum, idx) => {
              return rmnum + (idx !== roomNumbers.length - 1 ? ", " : ".");
            })}{" "}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" color="primary">
            Room Type :
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6"> {roomType} </Typography>
        </Grid>
        {/* <Grid display="flex" justifyContext="space-between">
        <Typography variant="h6" color="primary">
          Cost Per Day :
        </Typography>
        <Typography variant="h6"> $9.99 </Typography>
      </Grid> */}
        <Grid item xs={6}>
          <Typography variant="h6" color="primary">
            Arrival Date :
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6"> {getDate(details.StartDate)} </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" color="primary">
            Duration :
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6"> {details.Duration} Day(s) </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6" color="primary">
            Additional Charges :
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6"> ${details.AdditionalCharges} </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h6" color="primary">
            Sub Total :
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6"> ${details.SubTotal} </Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="h6" color="primary">
            Grand Total :
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="h6"> ${details.TotalAmount} </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default BookingDetails;
