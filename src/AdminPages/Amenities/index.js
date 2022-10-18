import { Add } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import AmenitiesForm from "./AmenitiesForm";

function Amenities() {
  const [addNew, setAddNew] = useState(false);
  const [edit, setEdit] = useState(false);
  const [details, setDetails] = useState({});

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
        Amenities
      </Typography>
      {!addNew ? (
        <Button onClick={handleAddAmenity} color="primary">
          {" "}
          <Add /> Add New{" "}
        </Button>
      ) : null}
      {addNew || edit ? (
        <AmenitiesForm
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
                lg={4}
                xl={3}
                display="flex"
                justifyContent="center"
              >
                <Card sx={{ maxWidth: "300px" }}>
                  <CardHeader
                    title="WiFi"
                    subheader="$0.00"
                    titleTypographyProps={{ color: "primary" }}
                  />
                  <CardContent>
                    Description: Free Wifi available across the hotel
                    <br />
                    Rules: FUP is 100GB
                  </CardContent>
                  <CardActions>
                    <Button size="small">Edit</Button>
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

export default Amenities;
