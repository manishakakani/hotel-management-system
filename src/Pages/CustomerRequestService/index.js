import {
  Box,
  Card,
  CardContent,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { getCustomerBookingsforToday } from "../../axios/BookingAPIs";
import { updateRoom } from "../../axios/RoomAPIs";
import UserContext from "../../Contexts/UserContext";

function CustomerRequestService() {
  const [roomsToday, setRoomsToday] = useState([]);
  const [userContext, setUserContext] = useContext(UserContext);

  useEffect(() => {
    fetchSRRooms();
  }, []);

  const fetchSRRooms = () => {
    getCustomerBookingsforToday(userContext.UniqueNumber).then((res) => {
      setRoomsToday([...res.data[0]]);
    });
  };

  const handleRequestService = (event, id) => {
    updateRoom(id, { ServiceRequested: event.target.checked }).then((res) => {
      fetchSRRooms();
    });
  };

  return (
    <Grid container spacing={3} my={2}>
      <Grid item xs={12} align="center">
        <Typography variant="h3" color="primary">
          Request Service
        </Typography>
      </Grid>
      {roomsToday.map((a, index) => {
        return (
          <Grid item xs={12} md={6} lg={4} align="center" key={"sreq" + index}>
            <Card sx={{ maxWidth: 400 }}>
              <CardContent
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6">Room No. {a.RoomNumber}</Typography>
                <Box>
                  <Switch
                    defaultChecked={a.ServiceRequested}
                    onChange={($event) => handleRequestService($event, a.id)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  Send Request
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default CustomerRequestService;
