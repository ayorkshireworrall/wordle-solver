import React, { useState } from 'react';
import { solutions, getMappingValues, allowedWords, allInputs, valuesMap, addWord2, scoreWordBruteForce2, scoreInputsBruteForce, getSolutionsAfterWord, recommendedWordByMaxScoring} from '../../utils/solver';
import GuessForm from './GuessForm/GuessForm';
import GuessDataTable from './GuessDataTable/GuessDataTable';

export const InputTypeEnum = {
    ACTUAL: 'ACTUAL',
    GUESS1: 'GUESS1',
    GUESS2: 'GUESS2',
    GUESS3: 'GUESS3',
    GUESS4: 'GUESS4',
    GUESS5: 'GUESS5',
    GUESS6: 'GUESS6'
}

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
            <GuessForm handleInputChange={handleInputChange} formValues={formValues} evaluateGame={evaluateGame}/>
            <br/>
            <GuessDataTable fields={inputFields} data={guessData} formValues={formValues} toggleExpanded={toggleGuessExpansion} expandedGuesses={expandedGuesses}/>
        </React.Fragment>
    )
}

export default PastGame;