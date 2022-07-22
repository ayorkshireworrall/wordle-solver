import React from 'react';

import classes from './Page.module.css';

const Page = props => {
    return (
        <section className={classes.Page}>
            <div className='PageContainer'>
                {props.children}
            </div>
        </section>
    )
}

export default Page;