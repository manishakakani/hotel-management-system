import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  IconButton,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomToBookContext from "../../Contexts/RoomToBookContext";
import WindowsWidthContext from "../../Contexts/WindowsWidthContext";

function AdditionalAmenities() {
  const winWidth = useContext(WindowsWidthContext);
  const navigate = useNavigate();
  const [roomBookContext, setRoomToBookContext] = useContext(RoomToBookContext);
  const [showRoomDetails, setshowRoomDetails] = useState(false);
  const [arrivalDate, setArrivalDate] = useState();

  const handleShowAmenities = () => setshowRoomDetails(!showRoomDetails);

  const handleProceedToBook = () => {
    // if no amenities added, should navigate to confirmation page
    let tempRoomBookDetails = roomBookContext;
    tempRoomBookDetails["additionalAmenities"] = [
      "Basketball ground",
      "Indoor games",
    ];
    let subCost = tempRoomBookDetails["TotalCost"];
    tempRoomBookDetails["subCost"] = subCost;
    tempRoomBookDetails["TotalCost"] =
      parseFloat(subCost) +
      2.99 * roomBookContext.duration +
      1.99 * roomBookContext.duration;
    tempRoomBookDetails["arrivalDate"] = arrivalDate;
    console.log({ tempRoomBookDetails });
    setRoomToBookContext(tempRoomBookDetails);
  };

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

  useEffect(() => {
    if (winWidth < 500) setshowRoomDetails(false);
    else setshowRoomDetails(true);
  }, [winWidth]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Box display="flex" flexDirection="column" alignItems="center">
        <Typography
          variant="h5"
          color="primary"
          marginTop={4}
          textAlign="center"
        >
          Please Select Amenities to Add-On
        </Typography>
        <Typography variant="caption" textAlign="center">
          Please note, the amenities chosen now will be added for all the days
          of your stay at the hotel.
        </Typography>
        <Typography variant="caption" marginBottom={4} textAlign="center">
          You can also avail these at the hotel on pay-per-use basis.
        </Typography>
      </Box>
      <Box
        marginY={6}
        display="flex"
        flexWrap="wrap-reverse"
        justifyContent="space-around"
        width="100%"
      >
        <Box>
          <Typography variant="h5" color="primary">
            Add-ons
          </Typography>
          <FormGroup>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Indoor games"
              />
              <Typography variant="subtitle2">$2.99</Typography>
            </Box>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <FormControlLabel
                control={<Checkbox />}
                label="Basketball ground"
              />
              <Typography variant="subtitle2">$1.99</Typography>
            </Box>
          </FormGroup>
        </Box>
        <Box>
          <Box
            width="300px"
            border="1px solid gray"
            borderRadius="5px"
            display="flex"
            flexDirection="column"
            alignItems="center"
            marginY={4}
          >
            <Box
              width="100%"
              padding={2}
              display="flex"
              justifyContent="space-around"
              alignItems="center"
            >
              <Typography variant="h6" color="primary">
                Details
              </Typography>
              <IconButton onClick={handleShowAmenities} color="primary">
                {" "}
                {showRoomDetails ? (
                  <KeyboardArrowUp />
                ) : (
                  <KeyboardArrowDown />
                )}{" "}
              </IconButton>
            </Box>
            <Divider fullWidth />
            {showRoomDetails ? (
              <Box
                display="flex"
                flexDirection="column"
                alignItems="flex-start"
              >
                <Typography variant="body1">
                  Room No. : {roomBookContext.roomNumber}
                </Typography>
                <Typography variant="body1">
                  Room Type : {roomBookContext.roomType}
                </Typography>
                <Typography variant="body1">Amenities: </Typography>
                {roomBookContext.amenities.map((am) => (
                  <Typography paddingLeft={4} variant="subtitle1">
                    {am}
                  </Typography>
                ))}
                <Typography variant="body1">
                  Arraival Date:{arrivalDate}
                </Typography>
                <Typography variant="body1">
                  Duration: {roomBookContext.duration} Days
                </Typography>
              </Box>
            ) : null}
          </Box>
        </Box>
      </Box>
      <Button variant="contained" color="primary" onClick={handleProceedToBook}>
        Proceed to Booking...
      </Button>
    </Box>
  );
}

export default AdditionalAmenities;
