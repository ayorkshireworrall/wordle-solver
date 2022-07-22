import React from "react";

import classes from './MissionStatus.module.css'

const MissionStatus = props => {
    let selectedClass
    switch (props.status) {
        case 'IN_PROGRESS':
            selectedClass = classes.InProgress
            break;
        case 'COMPLETE':
            selectedClass = classes.Success
            break;
        case 'FAILED':
            selectedClass = classes.Failed
            break;    
        default:
            selectedClass = classes.InProgress
            break;
    }
    return (<div className={selectedClass}></div>)
}

export default MissionStatus