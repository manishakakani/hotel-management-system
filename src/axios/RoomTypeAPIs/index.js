import axios from "axios";

export const getAllRoomTypes = () => {
  return axios.get("http://localhost:5000/api/roomtypes/roomtypes");
};

export const getRoomTypesByRoomTypeID = (roomTypeID) => {
  return axios.get(
    "http://localhost:5000/api/roomtypes/roomtypes/" + roomTypeID
  );
};

export const addRoomType = (data) => {
  return axios.post("http://localhost:5000/api/roomtypes/roomtypes", data);
};

export const updateRoomType = (id, data) => {
  return axios.patch(
    "http://localhost:5000/api/roomtypes/roomtypes/" + id,
    data
  );
};

export const deleteRoomType = (id) => {
  return axios.delete("http://localhost:5000/api/roomtypes/roomtypes/" + id);
};
