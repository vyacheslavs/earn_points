import * as React from 'react';
import './App.css';
import Board from './Board.js';
import HistoryBoard from './HistoryBoard.js';
import { historyBoard, updateBoardContext } from './HistoryBoardContext';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Spend from './Spend.js';
import { useSignals } from '@preact/signals-react/runtime';

updateBoardContext().then(data => historyBoard.value = data);

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

function App() {

  useSignals();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="App">
      <header className="App-header">
        <Box sx={{ width: '100%', height: '100%', bgcolor: 'background.paper' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label={'Total points: ' + historyBoard.value.total_points} {...a11yProps(0)} />
              <Tab label="Spend" {...a11yProps(1)} />
              <Tab label="History" {...a11yProps(2)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Box sx={{ backgroundColor: '#282c34',  borderRadius: 2, p: 2}}>
              <div className='board-container'>
                <Board/>
              </div>
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Spend />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <HistoryBoard />
          </CustomTabPanel>
        </Box>
      </header>
    </div>
  );
}

export default App;
