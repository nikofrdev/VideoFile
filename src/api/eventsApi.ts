import axios from 'axios';

export const fetchEvents = async () => {
  try {
    const response = await axios.get('/XxfnKp'); 
    return response.data;
  } catch (error) {
    console.error('Failed to fetch events:', error);
    throw error;
  }
};
