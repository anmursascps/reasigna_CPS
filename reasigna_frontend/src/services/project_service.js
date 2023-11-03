import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;



class project_service {
    getAllProjectos() {
        return axios.get(API_URL + "api/project/all");
    }

    newProject(projectName) {
        return axios.post(API_URL + "api/project/create", projectName);
    }

    deleteProject(projectId) {
        return axios.delete(API_URL + "api/project/delete/" + projectId);
    }

}

export default new project_service()
