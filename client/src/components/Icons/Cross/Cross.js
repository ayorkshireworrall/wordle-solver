import React from 'react';
import redcross from '../../../assets/icons/redcross.svg';
import classes from './Cross.module.css';

const Cross = (props) => (
    <div className={classes.Cross} onClick={props.clicked}>
        <img src={redcross} alt="Logo"/>
    </div>
);

export default Cross;