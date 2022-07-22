import React from 'react';

import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/Logo';
import classes from './Toolbar.module.css';

const Toolbar = props => {
    return (
        <header className={classes.Toolbar}>
            <Logo clicked={props.clickLogo}/>
            <div>
                <NavigationItems navType='TOOLBAR'/>
            </div>
        </header>
    )
}

export default Toolbar;