import {
  CheckBox,
  CheckBoxOutlineBlank,
  StayCurrentLandscapeTwoTone,
} from "@mui/icons-material";
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
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import {
  DatePicker,
  DateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { updateBooking } from "../../axios/BookingAPIs";
import { updatePaymentDetails } from "../../axios/PaymentsAPIs";
import { getAllRooms } from "../../axios/RoomAPIs";
import WindowsWidthContext from "../../Contexts/WindowsWidthContext";
import ErrorSnackBar from "../ErrorSnackBar";
import SuccessSnackBar from "../SuccessSnackBar";

function BookingUpdationForm({ bookingDetails, close }) {
  const { row, person, payment, rooms } = bookingDetails;
  const winWidth = useContext(WindowsWidthContext);
  const { register, handleSubmit, formState, reset, control, setValue } =
    useForm();
  const [openSuccessBar, setOpenSuccessBar] = useState(false);
  const [openErrorBar, setOpenErrorBar] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [allRooms, setAllRooms] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [checkInTime, setCheckInTime] = useState("");
  const [checkOutTime, setCheckOutTime] = useState("");
  const [roomIDs, setRoomIDs] = useState([]);
  const [paymentStatus, setPaymentStatus] = useState("");

  const { errors } = formState;

  const icon = <CheckBoxOutlineBlank fontSize="small" />;
  const checkedIcon = <CheckBox fontSize="small" />;

  useEffect(() => {
    getAllRooms().then((res) => setAllRooms(res.data));
  }, []);

  useEffect(() => {
    setStartDate(row?.StartDate);
    setCheckInTime(row?.CheckInTime);
    setCheckOutTime(row?.CheckOutTime);
    setRoomIDs(rooms);
    setPaymentStatus(payment?.PaymentStatus);
  }, [row]);

  const formSubmitted = (data) => {
    setOpenBackdrop(true);
    data.StartDate = dayjs(startDate).toISOString();
    data.CheckInTime = dayjs(checkInTime).toISOString();
    data.CheckOutTime = dayjs(checkOutTime).toISOString();
    data.PaymentStatus = paymentStatus;
    data.RoomIDs = Array.from(new Set(roomIDs.map((room) => room.RoomID)));
    const updatedpayments = {
      TotalAmount: data.TotalAmount,
      PaymentStatus: data.PaymentStatus,
      AmountPaid: data.AmountPaid,
    };
    if (data.AmountPaid !== payment.AmountPaid)
      updatedpayments.PaymentDate = data.PaymentDate;
    delete data.AmountPaid;
    delete data.PaymentStatus;
    console.log(data, updatedpayments);
    updateBooking(row.id, data).then((res) => {
      updatePaymentDetails(payment.id, updatedpayments).then((response) => {
        setOpenSuccessBar(true);
      });
    });
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
                value={row.BookingID}
                readonly
                name="BookingID"
                // {...register("BookingID")}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              <InputLabel variant="standard" htmlFor="Name">
                Customer Name
              </InputLabel>
              <Input
                id="Name"
                type="text"
                value={person.Name}
                readonly
                // name="Name"
                // {...register("Name")}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Arrival Date"
                  name="StartDate"
                  value={startDate}
                  format="DD-MM-YYYY"
                  onChange={(e) => {
                    setStartDate(e);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Check-in Time"
                  renderInput={(params) => <TextField {...params} />}
                  value={checkInTime}
                  onChange={(e) => {
                    setCheckInTime(e);
                  }}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="Check-out Time"
                  renderInput={(params) => <TextField {...params} />}
                  value={checkOutTime}
                  onChange={(e) => {
                    setCheckOutTime(e);
                  }}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              <InputLabel variant="standard" htmlFor="NumberOfRooms">
                Number Of Rooms
              </InputLabel>
              <Input
                id="NumberOfRooms"
                readonly
                type="text"
                defaultValue={row?.NumberOfRooms}
                name="NumberOfRooms"
                {...register("NumberOfRooms")}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              {/* <InputLabel variant="standard" htmlFor="RoomIDs">
                Rooms Assigned
              </InputLabel> */}
              <Autocomplete
                multiple
                id="checkboxes-tags-demo"
                options={allRooms}
                defaultValue={rooms}
                disableCloseOnSelect
                onChange={(event, data) => {
                  // const unique = [
                  //   ...new Map(
                  //     data.map((item) => [item["id"], item])
                  //   ).values(),
                  // ];
                  // console.log({ unique });
                  // const toreturn = Array.from(
                  //   new Set(data.map((d) => d.RoomID))
                  // );
                  setRoomIDs(data);
                }}
                getOptionLabel={(option) => option.RoomNumber}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.RoomNumber}
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
            </FormControl>
            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              <InputLabel variant="standard" htmlFor="SubTotal">
                Sub Total
              </InputLabel>
              <Input
                id="SubTotal"
                readonly
                type="text"
                defaultValue={row?.SubTotal}
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
                defaultValue={row?.AdditionalCharges}
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
                defaultValue={row?.TotalAmount}
                name="TotalAmount"
                {...register("TotalAmount")}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginY: "0.8rem" }}>
              <InputLabel variant="standard" htmlFor="AmountPaid">
                Amount Paid
              </InputLabel>
              <Input
                id="AmountPaid"
                readonly
                type="text"
                defaultValue={payment?.AmountPaid}
                name="AmountPaid"
                {...register("AmountPaid")}
              />
            </FormControl>
            <FormControl
              fullWidth
              variant="standard"
              sx={{ marginY: "0.8rem" }}
            >
              <InputLabel id="PaymentStatus">Payment Status</InputLabel>
              <Select
                fullWidth
                labelId="PaymentStatus"
                id="PaymentStatus"
                value={paymentStatus}
                onChange={(e) => {
                  setPaymentStatus(e.target.value);
                }}
                label="PaymentStatus"
              >
                <MenuItem value={"Unpaid"}>Unpaid</MenuItem>
                <MenuItem value={"Partially Paid"}>Partially Paid</MenuItem>
                <MenuItem value={"Completed"}>Completed</MenuItem>
              </Select>
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
