import { useState, useEffect, useContext } from "react";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
  Backdrop,
  CircularProgress,
  IconButton,
  Tooltip,
  Grid,
  Paper,
  Divider,
  ImageListItem,
  ImageList,
} from "@mui/material";
import { useForm } from "react-hook-form";
import WindowsWidthContext from "../../Contexts/WindowsWidthContext";
import SuccessSnackBar from "../../Components/SuccessSnackBar";
import ErrorSnackBar from "../../Components/ErrorSnackBar";
import { Delete, PhotoCamera } from "@mui/icons-material";

function HotelForm({ isNew, details = {}, close }) {
  const winWidth = useContext(WindowsWidthContext);
  const { register, handleSubmit, formState, reset } = useForm();
  const [openSuccessBar, setOpenSuccessBar] = useState(false);
  const [openErrorBar, setOpenErrorBar] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [imageList, setImageList] = useState([]);

  const { errors } = formState;

  useEffect(() => {}, []);

  const formSubmitted = (data) => {
    data["Images"] = imageList;
    setOpenBackdrop(true);
    setTimeout(() => {
      setOpenBackdrop(false);
    }, 5000);
    console.log({ data });
    setImageList([]);
    reset();
  };

  const handleSuccessBarClose = () => {
    setOpenBackdrop(false);
    setOpenSuccessBar(false);
    close();
  };
  const handleErrorBarClose = () => {
    setOpenBackdrop(false);
    setOpenErrorBar(false);
  };

  const handleCapture = (event) => {
    const file = event.target.files[0];
    setImageList([...imageList, file]);
  };

  const handleRemoveImage = (event, idx) => {
    if (event.type === "click")
      setImageList(imageList.filter((img, indx) => indx !== idx));
  };

  return (
    <Box display="flex" flexDirection="column" alignItems={"center"}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="primary" />
      </Backdrop>
      <form onSubmit={handleSubmit(formSubmitted)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            textAlign: "left",
            width: winWidth > 700 ? "40rem" : "80vw",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              width: "100%",
            }}
          >
            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              <input
                accept="image/*"
                id="icon-button-photo"
                style={{ display: "none" }}
                onChange={handleCapture}
                type="file"
              />
              <label htmlFor="icon-button-photo">
                <Tooltip title="Upload Images">
                  <IconButton color="primary" component="span">
                    <PhotoCamera />
                  </IconButton>
                </Tooltip>
              </label>
              {!imageList.length ? (
                <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                  Please add image
                </FormHelperText>
              ) : (
                <Box>
                  {imageList.map((img, idx) => {
                    return (
                      <Box>
                        <Grid container>
                          <Grid item xs={0} md={2} />
                          <Grid
                            item
                            xs={10}
                            md={8}
                            lg={6}
                            display="flex"
                            alignItems="center"
                          >
                            <Typography variant="subtitle2">
                              {img.name}
                            </Typography>
                          </Grid>
                          <Grid item xs={2}>
                            <Tooltip title={"Delete Image"}>
                              <IconButton
                                color="error"
                                onClick={(event) =>
                                  handleRemoveImage(event, idx)
                                }
                              >
                                <Delete />
                              </IconButton>
                            </Tooltip>
                          </Grid>
                        </Grid>
                        {idx !== imageList.length - 1 ? (
                          <Divider variant="inset" component="div" />
                        ) : null}
                      </Box>
                    );
                  })}
                </Box>
              )}
              {!isNew && details.images && details.images.length ? (
                <ImageList
                  sx={{ maxWidth: 500, maxHeight: 450 }}
                  cols={3}
                  rowHeight={164}
                >
                  {details.images && details.images.length
                    ? details.images.map((item) => (
                        <ImageListItem key={item.img}>
                          <img
                            src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                            srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt={item.title}
                            loading="lazy"
                          />
                          <Tooltip title="Delete Image">
                            <IconButton
                              color="error"
                              sx={{
                                backgroundColor: "rgba(0,0,0,0.25)",
                                position: "absolute",
                                top: 1,
                                right: 1,
                              }}
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                        </ImageListItem>
                      ))
                    : null}
                </ImageList>
              ) : null}
            </FormControl>
            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              <InputLabel variant="standard" htmlFor="Name">
                Name *
              </InputLabel>
              <Input
                id="Name"
                type="text"
                defaultValue={!isNew ? details.Name : null}
                name="Name"
                {...register("Name", {
                  required: "Name is required",
                })}
              />
              {errors.Name && (
                <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                  {errors.Name.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              <InputLabel variant="standard" htmlFor="Address">
                Address *
              </InputLabel>
              <Input
                id="Address"
                type="text"
                defaultValue={!isNew ? details.Address : null}
                name="Address"
                {...register("Address", {
                  required: "Address is required",
                })}
              />
              {errors.Address && (
                <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                  {errors.Address.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              <InputLabel variant="standard" htmlFor="PhoneNumber">
                Phone Number *
              </InputLabel>
              <Input
                id="PhoneNumber"
                type="text"
                defaultValue={!isNew ? details.PhoneNumber : null}
                name="PhoneNumber"
                {...register("PhoneNumber", {
                  required: "Phone Number is required",
                })}
              />
              {errors.PhoneNumber && (
                <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                  {errors.PhoneNumber.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              <InputLabel variant="standard" htmlFor="EmailID">
                EmailID *
              </InputLabel>
              <Input
                id="EmailID"
                type="email"
                defaultValue={!isNew ? details.EmailID : null}
                name="EmailID"
                {...register("EmailID", {
                  required: "EmailID is required",
                })}
              />
              {errors.EmailID && (
                <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                  {errors.EmailID.message}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              <InputLabel variant="standard" htmlFor="LicenceNumber">
                Licence Number *
              </InputLabel>
              <Input
                id="LicenceNumber"
                type="text"
                defaultValue={!isNew ? details.LicenceNumber : null}
                name="LicenceNumber"
                {...register("LicenceNumber", {
                  required: "Licence Number is required",
                })}
              />
              {errors.LicenceNumber && (
                <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                  {errors.LicenceNumber.message}
                </FormHelperText>
              )}
            </FormControl>
            <Box
              pt={2}
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              <Typography
                variant="button"
                m={2}
                component={Button}
                onClick={close}
              >
                Cancel
              </Typography>
              <Typography
                variant="button"
                type="submit"
                m={2}
                component={Button}
              >
                {isNew ? "Submit" : "Update"}
              </Typography>
            </Box>
            <SuccessSnackBar
              open={openSuccessBar}
              close={handleSuccessBarClose}
              msg={
                isNew
                  ? "Hotel successfully added!"
                  : "Hotel details successfully updated!"
              }
            />

            <ErrorSnackBar
              open={openErrorBar}
              close={handleErrorBarClose}
              msg={
                isNew
                  ? "Sorry! Hotel couldnot be added."
                  : "Sorry! Hotel details couldnot be updated."
              }
              subtitle="Please try again after sometime."
            />
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default HotelForm;
