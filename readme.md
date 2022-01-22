Wordle Solver
=============

<p align="center">
    <a href=https://gitlab.com/aworrall2512/forex-predictor/-/blob/master/LICENSE" alt="Licence">
        <img src="https://img.shields.io/badge/license-MIT-yellow.svg" />
    </a>
</p>

Table of contents
-------
* [Aim](#aim)
* [Strategy](#strategy)
* [Playing Using The Script](#playing-using-the-script)
* [Testing And Analysis](#testing-and-analysis)
* [Areas For Improvement](#areas-for-improvement)
* [Follow Up](#follow-up)
* [Evaluating A Game](#evaluating-a-game)

Aim
-------
The aim of this project was originally to simply find the best starter word. This followed to the next best word and finally to make the best wordle solver. On the whole it largely succeeds in this aim as discussed in the analysis, but there are weaknesses that can be seen with certain words. This has been analysed retrospectively in the [Follow Up](#follow-up) section by comparing to a simpler but more computationally expensive brute force approach.


Strategy
-------
At a high level, the script aims to eliminate words from the existing solution set until there is a good (or definite) chance of guessing the correct word. It does this by selecting words with the most letter matches to remaining solutions based on a scoring system. Whether it attempts to guess the word or rule out possibilities is determined by a guessing threshold. Analysis has shown there are different options available for these thresholds depending on a user's preferred distribution.

The solution set and inputtable words have all been taken from the game's script file which can be inspected in a browser's dev tools.

Playing Using The Script
-------
The entire script can be copy and pasted into a Javascript runtime (for example a browser console). The user can then run the ```suggestedWord()``` method. This is not necessary for the first word because analysis based on the scoring system implemented has shown this to be 'soare'. The user enters the word into the game and notes the results. They update the script by running the method ```addWord()``` which takes two arguments. The first is the inputted word, so in the first instance this will be 'soare'. The second argument is an array of five numbers, each array item taking a value of 0,1 or 2 depending on whether a letter is not in the target word, is in the target word but in the wrong place or is in the target word in the correct place respectively. Be careful to note that an area of weakness in the current method is not taking advantage of information yielded by repeated letters. In the scenario a letter is repeated twice in one word and one occurance matches, the other does not and is shown to not be in the word, the extra knowledge is not accounted for in this model. As an unpleasant side effect, the value of the repeated letter should also be entered as 1. Entering it as a zero causes a contradiction in the solution filtering and results in no valid solutions being left. For example, if the target word is BANKS, the user might enter the next guess CANNY and if they were to do so they would enter it as ```addWord('canny', [0,2,2,1,0])``` as opposed to the expected ```addWord('canny', [0,2,2,0,0])```

Once this method has been run, the user can then run ```suggestedWord()``` to get the next best search term or guess according to the model. Alternatively, they could look at the current remaining solutions by running ```console.log(currentSolutions)```. To see how this might play out, imagine the target word is CIGAR. The following would be entered into the console:
```
addWord('soare', [0,0,1,1,0])
suggestedWord()
--------console output--------> tardy
addWord('tardy', [0,1,1,0,0])
console.log(currentSolutions)
--------console output--------> ['cigar', 'briar', 'augur', 'lunar', 'friar', 'urban', 'rumba', 'vicar', 'rival']
suggestedWord()
--------console output--------> cigar
```

In the example the user would be quite lucky as there were many solutions left but cigar was picked straight away. It was selected due to it ruling out on average more than any of the other words. This can be verified if the target is replaced with another word from the remaining solutions at this point, for example BRIAR. Clearly it would get to the same point and still suggest CIGAR, but in doing so it would leave fewer remaining solutions than others. 

At any point the game can be reset by running the method ```initialise()```

For more advanced play, the threshold map can be set to different values depending on whether the user is more of a gambler. This is discussed below


Testing And Analysis
-------
The methods defined at the end of the file are used to evaluate how well the model works. The ```evaluate()``` method run with no parameters will iterate over all of the solution words and record the number of attempts for each one. It aggregates this into a distribution of attempts and their relative frequency with this solution set. This distribution can be changed by altering the ```thresholdMap``` variable before playing. Essentially the threshold map looks at how many attempts have been taken, and how many solutions remain. If the number of solutions is less than the threshold for that guess, it will select strictly from the answers rather than a word which to scores highest. 

Running ```thresholdMapTester()``` repeats the ```evaluate``` method but changing the thresholdMap value so that multiple distributions can be created and compared. Below are some examples taken from analysis where the criteria was to maximise the lower number of guesses while ensuring that the script never failed to guess any words.

<img src="https://raw.githubusercontent.com/ayorkshireworrall/wordle-solver/main/figures/threshold-map-a.png" alt="Figure 1">

<em>Figure 1a. The distribution for the threshold map {0: 3, 1: 3, 2: 3, 3: 3, 4: 3, 5: 3} (the default thresholdMap)</em>

<img src="https://raw.githubusercontent.com/ayorkshireworrall/wordle-solver/main/figures/threshold-map-b.png" alt="Figure 1b">

<em>Figure 1b. The distribution for the threshold map {0: 4, 1: 4, 2: 4, 3: 3, 4: 3, 5: 3}</em>

<img src="https://raw.githubusercontent.com/ayorkshireworrall/wordle-solver/main/figures/threshold-map-c.png" alt="Figure 1c">

<em>Figure 1c. The distribution for the threshold map {0: 5, 1: 5, 2: 5, 3: 3, 4: 3, 5: 3}</em>

In figure 1a, the default theshold map is chosen so that the distribution has a clear central spike. This indicates that it prefers to avoid both extremes and is for users who prefer to minimise the number of larger guesses at the expense of getting a few quick wins.

Going through to figure 1c this threshold map flattens the distribution and is more of a gamble. It will guess far more in less attempts but similarly will also have more large numbers of attempts.

Areas For Improvement
-------
Firstly the script could be made to use brute force rather than an intuitive scoring system when it comes to eliminating words. For each input, it could iterate over each remaining solution and count the remaining solution size if that number was inputted. Each input could then be scored on the mean or the maximum number of solutions it leaves behind. This would be better than a scoring system but at great computational expense. Arguably this expense isn't too much given the power of most machines and the absolute maximum number of operations would be some factor of 2315 * 12972. Once the first word is determined this maximum number of operations reduces significantly.

A noted area of weakness is the use of repeated letters. The script currently excludes them from search terms on the basis that on the whole they are less likely to yield more information. There have been situations where this appears not necessarily true though and the existing script could be adapted to incorporate this additional information.

Another potential area of improvement would be to apply machine learning to the problem. Rather than scoring, words could be run through a model that takes inputs with number of letters matching exactly, number of letters matching but in the wrong position, number of repeated letters and compare that to the number of eliminations (probably best as a percentage but perhaps could take into account the current guess). This has the advantage of producing a lightweight model to run the script in a similar way to the scoring system, but will have at least been exposed to all brute force solutions.

Follow Up
-------
After seeing a couple of results played where the scoring algorithm failed to find a quite obvious optimal word guess, it was clear that some of the areas identified as weaknesses were more severe than first expected. To compare how it held up, a brute force approach was used. There is still scope for changes and probably improvement in the brute force method applied, but it is unlikely these will significantly change the outcomes. As a result, it makes for a good benchmark. Playing with it is not advised (mainly on account of the solution being a cop out and in the author's opinion a lazy waste of computing resources).

The brute force algorithm works by testing each of the inputtable words in turn. It considers each solution from what remains and on the assumption that the working one is correct, looks at how many solutions would remain in the next round if the input is entered. The values for each solution for that input is recorded and once all values have been calculated it flags the mean and maximum number of solutions that entering this input value would leave in the next round. For later rounds it has been assumed that the lowest mean would be the best word to go for, however for the starter word more in depth analysis was done. This highlighted some significant flaws in the scoring system, firstly that 'soare' is not in fact optimal. For the mean, the optimal word came back as 'roate' (with a mean score of 60.42 and a maximum of 195) and for the maximum the optimal word came back as 'aesir' (with a mean score of 69.88 and a maximum of 168). By comparison 'soare' scored a mean of 62.30 and a maximum of 183 so did initially appear to be an excellent compromise so a further search was done to look for other compromise words. By looking at all words with both a mean lower than 70 and a max of 195 or lower the following list of words was determined:

'aesir', 'ariel', 'orate', 'raile', 'raine', 'realo', 'roate', 'soare', 'arise', 'irate', 'arose', 'raise'

Scoring each of these showed that 'raise' was by far the best compromise word with a mean of 61.00 and a maximum equalling the best max of 168. Both values beating the values for 'soare' therefore it would appear that this exposed an immediate flaw in the scoring system.

Creating a distribution for all of the brute force calculated guesses seemed to be a far too computationally expensive task so some optimisations were made as can be seen in the code. The assumption that 'raise' was the best solution was taken. Then, every possible value array that could come out of it was tested to find the second round word that would be guessed when applying the brute force algorithm using the mean. This meant a lookup map was created for each possible value array having a predetermined word to use. Given the value array is always a fixed length of 5 with each item taking a value of 0,1 or 2 there was a maximum of 3^5 = 243 times the second word would be guessed using brute force. Compared to the evaluation method which has to run 2315 solutions, this already saved some resources with the advantage of saving those calculations in any further investigation.

Running the evaulate method yielded the below distribution
<img src="https://raw.githubusercontent.com/ayorkshireworrall/wordle-solver/main/figures/brute-force.png" alt="Figure 2">

<em>Figure 2. The distribution for the brute force algorithm</em>

Unsurprisingly this is far better than the original scoring algorithm results, especially towards the later guesses. This was to be expected though because in some cases the suggested word was a fair bit away from optimal. This can be demonstrated by scoring the suggested word in a similar way to the brute force and comparing it to the best scored word according to the brute force algorithm. Even when taking just the best mean, the brute force result tends to have a lower max than the suggested word.

An interesting note is that taking the starting word 'raise' and using the original algorithm seems to yield worse results than using 'soare'. This could be something that tweaking threshold values might resolve but could imply that behind the scenes the original algorithm does not simply look to minimise the solutions in the next go.

Evaluating A Game
-------
An interesting side effect of introducing the brute force methods is being able to analyse a player's choices compared to the 'optimal' choices determined by brute force. Included in brute-force.js is a method that will display info on just that. Simply copy and paste the file into a Javascript executable environment and run the method ```rateGuesses()``` inputting the player's guesses as a string array for the first argument and the actual game solution word as the second argument. For example ```rateGuesses(['soare', 'clint', 'mince', 'wince'], 'wince')```.

This will take a bit of time on the second guess as it works out the 'optimal' word by brute force but assuming the player has narrowed the solution set sufficiently it will get through the remaining attempts a bit quicker.

The output will display each attempt followed by the player's guess, the scores (mean and max numbers of values that will be left after all remaining solutions are considered) and the actual remaining solutions in the next attempt. It will also show the same information for the 'optimal' choice and finally the number of attempts required if the following the 'optimal' choices from the outset. From here a player can evaluate how close to 'optimal' their word choice was and compared to the scores, how lucky their choice was in narrowing down the solution set.