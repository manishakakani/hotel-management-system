import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  MenuItem,
  Select,
  Switch,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getServiceRequestedRooms, updateRoom } from "../../axios/RoomAPIs";

function ServiceRequested() {
  const [serviceReqRooms, setServiceReqRooms] = useState([]);

  useEffect(() => {
    fetchSRRooms();
  }, []);

  const fetchSRRooms = () => {
    getServiceRequestedRooms().then((res) => {
      setServiceReqRooms(res.data);
    });
  };

  const handleServiceRequest = (event, id) => {
    updateRoom(id, { ServiceRequested: false }).then((res) => {
      fetchSRRooms();
    });
  };

  return (
    <Grid container spacing={3} my={2}>
      <Grid item xs={12} align="center">
        <Typography variant="h3" color="primary">
          Service Requested
        </Typography>
      </Grid>
      {serviceReqRooms.map((a, index) => {
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
                    onChange={($event) => handleServiceRequest($event, a.id)}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  Completed
                </Box>
              </CardContent>
            </Card>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ServiceRequested;
