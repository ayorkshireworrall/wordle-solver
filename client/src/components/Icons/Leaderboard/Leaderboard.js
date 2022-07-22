import React from 'react';
import leaderboard from '../../../assets/icons/leaderboard.svg';
import classes from './Leaderboard.module.css';

const Leaderboard = (props) => (
    <div className={classes.Leaderboard} onClick={props.clicked}>
        <img src={leaderboard} alt="Logo"/>
    </div>
);

export default Leaderboard;