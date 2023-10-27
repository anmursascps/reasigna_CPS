import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;



class routes_service {
    createRoute(file) {
        let formData = new FormData()
        formData.append("file", file)
        return axios.post(API_URL + "routes/upload", formData)
    }

    getRoutesById(id) {
        return axios.get(API_URL + "routes/" + id)
    }
}

export default new routes_service();