import axios from 'axios';

const API_URL = 'http://localhost:3000/places';

// UPDATE places by ID
export const updatePlace = async (id, updatedData) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updatedData);
        return response.data;
    } catch (error) {
        console.error('Error updating place:', error);
        throw error;
    }
};

// DELETE Place by ID
export const deletePlace = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error('Error deleting place:', error);
        throw error;
    }
};
