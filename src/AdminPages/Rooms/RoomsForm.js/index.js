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
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import SuccessSnackBar from "../../../Components/SuccessSnackBar";
import ErrorSnackBar from "../../../Components/ErrorSnackBar";
import WindowsWidthContext from "../../../Contexts/WindowsWidthContext";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const amenities = [
  "WiFi",
  "Breakfast",
  "Swimming Pool",
  "Indoor games",
  "Basket ball",
];

function RoomsForm({ isNew = true, details = {}, close }) {
  const winWidth = useContext(WindowsWidthContext);
  const { register, handleSubmit, formState, reset, control } = useForm();
  const [openSuccessBar, setOpenSuccessBar] = useState(false);
  const [openErrorBar, setOpenErrorBar] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const { errors } = formState;

  useEffect(() => {}, []);

  const formSubmitted = (data) => {
    setOpenBackdrop(true);
    setTimeout(() => {
      setOpenBackdrop(false);
    }, 5000);
    console.log({ data });
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
              <InputLabel variant="standard" htmlFor="RoomNumber">
                Room Number *
              </InputLabel>
              <Input
                id="RoomNumber"
                type="text"
                defaultValue={!isNew ? details.RoomNumber : null}
                name="RoomNumber"
                {...register("RoomNumber", {
                  required: "Room Number is required",
                })}
              />
              {errors.RoomNumber && (
                <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                  {errors.RoomNumber.message}
                </FormHelperText>
              )}
            </FormControl>
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
            <FormControl
              fullWidth
              variant="standard"
              sx={{ marginY: "0.8rem" }}
            >
              <InputLabel variant="standard" htmlFor="FreeAmenities">
                Free Amenities
              </InputLabel>
              <Controller
                control={control}
                name="FreeAmenities"
                render={({ field: { onChange } }) => (
                  <Select
                    labelId="FreeAmenities"
                    id="FreeAmenities"
                    multiple
                    defaultValue={!isNew ? details.FreeAmenities : []}
                    onChange={(event, data) => onChange(data)}
                    input={
                      <Input id="select-multiple-chip" label="FreeAmenities" />
                    }
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip key={value} label={value} />
                        ))}
                      </Box>
                    )}
                    MenuProps={MenuProps}
                  >
                    <MenuItem disabled value="">
                      <em>Add Free Amenities</em>
                    </MenuItem>
                    {amenities.map((amenity) => (
                      <MenuItem key={amenity} value={amenity}>
                        {amenity}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.FreeAmenities && (
                <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                  {errors.FreeAmenities.message}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl
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
            </FormControl>

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
            </FormControl>

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
                  ? "Amenity successfully added!"
                  : "Amenity successfully updated!"
              }
            />

            <ErrorSnackBar
              open={openErrorBar}
              close={handleErrorBarClose}
              msg={
                isNew
                  ? "Sorry! Amenity couldnot be added."
                  : "Sorry! Amenity couldnot be updated."
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
