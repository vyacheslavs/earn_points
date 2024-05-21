import axios from 'axios';
import { signal } from '@preact/signals-react';

const server = process.env.REACT_APP_BACKEND ?? "http://localhost:3001";

const initialValue = {"total_points": 0, "history": []};
const historyBoard = signal(initialValue);

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
        return initialValue;
    }
};

export {historyBoard, updateBoardContext};

