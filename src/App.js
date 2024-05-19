import * as React from 'react';

import './App.css';
import Board from './Board.js';
import HistoryBoard from './HistoryBoard.js';
import { HistoryBoardContext } from './HistoryBoardContext';
import { updateBoardContext } from './HistoryBoardContext';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

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

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [historyBoardData, setHistoryBoardData] = React.useState({"total_points": 0});

  // load history
  React.useEffect(() => {
    async function load() {
        const data = await updateBoardContext();
        setHistoryBoardData(data);
    }    
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);

  return (
    <HistoryBoardContext.Provider value={{historyBoardData, setHistoryBoardData}}>
    <div className="App">
      <header className="App-header">
        <Box sx={{ width: '100%', height: '100%', bgcolor: 'background.paper' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label={'Total points: ' + historyBoardData.total_points} {...a11yProps(0)} />
              <Tab label="History" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <Box sx={{ backgroundColor: '#282c34',  borderRadius: 2, p: 2}}>
              <div className='board-container'>
                <Board></Board>
              </div>
            </Box>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <HistoryBoard />
          </CustomTabPanel>
        </Box>
      </header>
    </div>
  </HistoryBoardContext.Provider>
  );
}

export default App;
