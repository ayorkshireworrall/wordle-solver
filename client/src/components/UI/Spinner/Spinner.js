import React from 'react';
import classes from './Spinner.module.css';

const Spinner = props => (
    <div class={classes.Loader} style={{borderLeft: `1.1em solid ${props.color}`}}>Loading...</div>
);

export default Spinner;