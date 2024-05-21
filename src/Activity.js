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
import axios from 'axios';
import sha256 from 'js-sha256';
import { HistoryBoardContext } from './HistoryBoardContext';
import { updateBoardContext } from './HistoryBoardContext';
import addNotification from './notifications';

library.add(fas)
const server = process.env.REACT_APP_BACKEND ?? "http://localhost:3001";

export default function Activity({activity_data}) {

    const findActiveLimit = () => {
        var active_limit = {};
        if (!activity_data.limits)
            return active_limit;
        const d = new Date();
        let hour = d.getHours();
        
        activity_data.limits.map((limit) => {
            if (limit.active_hours.includes(hour))
                active_limit = limit;
            return undefined;
        });

        return active_limit;
    };

    const calcDisabledState = async () => {
        if (!activity_data.limits)
            return false;

        const activeLimit = findActiveLimit();
        if (!activeLimit.active_hours)
            return true;

        // check hits
        const limit_val = {"limits": activeLimit,  "day": new Date().toISOString().slice(0, 10), "name": activity_data.name};
        const limit_hash = sha256(JSON.stringify(limit_val));

        try {
            const response = await axios.get(server + '/limithits/' + limit_hash, {
                headers: {
                  'Content-Type': 'application/json',
                },
              });
    
                if (response.data.success && response.data.hits >= activeLimit.limit) {
                    return true;
                }
        } catch (error) {
            console.error('There was an error getting the data!', error);
            return true;
        }

        return false;
    };

    const [open, setOpen] = React.useState(false);
    const [openAddPoints, setOpenAddPoints] = React.useState(false);
    const [disabledState, setDisabledState] = React.useState(false);
    const {setHistoryBoardData} = React.useContext(HistoryBoardContext);

    const setDisableStateWrapper = (newstate) => {
      localStorage.setItem(activity_data.name, newstate.toString());
      setDisabledState(newstate);
    };

    React.useEffect(() => {
      let interval = setInterval(
        async () => {

          const previouslyDisabled = (localStorage.getItem(activity_data.name) === 'true');
          // check active hours
          const nowDisabled = await calcDisabledState();
          if (previouslyDisabled && nowDisabled === false) {
            addNotification({
              title: activity_data.name,
              subtitle: 'New activity available for ' + activity_data.amount + ' points',
              message: activity_data.help,
              duration: 30000,
              theme: 'darkblue',
              native: true // when using native, your OS will handle theming.
          });
          }

          setDisableStateWrapper(nowDisabled);
        }, 30000);

      async function updateDisableState() {
        setDisableStateWrapper(await calcDisabledState());
      }
      updateDisableState();
      return () => {
        clearInterval(interval);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    const handleCloseAddPoints = () => {
        setOpenAddPoints(false);   
    };

    const handleCloseAddPointsYES = async () => {
        setOpenAddPoints(false);

        try {
            const activeLimit = findActiveLimit();
            const data = {"name": activity_data.name, "amount": activity_data.amount, "limits": activeLimit};

            // now find current limit
            const response = await axios.post(server + '/addpoints', data, {
              headers: {
                'Content-Type': 'application/json',
              },
            });

            if (response.data.success) {
                setDisableStateWrapper(calcDisabledState());
                const newHist = await updateBoardContext();
                setHistoryBoardData(newHist);
            }
          } catch (error) {
            console.error('There was an error posting the data!', error);
          }
    };

    const handleClickActivity = () => {
        if (disabledState)
            return;
        setOpenAddPoints(true);
    };
  
    return (
    <div className={"activity " + (disabledState ? 'disabled' : 'enabled')}>
        <div className='internals'>
          <div><FontAwesomeIcon className='icon' icon={activity_data.icon} onClick={handleClickActivity} /></div>
          <div></div>
          <div className='name-container' onClick={handleClickActivity}>
              <div className='name' >{activity_data.name}</div>
              <div>points: {activity_data.amount}</div>
          </div>
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
