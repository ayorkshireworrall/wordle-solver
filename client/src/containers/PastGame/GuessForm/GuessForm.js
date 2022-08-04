import React from 'react';
import { InputTypeEnum } from '../PastGame';

const GuessForm = props => {
    let handleInputChange = props.handleInputChange
    let formValues = props.formValues
    let evaluateGame = props.evaluateGame 
    return (
        <React.Fragment>
            <h3>Target</h3>
            <input type="text" onChange={event => handleInputChange(event, InputTypeEnum.ACTUAL)} value={formValues[InputTypeEnum.ACTUAL]}/>
            <br/>
            
            <h3>Guess1</h3>
            <input type="text" onChange={event => handleInputChange(event, InputTypeEnum.GUESS1)} value={formValues[InputTypeEnum.GUESS1]}/>
            
            <h3>Guess2</h3>
            <input type="text" onChange={event => handleInputChange(event, InputTypeEnum.GUESS2)} value={formValues[InputTypeEnum.GUESS2]}/>
            
            <h3>Guess3</h3>
            <input type="text" onChange={event => handleInputChange(event, InputTypeEnum.GUESS3)} value={formValues[InputTypeEnum.GUESS3]}/>
            
            <h3>Guess4</h3>
            <input type="text" onChange={event => handleInputChange(event, InputTypeEnum.GUESS4)} value={formValues[InputTypeEnum.GUESS4]}/>
            
            <h3>Guess5</h3>
            <input type="text" onChange={event => handleInputChange(event, InputTypeEnum.GUESS5)} value={formValues[InputTypeEnum.GUESS5]}/>
            
            <h3>Guess6</h3>
            <input type="text" onChange={event => handleInputChange(event, InputTypeEnum.GUESS6)} value={formValues[InputTypeEnum.GUESS6]}/>

            <input type="submit" value="Evaluate" onClick={() => {evaluateGame()}}/>
        </React.Fragment>
    )
}

export default GuessForm