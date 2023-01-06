import React from 'react';
import { InputTypeEnum } from '../PastGame';

import GuessData from '../../../components/UI/GuessData/GuessData';
import classes from './GuessDataTable.module.css'

const GuessDataTable = props => {
    let inputFields = props.fields
    let guessData = props.data
    let formValues = props.formValues
    let toggleGuessExpansion = props.toggleExpanded
    let expandedGuesses = props.expandedGuesses
    return (
        <div className={classes.Table}>
            <div className={classes.Title}>
                Guess Data
            </div>
            {!guessData && (<div className={classes.Empty}>No Data</div>)}
            {inputFields.map(field => {
                if (field === InputTypeEnum.ACTUAL) {
                    return null
                }
                if (!guessData || !guessData[field]) {
                    return null
                }
                return <GuessData key={field} field={field} actualGuess={formValues[field]} data={guessData[field]} handleClick={() => toggleGuessExpansion(field)} expanded={expandedGuesses[field]}></GuessData>
            })}
        </div>
    )
}

export default GuessDataTable