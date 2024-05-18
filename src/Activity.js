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
  
    return (
    <div className={"activity " + (disabledState ? 'disabled' : 'enabled')}>
        <div><FontAwesomeIcon className='icon' icon={activity_data.icon} /></div>
        <div></div>
        <div className='name-container'>
            <div className='name'>{activity_data.name}</div>
            <div>points: {activity_data.amount}</div>
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
    </div>);
}
