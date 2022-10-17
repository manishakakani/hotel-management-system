import { Box, Button, Divider, Typography } from "@mui/material";
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
      setArrivalDate(roomBookContext.arrivalDate.toString());
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
          <Box display="flex" justifyContext="space-between">
            <Typography variant="h6" color="primary">
              Room No. :
            </Typography>
            <Typography variant="h6"> {roomBookContext.roomNumber} </Typography>
          </Box>
          <Divider />
          <Box display="flex" justifyContext="space-between">
            <Typography variant="h6" color="primary">
              Room Type :
            </Typography>
            <Typography variant="h6"> {roomBookContext.roomType} </Typography>
          </Box>
          <Divider />
          <Box display="flex" justifyContext="space-between">
            <Typography variant="h6" color="primary">
              Cost Per Day :
            </Typography>
            <Typography variant="h6"> {roomBookContext.costPerDay} </Typography>
          </Box>
          <Divider />
          <Box display="flex" justifyContext="space-between">
            <Typography variant="h6" color="primary">
              Arrival Date :
            </Typography>
            <Typography variant="h6"> {arrivalDate} </Typography>
          </Box>
          <Divider />
          <Box display="flex" justifyContext="space-between">
            <Typography variant="h6" color="primary">
              Duration :
            </Typography>
            <Typography variant="h6">
              {" "}
              {roomBookContext.duration} Days{" "}
            </Typography>
          </Box>
          <Divider />
          <Box display="flex" justifyContext="space-between" flexWrap="wrap">
            <Typography variant="h6" color="primary">
              Amenities :
            </Typography>
            <Box
              paddingLeft={4}
              display="flex"
              justifyContext="space-around"
              alignItems="center"
              flexWrap="wrap"
            >
              {" "}
              {roomBookContext.amenities && roomBookContext.amenities.length
                ? roomBookContext.amenities.map((am) => {
                    return (
                      <Typography variant="subtitle2">{am},&nbsp;</Typography>
                    );
                  })
                : "No Free Amenities"}
            </Box>
          </Box>
          <Divider />
          <Box display="flex" justifyContext="space-between" flexWrap="wrap">
            <Typography variant="h6" color="primary">
              Additional Amenities :
            </Typography>
            <Box
              paddingLeft={4}
              display="flex"
              justifyContext="space-around"
              alignItems="center"
              flexWrap="wrap"
            >
              {" "}
              {roomBookContext.additionalAmenities &&
              roomBookContext.additionalAmenities.length
                ? roomBookContext.additionalAmenities.map((am) => {
                    return (
                      <Typography variant="subtitle2">{am},&nbsp;</Typography>
                    );
                  })
                : "No Added Amenities"}
            </Box>
          </Box>
          <Divider />
          <Box display="flex" justifyContext="space-between">
            <Typography variant="h6" color="primary">
              Sub Total :
            </Typography>
            <Typography variant="h6"> {roomBookContext.subCost} </Typography>
          </Box>
          <Divider />
          <Box display="flex" justifyContext="space-between">
            <Typography variant="h6" color="primary">
              Grand Total :
            </Typography>
            <Typography variant="h6"> {roomBookContext.TotalCost} </Typography>
          </Box>
          <Divider />
        </Box>
      ) : null}
      <Button marginY={4} variant="contained">
        Confirm Booking
      </Button>
    </Box>
  );
}

export default ConfirmToBook;
