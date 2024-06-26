import axios from "axios";

export default axios.create({
    baseURL: 'https://micasero-backend.azurewebsites.net/',
    headers: { 'Content-type': 'application/json' }
});