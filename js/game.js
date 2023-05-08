const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const correct=document.querySelector('.correct');
const incorrect=document.querySelector('.incorrect')

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        choice1: "<script>",
        choice2: "<scripting>",
        choice3: "<js>",
        correctAnswer: "A"
    },
    {
        question: "What is the correct JavaScript syntax?",
        choice1: "#demo.innerHTML='Hello World!'",
        choice2: "document.getElementById('p').innerHTML='Hello World!'",
        choice3: "document.getElementById('demo').innerHTML='Hello World!'",
        correctAnswer: "C"
    },
    {
        question: "Where is the correct place to insert a JavaScript?",
        choice1: "the '<head>' section",
        choice2: "the '<body>' section",
        choice3: "Both the '<head>' section and the '<body>' section are correct",
        correctAnswer: "B"
    },
    {
        question: "Is JavaScript and Java same programming language",
        choice1: "yes",
        choice2: "no",
        choice3: "sometimes can be considered",
        correctAnswer: "B"
    }
]

const SCORE_POINTS = 25
const MAX_QUESTIONS = 4

function startGame() {
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

function getNewQuestion() {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('/end.html')
    }

    questionCounter++
    // score++

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => 
       
        {
            console.log(choice)
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true

}
let wrongAnswers = 0;

// here is where my code does not work with scores and colors
choices.forEach(choice => {
    choice.addEventListener('click', event => {
        
        const selectedChoice = event.target
        const selectedAnswer = selectedChoice.dataset['number']

        const classToApply = selectedAnswer
        if (selectedAnswer == currentQuestion.correctAnswer) {
            // console.log(classToApply)
            // classToApply === 'correct'
            classToApply.setAttribute("class","correctChoice")
            score++;
         

        } else if (classToApply === 'incorrect') {
            wrongAnswers++;

        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })


function displayScore (){
    scoreText.textContent=score;
}
})

startGame()