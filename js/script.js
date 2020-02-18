//Trivia Game
//document selectors
const questionElement = document.querySelector('.question')
const choicesElement = document.querySelector('.choices')
const guessesElement = document.querySelector('.guess')
const correctScoreElement = document.querySelector('#correct')
const incorrectScoreElement = document.querySelector('#incorrect')
const categoryElement = document.querySelector('#selectCategory')
const questionCountElement = document.querySelector('#selectCount')
const gameButton = document.querySelector('#gameButton')

//global variables
let sessionToken = ''
let categoryIndex = 0
let categoryChoice = ''
let howManyQuestions = 0
let playedQuestions = 0
let remainingQuestions = 0
let guessSequence = []
let questionQueue = []
let correctAnswer = ''
let correct = 0
let incorrect = 0

//connect to api and retrieve a session token: including the token in question api calls will prevent duplicates in the response data while the token is active (6 hours max)
function getSessionToken() {
    axios({
        url: 'https://opentdb.com/api_token.php?command=request',
        method: 'get'
    })
        .then(response => {
            sessionToken = [response.data.token]
        })
        .catch(error => {
            console.log(error)
        })
}
getSessionToken()

////attempted to write a reusable function to get api data... but it wasn't working... keeping attempt to revisit
// function getTriviaApiData(inUrl) {
//     //console.log(inUrl)
//     axios({
//         url: inUrl,
//         method: 'get'
//     })
//         .then(response => {
//             response = [response.data.results]
//             console.log(response)
//             return response
//         })
//         .catch(error => {
//             console.log(error)
//         })
// }
////get session token
// function getSessionToken() {
// let sessionToken = getTriviaApiData('https://opentdb.com/api_token.php?command=request')
// console.log(sessionToken)
// }
////retrieve a batch of questions for a new game
// function getQuestions() {
//     //clear question variable to accept new questions
//     playedQuestions = 0
//     questionQueue = []
//     questionQueue = getTriviaApiData(`https://opentdb.com/api.php?amount=${howManyQuestions}&category=23&type=multiple`)
//     questionQueue = [1]
//     nextQuestion()
// }

//connect to open trivia database api and retrieve a batch of questions for a new game
function getQuestions() {
    //clear question variable to accept new questions
    playedQuestions = 0
    correct = 0
    incorrect = 0
    questionQueue = []
    categoryIndex = categoryElement
    categoryElement.disabled = true
    categoryChoice = categoryElement.value
    questionCountElement.disabled = true
    howManyQuestions = questionCountElement.value
    gameButton.textContent = '⇨'
    gameButton.onclick = function () { nextQuestion() }
    gameButton.disabled = true
    //retrieve questions data
    axios({
        url: `https://opentdb.com/api.php?amount=${howManyQuestions}&category=${categoryChoice}&type=multiple&token=${sessionToken}`,
        method: 'get'
    })
        .then(response => {
            questionQueue = response.data.results
            nextQuestion()
        })
        .catch(error => {
            console.log(error)
        })
}

//load a question into the game and reduce the remaining question counter
function nextQuestion() {
    let question = questionQueue.shift()
    playedQuestions = playedQuestions + 1
    questionsRemaining = howManyQuestions - playedQuestions

    //assign question text and answer
    questionElement.textContent = translateSpecials(question.question)
    correctAnswer = translateSpecials(question.correct_answer)
    console.log(correctAnswer)
    let responseChoices = (question.incorrect_answers)
    responseChoices.push(correctAnswer)

    //shuffle choices and assign to dom (correct answer needs to be shuffled into incorrect answers)
    writeChoices(responseChoices)

    //setup listener for player's answer
    //activateGuesses()
}

//reset choices
function clearChoices() {
    let i = 0
    while (i < choicesElement.childElementCount) {
        choicesElement.removeChild(choicesElement.firstChild)
    }
}

//shuffle choices
function writeChoices(choices) {
    //clear previously assigned choices
    clearChoices()
    //disable next question button
    gameButton.disabled = true
    //shuffle choices
    shuffle(choices)
    //listen for player's guess
    choices.forEach(function (choice) {
        let newP = document.createElement('p')
        newP.textContent = translateSpecials(choice)
        newP.setAttribute('class', 'guess')
        newP.addEventListener('click', selectAnswer)
        choicesElement.appendChild(newP)
    })
}

