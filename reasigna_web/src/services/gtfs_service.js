import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;



class gtfs_service {
    getGtfsByProjectId(projectId) {
        return axios.get(API_URL + "api/upload/" + projectId);
    }



}

export default new gtfs_service()
