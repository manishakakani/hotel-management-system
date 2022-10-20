import { Add, Cancel, Check } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import RoomsForm from "./RoomsForm";

function Rooms() {
  const [addNew, setAddNew] = useState(false);
  const [edit, setEdit] = useState(false);
  const [details, setDetails] = useState({
    RoomType: "Deluxe",
    Rate: "9.99",
    isSmokingAllowed: 0,
    arePetsAllowed: 1,
  });

  const [indexSelected, setIndexSelected] = useState(-1);
  const imageList = [
    "http://cdn.home-designing.com/wp-content/uploads/2015/03/chevron-wallpaper.jpg",
    "http://cdn.home-designing.com/wp-content/uploads/2015/03/tufted-headboard.jpg",
  ];
  const lengthOfImageList = imageList.length;
  const [imageToShow, setImageToShow] = useState("");

  const handleEditRoom = () => setEdit(true);

  useEffect(() => {
    if (imageList.length > 0) {
      if (indexSelected == -1) {
        setIndexSelected(0);
        setImageToShow(imageList[0]);
      } else {
        setTimeout(() => {
          if (indexSelected === lengthOfImageList - 1) {
            setImageToShow(imageList[0]);
            setIndexSelected(0);
          } else {
            setImageToShow(imageList[indexSelected + 1]);
            setIndexSelected(indexSelected + 1);
          }
        }, 3000);
      }
    }
  }, [indexSelected]);

  const handleAddAmenity = () => setAddNew(true);
  const handleCloseForm = () => {
    setAddNew(false);
    setEdit(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop={4}
    >
      <Typography variant="h3" color="primary">
        Rooms
      </Typography>
      {!addNew ? (
        <Button onClick={handleAddAmenity} color="primary">
          <Add /> Add New
        </Button>
      ) : null}
      {addNew || edit ? (
        <RoomsForm
          isNew={addNew ? true : false}
          details={details}
          close={handleCloseForm}
        />
      ) : (
        <Grid container spacing={4} padding={4}>
          {[1, 2, 3, 4, 5, 6, 5, 34, 0, 54, 6, 0].map((a) => {
            return (
              <Grid
                item
                xs={12}
                md={6}
                lg={3}
                display="flex"
                justifyContent="center"
              >
                <Card sx={{ maxWidth: "300px" }}>
                  <CardHeader
                    title={details.RoomType + " Room"}
                    subheader={"$" + details.Rate + "/day"}
                  />
                  <CardMedia
                    component="img"
                    height="194"
                    image={imageToShow}
                    alt="room"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Cost Per Day: $9.99
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Smoking -{" "}
                      {details.isSmokingAllowed === 1
                        ? "Allowed"
                        : "Not Allowed"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Pets -{" "}
                      {details.arePetsAllowed === 1 ? "Allowed" : "Not Allowed"}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={handleEditRoom}>
                      Edit
                    </Button>
                    <Button size="small">Delete</Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
}

export default Rooms;
