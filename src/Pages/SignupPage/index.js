import React, { useEffect } from "react";
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

function SignUpPage() {
  const [openSuccessBar, setOpenSuccessBar] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const { register, handleSubmit, formState, reset, watch, getValues } =
    useForm();
  const { pathname } = useLocation();
  const parms = useParams();
  const winWidth = window.innerWidth;
  const { errors, isValid } = formState;
  const navigate = useNavigate();

  const [openErrorBar, setOpenErrorBar] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleErrorBarClose = () => {
    setErrorMsg("");
    setOpenErrorBar(false);
  };

  const handleSuccessBarClose = () => {
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
    const { name, email_id, phone_number, password, confirm_password, gender } =
      data;
    console.log({ data });
    if (password === confirm_password) {
      //   const encodedPassword = Buffer.from(password).toString("base64");
      //   let formData = {};

      //   if (access_level === undefined) {
      // registerMerchant(formData, encodedPassword);
      // reset();
      // setSuccessMsg("Sign up successful");
      //   } else {
      // const customer_id = await new Promise((resolve) => {
      //   registerUser(formData, encodedPassword)
      //     .then((response) => {
      //       if (response.status < 300) {
      //         resolve(response.data[0]);
      //       }
      //     })
      //     .catch((error) => {
      //       setErrorMsg(error.response.data);
      //     });
      // });

      reset();
      setSuccessMsg("Sign up successful!");
      //   }
    } else setErrorMsg("Passwords don't match!");
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Grid
        container
        sx={{ justifyContent: "center", alignItems: "center", height: "100vh" }}
        spacing={6}
        marginTop={8}
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
                // alignItems: "center",
                width: winWidth > 600 ? "25rem" : "75vw",
              }}
            >
              <FormControl sx={{ marginY: "0.6rem" }}>
                <InputLabel htmlFor="userName" variant="standard">
                  Name *
                </InputLabel>
                <Input
                  {...register("name", {
                    required: "Please enter your Name.",
                  })} // custom message
                  variant="standard"
                  id="userName"
                />
                {errors.name && (
                  <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                    <Typography variant="caption" color="error">
                      {errors.name.message}{" "}
                    </Typography>
                  </FormHelperText>
                )}
              </FormControl>
              <Typography
                variant="subtitle1"
                fontWeight="550"
                color="primary"
                textAlign="left"
              >
                Gender: *
              </Typography>
              <FormControl
                sx={{
                  marginY: "0.6rem",
                  flex: "display",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
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
                  <Typography
                    paddingX="0.3rem"
                    variant="subtitle2"
                    color="primary"
                  >
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
                  <Typography
                    paddingX="0.3rem"
                    variant="subtitle2"
                    color="primary"
                  >
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
                  <Typography
                    paddingX="0.3rem"
                    variant="subtitle2"
                    color="primary"
                  >
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
              )}
              <FormControl sx={{ marginY: "0.6rem" }}>
                <InputLabel htmlFor="email" variant="standard">
                  Email *
                </InputLabel>
                <Input
                  //   defaultValue={isMerchant ? merchantEmail : ""}
                  {...register("email_id", {
                    required: "Please enter your email ID.",
                  })} // custom message
                  variant="standard"
                  id="email"
                  type="email"
                  //   readOnly={isMerchant}
                />
                {errors.email_id && (
                  <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                    <Typography variant="caption" color="error">
                      {errors.email_id.message}
                    </Typography>
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl sx={{ marginY: "0.6rem" }}>
                <InputLabel htmlFor="phoneNumber" variant="standard">
                  Phone Number *
                </InputLabel>
                <Input
                  {...register("phone_number", {
                    required: "Please enter your phone number.",
                  })} // custom message
                  variant="standard"
                  id="phoneNumber"
                />
                {errors.phone_number && (
                  <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                    <Typography variant="caption" color="error">
                      {errors.phone_number.message}
                    </Typography>
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl sx={{ marginY: "0.6rem" }}>
                <InputLabel htmlFor="address" variant="standard">
                  Address *
                </InputLabel>
                <Input
                  {...register("address", {
                    required: "Please enter your address.",
                  })} // custom message
                  variant="standard"
                  id="address"
                />
                {errors.address && (
                  <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                    <Typography variant="caption" color="error">
                      {errors.address.message}{" "}
                    </Typography>
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl sx={{ marginY: "0.6rem" }}>
                <InputLabel htmlFor="ssn" variant="standard">
                  SSN *
                </InputLabel>
                <Input
                  {...register("SSN", {
                    required: "Please enter your SSN.",
                  })} // custom message
                  variant="standard"
                  id="ssn"
                />
                {errors.ssn && (
                  <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                    <Typography variant="caption" color="error">
                      {errors.ssn.message}{" "}
                    </Typography>
                  </FormHelperText>
                )}
              </FormControl>
              <FormControl sx={{ marginY: "0.6rem" }}>
                <InputLabel htmlFor="password" variant="standard">
                  Password *
                </InputLabel>
                <Input
                  {...register("password", {
                    required: "Please enter your Password.",
                    minLength: 8,
                  })} // custom message
                  variant="standard"
                  id="password"
                  type="password"
                  name="password"
                />
                {errors.password && (
                  <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                    <Typography variant="caption" color="error">
                      {errors.password.type === "minLength"
                        ? "Password should be at least 8 characters long"
                        : errors.password.message}
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
                    validate: (value) => watch("password") === value,
                  })} // custom message
                  variant="standard"
                  id="userName"
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
                  py={4}
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
        msg={successMsg}
      />
      <ErrorSnackBar
        open={openErrorBar}
        close={handleErrorBarClose}
        msg={errorMsg}
      />
    </Box>
  );
}

export default SignUpPage;
