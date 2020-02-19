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
let triviaScoreBoard = ''

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
            alert(`whoops! couldn't connect to the database. [${error}]`)
        })
}
getSessionToken()

//connect to open trivia database api and retrieve a batch of questions for a new game
function getQuestions() {
    //reset game variables for a new game
    correctScoreElement.textContent = `correct 0`
    incorrectScoreElement.textContent = `incorrect 0`
    questionElement.textContent = ''
    questionElement.classList.replace('lost', 'question')
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
            alert(`whoops! couldn't connect to the database. [${error}]`)
        })
}

//load a question into the game and reduce the game's remaining question counter
function nextQuestion() {
    let question = questionQueue.shift()
    playedQuestions = playedQuestions + 1
    questionsRemaining = howManyQuestions - playedQuestions

    //assign question text and answer
    questionElement.textContent = translateSpecials(question.question)
    animateCSS('.question', 'pulse')
    correctAnswer = translateSpecials(question.correct_answer)
    let responseChoices = (question.incorrect_answers)
    responseChoices.push(correctAnswer)
    console.log(correctAnswer)

    //assign answer text
    writeChoices(responseChoices)
}

//shuffle choices
function writeChoices(choices) {
    //clear previously assigned choices
    clearChoices()

    //disable next question button
    gameButton.disabled = true

    //shuffle choices (the correct answer needs to be shuffled into incorrect answers)
    shuffle(choices)

    //create listener for player's guess
    choices.forEach(function (choice) {
        let newP = document.createElement('p')
        newP.textContent = translateSpecials(choice)
        newP.setAttribute('class', 'guess animated pulse')
        newP.addEventListener('click', selectAnswer)
        choicesElement.appendChild(newP)
    })
}

//reset choices (clears answers from the game card)
function clearChoices() {
    let i = 0
    while (i < choicesElement.childElementCount) {
        choicesElement.removeChild(choicesElement.firstChild)
    }
}

//behavior when player chooses thier answer (disable listener for subsequent answers, provide answer feedback and enable next question to be played)
const selectAnswer = function (event) {
    disableListen()
    gameButton.disabled = false
    let guessClick = ''
    guessClick = event.target.innerHTML
    if (correctAnswer === guessClick) {
        correct = correct + 1
        event.target.classList.add('correct')
        animateCSS('.correct', 'heartBeat')
    } else {
        incorrect = incorrect + 1
        event.target.classList.add('incorrect')
        event.target.classList.remove('animated')
        animateCSS('.incorrect', 'shake')
    }

    correctScoreElement.textContent = `correct ${correct}`
    incorrectScoreElement.textContent = `incorrect ${incorrect}`

    if (questionsRemaining > 0) {
    } else {
        endGame()
    }

    //remove event listener - to refactor
    function disableListen() {
        document.querySelectorAll('.guess')[0].removeEventListener('click', selectAnswer)
        document.querySelectorAll('.guess')[1].removeEventListener('click', selectAnswer)
        document.querySelectorAll('.guess')[2].removeEventListener('click', selectAnswer)
        document.querySelectorAll('.guess')[3].removeEventListener('click', selectAnswer)
        document.querySelectorAll('.guess')[0].classList.remove('guess')
        document.querySelectorAll('.guess')[0].classList.remove('guess')
        document.querySelectorAll('.guess')[0].classList.remove('guess')
        document.querySelectorAll('.guess')[0].classList.remove('guess')
    }
}

function endGame() {
    clearChoices()

    categoryElement.disabled = false
    questionCountElement.disabled = false
    gameButton.textContent = '↻'
    gameButton.onclick = function () { startGame() }

    if (correct > incorrect) {
        questionElement.textContent = 'Y O U W O N !'
        triviaScoreBoard.addWin()
    } else {
        questionElement.textContent = 'T R Y A G A I N .'
        questionElement.classList.replace('question', 'lost')
        triviaScoreBoard.addLoss()
    }

    correctScoreElement.textContent = `${triviaScoreBoard.wins} won`
    incorrectScoreElement.textContent = `${triviaScoreBoard.losses} lost`
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

class scoreBoard {
    constructor() {
        this.wins = 0
        this.losses = 0
    }
    addWin() {
        console.log('win')
        if (localStorage.triviaWins) {
            localStorage.triviaWins = Number(localStorage.triviaWins) + 1
        } else {
            localStorage.triviaWins = 1
        }
        this.wins = localStorage.triviaWins
    }
    addLoss() {
        console.log('lose')
        if (localStorage.triviaLosses) {
            localStorage.triviaLosses = Number(localStorage.triviaLosses) + 1
        } else {
            localStorage.triviaLosses = 1
        }
        this.losses = localStorage.triviaLosses
    }
}
triviaScoreBoard = new scoreBoard()

function startGame() {
    getQuestions()
}

function animateCSS(element, animationName, callback) {
    const node = document.querySelector(element)
    node.classList.add('animated', animationName)

    function handleAnimationEnd() {
        node.classList.remove('animated', animationName)
        node.removeEventListener('animationend', handleAnimationEnd)

        if (typeof callback === 'function') callback()
    }

    node.addEventListener('animationend', handleAnimationEnd)
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