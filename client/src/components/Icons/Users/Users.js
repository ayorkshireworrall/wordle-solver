import React from 'react';
import users from '../../../assets/icons/users.svg';
import classes from './Users.module.css';

const Users = (props) => (
    <div className={classes.Users} onClick={props.clicked}>
        <img src={users} alt="Logo"/>
    </div>
);

export default Users;