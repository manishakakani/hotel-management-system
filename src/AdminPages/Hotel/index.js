import { Add, Delete, Edit } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import HotelForm from "./HotelForm";

function Hotel() {
  const [hotelDetails, setHotelDetails] = useState({
    images: [
      {
        img: "http://cdn.home-designing.com/wp-content/uploads/2015/03/chevron-wallpaper.jpg",
        title: "Image 1",
      },
      {
        img: "http://cdn.home-designing.com/wp-content/uploads/2015/03/tufted-headboard.jpg",
        title: "Image 2",
      },
    ],
    Name: "Hotel Taj",
    Address: "Mumbai, India",
    PhoneNumber: "+91 87656 87656",
    EmailID: "hoteltaj@gmail.com",
    LicenceNumber: "LI567TA67",
  });
  const [addNew, setAddNew] = useState(false);
  const [edit, setEdit] = useState(false);

  const handleAddHotel = () => setAddNew(true);

  const handleCloseForm = () => {
    setAddNew(false);
    setEdit(false);
  };

  const handleEdit = () => setEdit(true);

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop={4}
    >
      <Typography variant="h3" color="primary">
        Hotel
      </Typography>
      {addNew || edit ? (
        <HotelForm
          isNew={addNew ? true : false}
          details={hotelDetails}
          close={handleCloseForm}
        />
      ) : null}
      {!addNew && !edit && Object.keys(hotelDetails).length ? (
        <Box display="flex" flexDirection="column" alignItems="flex-start">
          <ImageList
            sx={{ maxWidth: 500, maxHeight: 450 }}
            cols={3}
            rowHeight={164}
          >
            {hotelDetails.images && hotelDetails.images.length
              ? hotelDetails.images.map((item) => (
                  <ImageListItem key={item.img}>
                    <img
                      src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                      srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      alt={item.title}
                      loading="lazy"
                    />
                  </ImageListItem>
                ))
              : null}
          </ImageList>
          <Grid container>
            <Grid item xs={6} md={4}>
              <Typography variant="h6" color="primary">
                Name: &nbsp;
              </Typography>
            </Grid>
            <Grid item xs={6} md={8}>
              <Typography variant="h6"> {hotelDetails.Name} </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} md={4}>
              <Typography variant="h6" color="primary">
                Address: &nbsp;
              </Typography>
            </Grid>
            <Grid item xs={6} md={8}>
              <Typography variant="h6"> {hotelDetails.Address} </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} md={4}>
              <Typography variant="h6" color="primary">
                Phone Number: &nbsp;
              </Typography>
            </Grid>
            <Grid item xs={6} md={8}>
              <Typography variant="h6"> {hotelDetails.PhoneNumber} </Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} md={4}>
              <Typography variant="h6" color="primary">
                Email ID: &nbsp;
              </Typography>
            </Grid>
            <Grid item xs={6} md={8}>
              <Typography variant="h6"> {hotelDetails.EmailID} </Typography>
            </Grid>
            <Grid container>
              <Grid item xs={6} md={4}>
                <Typography variant="h6" color="primary">
                  Licence Number: &nbsp;
                </Typography>
              </Grid>
              <Grid item xs={6} md={8}>
                <Typography variant="h6">
                  {" "}
                  {hotelDetails.LicenceNumber}{" "}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      ) : null}
      {!addNew && !edit ? (
        Object.keys(hotelDetails).length === 0 ? (
          <Button onClick={handleAddHotel} color="primary">
            <Add /> Add New
          </Button>
        ) : (
          <Button onClick={handleEdit} color="primary" marginY={8}>
            <Edit fontSize="small" paddingX={2} /> Edit Details
          </Button>
        )
      ) : null}
    </Box>
  );
}

export default Hotel;
