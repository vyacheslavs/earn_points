import './Activity.css';
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(fas)

export default function Activity({name, amount, icon, disabled}) {
    return (
    <div className={"activity " + (disabled ? 'disabled' : 'enabled')}>
        <div><FontAwesomeIcon className='icon' icon={icon} /></div>
        <div></div>
        <div className='name-container'>
            <div className='name'>{name}</div>
            <div>points: {amount}</div>
        </div>
        
    </div>);
}
