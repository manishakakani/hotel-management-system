import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomToBookContext from "../../Contexts/RoomToBookContext";
import WindowsWidthContext from "../../Contexts/WindowsWidthContext";

function ConfirmToBook() {
  const winWidth = useContext(WindowsWidthContext);
  const navigate = useNavigate();
  const [roomBookContext, setRoomToBookContext] = useContext(RoomToBookContext);
  const [arrivalDate, setArrivalDate] = useState();

  useEffect(() => {
    if (!roomBookContext) navigate("/rooms");
    else {
      let arrdate = new Date(roomBookContext.arrivalDate);
      const datestring =
        arrdate.getDate() +
        "-" +
        (arrdate.getMonth() + 1) +
        "-" +
        arrdate.getFullYear();
      setArrivalDate(datestring);
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
                Duration :
              </Typography>
            </Grid>
            <Grid item xs={6} lg={6}>
              <Typography variant="h6">
                {roomBookContext.duration} Days
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
                {roomBookContext.noOfRooms} Rooms
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
                {roomBookContext.additionalCharges
                  ? roomBookContext.additionalCharges
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
                {roomBookContext.subCost
                  ? roomBookContext.subCost
                  : roomBookContext.TotalCost}{" "}
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
              <Typography variant="h6">${roomBookContext.TotalCost}</Typography>
            </Grid>
          </Grid>
          <Divider sx={{ width: "100%" }} />
        </Box>
      ) : null}
      <Button marginY={4} variant="contained">
        Confirm Booking
      </Button>
    </Box>
  );
}

export default ConfirmToBook;
