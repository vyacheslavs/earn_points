import * as React from 'react';
import { HistoryBoardContext } from './HistoryBoardContext';
import { updateBoardContext } from './HistoryBoardContext';
import sha256 from 'js-sha256';

const server = process.env.REACT_APP_BACKEND ?? "http://localhost:3001";

var isEqualsJson = (obj1,obj2)=>{
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    //return true when the two json has same length and all the properties has same value key by key
    return keys1.length === keys2.length && Object.keys(obj1).every(key=>obj1[key]==obj2[key]);
}

export default function HistoryBoard() {

    console.log("rerender");
    const {historyBoardData, setHistoryBoardData} = React.useContext(HistoryBoardContext);
    
    React.useEffect(() => {
        setTimeout(async () => {
            const data = await updateBoardContext();
            const data_sha = sha256(JSON.stringify(data));
            const his_sha = sha256(JSON.stringify(historyBoardData));
            if (data_sha != his_sha) {
                setHistoryBoardData(data);
            }
        }, 0);
    });
    
    // now load history from server

    return (<div className='historyboard'>Total points: {historyBoardData.total_points} </div>);
}


