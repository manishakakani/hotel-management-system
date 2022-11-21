import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAllRoomTypes } from "../../axios/RoomTypeAPIs";
import RoomCard from "../../Components/RoomCard";

function AllRoomsPage() {
  const [allRooms, setAllRooms] = useState([]);

  useEffect(() => {
    getAllRoomTypes().then((res) => {
      setAllRooms(res.data);
    });
  }, []);

  return (
    <Box
      display="flex"
      flexDirection={"column"}
      justifyContent="center"
      alignItems={"center"}
      paddingTop={12}
    >
      <Typography variant="h2" color="primary">
        Rooms Available
      </Typography>
      <Grid
        container
        spacing={4}
        justifyContent="flex-start"
        marginTop={4}
        width="80%"
      >
        {allRooms.map((room) => {
          return (
            <Grid item xs={12} md={6} lg={4}>
              <RoomCard room={room} />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default AllRoomsPage;
