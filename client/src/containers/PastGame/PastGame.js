import React, { useState } from 'react';
import { solutions, getMappingValues, allowedWords, allInputs, valuesMap, addWord2, scoreWordBruteForce2, scoreInputsBruteForce, getSolutionsAfterWord, recommendedWordByMaxScoring} from '../../utils/solver';
import GuessData from '../../components/UI/GuessData/GuessData';


const PastGame = props => {
    const [formValues, setFormValues] = useState({
        ACTUAL: 'tryst',
        GUESS1: 'raise',
        GUESS2: 'burst',
        GUESS3: 'frost',
        GUESS4: 'tryst',
        GUESS5: '',
        GUESS6: ''
    })

    const [expandedGuesses, setExpandedGuesses] = useState({

    })

    const [guessData, setGuessData] = useState()

    const InputTypeEnum = {
        ACTUAL: 'ACTUAL',
        GUESS1: 'GUESS1',
        GUESS2: 'GUESS2',
        GUESS3: 'GUESS3',
        GUESS4: 'GUESS4',
        GUESS5: 'GUESS5',
        GUESS6: 'GUESS6'
    }

    
    const handleInputChange = (event, item) => {
        let newForm = {...formValues}
        newForm[item] = event.target.value
        setFormValues(newForm)
        console.log(formValues)
    }
    
    let inputFields = []
    for (let field in InputTypeEnum) {
        inputFields.push(field)
    }

    const evaluateGame = () => {
        let info = []
        let postGuessSolutions = [...solutions]
        let postSuggestedSolutions = [...solutions]
        let totalAttempts = -1 // will populate using formValues so need to ignore the actual solution
        let guessEvaluations = {...guessData}
        let expanded = {...expandedGuesses}

        for (let value in formValues) {
            totalAttempts++
            if (!value) {
                break
            }
        }
        for (let i = 0; i < totalAttempts; i++) {
            let guess = formValues['GUESS' + (i+1)]
            expanded['GUESS' + (i+1)] = false
            let targetWord = formValues[InputTypeEnum.ACTUAL]
            let guessScore = scoreWordBruteForce2(guess, postGuessSolutions, info)
            postGuessSolutions = getSolutionsAfterWord(guess, postGuessSolutions, targetWord, info)
            let suggestedWord = recommendedWordByMaxScoring(postSuggestedSolutions, i+1, info)
            let suggestedScore = scoreWordBruteForce2(suggestedWord, postSuggestedSolutions, targetWord, info)
            postSuggestedSolutions = getSolutionsAfterWord(suggestedWord, postSuggestedSolutions, targetWord, info)
            guessEvaluations['GUESS' + (i+1)] = {postGuessSolutions, suggestedWord, postSuggestedSolutions, suggestedScore, guessScore}
            addWord2(guess, getMappingValues(guess, targetWord), info, postGuessSolutions, totalAttempts)
            // currentAttempt++
            if (guess === targetWord) {
                break;
            }
            
        }

        setGuessData(guessEvaluations)
        setExpandedGuesses(expanded)
    }

    const toggleGuessExpansion = field => {
        console.log('Clicked')
        let copy = {...expandedGuesses}
        copy[field] = !expandedGuesses[field]
        setExpandedGuesses(copy)
    }


    return (
        <React.Fragment>
            <h1>Past Game Evaluator</h1>
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

            <br/>
            {inputFields.map(field => {
                if (field === InputTypeEnum.ACTUAL) {
                    return null
                }
                if (!guessData || !guessData[field]) {
                    return null
                }
                return <GuessData key={field} field={field} actualGuess={formValues[field]} data={guessData[field]} handleClick={() => toggleGuessExpansion(field)} expanded={expandedGuesses[field]}></GuessData>
            })}
            

        </React.Fragment>
    )
}

export default PastGame;