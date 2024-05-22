import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { historyBoard } from './HistoryBoardContext';
import { useSignals } from '@preact/signals-react/runtime';

export default function HistoryBoard() {

    useSignals();
    
    const showDate = (dt) => {
        const dtp = new Date(dt);
        return dtp.toLocaleString();
    };

    return (
    <div className='historyboard'>
        <TableContainer component={Paper} style={{maxHeight:'40rem'}}>
        <Table sx={{ minWidth: 650 }} stickyHeader aria-label="simple table">
            <TableHead>
            <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="right">Activity</TableCell>
                <TableCell align="right">Points</TableCell>
                <TableCell align="right">Total</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {historyBoard.value.history.map((row, index) => (
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


