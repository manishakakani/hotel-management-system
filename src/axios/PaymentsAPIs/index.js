import axios from "axios";

export const getAllPaymentDetails = () => {
  return axios.get("localhost:5000/api/payments/payments");
};

export const getPaymentDetailsByReservationNum = (resNum) => {
  return axios.get("localhost:5000/api/payments/payments/" + resNum);
};

export const addPaymentDetails = (data) => {
  return axios.post("localhost:5000/api/payments/payments", data);
};

export const updatePaymentDetails = (id, data) => {
  return axios.patch("localhost:5000/api/payments/payments/" + id, data);
};

export const deletePaymentDetails = (id) => {
  return axios.patch("localhost:5000/api/payments/payments/" + id);
};
