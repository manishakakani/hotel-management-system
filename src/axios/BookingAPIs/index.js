import axios from "axios";

export const getAllBookings = () => {
  return axios.get("http://localhost:5000/api/bookings/bookings");
};

export const getPastBookings = () => {
  return axios.get("http://localhost:5000/api/bookings/pastbookings");
};

export const getFutureBookings = () => {
  return axios.get("http://localhost:5000/api/bookings/futurebookings");
};

export const getBookingByResNum = (resNum) => {
  return axios.get("http://localhost:5000/api/bookings/bookings/" + resNum);
};

export const getBookingsByCustomer = (customerID) => {
  return axios.get(
    "http://localhost:5000/api/bookings/bookings/person/" + customerID
  );
};

export const getBookingsByDate = (date) => {
  return axios.get(
    "http://localhost:5000/api/bookings/bookings/bookingdate/" + date
  );
};

export const addBooking = (data) => {
  return axios.post("http://localhost:5000/api/bookings/bookings", data);
};

export const updateBooking = (id, data) => {
  return axios.patch("http://localhost:5000/api/bookings/bookings/" + id, data);
};

export const deleteBooking = (id) => {
  return axios.delete("http://localhost:5000/api/bookings/bookings/" + id);
};

export const roomsAvailableOnAGivenDate = (roomType, date) => {
  return axios.post(
    "http://localhost:5000/api/bookings/availability/" + roomType,
    { date }
  );
};
