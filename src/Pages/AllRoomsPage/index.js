import { Box, Grid } from "@mui/material";
import RoomCard from "../../Components/RoomCard";

function AllRoomsPage() {
  return (
    <Box display="flex" justifyContent="center" paddingTop={12}>
      <Grid
        container
        spacing={4}
        justifyContent="flex-start"
        marginTop={8}
        width="80%"
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((a) => {
          return (
            <Grid item xs={12} md={6} lg={4}>
              <RoomCard />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
}

export default AllRoomsPage;
