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
  Select,
  Chip,
  OutlinedInput,
  MenuItem,
  IconButton,
  Divider,
  ImageList,
  ImageListItem,
  Tooltip,
  Grid,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Delete, PhotoCamera } from "@mui/icons-material";
import WindowsWidthContext from "../../Contexts/WindowsWidthContext";
import SuccessSnackBar from "../../Components/SuccessSnackBar";
import ErrorSnackBar from "../../Components/ErrorSnackBar";
import { addRoomType, updateRoomType } from "../../axios/RoomTypeAPIs";

function RoomsForm({ isNew = true, details = {}, images, close }) {
  const winWidth = useContext(WindowsWidthContext);
  const { register, handleSubmit, formState, reset, control } = useForm();
  const [openSuccessBar, setOpenSuccessBar] = useState(false);
  const [openErrorBar, setOpenErrorBar] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [imageList, setImageList] = useState([]);

  const { errors } = formState;

  const formSubmitted = (data) => {
    setOpenBackdrop(true);
    data["Images"] = imageList;
    data["Availability"] = data.RoomNumbers.split(",");
    if (isNew) {
      addRoomType(data)
        .then((res) => {
          setOpenSuccessBar(true);
        })
        .catch((err) => setOpenErrorBar(true));
    } else {
      // const rooms = data.RoomNumbers.split(",");
      // const avail = rooms.map((room) => {
      //   const valarr = details.RoomNumbers.map((rooms) => {
      //     if (Object.values(rooms)[0] == room) return Object.keys(rooms)[0];
      //     else return room;
      //   });
      //   return valarr[0];
      // });
      // data["Availability"] = avail;
      data["RoomTypeID"] = details.RoomTypeID;
      updateRoomType(details.id, data)
        .then((res) => {
          setOpenSuccessBar(true);
        })
        .catch((err) => setOpenErrorBar(true));
    }
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
            {/* <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
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
            </FormControl> */}
            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              <InputLabel variant="standard" htmlFor="RoomType">
                Room Type *
              </InputLabel>
              <Input
                id="RoomType"
                type="text"
                defaultValue={!isNew ? details.RoomType : null}
                name="RoomType"
                {...register("RoomType", {
                  required: "Room Type is required",
                })}
              />
              {errors.RoomType && (
                <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                  {errors.RoomType.message}
                </FormHelperText>
              )}
            </FormControl>
            {/* <FormControl
              variant="standard"
              fullWidth
              sx={{ marginY: "0.8rem" }}
            >
              <InputLabel htmlFor="isSmokingAllowed">
                Is Smoking Allowed?
              </InputLabel>
              <Controller
                control={control}
                name="isSmokingAllowed"
                render={({ field: { onChange } }) => (
                  <Select
                    defaultValue={isNew ? 0 : details.isSmokingAllowed}
                    onChange={(event, data) => onChange(data)}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value={1}>Yes</MenuItem>
                    <MenuItem value={0}>No</MenuItem>
                  </Select>
                )}
              />
              {errors.isSmokingAllowed && (
                <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                  {errors.isSmokingAllowed.message}
                </FormHelperText>
              )}
            </FormControl> */}
            {/* 
            <FormControl
              variant="standard"
              fullWidth
              sx={{ marginY: "0.8rem" }}
            >
              <InputLabel htmlFor="arePetsAllowed">
                Are Pets Allowed?
              </InputLabel>
              <Controller
                control={control}
                name="arePetsAllowed"
                render={({ field: { onChange } }) => (
                  <Select
                    defaultValue={isNew ? 0 : details.arePetsAllowed}
                    onChange={(event, data) => onChange(data)}
                    displayEmpty
                    inputProps={{ "aria-label": "Without label" }}
                  >
                    <MenuItem value={1}>Yes</MenuItem>
                    <MenuItem value={0}>No</MenuItem>
                  </Select>
                )}
              />
              {errors.arePetsAllowed && (
                <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                  {errors.arePetsAllowed.message}
                </FormHelperText>
              )}
            </FormControl> */}

            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              <InputLabel variant="standard" htmlFor="Rate">
                Rate
              </InputLabel>
              <Input
                id="Rate"
                type="text"
                defaultValue={!isNew ? details.Rate : null}
                name="Rate"
                {...register("Rate")}
              />
              {errors.Rate && (
                <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                  {errors.Rate.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              <InputLabel variant="standard" htmlFor="RoomNumbers">
                Room Numbers *
              </InputLabel>
              <Input
                id="RoomNumbers"
                type="text"
                defaultValue={
                  !isNew ? details.Availability.map((a) => a) : null
                }
                name="RoomNumbers"
                {...register("RoomNumbers")}
              />
              <FormHelperText
                sx={{ color: "#text.secondary" }}
                id="my-helper-text"
              >
                Seperate room numbers with a comma (,).
              </FormHelperText>
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
                  ? "Room successfully added!"
                  : "Room details successfully updated!"
              }
            />
            <ErrorSnackBar
              open={openErrorBar}
              close={handleErrorBarClose}
              msg={
                isNew
                  ? "Sorry! Room couldnot be added."
                  : "Sorry! Room details couldnot be updated."
              }
              subtitle="Please try again after sometime."
            />
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default RoomsForm;
