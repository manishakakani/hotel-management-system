import axios from "axios";

export const getAllRoomTypes = () => {
  return axios.get("localhost:5000/api/roomtypes/roomtypes");
};

export const getRoomTypesByRoomTypeID = (roomTypeID) => {
  return axios.get("localhost:5000/api/roomtypes/roomtypes/" + roomTypeID);
};

export const addRoomType = (data) => {
  return axios.post("localhost:5000/api/roomtypes/roomtypes", data);
};

export const updateRoomType = (id, data) => {
  return axios.patch("localhost:5000/api/roomtypes/roomtypes/" + id, data);
};

export const deleteRoomType = (id) => {
  return axios.delete("localhost:5000/api/roomtypes/roomtypes/" + id);
};
