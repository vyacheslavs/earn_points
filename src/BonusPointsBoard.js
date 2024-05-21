import * as React from 'react';
import Box from '@mui/material/Box';
import './BonusPointsBoard.css';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import axios from 'axios';
import {historyBoard, updateBoardContext} from './HistoryBoardContext';

const secret = process.env.BONUS_REWARD_SECRET ?? "";
const server = process.env.REACT_APP_BACKEND ?? "http://localhost:3001";

export default function BonusPointsBoard() {

    const [promptDialogOpened, setPromptDialogOpened] = React.useState(false);
    const [activityName, setActivityName] = React.useState("Describe bonus activity");
    const [activityPoints, setActivityPoints] = React.useState(0);
    const [secretInForms, setSecretInForms] = React.useState("");
    const [snackBarOpened, setSnackBarOpened] = React.useState(false);
    const [snackBarMessage, setSnackBarMessage] = React.useState("You actually don't know the secret, right?");
    const closePromptDialog = () => setPromptDialogOpened(false);
    const doReward = () => {
        setPromptDialogOpened(false);

        if (secret.length > 0) {
            let promptedSecret = localStorage.getItem("bonus-points-secret");
            if (promptedSecret === null) {
                promptedSecret = secretInForms;
            }

            if (secret != promptedSecret) {
                setSnackBarMessage("You actually don't know the secret, right?");
                setSnackBarOpened(true);
                localStorage.removeItem("bonus-points-secret");
                return;
            }
            localStorage.setItem("bonus-points-secret", secret);
        }
        try {
            const data = {"name": activityName, "amount": parseInt(activityPoints), "limits": {}};
            axios.post(server + '/addpoints', data, {
                headers: {
                  'Content-Type': 'application/json',
                },
              }).then(res => {
                if (res.data.success) {
                    updateBoardContext().then(newHist => {
                        historyBoard.value = newHist;
                    })    
                }    
              });    
        } catch(er) {
            console.error("Failed to post reward", er);
        }
};

    const needSecret = () => {
        if (secret.length == 0)
            return false;
        if (localStorage.getItem("bonus-points-secret") !== null)
            return false; //already authenticated
        return true;
    };

    return (
        <div className='bonus-points-board-container'>
            <Box sx={{bgcolor: 'background.paper', boxShadow: 1, borderRadius: 2, p: 2, minWidth: 300,}}>
                <div className='forms'>
                    <div className='control'>
                        <TextField id="name" label="Bonus activity" variant="outlined" type="text" InputLabelProps={{shrink: true }} value={activityName} onChange={(e) => setActivityName(e.target.value)}/>
                    </div>
                    <div className='control'>
                        <TextField id="points" label="Amount of points to reward" variant="outlined" type="number" InputLabelProps={{shrink: true }} value={activityPoints} onChange={(e) => setActivityPoints(e.target.value)}/>
                    </div>
                    {needSecret() ? 
                        <div className='control'>
                            <TextField id="secret" label="Special secret" variant="outlined" type="password" InputLabelProps={{shrink: true }} value={secretInForms} onChange={(e) => setSecretInForms(e.target.value)}/>
                        </div>
                     : <></>}
                    <div className='control'>
                        <Button variant="contained" onClick={(e) => setPromptDialogOpened(true)}>Reward</Button>
                    </div>
                </div>
            </Box>

            <Dialog
                open={promptDialogOpened}
                onClose={closePromptDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Reward points for " + activityName}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Would you like reward {activityPoints} points for {activityName} ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={doReward} autoFocus>OK</Button>
                    <Button onClick={closePromptDialog}>Cancel</Button>
                </DialogActions>
            </Dialog>
            <Snackbar
                open={snackBarOpened}
                onClose={() => setSnackBarOpened(false)}
                autoHideDuration={5000}
                message={snackBarMessage}
            />
        </div>
    );
};