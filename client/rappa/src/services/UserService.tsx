import axios from 'axios';
const API_URL = 'http://localhost:8080/user'; // Ensure this matches your backend URL

const UserService = {
    // Fetch all user records
    getUserRecords: async (user: any): Promise<any[]> => {
        const parsedUser = JSON.parse(user);
        console.log(parsedUser);
        const response = await axios.post(`${API_URL}/records`, parsedUser);
        return response.data;
    },
    // Fetch a specific user record by ID
    getUserRecordById: async (user: any, id: number): Promise<any> => {
        const parsedUser = JSON.parse(user);
        console.log(id);
        const response = await axios.post(`${API_URL}/record/${id}`, parsedUser);
        return response.data;
      },
    // Add a new record for a user
    addUserRecord: async (user:any, recordRequest: any): Promise<any> => {
        const response = await axios.post(`${API_URL}/record`, { user, ...recordRequest });
        return response.data;
    },
    // Update an existing record by ID
    updateUserRecord: async (user:any, id: number, recordRequest: any): Promise<any> => {
        const response = await axios.put(`${API_URL}/record/${id}`, { user, ...recordRequest });
        return response.data;
    },
    // Delete a record by ID
    deleteUserRecord: async (user:any, id: number): Promise<any> => {
        const response = await axios.delete(`${API_URL}/record/${id}`, {
            data: user
        });
        return response.data;
    },
};

export default UserService;