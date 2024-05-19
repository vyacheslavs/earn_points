import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import './Spend.css';
import activities from './spend.json';
import SpendActivity from './SpendActivity';

export default function Spend() {

    const [act, setAct] = React.useState("Friend come over");
    const [actAmount, setActAmount] = React.useState(50);
    
    const setSpendActivity = (amount, desc) => {
        setAct(desc);
        setActAmount(amount);
    };

    return (
    <Box sx={{bgcolor: 'background.paper', boxShadow: 1, borderRadius: 2, p: 2, minWidth: 300,}}>
        <div className='forms'>
            <div className='control'>
                <TextField id="name" label="Activity" variant="outlined" type="text" InputLabelProps={{shrink: true }} value={act}/>
            </div>
            <div className='control'>
                <TextField id="points" label="Amount of points to spend" variant="outlined" type="number" InputLabelProps={{shrink: true }} value={actAmount}/>
            </div>
            <div className='control'>
                <Button variant="contained">Spend</Button>
                <Button variant="contained">Hold</Button>
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
    </Box>
    );
}
