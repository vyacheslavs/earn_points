import './Board.css';
import Activity from './Activity.js';
import data from './activities.json';

export default function Board() {
        return (
            <>
            {data.activities.map((item, index) => (
                <Activity key={index} name={item.name} amount={item.amount} icon={item.icon} disabled={item.disabled}></Activity>))}
            </>
        );
}
