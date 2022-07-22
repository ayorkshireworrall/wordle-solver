import React from 'react';
import classes from './NavigationItem.module.css';
import { NavLink } from 'react-router-dom';

const NavigationItem = props => {
    let navClass = '';
    switch (props.navType) {
        case 'SIDE_DRAWER':
            navClass = classes.NavigationItemSideDrawer;
            break;
        case 'TOOLBAR' :
            navClass = classes.NavigationItemToolbar;
            break;
        default:
            throw new Error ('Invalid use of NavigationItems component, must provide valid prop \'navType\'');
    }

    return (
        <li className={navClass}>
            <NavLink
                to={props.link}
                activeClassName={classes.active} 
                exact>{props.children}</NavLink>
        </li>
    )
}

export default NavigationItem;