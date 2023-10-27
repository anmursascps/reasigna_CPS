import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;



class agency_service {
    createAgency(file) {
        let formData = new FormData()
        formData.append("file", file)
        return axios.post(API_URL + "agency/upload", formData)
    }

}
    
export default new agency_service();