import React from 'react';
import { InputTypeEnum } from '../PastGame';

const GuessForm = props => {
    let handleInputChange = props.handleInputChange
    let formValues = props.formValues
    let evaluateGame = props.evaluateGame 
    let disabled = props.disabled
    return (
        <React.Fragment>
            <p className='InputLabel'>Target</p>
            <input disabled={disabled} type="text" onChange={event => handleInputChange(event, InputTypeEnum.ACTUAL)} value={formValues[InputTypeEnum.ACTUAL]}/>
            <br/>
            <br/>
            
            <p className='InputLabel'>Guess1</p>
            <input disabled={disabled} type="text" onChange={event => handleInputChange(event, InputTypeEnum.GUESS1)} value={formValues[InputTypeEnum.GUESS1]}/>
            
            <p className='InputLabel'>Guess2</p>
            <input disabled={disabled} type="text" onChange={event => handleInputChange(event, InputTypeEnum.GUESS2)} value={formValues[InputTypeEnum.GUESS2]}/>
            
            <p className='InputLabel'>Guess3</p>
            <input disabled={disabled} type="text" onChange={event => handleInputChange(event, InputTypeEnum.GUESS3)} value={formValues[InputTypeEnum.GUESS3]}/>
            
            <p className='InputLabel'>Guess4</p>
            <input disabled={disabled} type="text" onChange={event => handleInputChange(event, InputTypeEnum.GUESS4)} value={formValues[InputTypeEnum.GUESS4]}/>
            
            <p className='InputLabel'>Guess5</p>
            <input disabled={disabled} type="text" onChange={event => handleInputChange(event, InputTypeEnum.GUESS5)} value={formValues[InputTypeEnum.GUESS5]}/>
            
            <p className='InputLabel'>Guess6</p>
            <input disabled={disabled} type="text" onChange={event => handleInputChange(event, InputTypeEnum.GUESS6)} value={formValues[InputTypeEnum.GUESS6]}/>

            {!disabled && <input disabled={disabled} type="submit" value="Evaluate" onClick={() => {evaluateGame()}}/>}

            {disabled && <input type="submit" value="Reset" onClick={() => {props.reset()}}/>}
        </React.Fragment>
    )
}

export default GuessForm