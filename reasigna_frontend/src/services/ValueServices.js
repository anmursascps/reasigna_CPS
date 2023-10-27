import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;

class ValueServices {
  getAllUsers() {
    return axios.get(API_URL + "users/getAll", { headers: authHeader() });
  }

  deactivateUser(id) {
    return axios.post(API_URL + "users/deactivate", id, {
      headers: authHeader(),
    });
  }
  activateUser(id) {
    return axios.post(API_URL + "users/activate", id, {
      headers: authHeader(),
    });
  }

  expired_password(id) {
    return axios.post(API_URL + "users/checkPasswordChange", id, {
      headers: authHeader(),
    });
  }

  deleteUser(id) {
    return axios.post(API_URL + "users/delete", id, { headers: authHeader() });
  }

  getUserById(id) {
    return axios.post(API_URL + "users/getById", id, { headers: authHeader() });
  }

  getTramosById() {
    return axios.get(API_URL + "ejescalles/42390", { headers: authHeader() });
  }

  getAllTramos() {
    return axios.get(API_URL + "ejescalles/getAll", { headers: authHeader() });
  }

  getAllGeometries() {
    return axios.get(API_URL + "ejescalles/getGeometries", {
      headers: authHeader(),
    });
  }

  getContenidors(filterJSON) {
    return axios.post(API_URL + "contenidors/getFilters", filterJSON, {
      headers: authHeader(),
    });
  }

  getContenedoresVidrio(json) {
    return axios.post(API_URL + "contenidors/contenedoresAllFilters", json, {
      headers: authHeader(),
    });
  }

  getTest(json) {
    return axios.post(API_URL + "contenidors/test", json, {
      headers: authHeader(),
    });
  }

  getTipoContenidors() {
    return axios.get(API_URL + "contenidors/getTipoContenidors", {
      headers: authHeader(),
    });
  }

  getEmpresa() {
    return axios.get(API_URL + "contenidors/getEmpresas", {
      headers: authHeader(),
    });
  }

  getProductor() {
    return axios.get(API_URL + "contenidors/getProductor", {
      headers: authHeader(),
    });
  }

  getModelo() {
    return axios.get(API_URL + "contenidors/getModelo", {
      headers: authHeader(),
    });
  }

  getBarrios() {
    return axios.get(API_URL + "contenidors/getBarrios", {
      headers: authHeader(),
    });
  }

  getDistritos() {
    return axios.get(API_URL + "contenidors/getDistritos", {
      headers: authHeader(),
    });
  }

  getAllDistritos() {
    return axios.get(API_URL + "contenidors/getAllDistritos", {
      headers: authHeader(),
    });
  }

  getExpedientes() {
    return axios.get(API_URL + "expediente/getAll", {
      headers: authHeader(),
    });
  }

  getTipoAsunto() {
    return axios.get(API_URL + "tipoasunto/getAll", {
      headers: authHeader(),
    });
  }

  getTipoExpediente() {
    return axios.get(API_URL + "tipoexpediente/getAll", {
      headers: authHeader(),
    });
  }

  getCalles() {
    return axios.get(API_URL + "calles/getAll", {
      headers: authHeader(),
    });
  }

  getTecnicos() {
    return axios.get(API_URL + "users/getTecnicos", {
      headers: authHeader(),
    });
  }

  // New expediente
  createExpediente(expediente) {
    return axios.post(API_URL + "expediente/new", expediente, {
      headers: authHeader(),
    });
  }

  deleteExpediente(id) {
    return axios.post(API_URL + "expediente/delete", id, {
      headers: authHeader(),
    });
  }

  updateExpediente(id, expediente) {
    return axios.put(API_URL + "expediente/update/" + id, expediente, {
      headers: authHeader(),
    });
  }

  getExpedienteByFilters(filterJSON) {
    return axios.post(API_URL + "expediente/filters", filterJSON, {
      headers: authHeader(),
    });
  }
}
export default new ValueServices();
