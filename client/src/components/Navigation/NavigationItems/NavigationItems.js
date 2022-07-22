import React from 'react';

import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.module.css';

const NavigationItems = props => {

    let navClass = '';
    switch (props.navType) {
        case 'SIDE_DRAWER':
            navClass = classes.NavigationItemsSideDrawer;
            break;
        case 'TOOLBAR' :
            navClass = classes.NavigationItemsToolbar;
            break;
        default:
            throw new Error ('Invalid use of NavigationItems component, must provide valid prop \'navType\'');
    }

    return (
        <nav className={navClass}>
            <ul>
                <NavigationItem navType={props.navType} link="/home">Home</NavigationItem>
                <NavigationItem navType={props.navType} link="/current">Current</NavigationItem>
                <NavigationItem navType={props.navType} link="/past">Past</NavigationItem>
            </ul>
        </nav>
    )
}

export default NavigationItems;