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
            <FontAwesomeIcon className='icon' icon={act.icon} />
        </div>
    );
}