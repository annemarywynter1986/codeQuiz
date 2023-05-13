// setting up variables to be used for functions below
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
var timeEl = document.querySelector("#timer");
var secondsLeft=20;


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

// adding object of questions 
let questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        choice1:  "<script>",
        choice2:  "<scripting>",
        choice3:  "<js>",
        choice4:  "<javascript>",
        answer: 1,
    },
    {
        question:
            "What is the correct JavaScript syntax??",
        choice1: "#demo.innerHTML='Hello World!'",
        choice2: "document.getElementById('p').innerHTML='Hello World!'",
        choice3: "document.getElementById('demo').innerHTML='Hello World!'",
        choice4: "None of the above",
        answer: 3,
    },
    {
        question: "Where is the correct place to insert a JavaScript?",
        choice1: "the '<head>' section",
        choice2: "the '<body>' section",
        choice3: "any from above correct",
        choice4: "none of the above",
        answer: 2,
    },
    {
        question: "Is JavaScript and Java same programming language",
        choice1: "yes",
        choice2: "depends on situation",
        choice3: "maybe",
        choice4: "no",
        answer: 4,
    }
]

//setting hard constants that cannot be changed
const SCORE_POINTS = 25
const MAX_QUESTIONS = 4

//function  to start the Game

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()


}
// function to get to new question 

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}
// function to verify correct/incorrect responses by choice of user 

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {

            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}
//  function to set up timer 

function setTime() {
    // Sets interval in variable
    var timerInterval = setInterval(function() {
      secondsLeft--;
      timeEl.textContent = secondsLeft + " seconds left";
  
      if(secondsLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        localStorage.setItem('mostRecentScore', score)
       
        return window.location.assign('./end.html')
        
      }
  
    }, 1000);
  }
  setTime()
    


startGame()