import { createContext } from 'react';
import axios from 'axios';
import './HistoryBoard.css';

const server = process.env.REACT_APP_BACKEND ?? "http://localhost:3001";

export const HistoryBoardContext = createContext({"total_points": 0});

const updateBoardContext = async () => {
    
    try {
        const response = await axios.get(server + '/history', {
            headers: {
              'Content-Type': 'application/json',
            },
        });

        return response.data;
    } catch (error) {
        console.error('There was an error getting the data!', error);
        return {};
    }
};

export {updateBoardContext};

