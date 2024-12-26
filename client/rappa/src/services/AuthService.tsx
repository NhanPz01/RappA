import axios from 'axios';

// const API_URL = 'http://localhost:8080/auth'; // Base URL for auth endpoints
const API_URL = 'https://qcc354tc-8080.asse.devtunnels.ms/auth'; // Base URL for auth endpoints

const AuthService = {  // Changed to AuthService
    signup: async (user: any): Promise<any> => {
        try {
            const response = await axios.post(`${API_URL}/signup`, user);
            return response.data;
        } catch (error) {
            console.error("Signup error:", error);
            throw error; // Re-throw for handling in the calling component
        }
    },

    signin: async (authRequest: any): Promise<any> => {
        try {
            const response = await axios.post(`${API_URL}/signin`, authRequest);
            return response.data;
        } catch (error) {
            console.error("Signin error:", error);
            throw error;
        }
    },

    logout: async (): Promise<any> => { // Assuming your logout is a POST request
        try {
            const response = await axios.post(`${API_URL}/logout`); // Adjust if different method
            return response.data;
        } catch (error) {
            console.error("Logout error:", error);
            throw error;
        }
    },

    userAccess: async (): Promise<any> => {
        try {
            const response = await axios.get(`${API_URL}/user`);
            return response.data;
        } catch (error) {
            console.error("User access error:", error);
            throw error;
        }
    }
};

export default AuthService;