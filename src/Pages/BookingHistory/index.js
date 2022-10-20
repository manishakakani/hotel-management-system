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
      <Grid container spacing={4} margin={4} justifyContent="space-evenly">
        {[1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 4, 5, 3].map((val) => {
          return (
            <Grid item display="flex" justifyContent="center">
              <Card sx={{ width: 300, cursor: "pointer" }} onClick={handleOpen}>
                <CardHeader
                  sx={{ paddingBottom: 0 }}
                  titleTypographyProps={{ color: "primary" }}
                  title={
                    <Grid container spacing={3}>
                      <Grid item xs={5}>
                        <Typography color="primary">Reservation No:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography color="text.primary">TBHRN5678</Typography>
                      </Grid>
                    </Grid>
                  }
                />
                <CardContent>
                  <Box display="flex" flexDirection="column">
                    <Grid container spacing={3}>
                      <Grid item xs={4}>
                        <Typography variant="body2" color="primary">
                          Room No:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">201</Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={4}>
                        <Typography variant="body2" color="primary">
                          Room Type:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">Deluxe</Typography>
                      </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                      <Grid item xs={4}>
                        <Typography variant="body2" color="primary">
                          Amount:
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography variant="body2">$27.87</Typography>
                      </Grid>
                    </Grid>
                  </Box>
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
