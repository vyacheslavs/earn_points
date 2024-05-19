import * as React from 'react';
import { HistoryBoardContext } from './HistoryBoardContext';


export default function HistoryBoard() {
    const {historyBoardData} = React.useContext(HistoryBoardContext);
        
    // now load history from server

    return (<div className='historyboard'>Total points: {historyBoardData.total_points} </div>);
}


