import { CheckBox, CheckBoxOutlineBlank } from "@mui/icons-material";
import {
  Autocomplete,
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  FormControl,
  Input,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import WindowsWidthContext from "../../Contexts/WindowsWidthContext";
import ErrorSnackBar from "../ErrorSnackBar";
import SuccessSnackBar from "../SuccessSnackBar";

function BookingUpdationForm({ bookingDetails, close }) {
  const winWidth = useContext(WindowsWidthContext);
  const { register, handleSubmit, formState, reset, control } = useForm();
  const [openSuccessBar, setOpenSuccessBar] = useState(false);
  const [openErrorBar, setOpenErrorBar] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const { errors } = formState;

  const icon = <CheckBoxOutlineBlank fontSize="small" />;
  const checkedIcon = <CheckBox fontSize="small" />;

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
              <InputLabel variant="standard" htmlFor="BookingID">
                Booking ID
              </InputLabel>
              <Input
                id="BookingID"
                type="text"
                value={bookingDetails.BookingID}
                readonly
                name="BookingID"
                {...register("BookingID")}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              <InputLabel variant="standard" htmlFor="Name">
                Customer Name
              </InputLabel>
              <Input
                id="Name"
                type="text"
                value={bookingDetails.Name}
                readonly
                name="Name"
                {...register("Name")}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              <InputLabel variant="standard" htmlFor="StartDate">
                Arrival Date
              </InputLabel>
              <Input
                id="StartDate"
                type="text"
                value={bookingDetails.StartDate}
                readonly
                name="StartDate"
                {...register("StartDate")}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              <InputLabel variant="standard" htmlFor="CheckInTime">
                Check-in Time
              </InputLabel>
              <Input
                id="CheckInTime"
                type="text"
                defaultValue={bookingDetails?.CheckInTime}
                name="CheckInTime"
                {...register("CheckInTime")}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              <InputLabel variant="standard" htmlFor="CheckOutTime">
                Check-out Time
              </InputLabel>
              <Input
                id="CheckOutTime"
                type="text"
                defaultValue={bookingDetails?.CheckOutTime}
                name="CheckOutTime"
                {...register("CheckOutTime")}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              <InputLabel variant="standard" htmlFor="NumberOfRooms">
                Number Of Rooms
              </InputLabel>
              <Input
                id="NumberOfRooms"
                readonly
                type="text"
                defaultValue={bookingDetails?.NumberOfRooms}
                name="NumberOfRooms"
                {...register("NumberOfRooms")}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              {/* <InputLabel variant="standard" htmlFor="RoomIDs">
                Rooms Assigned
              </InputLabel> */}
              <Controller
                control={control}
                name="RoomIDs"
                render={({ field: { onChange } }) => (
                  <Autocomplete
                    multiple
                    id="checkboxes-tags-demo"
                    options={["1", "2"]}
                    defaultValue={["2"]}
                    disableCloseOnSelect
                    onChange={(event, data) => onChange(data)}
                    getOptionLabel={(option) => option}
                    renderOption={(props, option, { selected }) => (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option}
                      </li>
                    )}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        placeholder="Room Numbers"
                      />
                    )}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              <InputLabel variant="standard" htmlFor="SubTotal">
                Sub Total
              </InputLabel>
              <Input
                id="SubTotal"
                readonly
                type="text"
                defaultValue={bookingDetails?.SubTotal}
                name="SubTotal"
                {...register("SubTotal")}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              <InputLabel variant="standard" htmlFor="AdditionalCharges">
                Additional Charges
              </InputLabel>
              <Input
                id="AdditionalCharges"
                readonly
                type="text"
                defaultValue={bookingDetails?.AdditionalCharges}
                name="AdditionalCharges"
                {...register("AdditionalCharges")}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              <InputLabel variant="standard" htmlFor="TotalAmount">
                Total Amount
              </InputLabel>
              <Input
                id="TotalAmount"
                readonly
                type="text"
                defaultValue={bookingDetails?.TotalAmount}
                name="TotalAmount"
                {...register("TotalAmount")}
              />
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
                Update
              </Typography>
            </Box>
            <SuccessSnackBar
              open={openSuccessBar}
              close={handleSuccessBarClose}
              msg={"Booking details successfully updated!"}
            />
            <ErrorSnackBar
              open={openErrorBar}
              close={handleErrorBarClose}
              msg={"Sorry! Booking details couldnot be updated."}
              subtitle="Please try again after sometime."
            />
          </Box>
        </Box>
      </form>
    </Box>
  );
}

export default BookingUpdationForm;
