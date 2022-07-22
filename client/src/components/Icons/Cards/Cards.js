import React from 'react';
import cards from '../../../assets/icons/cards.svg';
import classes from './Cards.module.css';

const Cards = (props) => (
    <div className={classes.Cards} onClick={props.clicked}>
        <img src={cards} alt="Logo"/>
    </div>
);

export default Cards;