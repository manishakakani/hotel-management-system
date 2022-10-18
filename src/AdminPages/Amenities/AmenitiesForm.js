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
} from "@mui/material";
import { useForm } from "react-hook-form";
import WindowsWidthContext from "../../Contexts/WindowsWidthContext";
import SuccessSnackBar from "../../Components/SuccessSnackBar";
import ErrorSnackBar from "../../Components/ErrorSnackBar";

function AmenitiesForm({ isNew = true, details = {}, close }) {
  const winWidth = useContext(WindowsWidthContext);
  const { register, handleSubmit, formState, reset } = useForm();
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
              <InputLabel variant="standard" htmlFor="Description">
                Description
              </InputLabel>
              <Input
                id="Description"
                type="text"
                defaultValue={!isNew ? details.Description : null}
                name="Description"
                {...register("Description")}
              />
              {errors.Description && (
                <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                  {errors.Description.message}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              <InputLabel variant="standard" htmlFor="Rules">
                Rules
              </InputLabel>
              <Input
                id="Rules"
                type="text"
                defaultValue={!isNew ? details.Rules : null}
                name="Rules"
                {...register("Rules")}
              />
              {errors.Rules && (
                <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                  {errors.Rules.message}
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

export default AmenitiesForm;
