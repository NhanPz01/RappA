import axios from 'axios';
const API_URL = 'http://localhost:8080/word'; // Ensure this matches your backend URL
const WordService = {
   // Fetch all words
   findAll: async (): Promise<any[]> => {
       const response = await axios.get(`${API_URL}/all`);
       return response.data;
   },
    // Find word by word
   findByWord: async (word: string): Promise<any[]> => {
       const response = await axios.get(`${API_URL}/find/${word}`);
       return response.data;
   },
    // Get words with the same rhyme
   getWordsWithSameRhyme: async (word: string): Promise<any[]> => {
       const response = await axios.get(`${API_URL}/rhyme/${word}`);
       return response.data;
   }
};
export default WordService;