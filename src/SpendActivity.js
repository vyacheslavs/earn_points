import * as React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './SpendActivity.css';

library.add(fas)

export default function SpendActivity(props) {
    const {activity, setActivity} = props;
    const onAct = () => {
        setActivity(activity.amount, activity.description);
    };

    return (
        <div className='spendactivity' onClick={onAct}>
            <div className='internals'>
                <div className='cols'>
                    <FontAwesomeIcon className='icon' icon={activity.icon} />
                    <div className='spendinfo'>
                        <div className='name'>{activity.name}</div>
                        <div className='amount'>{'points: ' + activity.amount}</div>
                        <div className='desc'>{activity.description}</div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}