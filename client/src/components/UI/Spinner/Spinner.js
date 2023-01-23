import React from 'react';
import classes from './Spinner.module.css';

const Spinner = props => (
    <div className={classes.Loader} style={{borderLeft: `1.1em solid ${props.color}`, width: `${props.size}em`, height: `${props.size}em`}}>Loading...</div>
);

export default Spinner;