import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  Grid,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { getRoomByRoomID } from "../../axios/RoomAPIs";
import { getRoomTypesByRoomTypeID } from "../../axios/RoomTypeAPIs";
import WindowsWidthContext from "../../Contexts/WindowsWidthContext";
import BookingDetails from "./BookingDetails";

export default function BookingInfo({ bookingDetails }) {
  const winWidth = useContext(WindowsWidthContext);
  const [roomNumbers, setRoomNumbers] = useState([]);
  const [roomType, setRoomType] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);

  useEffect(() => {
    if (bookingDetails?.RoomIDs) {
      console.log({ RoomIDs: bookingDetails.RoomIDs });
      bookingDetails?.RoomIDs?.map((id) => {
        getRoomByRoomID(id).then((res) => {
          //   console.log({ [id]: res.data });
          setRoomNumbers((oldValue) => {
            const dup = oldValue.filter((val) => val == res.data[0].RoomNumber);
            if (dup.length) {
              return oldValue;
            } else return [...oldValue, res.data[0].RoomNumber];
          });
        });
      });

      getRoomTypesByRoomTypeID(bookingDetails.RoomTypeID).then((res) => {
        setRoomType(res.data[0].RoomType);
      });
    }
  }, []);

  return (
    <Box>
      <Card
        sx={{ width: winWidth > 320 ? 350 : 300, cursor: "pointer" }}
        onClick={handleOpen}
      >
        <CardHeader
          sx={{ paddingBottom: 0 }}
          titleTypographyProps={{ color: "primary" }}
          title={
            <Grid container spacing={3}>
              <Grid item xs={5}>
                <Typography variant="h6" color="primary">
                  Booking ID:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography color="text.primary" variant="h6">
                  {bookingDetails.BookingID}
                </Typography>
              </Grid>
            </Grid>
          }
        />
        <CardContent>
          <Box display="flex" flexDirection="column">
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Typography variant="body1" color="primary">
                  Room No:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">
                  {roomNumbers.map((rmnum, idx) => {
                    return (
                      rmnum + (idx !== roomNumbers.length - 1 ? ", " : ".")
                    );
                  })}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Typography variant="body1" color="primary">
                  Room Type:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">{roomType}</Typography>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={4}>
                <Typography variant="body1" color="primary">
                  Amount:
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">
                  ${bookingDetails.TotalAmount}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
      <Dialog
        open={openDialog}
        onClose={handleClose}
        scroll="paper"
        fullScreen={winWidth < 800}
      >
        <BookingDetails
          details={bookingDetails}
          roomNumbers={roomNumbers}
          roomType={roomType}
          closeDialog={handleClose}
        />
      </Dialog>
    </Box>
  );
}
