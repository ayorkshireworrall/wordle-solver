import React from 'react';
import greentick from '../../../assets/icons/greentick.svg';
import classes from './Tick.module.css';

const Tick = (props) => (
    <div className={classes.Tick} onClick={props.clicked}>
        <img src={greentick} alt="Logo"/>
    </div>
);

export default Tick;