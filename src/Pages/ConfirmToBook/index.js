import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addBooking } from "../../axios/BookingAPIs";
import { addPaymentDetails } from "../../axios/PaymentsAPIs";
import ErrorSnackBar from "../../Components/ErrorSnackBar";
import SuccessSnackBar from "../../Components/SuccessSnackBar";
import RoomToBookContext from "../../Contexts/RoomToBookContext";
import WindowsWidthContext from "../../Contexts/WindowsWidthContext";

function ConfirmToBook() {
  const winWidth = useContext(WindowsWidthContext);
  const navigate = useNavigate();
  const [roomBookContext, setRoomToBookContext] = useContext(RoomToBookContext);
  const [arrivalDate, setArrivalDate] = useState();
  const [departureDate, setDepartureDate] = useState();

  const [openSuccessBar, setOpenSuccessBar] = useState(false);
  const [openErrorBar, setOpenErrorBar] = useState(false);
  const handleSuccessBarClose = () => {
    setRoomToBookContext();
    setOpenSuccessBar(false);
    navigate("/rooms");
  };
  const handleErrorBarClose = () => {
    setOpenErrorBar(false);
  };

  const handleBooking = () => {
    let data = roomBookContext;
    delete data.roomType;
    delete data.departureDate;
    delete data.costPerDay;
    addBooking(data)
      .then((res) => {
        setOpenSuccessBar(true);
      })
      .catch((err) => setOpenErrorBar(true));
  };

  useEffect(() => {
    if (!roomBookContext) navigate("/rooms");
    else {
      console.log(roomBookContext);
      let arrdate = new Date(roomBookContext.StartDate);
      const datestring =
        arrdate.getDate() +
        "-" +
        (arrdate.getMonth() + 1) +
        "-" +
        arrdate.getFullYear() +
        " 12:00 PM";
      setArrivalDate(datestring);
      let depdate = new Date(roomBookContext.departureDate);
      const datestringdep =
        depdate.getDate() +
        "-" +
        (depdate.getMonth() + 1) +
        "-" +
        depdate.getFullYear() +
        " 11:00 AM";
      setDepartureDate(datestringdep);
    }
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h3" marginY={4} color="primary">
        Booking Details
      </Typography>
      {roomBookContext ? (
        <Box
          width={winWidth < 500 ? "300px" : "500px"}
          marginY={4}
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
        >
          <Grid container spacing={3}>
            <Grid item xs={6} md={5}>
              <Typography variant="h6" color="primary">
                Room Type :
              </Typography>
            </Grid>
            <Grid item xs={6} lg={6}>
              <Typography variant="h6"> {roomBookContext.roomType} </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ width: "100%" }} />
          <Grid container spacing={3}>
            <Grid item xs={6} md={5}>
              <Typography variant="h6" color="primary">
                Cost Per Day :
              </Typography>
            </Grid>
            <Grid item xs={6} lg={6}>
              <Typography variant="h6">
                {" "}
                {roomBookContext.costPerDay}{" "}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ width: "100%" }} />
          <Grid container spacing={3}>
            <Grid item xs={6} md={5}>
              <Typography variant="h6" color="primary">
                Arrival Date :
              </Typography>
            </Grid>
            <Grid item xs={6} lg={6}>
              <Typography variant="h6"> {arrivalDate} </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ width: "100%" }} />
          <Grid container spacing={3}>
            <Grid item xs={6} md={5}>
              <Typography variant="h6" color="primary">
                Departure Date :
              </Typography>
            </Grid>
            <Grid item xs={6} lg={6}>
              <Typography variant="h6"> {departureDate} </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ width: "100%" }} />
          <Grid container spacing={3}>
            <Grid item xs={6} md={5}>
              <Typography variant="h6" color="primary">
                Duration :
              </Typography>
            </Grid>
            <Grid item xs={6} lg={6}>
              <Typography variant="h6">
                {roomBookContext.Duration}{" "}
                {roomBookContext.Duration == 1 ? "Day" : "Days"}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ width: "100%" }} />
          <Grid container spacing={3}>
            <Grid item xs={6} md={5}>
              <Typography variant="h6" color="primary">
                No Of Rooms :
              </Typography>
            </Grid>
            <Grid item xs={6} lg={6}>
              <Typography variant="h6">
                {roomBookContext.NumberOfRooms}{" "}
                {roomBookContext.NumberOfRooms == 1 ? "Room" : "Rooms"}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ width: "100%" }} />
          <Grid container spacing={3}>
            <Grid item xs={6} md={5}>
              <Typography variant="h6" color="primary">
                Additional Charges :
              </Typography>
            </Grid>
            <Grid item xs={6} lg={6}>
              <Typography variant="h6">
                {" "}
                $
                {roomBookContext.AdditionalCharges
                  ? roomBookContext.AdditionalCharges
                  : 0}{" "}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ width: "100%" }} />
          <Grid container spacing={3}>
            <Grid item xs={6} md={5}>
              <Typography variant="h6" color="primary">
                Sub Total :
              </Typography>
            </Grid>
            <Grid item xs={6} lg={6}>
              <Typography variant="h6">
                $
                {roomBookContext.SubTotal
                  ? roomBookContext.SubTotal
                  : roomBookContext.TotalAmount}{" "}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ width: "100%" }} />
          <Grid container spacing={3}>
            <Grid item xs={6} md={5}>
              <Typography variant="h6" color="primary">
                Grand Total :
              </Typography>
            </Grid>
            <Grid item xs={6} lg={6}>
              <Typography variant="h6">
                ${roomBookContext.TotalAmount}
              </Typography>
            </Grid>
          </Grid>
          <Divider sx={{ width: "100%" }} />
        </Box>
      ) : null}
      <Button marginY={4} variant="contained" onClick={handleBooking}>
        Confirm Booking
      </Button>
      <SuccessSnackBar
        open={openSuccessBar}
        close={handleSuccessBarClose}
        msg="Booking Successful!"
      />
      <ErrorSnackBar
        open={openErrorBar}
        close={handleErrorBarClose}
        msg="Couldn't book the rooms at the moment."
        caption="Please try again later."
      />
    </Box>
  );
}

export default ConfirmToBook;
