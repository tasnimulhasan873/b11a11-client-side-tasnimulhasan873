
import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://a11-food-sharing-server-nine.vercel.app", 
  withCredentials: true, 
});

// Optional: Add interceptors
axiosSecure.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized access - redirecting or logging out...");
     
    }
    return Promise.reject(error);
  }
);

export default axiosSecure;
