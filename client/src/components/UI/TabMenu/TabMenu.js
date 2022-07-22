import React from "react";
// import cards from '../../../assets/icons/cards.svg'
import Cards from '../../Icons/Cards/Cards'
import Leaderboard from "../../Icons/Leaderboard/Leaderboard";
import Users from "../../Icons/Users/Users";
import Target from "../../Icons/Target/Target";

import classes from './TabMenu.module.css';

const TabMenu = props => {
    const iconMap = {
        'cards': <Cards/>,
        'leaderboard': <Leaderboard/>,
        'target': <Target/>,
        'users': <Users/>
    }
    
    return (
        <div className={classes.TabMenu}>
            {props.tabs.map(tab => {
                return (
                    <div key={tab.index} onClick={() => props.handleTabClick(tab.index)} className={`${classes.Tab} ${tab.index === props.activeIndex ? classes.ActiveTab : ''}`}>
                        {(tab.index === props.activeIndex || props.tabs.length < 3) && <p>{tab.label}</p>}
                        {(tab.index !== props.activeIndex && props.tabs.length > 2) && <i>{iconMap[tab.icon]}</i>}
                    </div>
                )
            })}
        </div>
    )
}

export default TabMenu