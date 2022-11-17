import { useContext, useEffect, useState } from "react";
import { Box, Button, Input, TextField, Typography } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import RoomToBookContext from "../../Contexts/RoomToBookContext";
import { useNavigate } from "react-router-dom";

function CheckAvailability({ roomDetails }) {
  const navigate = useNavigate();
  const [roomBookContext, setRoomToBookContext] = useContext(RoomToBookContext);
  const [arrivalDate, setArrivalDate] = useState(new Date());
  const [stayDuration, setStayDuration] = useState(1);
  const [isAvailable, setIsAvaialble] = useState(false);
  const [noOfRooms, setNoOfRooms] = useState(1);

  const handleCheckAvailablity = () => {
    setIsAvaialble(true);
  };

  const handleBookRoom = () => {
    let roomDetailsTemp = roomDetails;
    const total = parseFloat(roomDetails["costPerDay"]) * stayDuration;
    roomDetailsTemp["arrivalDate"] = arrivalDate;
    roomDetailsTemp["duration"] = stayDuration;
    roomDetailsTemp["noOfRooms"] = noOfRooms;
    roomDetailsTemp["additionalCharges"] = "0";
    roomDetailsTemp["subCost"] = total;
    roomDetailsTemp["TotalCost"] = total;
    setRoomToBookContext(roomDetailsTemp);
  };

  useEffect(() => {
    if (roomBookContext && Object.keys(roomBookContext).length)
      navigate("./confirm", { relative: "path" });
  }, [roomBookContext]);

  return (
    <Box marginY={4} display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h5" color="primary" marginTop={6} textAlign="center">
        Please Select Date of Arrival and Duration
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        marginY={4}
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            displayStaticWrapperAs="desktop"
            value={arrivalDate}
            onChange={(newValue) => {
              setArrivalDate(newValue);
              setIsAvaialble(false);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
        <br />
        <TextField
          type="number"
          InputProps={{ inputProps: { min: 1, max: 5 } }}
          placeholder="Duration of stay"
          helperText="You can select maximum of 5 days"
          defaultValue={stayDuration}
          onChange={(newVal) => setStayDuration(newVal)}
        />
        <TextField
          type="number"
          InputProps={{ inputProps: { min: 1, max: 5 } }}
          placeholder="No. of rooms"
          helperText="You can select maximum of 5 rooms"
          defaultValue={noOfRooms}
          onChange={(newVal) => setNoOfRooms(newVal)}
        />
        {!isAvailable ? (
          <Typography
            disabled={!(stayDuration >= 1 || arrivalDate)}
            component={Button}
            variant="caption"
            onClick={handleCheckAvailablity}
          >
            {" "}
            Check Availability{" "}
          </Typography>
        ) : null}
        {isAvailable ? (
          <Box width="100%" display="flex" justifyContent="center" marginY={6}>
            <Button
              color="primary"
              variant="contained"
              onClick={handleBookRoom}
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
