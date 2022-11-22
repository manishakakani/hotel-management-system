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
import { useContext, useEffect, useState } from "react";
import { deletePerson, getStaff } from "../../axios/PersonAPIs";
import WindowsWidthContext from "../../Contexts/WindowsWidthContext";
import StaffForm from "./StaffForm";

function Staff() {
  const winWidth = useContext(WindowsWidthContext);
  const [addNew, setAddNew] = useState(false);
  const [edit, setEdit] = useState(false);
  const [details, setDetails] = useState([]);

  const handleAddStaff = () => setAddNew(true);
  const handleCloseForm = () => {
    setAddNew(false);
    setEdit(false);
  };

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = () => {
    getStaff().then((res) => setDetails(res.data));
  };

  const handleDeleteStaff = (staff) => {
    deletePerson(staff.id).then((res) => fetchStaff());
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      marginTop={4}
    >
      <Typography variant="h3" color="primary">
        Staff
      </Typography>
      {!addNew ? (
        <Button onClick={handleAddStaff} color="primary">
          {" "}
          <Add /> Add New{" "}
        </Button>
      ) : null}
      {addNew || edit ? (
        <StaffForm
          isNew={addNew ? true : false}
          details={details}
          close={handleCloseForm}
        />
      ) : (
        <Grid container spacing={4} padding={4}>
          {details?.map((a) => {
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
                <Card sx={{ width: winWidth > 320 ? 350 : 300, paddingX: 2 }}>
                  <CardHeader
                    title={a.Name}
                    subheader={a.SSN}
                    titleTypographyProps={{ color: "primary" }}
                  />
                  <CardContent>
                    <Grid container spacing={3}>
                      <Grid xs={5}>
                        <Typography variant="subtitle2" color="primary">
                          Address:
                        </Typography>
                      </Grid>
                      <Grid xs={7}>
                        <Typography variant="subtitle2">{a.Address}</Typography>
                      </Grid>
                      <Grid xs={5}>
                        <Typography variant="subtitle2" color="primary">
                          Email ID:
                        </Typography>
                      </Grid>
                      <Grid xs={7}>
                        <Typography variant="subtitle2">{a.EmailID}</Typography>
                      </Grid>
                      <Grid xs={5}>
                        <Typography variant="subtitle2" color="primary">
                          Phone Number:
                        </Typography>
                      </Grid>
                      <Grid xs={7}>
                        <Typography variant="subtitle2">
                          {a.PhoneNumber}
                        </Typography>
                      </Grid>
                    </Grid>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => handleDeleteStaff(a)}>
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

export default Staff;
