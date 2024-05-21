import Tab from '@mui/material/Tab';
import { historyBoard } from './HistoryBoardContext';
import { useSignals } from '@preact/signals-react/runtime';

export default function TabWithCaption(ally)  {

    useSignals();
    return (
        <Tab label={'Total points: ' + historyBoard.value.total_points} {...ally} />
    );
}
