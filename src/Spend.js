import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Spend.css';
import activities from './spend.json';
import SpendActivity from './SpendActivity';
import axios from 'axios';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { HistoryBoardContext, updateBoardContext } from './HistoryBoardContext';

const server = process.env.REACT_APP_BACKEND ?? "http://localhost:3001";

export default function Spend() {

    const [act, setAct] = React.useState("Friend come over");
    const [actAmount, setActAmount] = React.useState(50);
    const [open, setOpen] = React.useState(false);
    const [errorMsg, setErrorMsg] = React.useState("");
    const {setHistoryBoardData} = React.useContext(HistoryBoardContext);
    
    const setSpendActivity = (amount, desc) => {
        setAct(desc);
        setActAmount(amount);
    };

    const doSpend = async () => {
        try {
            const data = {"amount": actAmount, "name": act};
            const response = await axios.post(server + '/spend', data, {
                headers: {
                  'Content-Type': 'application/json',
                },
            });

            if (!response.data.success) {
                setErrorMsg(response.data.error);
                handleClickOpen();    
            } else {
                // update history
                const h = await updateBoardContext();
                setHistoryBoardData(h);
            }
    
            return response.data;
        } catch (error) {
            console.error('There was an error getting the data!', error);
            setErrorMsg(error);
            handleClickOpen();
            return {};
        }
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const onPointsChange = (event) => {
        setActAmount(event.target.value);
    };

    const onActivityNameChange = (event) => {
        setAct(event.target.value);
    };
    

    return (
    <Box sx={{bgcolor: 'background.paper', boxShadow: 1, borderRadius: 2, p: 2, minWidth: 300,}}>
        <div className='forms'>
            <div className='control'>
                <TextField id="name" label="Activity" variant="outlined" type="text" InputLabelProps={{shrink: true }} value={act} onChange={onActivityNameChange}/>
            </div>
            <div className='control'>
                <TextField id="points" label="Amount of points to spend" variant="outlined" type="number" InputLabelProps={{shrink: true }} value={actAmount} onChange={onPointsChange}/>
            </div>
            <div className='control'>
                <Button variant="contained" onClick={doSpend}>Spend</Button>
            </div>
            <div className='control'>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }} />
            </div>

            <div className='control'>
                {activities.activities.map((item, index) => (
                    <SpendActivity key={index} activity={item} setActivity={setSpendActivity} />
                ))}
            </div>
        </div>
        <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Oops something went wrong"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {errorMsg}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
    );
}
