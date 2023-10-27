import axios from "axios";
import authHeader from "./auth-header";

const API_URL = process.env.REACT_APP_API_URL;


class asistenciaServices {
    getAllAsistencias() {
        return axios.get(API_URL + "asistencias/getAll", { headers: authHeader() });
    }

    getAllUnidadesObra() {
        return axios.get(API_URL + "unidadesObra/getAll", { headers: authHeader() });
    }

    getAllUnidadesObraVigentes() {
        return axios.get(API_URL + "unidadesObra/getVigentes", { headers: authHeader() });
    }

    createAsistencia(data) {
        return axios.post(API_URL + "asistencias/create", data, { headers: authHeader() });
    }

    updateAsistencia(data) {
        return axios.put(API_URL + "asistencias/update", data, { headers: authHeader() });
    }

    getAsistenciasByFilters(filterJSON) {
        return axios.post(API_URL + "asistencias/getByFilters", filterJSON, {
          headers: authHeader(),
        });
      }

    deleteAsistencia(id) {
        return axios.delete(API_URL + "asistencias/delete/" + id, { headers: authHeader() });
    }
}

export default new asistenciaServices();