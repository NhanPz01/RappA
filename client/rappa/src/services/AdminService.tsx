import axios from 'axios';

const API_URL = 'http://localhost:8080/admin'; // Ensure this matches your backend URL

const AdminService = {
    getUsers: async (): Promise<any[]> => {
        const response = await axios.get(`${API_URL}/users`);
        return response.data;
    },
    getUser: async (username: string): Promise<any> => {
        const response = await axios.get(`${API_URL}/user/${username}`);
        return response.data;
    },
    deleteUser: async (username: string): Promise<void> => {
        await axios.delete(`${API_URL}/user/${username}`);
    },
    getRecords: async (): Promise<any[]> => {
        const response = await axios.get(`${API_URL}/records`);
        return response.data;
    },
    getRecord: async (id: number): Promise<any> => {
        const response = await axios.get(`${API_URL}/record/${id}`);
        return response.data;
    },
    deleteRecord: async (id: number): Promise<void> => {
        await axios.post(`${API_URL}/record/${id}`);
    },
    editUser: async (username: string, data: any): Promise<void> => {
        await axios.put(`${API_URL}/user/${username}`, data);
    },
    editRecord: async (id: number, data: any): Promise<void> => {
        await axios.put(`${API_URL}/record/${id}`, data);
    }
};

export default AdminService;