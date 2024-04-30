import axios from "axios";

const API_URL = "http://localhost:8000";


export const login = async (email, password) => {
    axios.defaults.withCredentials = true;

    try {
        const response = await axios.post(`${API_URL}/login`, {
            email,
            password,
        });
        console.log(`${API_URL}/login`)
        sessionStorage.setItem("session", response.headers["set-cookie"]);
        return response.data;
    } catch (error) {
        return Promise.reject(error.response.data);
    }
};




export const logout = async () => {
    axios.defaults.withCredentials = true;
    console.log("logout")
    try {
        const response = await axios.post(`${API_URL}/logout`, {
            headers: {
                Cookie: sessionStorage.getItem("session"),
            },
        });
        sessionStorage.removeItem("session");
        Document.cookie.clear();
        return response.data;
    } catch (error) {
        return Promise.reject(error.response.data);
    }
}