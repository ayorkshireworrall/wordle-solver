import React, { useState } from "react";

import classes from './GuessData.module.css';

const GuessData = props => {

    const postGuessSolutions = props.data.postGuessSolutions
    const guessScore = props.data.guessScore
    const suggestedWord = props.data.suggestedWord
    const postSuggestedSolutions = props.data.postSuggestedSolutions
    const suggestedScore = props.data.suggestedScore
    const expanded = props.expanded

    const [playerExpanded, setPlayerExpanded] = useState(false)
    const [suggestedExpanded, setSuggestedExpanded] = useState(false)

    const togglePlayerStats = () => {
        setPlayerExpanded(!playerExpanded)
    }

    const toggleSuggestedStats = () => {
        setSuggestedExpanded(!suggestedExpanded)
    }

    const guessSD = (guessScore.mean - postGuessSolutions.length) / guessScore.standardDeviation
    const suggestedSD = (suggestedScore.mean - postSuggestedSolutions.length) / suggestedScore.standardDeviation

    const playerGuess = (
        <div className={classes.Stats}>
            <p><b>Mean Solutions Remaining After Guess:</b> {Math.round(guessScore.mean * 100) / 100}</p>
            <p><b>Max Solutions Remaining After Guess:</b> {guessScore.max}</p>
            {/* <p><b>Standard Deviations (positive is lucky, negative is unlucky):</b> {guessSD} ({guessSD * 100 / guessScore.mean}%)</p> */}
            <p><b>Remaining Solutions After Guess ({postGuessSolutions.length}):</b> {postGuessSolutions.join(', ')}</p>
        </div>
    )

    const suggestedGuess = (
        <div className={`${classes.Stats} ${classes.BottomRow}`}>
            <p><b>Suggested Word:</b> {suggestedWord}</p>
            <p><b>Mean Solutions Remaining After Suggested Word:</b> {Math.round(suggestedScore.mean * 100) / 100}</p>
            <p><b>Max Solutions Remaining After Suggested Word:</b> {suggestedScore.max}</p>
            {/* <p><b>Standard Deviations (positive is lucky, negative is unlucky):</b> {suggestedSD} ({suggestedSD * 100 / suggestedScore.mean}%)</p> */}
            <p><b>Remaining Solutions After Suggested Word ({postSuggestedSolutions.length}):</b> {postSuggestedSolutions.join(', ')}</p>
        </div>
    )

    const details = (
        //test 
        <div className={`${classes.AllDetails} ${playerExpanded || suggestedExpanded ? classes.Expanded : ''}`}>
            <div className={classes.Details} onClick={togglePlayerStats}>
                <h4>{playerExpanded && <span>-</span>}{!playerExpanded && <span>+</span>} Your Guess Stats</h4>
                {playerExpanded && playerGuess}
            </div>
            <div className={classes.Details} onClick={toggleSuggestedStats}>
                <h4>{suggestedExpanded && <span>-</span>}{!suggestedExpanded && <span>+</span>} Suggested Guess Stats </h4>
                {suggestedExpanded && suggestedGuess}
            </div>
        </div>
    )



    return (<React.Fragment>
        <div onClick={() => props.handleClick()} className={`${classes.GuessData} ${props.expanded ? classes.Expanded : ''}`}>
            <p>{props.field} - {props.actualGuess.toUpperCase()}</p>
        </div>
        {expanded && details}
    </React.Fragment>)
}

export default GuessData