const selectAnswer = function (event) { 
    disableListen()
    gameButton.disabled = false
    let guessClick = ''
    guessClick = event.target.innerHTML
    correctAnswer === guessClick ? correct = correct + 1 : incorrect = incorrect + 1
    correctAnswer === guessClick ? event.target.classList.add('correct') : event.target.classList.add('incorrect')
   
    correctScoreElement.textContent = `correct ${correct}`
    incorrectScoreElement.textContent = `incorrect ${incorrect}`

    
    if (questionsRemaining > 0) {
    } else {
        endGame()
    }

 //remove event listener - to refactor
 function disableListen() {
    document.querySelectorAll('.guess')[0].removeEventListener('click',selectAnswer)
    document.querySelectorAll('.guess')[1].removeEventListener('click',selectAnswer)
    document.querySelectorAll('.guess')[2].removeEventListener('click',selectAnswer)
    document.querySelectorAll('.guess')[3].removeEventListener('click',selectAnswer)
    document.querySelectorAll('.guess')[0].classList.remove('guess')
    document.querySelectorAll('.guess')[0].classList.remove('guess')
    document.querySelectorAll('.guess')[0].classList.remove('guess')
    document.querySelectorAll('.guess')[0].classList.remove('guess')
 }

    // if questionsRemaining = 0

    //do a check on questionsRemaining... if it is the last question, end game after selection is made
}

function endGame() {
    categoryElement.disabled = false
    questionCountElement.disabled = false
    gameButton.textContent = '↻'
    gameButton.onclick = function () { startGame() }
    alert(correct > incorrect ? 'you won' : 'you lost')
}

//Fisher-Yates Algorithm to randomly shuffle an array
function shuffle(array) {
    var i = 0
        , j = 0
        , temp = null

    for (i = array.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1))
        temp = array[i]
        array[i] = array[j]
        array[j] = temp
        return array
    }
}

function startGame() {
    getQuestions()
}

//testing revealed api data contains special characters needing string translation
function translateSpecials(str) {
    str = str.replace(('&ldquo;', 'gi'), '"')
    str = str.replace(('&rdquo;', 'gi'), '"')
    str = str.replace(('&quot;', 'gi'), '"')
    str = str.replace('&ldquo;', '"')
    str = str.replace('&rdquo;', '"')
    str = str.replace('&aring;', 'å')
    str = str.replace('&hellip;', '...')
    str = str.replace('&auml;', 'ä')
    str = str.replace('&amp;', '&')
    str = str.replace('&rsquo;', '`')
    str = str.replace('&quot;', '"')
    str = str.replace('&quot;', '"')
    str = str.replace('&quot;', '"')
    str = str.replace('&quot;', '"')
    str = str.replace('&quot;', '"')
    str = str.replace('&quot;', '"')
    str = str.replace(('&ocirc;', 'gi'), 'ô')
    str = str.replace('&ocirc;', 'ô')
    str = str.replace(('&atilde;', 'gi'), 'ã')
    str = str.replace('&atilde;', 'ã')
    str = str.replace(('&oacute;', 'gi'), 'ó')
    str = str.replace('&oacute;', 'ó')
    str = str.replace('&Eacute;', 'É')
    str = str.replace(('&lt;', 'gi'), '<')
    str = str.replace(('&gt;', 'gi'), '>')
    str = str.replace(('&shy;', 'gi'), '-')
    str = str.replace('&shy;', '-')
    str = str.replace('&shy;', '-')
    str = str.replace('&shy;', '-')
    str = str.replace('&shy;', '-')
    str = str.replace('&shy;', '-')
    str = str.replace('&shy;', '-')
    str = str.replace('&shy;', '-')
    str = str.replace('&shy;', '-')
    str = str.replace(('&deg;', 'gi'), '°')
    str = str.replace('&deg;', '°')
    str = str.replace(('&iacute;', 'gi'), 'í')
    str = str.replace('&oacute;', 'ó')
    str = str.replace('&uuml;', 'ü')
    str = str.replace('&ouml;', 'ö')
    str = str.replace('&Nu;', 'ν')
    str = str.replace('&pi;', 'π')
    str = str.replace('&aacute', 'á')
    str = str.replace('&Sigma;', 'Σ')
    str = str.replace(('&#039;', 'gi'), '`')
    str = str.replace('&#039;', '`')
    str = str.replace('&#039;', '`')
    str = str.replace('&#039;', '`')
    str = str.replace('&#039;', '`')
    str = str.replace('&#039;', '`')
    str = str.replace('&#039;', '`')
    return str
}