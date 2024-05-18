import * as React from 'react';
import './Activity.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import IconButton from '@mui/material/IconButton';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { pink } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

library.add(fas)

export default function Activity({activity_data}) {

    const calcDisabledState = () => {
        const d = new Date();
        let hour = d.getHours();
        if (!activity_data.limits)
            return false;

        let is_disabled = true;
        activity_data.limits.map((limit) => {
            if (limit.active_hours.includes(hour))
                is_disabled = false;
            return undefined;
        });

        return is_disabled;
    };

    const [open, setOpen] = React.useState(false);
    const [openAddPoints, setOpenAddPoints] = React.useState(false);
    const [disabledState, setDisabledState] = React.useState(calcDisabledState());

    React.useEffect(() => {
        setInterval(
            () => {
                // check active hours
                setDisabledState(calcDisabledState());
            }, 5000);
    });

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    const handleCloseAddPoints = () => {
        setOpenAddPoints(false);   
    };

    const handleCloseAddPointsYES = () => {
        const server = process.env.REACT_APP_BACKEND ?? "localhost:3001";
        console.log(server);
        setOpenAddPoints(false);   
    };

    const handleClickActivity = () => {
        if (disabledState)
            return;
        setOpenAddPoints(true);
    };
  
    return (
    <div className={"activity " + (disabledState ? 'disabled' : 'enabled')}>
        <div><FontAwesomeIcon className='icon' icon={activity_data.icon} onClick={handleClickActivity} /></div>
        <div></div>
        <div className='name-container'>
            <div className='name' onClick={handleClickActivity}>{activity_data.name}</div>
            <div onClick={handleClickActivity}>points: {activity_data.amount}</div>
        </div>
        <div className='help'>
            <IconButton onClick={handleClickOpen}>
                <HelpOutlineIcon sx={{ color: pink[500] }}/>
            </IconButton>
        </div>

        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
          {activity_data.help_caption}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {activity_data.help}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>OK</Button>
        </DialogActions>
      </Dialog>

      <Dialog
            open={openAddPoints}
            onClose={handleCloseAddPoints}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title">
          {activity_data.help_caption}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to add points for this activity?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddPointsYES}>YES</Button>
          <Button onClick={handleCloseAddPoints}>NO</Button>
        </DialogActions>
      </Dialog>

    </div>);
}
