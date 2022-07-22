import React from 'react';
import target from '../../../assets/icons/target.svg';
import classes from './Target.module.css';

const Target = (props) => (
    <div className={classes.Target} onClick={props.clicked}>
        <img src={target} alt="Logo"/>
    </div>
);

export default Target;