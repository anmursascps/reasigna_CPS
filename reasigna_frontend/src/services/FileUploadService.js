import axios from "axios";
import authHeader from './auth-header';

class FileUploadService {
    upload(file) {
        let formData = new FormData();
        formData.append("file", file);
        return axios.post(
            "http://localhost:8091/api/files/upload",
            formData,
            { headers: authHeader() }
        );
    }
}

export default new FileUploadService();