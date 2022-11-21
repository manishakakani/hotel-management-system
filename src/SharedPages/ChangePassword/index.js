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
import { useNavigate } from "react-router-dom";
import UserContext from "../../Contexts/UserContext";
import { updatePerson } from "../../axios/PersonAPIs";

function ChangePassword() {
  const { register, handleSubmit, formState, reset, watch } = useForm();
  const [openSuccessBar, setOpenSuccessBar] = useState(false);
  const [openErrorBar, setOpenErrorBar] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [userContext, setUserContext] = useContext(UserContext);
  const navigate = useNavigate();
  const { errors } = formState;

  const formSubmitted = (data) => {
    setOpenBackdrop(true);
    updatePerson(userContext.id, { Password: data.NewPassword })
      .then((res) => {
        let temp = userContext;
        temp.Password = data.NewPassword;
        setUserContext(temp);
        localStorage.removeItem("userinfo");
        localStorage.setItem("userinfo", JSON.stringify(temp));
        setOpenSuccessBar(true);
      })
      .catch((err) => setOpenErrorBar(true))
      .finally(() => reset());
  };

  const handleSuccessBarClose = () => {
    setOpenBackdrop(false);
    setOpenSuccessBar(false);
    handleCancel();
  };
  const handleErrorBarClose = () => {
    setOpenBackdrop(false);
    setOpenErrorBar(false);
  };

  const handleCancel = () => navigate(-1);

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
            <FormControl sx={{ marginY: "0.8rem" }}>
              <InputLabel variant="standard" htmlFor="OldPassword">
                Old Password
              </InputLabel>
              <Input
                id="OldPassword"
                type="password"
                name="OldPassword"
                {...register("OldPassword", {
                  required: "Required",
                  validate: (value) => userContext.Password === value,
                })}
              />
              {errors?.OldPassword?.type == "required" && (
                <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                  {errors.OldPassword.message}
                </FormHelperText>
              )}
              {errors?.OldPassword?.type == "validate" && (
                <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                  Old password is incorrect
                </FormHelperText>
              )}
            </FormControl>
            <FormControl sx={{ marginY: "0.8rem" }}>
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
            <FormControl sx={{ marginY: "0.8rem" }}>
              <InputLabel htmlFor="Password" variant="standard">
                Confirm Password *
              </InputLabel>
              <Input
                {...register("Password", {
                  validate: (value) => watch("NewPassword") === value,
                })} // custom message
                id="Password"
                type="password"
              />
              {errors.Password && (
                <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                  {errors.Password && (
                    <Typography variant="caption" color="error">
                      Passwords don't match!
                    </Typography>
                  )}
                </FormHelperText>
              )}
            </FormControl>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <Typography
                variant="button"
                type="cancel"
                m={2}
                component={Button}
                onClick={handleCancel}
              >
                Cancel
              </Typography>
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
