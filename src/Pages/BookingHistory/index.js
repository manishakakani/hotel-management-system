import { Box, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import UserContext from "../../Contexts/UserContext";
import { getBookingsByCustomer } from "../../axios/BookingAPIs";
import BookingInfo from "./BookingInfo";

function BookingHistory() {
  const [userContext, setUserContext] = useContext(UserContext);
  const [bookingHistory, setBookingHistory] = useState([]);

  useEffect(() => {
    getBookingsByCustomer(userContext.UniqueNumber).then((res) =>
      setBookingHistory(res.data)
    );
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h3" color="primary" marginY={4}>
        History
      </Typography>
      <Grid container spacing={4} justifyContent="space-evenly">
        {bookingHistory.map((val) => {
          return (
            <Grid item display="flex" justifyContent="center">
              <BookingInfo bookingDetails={val} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default BookingHistory;
