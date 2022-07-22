import React, { useState } from 'react';

import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css';

const Layout = props => {
    const [sideDrawerOpen, setSideDrawerOpen] = useState(false);

    const toggleSideDrawer = () => {
        setSideDrawerOpen(!sideDrawerOpen);
    }
    return (
        <React.Fragment>
            <Toolbar clickLogo={toggleSideDrawer}/>
            <SideDrawer open={sideDrawerOpen} toggleOpen={toggleSideDrawer}/>
            <main className={classes.Content}>
                {props.children}
            </main>
        </React.Fragment>
    )
}

export default Layout;