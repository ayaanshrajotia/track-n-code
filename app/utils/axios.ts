import axios from "axios";

const axiosInstance = axios.create({
    baseURL:
        process.env.NEXT_PUBLIC_SERVER_ORIGIN || "http://localhost:3000/api",
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true, // If using authentication (cookies, tokens, etc.)
});

export default axiosInstance;
