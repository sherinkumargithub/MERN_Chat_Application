// here we gonna build the instance for the api calls from the backend
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true
})