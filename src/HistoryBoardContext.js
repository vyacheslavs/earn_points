import axios from 'axios';
import { signal } from '@preact/signals-react';
import processEnv from './envargs';

const initialValue = {"total_points": 0, "history": []};
const historyBoard = signal(initialValue);

const updateBoardContext = async () => {
    try {
        const response = await axios.get(processEnv.server + '/history', {
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

