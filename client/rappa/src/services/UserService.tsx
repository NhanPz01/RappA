import axios from 'axios';
const API_URL = 'http://localhost:8080/user'; // Ensure this matches your backend URL

const UserService = {
    // Fetch all user records
    getUserRecords: async (username: string): Promise<any[]> => {
        const response = await axios.get(`${API_URL}/records`, { data: { username } });
        return response.data;
    },
    // Fetch a specific user record by ID
    getUserRecordById: async (username: string, id: number): Promise<any> => {
        const response = await axios.get(`${API_URL}/record/${id}`, { data: { username } });
        return response.data;
    },
    // Add a new record for a user
    addUserRecord: async (recordRequest: any): Promise<any> => {
        const response = await axios.post(`${API_URL}/record`, recordRequest);
        return response.data;
    },
    // Update an existing record by ID
    updateUserRecord: async (id: number, recordRequest: any): Promise<any> => {
        const response = await axios.put(`${API_URL}/record/${id}`, recordRequest);
        return response.data;
    },
    // Delete a record by ID
    deleteUserRecord: async (id: number): Promise<any> => {
        const response = await axios.delete(`${API_URL}/record/${id}`);
        return response.data;
    },
};

export default UserService;