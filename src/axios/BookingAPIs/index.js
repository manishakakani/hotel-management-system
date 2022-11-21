import axios from "axios";

export const getAllBookings = () => {
  return axios.get("localhost:5000/api/bookings/bookings");
};

export const getBookingByResNum = (resNum) => {
  return axios.get("localhost:5000/api/bookings/bookings/" + resNum);
};

export const getBookingsByCustomer = (customerID) => {
  return axios.get("localhost:5000/api/bookings/bookings/person/" + customerID);
};

export const getBookingsByDate = (date) => {
  return axios.get("localhost:5000/api/bookings/bookings/bookingdate/" + date);
};

export const addBooking = (data) => {
  return axios.post("localhost:5000/api/bookings/bookings", data);
};

export const updateBooking = (id, data) => {
  return axios.patch("localhost:5000/api/bookings/bookings/" + id, data);
};

export const deleteBooking = (id) => {
  return axios.delete("localhost:5000/api/bookings/bookings/" + id);
};
