//Trivia Game
//document selectors
const question = document.querySelector('.question')
const choices = document.querySelector('.choices')
const correctScore = document.querySelector('#correct')
const incorrectScore = document.querySelector('#incorrect')

//global scoring variables
let correct = 0
let incorrect = 0

//get a question
function getQuestion() {
    axios({
        url: `https://opentdb.com/api.php?amount=1&category=25&difficulty=medium&type=multiple`,
        method: 'get'
    })
        .then(response => {
            console.log(response.data)
            let responseArray = response.data
            console.log(responseArray)

            //randomCatPic.setAttribute('src', imageUrl)
        })
        .catch(error => {
            console.log(error)
        })
}

getQuestion()