import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;



class routes_service {
    createRoute(file) {
        let formData = new FormData()
        formData.append("file", file)
        return axios.post(API_URL + "routes/upload", formData)
    }

    createZip(file) {
        let formData = new FormData()
        formData.append("file", file)
        return axios.post(API_URL + "api/upload/gtfs", formData)
    }

}
    
export default new routes_service();