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
import { getRoomByRoomID } from "../../axios/RoomAPIs";
import { deleteRoomType, getAllRoomTypes } from "../../axios/RoomTypeAPIs";
import RoomsForm from "./RoomsForm";

function Rooms() {
  const [addNew, setAddNew] = useState(false);
  const [edit, setEdit] = useState(false);
  const [details, setDetails] = useState([]);
  const [detailsToEdit, setDetailsToEdit] = useState({});

  const [indexSelected, setIndexSelected] = useState(-1);
  const imageList = [
    "http://cdn.home-designing.com/wp-content/uploads/2015/03/chevron-wallpaper.jpg",
    "http://cdn.home-designing.com/wp-content/uploads/2015/03/tufted-headboard.jpg",
  ];
  const lengthOfImageList = imageList.length;
  const [imageToShow, setImageToShow] = useState("");

  const handleEditRoom = (a) => {
    setDetailsToEdit(a);
    setEdit(true);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  const fetchDetails = () => {
    getAllRoomTypes().then((res) => setDetails(res.data));
  };

  // useEffect(() => {
  //   if (details.length) {
  //     details.map((rt) => {
  //       rt.RoomNumbers = [];
  //       rt.Availability.map((a) => {
  //         getRoomByRoomID(a).then((res) => {
  //           rt.RoomNumbers = [
  //             ...rt.RoomNumbers,
  //             { [a]: res.data[0].RoomNumber },
  //           ];
  //         });
  //       });
  //     });
  //   }
  // }, [details]);

  const handleDeleteRoom = (id) => {
    deleteRoomType(id).then((res) => {
      fetchDetails();
    });
  };

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
    fetchDetails();
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
          details={detailsToEdit}
          images={imageList}
          close={handleCloseForm}
        />
      ) : (
        <Grid container spacing={4} padding={4}>
          {details.map((a) => {
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
                  <CardHeader title={a.RoomType + " Room"} />
                  <CardMedia
                    component="img"
                    height="194"
                    image={imageToShow}
                    alt="room"
                  />
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      Cost/Night: ${a.Rate}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                      Smoking -{" "}
                      {a.isSmokingAllowed === 1
                        ? "Allowed"
                        : "Not Allowed"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Pets -{" "}
                      {a.arePetsAllowed === 1 ? "Allowed" : "Not Allowed"}
                    </Typography> */}
                    <Typography variant="body2" color="text.secondary">
                      Rooms -{" "}
                      {a?.Availability
                        ? a.Availability.map((rm, idx) => {
                            if (idx == a.Availability.length - 1) return rm;
                            return rm + ", ";
                          })
                        : null}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => handleEditRoom(a)}>
                      Edit
                    </Button>
                    <Button size="small" onClick={() => handleDeleteRoom(a.id)}>
                      Delete
                    </Button>
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
