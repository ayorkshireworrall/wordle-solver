import React from 'react';
import imgLogo from '../../assets/images/logo.png';
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo} onClick={props.clicked}>
        <img src={imgLogo} alt="Logo"/>
    </div>
);

export default logo;