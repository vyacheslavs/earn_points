import * as React from 'react';
import { HistoryBoardContext } from './HistoryBoardContext';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function HistoryBoard() {
    const {historyBoardData} = React.useContext(HistoryBoardContext);
    
    const showDate = (dt) => {
        const dtp = new Date(dt);
        return dtp.toLocaleString();
    };

    return (
    <div className='historyboard'>
        <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="right">Activity</TableCell>
                <TableCell align="right">Points</TableCell>
                <TableCell align="right">Total</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {historyBoardData.history.map((row, index) => (
                <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                <TableCell component="th" scope="row">
                    {showDate(row.date)}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.amount}</TableCell>
                <TableCell align="right">{row.total}</TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
        </TableContainer>
    </div>);
}


