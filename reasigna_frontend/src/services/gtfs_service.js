import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;



class gtfs_service {
    getGtfsByProjectId(projectId) {
        return axios.get(API_URL + "api/upload/" + projectId);
    }

    createGtfs(gtfs) {
        return axios.post(API_URL + "api/upload/new", gtfs);
    }

    createZip(file) {
        let formData = new FormData()
        formData.append("file", file)
        return axios.post(API_URL + "api/upload/validate_gtfs", formData)
    }

    saveOnDatabase(file, nombre, projectId) {
        let formData = new FormData()
        formData.append("file", file)
        formData.append("nombre", nombre)
        return axios.post(API_URL + "api/upload/save_gtfs/" + projectId, formData)
    }

    deleteGtfs(gtfsId) {
        return axios.delete(API_URL + "api/upload/delete/" + gtfsId);
    }

    getGtfsById(id) {
        return axios.get(API_URL + "api/upload/gtfs/" + id)
    }

    getTripById(id) {
        return axios.get(API_URL + "trips/" + id)
    }



}

export default new gtfs_service()
