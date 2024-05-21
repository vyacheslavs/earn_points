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
import { historyBoard, updateBoardContext } from './HistoryBoardContext';
import { useSignals } from '@preact/signals-react/runtime';

const server = process.env.REACT_APP_BACKEND ?? "http://localhost:3001";

export default function Spend() {

    useSignals();
    const [act, setAct] = React.useState("Friend come over");
    const [actAmount, setActAmount] = React.useState(50);
    const [open, setOpen] = React.useState(false);
    const [promptOpen, setPromptOpen] = React.useState(false);
    const [alertMsg, setAlertMsg] = React.useState("");
    
    const setSpendActivity = (amount, desc) => {
        setAct(desc);
        setActAmount(amount);
    };

    const askBeforeSpend = async() => {
        setPromptOpen(true);
    };

    const doSpend = async () => {
        try {

            setPromptOpen(false);

            const data = {"amount": actAmount, "name": act};
            const response = await axios.post(server + '/spend', data, {
                headers: {
                  'Content-Type': 'application/json',
                },
            });

            if (!response.data.success) {
                setAlertMsg(response.data.error);
                showAlertDialog();    
            } else {
                // update history
                const h = await updateBoardContext();
                historyBoard.value = h;
            }
    
            return response.data;
        } catch (error) {
            console.error('There was an error getting the data!', error);
            setAlertMsg(error.message);
            showAlertDialog();
            return {};
        }
    };

    const showAlertDialog = () => {
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

    const handlePromptClose = () => {
        setPromptOpen(false);
    }
    

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
                <Button variant="contained" onClick={askBeforeSpend}>Spend</Button>
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
              {alertMsg}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>OK</Button>
          </DialogActions>
        </Dialog>

      <Dialog
        open={promptOpen}
        onClose={handlePromptClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Spend some points?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to spend {actAmount} points on "{act}" activity?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePromptClose} autoFocus>Cancel</Button>
          <Button onClick={doSpend}> OK</Button>
        </DialogActions>
      </Dialog>

    </Box>
    );
}
