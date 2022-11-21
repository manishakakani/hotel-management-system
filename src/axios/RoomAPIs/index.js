import axios from "axios";

export const getAllRooms = () => {
  return axios.get("http://localhost:5000/api/room/room");
};

export const getRoomByRoomID = (roomID) => {
  return axios.get("http://localhost:5000/api/room/room/" + roomID);
};

export const getServiceRequestedRooms = () => {
  return axios.get("http://localhost:5000/api/room/servicerequested");
};

export const getAvailableRooms = () => {
  return axios.get("http://localhost:5000/api/room/roomsavailable");
};

export const addRoom = (data) => {
  return axios.post("http://localhost:5000/api/room/room", data);
};

export const updateRoom = (id, data) => {
  return axios.patch("http://localhost:5000/api/room/room/" + id, data);
};

export const deleteRoom = (id) => {
  return axios.delete("http://localhost:5000/api/room/room/" + id);
};
