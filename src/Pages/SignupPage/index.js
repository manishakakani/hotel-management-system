import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation, useParams } from "react-router";

import {
  Input,
  InputLabel,
  Typography,
  FormHelperText,
  FormControl,
  Box,
  Button,
  Grid,
} from "@mui/material";
import SuccessSnackBar from "../../Components/SuccessSnackBar";
import ErrorSnackBar from "../../Components/ErrorSnackBar";
import WindowsWidthContext from "../../Contexts/WindowsWidthContext";
import { addPerson } from "../../axios/PersonAPIs";

function SignUpPage() {
  const [openSuccessBar, setOpenSuccessBar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const { register, handleSubmit, formState, reset, watch, getValues } =
    useForm();
  const { pathname } = useLocation();
  const parms = useParams();
  const winWidth = useContext(WindowsWidthContext);
  const { errors, isValid } = formState;
  const navigate = useNavigate();

  const [openErrorBar, setOpenErrorBar] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleErrorBarClose = () => {
    setErrorMsg("");
    setOpenErrorBar(false);
  };

  const handleSuccessBarClose = () => {
    reset();
    onSuccessSignUp();
    setSuccessMsg("");
    setOpenSuccessBar(false);
  };

  const onSuccessSignUp = () => {
    navigate("/login");
  };

  const handleOnCancel = () => navigate(-1);

  useEffect(() => {
    errorMsg.length && setOpenErrorBar(true);
  }, [errorMsg]);
  useEffect(() => {
    successMsg.length && setOpenSuccessBar(true);
  }, [successMsg]);

  const onSubmit = (data) => {
    delete data.confirm_password;
    data.Role = "Customer";
    addPerson(data)
      .then((res) => setOpenSuccessBar(true))
      .catch((err) => setOpenErrorBar(true));
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" color="primary" marginTop={2}>
        Sign Up
      </Typography>
      <Grid
        container
        sx={{ justifyContent: "center", alignItems: "center" }}
        spacing={2}
      >
        <Grid item>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
              display: "flex",
              padding: "1rem",
              paddingTop: 0,
              "justify-content": "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: winWidth > 600 ? "25rem" : "75vw",
              }}
            >
              <FormControl sx={{ marginY: "0.6rem" }}>
                <InputLabel htmlFor="userName" variant="standard">
                  Name *
                </InputLabel>
                <Input
                  {...register("Name", {
                    required: "Please enter your Name.",
                  })} // custom message
                  variant="standard"
                  id="userName"
                />
                {errors.Name && (
                  <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                    <Typography variant="caption" color="error">
                      {errors.Name.message}{" "}
                    </Typography>
                  </FormHelperText>
                )}
              </FormControl>
              {/* <FormControl
                sx={{
                  marginY: "0.6rem",
                  flex: "display",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="title:"
                  textAlign="left"
                  paddingRight={2}
                  color="text.secondary"
                >
                  Gender
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    style={{ accentColor: "#e56717" }}
                    {...register("gender", {
                      required: "Please select the gender",
                    })}
                  />
                  <Typography paddingX="0.3rem" variant="subtitle2">
                    Male
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    style={{ accentColor: "#e56717" }}
                    {...register("gender", {
                      required: "Please select the gender",
                    })}
                  />
                  <Typography paddingX="0.3rem" variant="subtitle2">
                    Female
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    style={{ accentColor: "#e56717" }}
                    {...register("gender", {
                      required: "Please select the gender",
                    })}
                  />
                  <Typography paddingX="0.3rem" variant="subtitle2">
                    Other
                  </Typography>
                </Box>
              </FormControl>
              {errors.gender && (
                <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                  <Typography variant="caption" color="error">
                    {errors.gender.message}
                  </Typography>
                </FormHelperText>
              )} */}
              <FormControl sx={{ marginY: "0.6rem" }}>
                <InputLabel htmlFor="email" variant="standard">
                  Email *
                </InputLabel>
                <Input
                  //   defaultValue={isMerchant ? merchantEmail : ""}
                  {...register("EmailID", {
                    required: "Please enter your Email ID.",
                  })} // custom message
                  variant="standard"
                  id="email"
                  type="email"
                  //   readOnly={isMerchant}
                />
                {errors.EmailID && (
                  <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                    <Typography variant="caption" color="error">
                      {errors.EmailID.message}
                    </Typography>
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl sx={{ marginY: "0.6rem" }}>
                <InputLabel htmlFor="phoneNumber" variant="standard">
                  Phone Number *
                </InputLabel>
                <Input
                  {...register("PhoneNumber", {
                    required: "Please enter your phone number.",
                  })} // custom message
                  variant="standard"
                  id="phoneNumber"
                />
                {errors.PhoneNumber && (
                  <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                    <Typography variant="caption" color="error">
                      {errors.PhoneNumber.message}
                    </Typography>
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl sx={{ marginY: "0.6rem" }}>
                <InputLabel htmlFor="address" variant="standard">
                  Address *
                </InputLabel>
                <Input
                  {...register("Address", {
                    required: "Please enter your address.",
                  })} // custom message
                  variant="standard"
                  id="address"
                />
                {errors.Address && (
                  <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                    <Typography variant="caption" color="error">
                      {errors.Address.message}{" "}
                    </Typography>
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl sx={{ marginY: "0.6rem" }}>
                <InputLabel htmlFor="password" variant="standard">
                  Password *
                </InputLabel>
                <Input
                  {...register("Password", {
                    required: "Please enter your Password.",
                    minLength: 8,
                  })} // custom message
                  variant="standard"
                  id="password"
                  type="password"
                />
                {errors.Password && (
                  <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                    <Typography variant="caption" color="error">
                      {errors.Password.type === "minlength"
                        ? "Password should be at least 8 characters long"
                        : errors.Password.message}
                    </Typography>
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl sx={{ marginY: "0.6rem" }}>
                <InputLabel htmlFor="ConfirmPassword" variant="standard">
                  Confirm Password *
                </InputLabel>
                <Input
                  {...register("confirm_password", {
                    validate: (value) => watch("Password") === value,
                  })} // custom message
                  variant="standard"
                  id="confirmPassword"
                  type="password"
                />
                {errors.confirm_password && (
                  <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                    {errors.confirm_password && (
                      <Typography variant="caption" color="error">
                        Passwords don't match!
                      </Typography>
                    )}
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl>
                <Box
                  my={4}
                  sx={{ display: "flex", justifyContent: "space-around" }}
                >
                  <Button
                    variant="contained"
                    color="info"
                    onClick={handleOnCancel}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="contained">
                    Submit
                  </Button>
                </Box>
              </FormControl>
            </Box>
          </form>
        </Grid>
      </Grid>
      <SuccessSnackBar
        open={openSuccessBar}
        close={handleSuccessBarClose}
        msg="Signup Successful!"
      />
      <ErrorSnackBar
        open={openErrorBar}
        close={handleErrorBarClose}
        msg="Couldn't signup at the moment."
        caption="Please try again later."
      />
    </Box>
  );
}

export default SignUpPage;
