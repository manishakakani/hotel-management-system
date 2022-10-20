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
import SuccessSnackBar from "../../Components/SuccessSnackBar";
import ErrorSnackBar from "../../Components/ErrorSnackBar";

function ChangePassword() {
  const { register, handleSubmit, formState, reset, watch } = useForm();
  const [openSuccessBar, setOpenSuccessBar] = useState(false);
  const [openErrorBar, setOpenErrorBar] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const { errors } = formState;

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
  };
  const handleErrorBarClose = () => {
    setOpenBackdrop(false);
    setOpenErrorBar(false);
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems={"center"}
      marginTop={4}
    >
      <Typography variant="h4" color="primary">
        Change Password
      </Typography>
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
            alignItems: "center",
            textAlign: "left",
            marginTop: 4,
            width: "300px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "baseline",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              <InputLabel variant="standard" htmlFor="OldPassword">
                Old Password
              </InputLabel>
              <Input
                id="OldPassword"
                type="password"
                name="OldPassword"
                {...register("OldPassword", {
                  required: "Required",
                })}
              />
              {errors.OldPassword && (
                <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                  {errors.OldPassword.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              <InputLabel variant="standard" htmlFor="NewPassword">
                New Password
              </InputLabel>
              <Input
                id="NewPassword"
                type="password"
                name="NewPassword"
                {...register("NewPassword", {
                  required: "Required",
                })}
              />
              {errors.NewPassword && (
                <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                  {errors.NewPassword.message}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              <InputLabel variant="standard" htmlFor="Password">
                Confirm Password
              </InputLabel>
              <Input
                id="Password"
                type="password"
                name="Password"
                {...register("Password", {
                  required: "Required",
                })}
              />
              {errors.Password && (
                <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                  {errors.Password.message}
                </FormHelperText>
              )}
            </FormControl>
            <Box
              pt={2}
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              <Typography
                variant="button"
                type="submit"
                m={2}
                component={Button}
              >
                Update
              </Typography>
            </Box>
            <SuccessSnackBar
              open={openSuccessBar}
              close={handleSuccessBarClose}
              msg={"Password successfully updated!"}
            />

            <ErrorSnackBar
              open={openErrorBar}
              close={handleErrorBarClose}
              msg={"Sorry! Password couldnot be updated."}
              subtitle="Please try again after sometime."
            />
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default ChangePassword;
