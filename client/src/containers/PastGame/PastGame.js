import React, { useState } from 'react';
import { solutions, getMappingValues, allowedWords, allInputs, valuesMap, addWord2, scoreWordBruteForce2, scoreInputsBruteForce, getSolutionsAfterWord, recommendedWordByMaxScoring} from '../../utils/solver';
import GuessForm from './GuessForm/GuessForm';
import GuessDataTable from './GuessDataTable/GuessDataTable';
import LoadingMask from '../../components/UI/LoadingMask/LoadingMask';

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
    const initialFormState = {
        ACTUAL: '',
        GUESS1: '',
        GUESS2: '',
        GUESS3: '',
        GUESS4: '',
        GUESS5: '',
        GUESS6: ''
    }
    const [formValues, setFormValues] = useState(initialFormState)

    const [expandedGuesses, setExpandedGuesses] = useState({})

    const [disableInputs, setDisableInputs] = useState(false)

    const [loading, setLoading] = useState(false)

    const [guessData, setGuessData] = useState()

    const [percentageComplete, setPercentageComplete] = useState(0)

    const [workingGuess, setWorkingGuess] = useState("")

    
    const handleInputChange = (event, item) => {
        let newForm = {...formValues}
        newForm[item] = event.target.value.toLowerCase()
        setFormValues(newForm)
    }
    
    let inputFields = []
    for (let field in InputTypeEnum) {
        inputFields.push(field)
    }

    const handleEvaluate = async () => {
        setLoading(true)
        setTimeout(() => {
            evaluateGame()
            setLoading(false)
        }, 0)
    }

    const logPercentage = (percentage, guess) => {
        console.log(`Has worked through ${percentage}% of possible inputs for guess ${guess}`)
        setPercentageComplete(percentage)
        setWorkingGuess(guess)
    }

    const evaluateGame = async () => {
        setDisableInputs(true)
        setGuessData({})
        let info = []
        let postGuessSolutions = [...solutions]
        let postSuggestedSolutions = [...solutions]
        let totalAttempts = -1 // will populate using formValues so need to ignore the "actual" solution
        let guessEvaluations = {}
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
            let suggestedWord = recommendedWordByMaxScoring(postGuessSolutions, i+1, info, 'mean', percentage => {logPercentage(percentage, guess)})
            let suggestedScore = scoreWordBruteForce2(suggestedWord, postGuessSolutions, targetWord, info)
            postGuessSolutions = getSolutionsAfterWord(guess, postGuessSolutions, targetWord, info)
            postSuggestedSolutions = getSolutionsAfterWord(suggestedWord, postGuessSolutions, targetWord, info)
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
        let copy = {...expandedGuesses}
        copy[field] = !expandedGuesses[field]
        setExpandedGuesses(copy)
    }

    const reset = () => {
        setFormValues(initialFormState)
        setGuessData()
        setExpandedGuesses({})
        setDisableInputs(false)
        setPercentageComplete(0)
        setWorkingGuess('')
        setLoading(false)
    }


    return (
        <React.Fragment>
            <GuessForm handleInputChange={handleInputChange} formValues={formValues} evaluateGame={handleEvaluate} disabled={disableInputs} reset={reset}/>
            <br/>
            <GuessDataTable fields={inputFields} data={guessData} formValues={formValues} toggleExpanded={toggleGuessExpansion} expandedGuesses={expandedGuesses}/>
            <LoadingMask show={loading} stage={workingGuess} complete={percentageComplete}/>
        </React.Fragment>
    )
}

export default PastGame;