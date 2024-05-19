import * as React from 'react';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './SpendActivity.css';

library.add(fas)

export default function SpendActivity(activity) {
    const act = activity.activity;
    return (
        <div className='spendactivity'>
            <div className='internals'>
                <div className='cols'>
                    <FontAwesomeIcon className='icon' icon={act.icon} />
                    <div className='spendinfo'>
                        <div className='name'>{act.name}</div>
                        <div className='amount'>{'points: ' + act.amount}</div>
                        <div className='desc'>{act.description}</div>
                    </div>
                </div>
            </div>
            
        </div>
    );
}