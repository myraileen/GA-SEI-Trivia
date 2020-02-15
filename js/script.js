//Trivia Game
//document selectors
const questionElement = document.querySelector('.question')
const choicesElement = document.querySelector('.choices')
const guessesElement = document.querySelectorAll('.guess')
const correctScoreElement = document.querySelector('#correct')
const incorrectScoreElement = document.querySelector('#incorrect')
const categoryElement = document.querySelector('.category')

//global variables
const howManyQuestions = 3
let categoryChoice = ''
let questionQueue = []
let correct = 0
let incorrect = 0

//set trivia category
categoryChoice = 'History'
categoryElement.textContent = categoryChoice

//qet questions
function getQuestions() {
    //clear question variable to accept new questions
    questionQueue = []
    axios({
        url: `https://opentdb.com/api.php?amount=${howManyQuestions}&category=23&type=multiple`,
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

//get a question
function nextQuestion() {
    clearChoices()

    let question = questionQueue.shift()

    //assign question text
    questionElement.textContent = translateSpecials(question.question)
    console.log(questionElement.textContent)

    //assign answer choices
    let responseChoices = question.incorrect_answers
    //console.log(responseChoices)

    responseChoices.forEach(function (choice) {
        let newP = document.createElement('p')
        newP.textContent = choice
        newP.classList.add('guess')
        console.log(newP)
        choicesElement.appendChild(newP)
    })
    //remove question from queue
    console.log(questionQueue)
    activateGuesses()
}

//reset choices
function clearChoices() {
    let i = 0
    while (i < choicesElement.childElementCount) {
        choicesElement.removeChild(choicesElement.firstChild)
    }
}

const selectAnswer = function (event) {
    console.log('click!')

    let guessClick = ''
    guessClick = event.target.id
    console.log(guessClick)
}

function activateGuesses() {
    guessesElement.forEach(g => {
        g.addEventListener('click', selectAnswer)
    })
}

getQuestions()


//I found some common special charachter string translations were needed on api response text  
function translateSpecials(str) {
    str = str.replace('&ldquo;', '"')
    str = str.replace('&rdquo;', '"')
    str = str.replace('&rdquo;', '"')
    str = str.replace('&rsquo;', "'")
    str = str.replace('&rsquo;', "'")
    str = str.replace('&#039;', "'")
    str = str.replace('&#039;', "'")
    str = str.replace('&quot;', '"')
    str = str.replace('&quot;', '"')
    str = str.replace('&ocirc;', 'ô')
    str = str.replace('&atilde;', 'ã')
    str = str.replace('&oacute;', 'ó')
    str = str.replace('&oacute;', 'ó')
    str = str.replace('&lt;', '<')
    str = str.replace('&gt;', '>')

    return str
}