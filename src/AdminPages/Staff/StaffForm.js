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
import { addPerson } from "../../axios/PersonAPIs";

function StaffForm({ isNew = true, details = {}, close }) {
  const winWidth = useContext(WindowsWidthContext);
  const { register, handleSubmit, formState, reset } = useForm();
  const [openSuccessBar, setOpenSuccessBar] = useState(false);
  const [openErrorBar, setOpenErrorBar] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);

  const { errors } = formState;

  useEffect(() => {}, []);

  const formSubmitted = (data) => {
    data.Role = "Staff";
    addPerson(data)
      .then((res) => setOpenSuccessBar(true))
      .catch((err) => setOpenErrorBar(true));
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
                Name
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
            </FormControl> */}

            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              <InputLabel variant="standard" htmlFor="Address">
                Address
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
                Phone Number
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
                Email ID
              </InputLabel>
              <Input
                id="EmailID"
                type="text"
                defaultValue={!isNew ? details.EmailID : null}
                name="EmailID"
                {...register("EmailID", {
                  required: "Email ID is required",
                })}
              />
              {errors.EmailID && (
                <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                  {errors.EmailID.message}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              <InputLabel variant="standard" htmlFor="SSN">
                Social Security Number
              </InputLabel>
              <Input
                id="SSN"
                type="text"
                defaultValue={!isNew ? details.SSN : null}
                name="SSN"
                {...register("SSN", {
                  required: "SSN is required",
                })}
              />
              {errors.SSN && (
                <FormHelperText sx={{ color: "#D72A2A" }} id="my-helper-text">
                  {errors.SSN.message}
                </FormHelperText>
              )}
            </FormControl>

            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              <InputLabel variant="standard" htmlFor="Password">
                Password
              </InputLabel>
              <Input
                id="Password"
                type="text"
                defaultValue={!isNew ? details.Password : null}
                name="Password"
                {...register("Password", {
                  required: "Password is required",
                })}
              />
              <FormHelperText color="text.secondary">
                Staff member can change the password after logging in.
              </FormHelperText>
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
                  ? "Staff Member successfully added!"
                  : "Staff Member successfully updated!"
              }
            />

            <ErrorSnackBar
              open={openErrorBar}
              close={handleErrorBarClose}
              msg={
                isNew
                  ? "Sorry! Staff Member couldnot be added."
                  : "Sorry! Staff Member couldnot be updated."
              }
              subtitle="Please try again after sometime."
            />
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default StaffForm;
