import React, { useState } from 'react';
import { solutions, getMappingValues, allowedWords, allInputs, valuesMap, addWord2, scoreWordBruteForce2, scoreInputsBruteForce, getSolutionsAfterWord, recommendedWordByMaxScoring} from '../../utils/solver';


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

    const [guessData, setGuessData] = useState({
        GUESS1: {postGuessSolutions: [], suggestedWord: '', postSuggestedSolutions: [], suggestedScore: {}, guessScore: {}},
        GUESS2: {postGuessSolutions: [], suggestedWord: '', postSuggestedSolutions: [], suggestedScore: {}, guessScore: {}},
        GUESS3: {postGuessSolutions: [], suggestedWord: '', postSuggestedSolutions: [], suggestedScore: {}, guessScore: {}},
        GUESS4: {postGuessSolutions: [], suggestedWord: '', postSuggestedSolutions: [], suggestedScore: {}, guessScore: {}},
        GUESS5: {postGuessSolutions: [], suggestedWord: '', postSuggestedSolutions: [], suggestedScore: {}, guessScore: {}},
        GUESS6: {postGuessSolutions: [], suggestedWord: '', postSuggestedSolutions: [], suggestedScore: {}, guessScore: {}}
    })

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
        let currentAttempt = 1
        let totalAttempts = -1 // will populate using formValues so need to ignore the actual solution
        let guessEvaluations = {...guessData}

        for (let value in formValues) {
            totalAttempts++
            if (!value) {
                break
            }
        }
        for (let i = 0; i < totalAttempts; i++) {
            let guess = formValues['GUESS' + (i+1)]
            console.log('Guess: ', guess)
            let targetWord = formValues[InputTypeEnum.ACTUAL]
            let guessScore = scoreWordBruteForce2(guess, postGuessSolutions, info)
            console.log(guessScore)
            postGuessSolutions = getSolutionsAfterWord(guess, postGuessSolutions, targetWord, info)
            let suggestedWord = recommendedWordByMaxScoring(postSuggestedSolutions, currentAttempt, 'max')
            let suggestedScore = scoreWordBruteForce2(suggestedWord, postSuggestedSolutions, targetWord, info)
            postSuggestedSolutions = getSolutionsAfterWord(suggestedWord, postSuggestedSolutions, targetWord, info)
            guessEvaluations['GUESS' + (i+1)] = {postGuessSolutions, suggestedWord, postSuggestedSolutions, suggestedScore, guessScore}
            addWord2(guess, getMappingValues(guess, targetWord), info, postGuessSolutions, totalAttempts)
            if (guess === targetWord) {
                break;
            }
        }

        console.log(guessEvaluations)
        setGuessData(guessEvaluations)
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

            {/* <br/>
            {inputFields.map(field => {
                return <p>{field} : {formValues[field]}</p>
            })} */}

            <br/>
            {inputFields.map(field => {
                if (field === InputTypeEnum.ACTUAL) {
                    return null
                }
                return <p> postGuessSolutions: {guessData[field].postGuessSolutions.toString()}, suggestedWord: {guessData[field].suggestedWord}, postSuggestedSolutions: {guessData[field].postSuggestedSolutions.toString()}, suggestedScore: {guessData[field].suggestedScore.mean}, guessScore: {guessData[field].guessScore.mean}</p>
            })}
            

        </React.Fragment>
    )
}

export default PastGame;