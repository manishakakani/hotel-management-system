import { Box, Divider, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import RoomToBookContext from "../../Contexts/RoomToBookContext";

function ConfirmToBook() {
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
    <Box display="flex" justifyContent="center">
      {roomBookContext ? (
        <Box
          width="80%"
          display="flex"
          flexDirection="column"
          alignItems="center"
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
              {roomBookContext.duraction} Days{" "}
            </Typography>
          </Box>
          <Divider />
          <Box display="flex" justifyContext="space-between">
            <Typography variant="h6" color="primary">
              Amenities :
            </Typography>
            <Box paddingLeft={4}>
              {" "}
              {roomBookContext.amenities.length
                ? roomBookContext.amenities.map((am) => {
                    <Typography variant="subtitle2">{am}</Typography>;
                  })
                : "No Free Amenities"}
            </Box>
          </Box>
          <Divider />
          <Box display="flex" justifyContext="space-between">
            <Typography variant="h6" color="primary">
              Additional Amenities :
            </Typography>
            <Box paddingLeft={4}>
              {" "}
              {roomBookContext.additionalAmenities &&
              roomBookContext.additionalAmenities.length
                ? roomBookContext.additionalAmenities.map((am) => {
                    <Typography variant="subtitle2">{am}</Typography>;
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
    </Box>
  );
}

export default ConfirmToBook;
