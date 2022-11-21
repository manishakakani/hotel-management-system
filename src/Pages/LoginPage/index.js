import * as React from "react";
import { useEffect } from "react";

import { useState } from "react";

import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Typography,
  Button,
  Box,
  CircularProgress,
  Backdrop,
} from "@mui/material";
import ErrorSnackBar from "../../Components/ErrorSnackBar";
import { useNavigate } from "react-router-dom";
import { personLogin } from "../../axios/PersonAPIs";
import { useContext } from "react";
import UserContext from "../../Contexts/UserContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const isUserLogged = localStorage.getItem("logged");
  const [openErrorBar, setOpenErrorBar] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsgSubtitle, setErrorMsgSubtitle] = useState("");
  const [loginData, setLoginData] = useState("");
  const [userContext, setUserContext] = useContext(UserContext);

  const [openBackdrop, setOpenBackdrop] = useState(false);
  const handleCloseBackdrop = () => setOpenBackdrop(false);

  useEffect(() => {
    if (isUserLogged) navigate("/");
  }, [isUserLogged]);

  const handleErrorBarClose = () => {
    setOpenErrorBar(false);
    setErrorMsg("");
    setErrorMsgSubtitle("");
  };

  const handleSignUp = () => navigate("/signup");

  const validatePassword = (data) => {
    console.log({ validatePassword: data });
    return false;
  };

  useEffect(() => {
    if (loginData && JSON.stringify(loginData).length) {
      localStorage.setItem("userinfo", JSON.stringify(loginData));
      setUserContext(loginData);
      if (loginData.Role == "Customer") navigate("/rooms");
      else if (loginData.Role == "Admin") navigate("/admin/rooms");
      else if (loginData.Role == "Staff") navigate("/staff/bookings");
      else navigate("/");
    }
  }, [loginData]);

  const onSubmit = (event) => {
    setOpenBackdrop(true);
    event.preventDefault();
    const emailID = event.target[0].value;
    const password = event.target[1].value;
    if (emailID.length && password.length) {
      personLogin(emailID, password)
        .then((response) => {
          console.log(response);
          if (response.data.length) {
            console.log(response.data[0], JSON.stringify(response.data[0]));

            setLoginData(response.data[0]);
          }
          setOpenBackdrop(false);
        })
        .catch((err) => {
          if (err) {
            console.log({ err });
            setOpenBackdrop(false);
            setErrorMsg("Unable to login!");
            setErrorMsgSubtitle("Please check your credentials and try again");
          }
        });
    }
  };

  useEffect(() => {
    errorMsgSubtitle.length && setOpenErrorBar(true);
  }, [errorMsgSubtitle]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        marginTop: 4,
        alignItems: "center",
      }}
    >
      <Typography variant="h3" color="primary">
        Sign In
      </Typography>
      <form
        onSubmit={validatePassword && onSubmit}
        style={{
          marginTop: "3em",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <FormControl>
          <InputLabel htmlFor="emailID">Email address</InputLabel>
          <Input
            required
            id="emailID"
            type="email"
            aria-describedby="my-helper-text"
          />
        </FormControl>
        <Box height="2rem" />
        <FormControl>
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input
            required
            id="password"
            type="password"
            aria-describedby="my-helper-text"
          />
          <FormHelperText id="pw-helper-text">
            Password Should be at least 8 characters long.
          </FormHelperText>
        </FormControl>
        <FormControl>
          <Button
            type="submit"
            sx={{ marginY: "1.2rem" }}
            variant="contained"
            py={2}
          >
            <Typography variant="subtitle2" color="white">
              Submit
            </Typography>
          </Button>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              variant="caption"
              onClick={handleSignUp}
              textAlign="left"
              sx={{ cursor: "pointer", "&:hover": { color: "primary" } }}
            >
              Don't have an account? Sign Up now!
            </Typography>
          </Box>
        </FormControl>
      </form>
      <ErrorSnackBar
        open={openErrorBar}
        close={handleErrorBarClose}
        msg={errorMsg}
        caption={errorMsgSubtitle}
      />
      <Backdrop sx={{ color: "#fff" }} open={openBackdrop}>
        <CircularProgress color="primary" />
      </Backdrop>
    </Box>
  );
};
export default LoginPage;
