import { useContext, useEffect, useState } from "react";
import { Box, Button, Grid, Input, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import RoomToBookContext from "../../Contexts/RoomToBookContext";
import { useNavigate } from "react-router-dom";
import { roomsAvailableOnAGivenDate } from "../../axios/BookingAPIs";
import UserContext from "../../Contexts/UserContext";

function CheckAvailability({ roomDetails }) {
  const millisecondsPerDay = 24 * 60 * 60 * 1000;
  const navigate = useNavigate();
  const [roomBookContext, setRoomToBookContext] = useContext(RoomToBookContext);
  const [userContext, setUserContext] = useContext(UserContext);
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [leaveDate, setLeaveDate] = useState(new Date());
  const [stayDuration, setStayDuration] = useState(0);
  const [isAvailable, setIsAvaialble] = useState(false);
  const [noOfRooms, setNoOfRooms] = useState(1);
  const [roomsAvailableForDays, setRoomsAvailabeForDays] = useState({});
  const [shouldProceed, setShouldProceed] = useState(false);

  useEffect(() => {
    if (noOfRooms > 0) {
      if (
        parseInt(noOfRooms) <= Math.min(...Object.values(roomsAvailableForDays))
      )
        setShouldProceed(true);
      else setShouldProceed(false);
    } else setShouldProceed(false);
  }, [noOfRooms, roomsAvailableForDays]);

  useEffect(() => console.log(roomsAvailableForDays), [roomsAvailableForDays]);

  const handleCheckAvailablity = () => {
    if (arrivalDate && leaveDate) {
      var start = new Date(arrivalDate);
      var end = new Date(leaveDate);
      while (start < end && start.getDate() !== end.getDate()) {
        start.setUTCHours(0, 0, 0, 0);
        roomsAvailableOnAGivenDate(
          roomDetails.RoomTypeID,
          new Date(start).toISOString()
        ).then((res) => {
          const data = res.data;
          setRoomsAvailabeForDays((oldValue) => {
            return { ...oldValue, ...data };
          });
        });
        var newDate = start.setDate(start.getDate() + 1);
        start = new Date(newDate);
      }
      setIsAvaialble(true);
    }
  };

  const getDisplayabaleDate = (key) => {
    const date = new Date(key);
    return date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
  };

  const handleArrivalDateChange = (newValue) => {
    setArrivalDate(new Date(newValue));
    setRoomsAvailabeForDays({});
    setIsAvaialble(false);
  };

  const handleLeaveDate = (newValue) => {
    setLeaveDate(new Date(newValue));
    setRoomsAvailabeForDays({});
    setIsAvaialble(false);
  };

  useEffect(() => {
    setStayDuration((oldduration) => {
      return parseInt(
        Math.round(
          (leaveDate.getTime() - arrivalDate.getTime()) / millisecondsPerDay
        ).toFixed(0)
      );
    });
  }, [arrivalDate, leaveDate]);

  const handleBookRoom = () => {
    let roomDetailsTemp = roomDetails;
    const total =
      parseFloat(roomDetails["costPerDay"]) * parseInt(stayDuration);
    const arrdate = arrivalDate.setUTCHours(0, 0, 0, 0);
    roomDetailsTemp["StartDate"] = new Date(arrdate).toISOString();
    roomDetailsTemp["Duration"] = stayDuration;
    roomDetailsTemp["CheckInTime"] = "";
    roomDetailsTemp["CheckOutTime"] = "";
    roomDetailsTemp["departureDate"] = leaveDate;
    roomDetailsTemp["BookingDates"] = Object.keys(roomsAvailableForDays);
    roomDetailsTemp["NumberOfRooms"] = noOfRooms;
    roomDetailsTemp["AdditionalCharges"] = "0";
    roomDetailsTemp["SubTotal"] = total;
    roomDetailsTemp["CustomerUniqueNumber"] = userContext.UniqueNumber;
    roomDetailsTemp["TotalAmount"] = total;
    roomDetailsTemp["RoomIDs"] = [];
    setRoomToBookContext(roomDetailsTemp);
  };

  useEffect(() => {
    if (roomBookContext && Object.keys(roomBookContext).length)
      navigate("./confirm", { relative: "path" });
  }, [roomBookContext]);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      maxWidth="400px"
    >
      <Typography variant="h6" color="primary" marginTop={6} textAlign="center">
        Please Select Check-in and Check-out Dates
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        marginY={2}
      >
        <Box display="flex" alignItems="center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              displayStaticWrapperAs="desktop"
              value={arrivalDate}
              onChange={handleArrivalDateChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Typography variant="body1" p={2}>
            -
          </Typography>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              displayStaticWrapperAs="desktop"
              value={leaveDate}
              onChange={handleLeaveDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Box>
        <Typography variant="caption">
          Please select maximum of 5 days
        </Typography>
        {!isAvailable ? (
          <Typography
            disabled={
              !(
                stayDuration >= 1 &&
                stayDuration <= 5 &&
                Object.keys(roomsAvailableForDays).length == 0
              )
            }
            component={Button}
            variant="caption"
            onClick={handleCheckAvailablity}
          >
            {" "}
            Check Availability{" "}
          </Typography>
        ) : null}
        {isAvailable ? (
          <Box
            width="100%"
            display="flex"
            flexDirection="column"
            alignitems="center"
            marginY={6}
          >
            <Grid
              container
              spacing={2}
              alignItems="center"
              sx={{
                "--Grid-borderWidth": "1px",
                borderTop: "var(--Grid-borderWidth) solid",
                borderLeft: "var(--Grid-borderWidth) solid",
                borderColor: "divider",
                "& > div": {
                  borderRight: "var(--Grid-borderWidth) solid",
                  borderBottom: "var(--Grid-borderWidth) solid",
                  borderColor: "divider",
                },
              }}
            >
              <Grid item xs={12}>
                <Typography variant="h6" color="primary">
                  Date And Rooms Available
                </Typography>
              </Grid>
              {Object.entries(roomsAvailableForDays).map(([key, value]) => {
                return (
                  <Grid item xs={4}>
                    <Typography variant="body1">
                      {getDisplayabaleDate(key)} ({value}&nbsp;
                      {value == 1 ? "room" : "rooms"})
                    </Typography>
                  </Grid>
                );
              })}
            </Grid>
            <Typography pt={2} variant="h6" color="primary">
              Number of Rooms
            </Typography>
            <TextField
              type="number"
              InputProps={{ inputProps: { min: 1, max: 5 } }}
              placeholder="No. of rooms"
              helperText={
                "You can select maximum of " +
                Math.min(...Object.values(roomsAvailableForDays)) +
                " rooms"
              }
              defaultValue={noOfRooms}
              onChange={(event) => setNoOfRooms(event.target.value)}
            />
            <Button
              color="primary"
              variant="contained"
              onClick={handleBookRoom}
              disabled={!shouldProceed}
            >
              Proceed To Book
            </Button>
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}

export default CheckAvailability;
