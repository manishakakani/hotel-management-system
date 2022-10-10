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

const LoginPage = () => {
  const winWidth = window.innerWidth;
  const navigate = useNavigate();
  const isUserLogged = localStorage.getItem("logged");
  const [openErrorBar, setOpenErrorBar] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [errorMsgSubtitle, setErrorMsgSubtitle] = useState("");
  const [loginData, setLoginData] = useState("");

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
      const key = loginData.getsignin[0].customer_uuid;
      const userKey = JSON.stringify(key);
      let accessLevel = loginData.getsignin[0].access_level;
      localStorage.setItem(`${process.env.REACT_APP_CUSTOMERUUID}`, userKey);
      localStorage.setItem(`${process.env.REACT_APP_ACCESSLEVEL}`, accessLevel);
      navigate("/");
    }
  }, [loginData]);

  const onSubmit = (event) => {
    setOpenBackdrop(true);
    event.preventDefault();
    const formData = {
      emailID: event.target[0].value,
      password: event.target[1].value,
    };
    if (formData.password.length < 8) {
      setOpenBackdrop(false);
      setErrorMsg("Password should be at least 8 characters");
      setErrorMsgSubtitle("Please try again!");
    } else {
      // userLogin(formData)
      //   .then((response) => {
      //     console.log("userLogin: ", response);
      //     if (response.status < 300) {
      //       setLoginData(response.data);
      //     }
      //   })
      //   .catch((err) => {
      //     if (err) {
      //       if (err.response) {
      //         if (err.response.data) {
      //           const data = err.response.data;
      //           if (data.length > 0) {
      //             setErrorMsg(data[0]);
      //             setErrorMsgSubtitle(data[1]);
      //           } else {
      //             setErrorMsg("unable to login");
      //           }
      //         }
      //       }
      //     }
      //   });
    }
  };

  useEffect(() => {
    errorMsgSubtitle.length && setOpenErrorBar(true);
  }, [errorMsgSubtitle]);

  return (
    <Box
      sx={{
        display: "flex",
        height: "80vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form
        onSubmit={validatePassword && onSubmit}
        style={{
          marginTop: "3em",
          display: "flex",
          flexDirection: "column",
          width: winWidth < 400 ? "16rem" : "22rem",
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
