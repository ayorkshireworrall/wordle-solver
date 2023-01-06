import React, {useState, useEffect} from 'react';

import Spinner from '../Spinner/Spinner';
import classes from './LoadingMask.module.css';

const LoadingMask = props => {
    const [completed, setCompleted] = useState(0)
    useEffect(() => {
        console.log('Use effect called')
        setCompleted(props.completed)
    }, [completed])
    return props.show ? <div className={classes.LoadingMask} onClick={props.clicked}>
        <Spinner color='#ffffff'/>
        <div>Stage: {props.stage}</div>
        <div>{completed}%</div>
    </div> : null;
}

export default LoadingMask;