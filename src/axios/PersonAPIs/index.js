import axios from "axios";

export const getAllPersons = () => {
  return axios.get("localhost:5000/api/person/person");
};

export const getPersonByUniqueNum = (uniqueNum) => {
  return axios.get("localhost:5000/api/person/person/" + uniqueNum);
};

export const personLogin = (emailId, password) => {
  return axios.get(
    "localhost:5000/api/person/person/login/" + emailId + "/" + password
  );
};

export const addPerson = (data) => {
  return axios.post("localhost:5000/api/person/person", data);
};

export const updatePerson = (id, data) => {
  return axios.patch("localhost:5000/api/person/person/" + id, data);
};

export const deletePerson = (id) => {
  return axios.delete("localhost:5000/api/person/person/" + id);
};
