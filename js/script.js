//Trivia Game
//document selectors
const questionElement = document.querySelector('.question')
const choicesElement = document.querySelector('.choices')
const guessesElement = document.querySelectorAll('.guess')
const correctScoreElement = document.querySelector('#correct')
const incorrectScoreElement = document.querySelector('#incorrect')
//const categoryElement = document.querySelector('.category')
const remainingElement = document.querySelector('.remaining')

//global variables
let sessionToken = ''
//categories with several questions includes:
//9 - General Knowledge
//11 - Entertainment - film
//12 - Entertainment - music
//17 - Science and Nature
//22 - Geography
//23 - History
let categoryChoice = ''
//max questions allowed by api is 50
let howManyQuestions = 0
let playedQuestions = 0
let remainingQuestions = 0
let guessSequence = []
let questionQueue = []
let correctAnswer = ''
let correct = 0
let incorrect = 0

//set options
categoryChoice = 'History'
howManyQuestions = 300

//connect to api and retrieve a session token: including the token in question api calls will prevent duplicates in the response data while the token is active (6 hours max)
// let sessionToken = getTriviaApiData('https://opentdb.com/api_token.php?command=request')
// console.log(sessionToken)

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
// getSessionToken()

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

//retrieve a batch of questions for a new game
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
    questionQueue = []
    //retrieve questions data
    axios({
        url: `https://opentdb.com/api.php?amount=${howManyQuestions}&category=22&type=multiple&token=${sessionToken}`,
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

const selectAnswer = function (event) {
    console.log(`click! ${event}`)

    //do a check on questionsRemaining... if it is the last question, end game after selection is made

    // let guessClick = ''
    // guessClick = event.target.id
    // console.log(guessClick)
}

//load a question into the game and reduce the remaining question counter
function nextQuestion() {
    let question = questionQueue.shift()
    playedQuestions = playedQuestions + 1
    questionsRemaining = howManyQuestions - playedQuestions
    remainingElement.textContent = `Answered ${playedQuestions}`

    //assign question text and answer
    questionElement.textContent = translateSpecials(question.question)
    correctAnswer = question.correct_answer
    console.log(correctAnswer)
    let responseChoices = (question.incorrect_answers)
    responseChoices.push(correctAnswer)

    //shuffle choices and assign to dom (correct answer needs to be shuffled into incorrect answers)
    writeChoices(responseChoices)

    //setup listener for player's answer
    activateGuesses()
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
    //shuffle choices
    shuffle(choices)
    choices.forEach(function (choice) {
        let newP = document.createElement('p')
        newP.textContent = translateSpecials(choice)
        newP.setAttribute('class', 'guess')
        choicesElement.appendChild(newP)
    })
}

function activateGuesses() {
    guessesElement.forEach(guess => {
        console.log(`listen ${guess}`)
        guess.addEventListener('click', event => {
            selectAnswer
        })
    })
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

getQuestions()

//testing revealed api data contains special characters needing string translation
function translateSpecials(str) {
    str = str.replace(('&ldquo;', 'gi'), '"')
    str = str.replace(('&rdquo;', 'gi'), '"')
    str = str.replace(('&quot;', 'gi'), '"')
    str = str.replace('&amp;', '&')
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