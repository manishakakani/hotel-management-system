import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  Grid,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import WindowsWidthContext from "../../Contexts/WindowsWidthContext";
import BookingDetails from "./BookingDetails";

function BookingHistory() {
  const winWidth = useContext(WindowsWidthContext);
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography variant="h3" color="primary" marginY={4}>
        History
      </Typography>
      <Grid container spacing={4} margin={4} justifyContent="center">
        {[1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 4, 5, 3].map((val) => {
          return (
            <Grid item display="flex" justifyContent="center">
              <Card sx={{ width: 300, cursor: "pointer" }} onClick={handleOpen}>
                <CardHeader
                  titleTypographyProps={{ color: "primary" }}
                  title="ReservationNumber: TBHRN5678"
                  subheader="Room No: 201"
                />
                <CardContent>
                  Arrival Date: 17-10-2022 Duration: 1 day
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        scroll="paper"
        fullScreen={winWidth < 800}
      >
        <BookingDetails closeDialog={handleClose} />
      </Dialog>
    </Box>
  );
}

export default BookingHistory;
