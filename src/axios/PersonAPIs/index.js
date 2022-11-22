import axios from "axios";

export const getAllPersons = () => {
  return axios.get("http://localhost:5000/api/person/person");
};

export const getPersonByUniqueNum = (uniqueNum) => {
  return axios.get("http://localhost:5000/api/person/person/" + uniqueNum);
};

export const getStaff = () => {
  return axios.get("http://localhost:5000/api/person/staff");
};

export const personLogin = (emailId, password) => {
  return axios.get(
    "http://localhost:5000/api/person/person/login/" + emailId + "/" + password
  );
};

export const addPerson = (data) => {
  return axios.post("http://localhost:5000/api/person/person", data);
};

export const updatePerson = (id, data) => {
  return axios.patch("http://localhost:5000/api/person/person/" + id, data);
};

export const deletePerson = (id) => {
  return axios.delete("http://localhost:5000/api/person/person/" + id);
};
