// select all elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const allDone =document.getElementById("allDone");
var viewScores = localStorage.getItem("viewScores");
var saveButton = document.getElementById("save");
var goBackButton = document.getElementById("goBack");
var textAreaInit= document.getElementById("msg");

// create our questions
let questions = [
     {
        question: "Inside which HTML element do we put the JavaScript?",
        choiceA:"<script>",
        choiceB: "<scripting>",
        choiceC: "<js>",
        correct: "A"
    },
    {
        question: "What is the correct JavaScript syntax?",
        choiceA:"#demo.innerHTML='Hello World!'",
        choiceB: "document.getElementById('p').innerHTML='Hello World!'",
        choiceC:"document.getElementById('demo').innerHTML='Hello World!'",
        correct: "C"
    },
    {
        question: "Where is the correct place to insert a JavaScript?",
        choiceA:"the '<head>' section",
        choiceB: "the '<body>' section",
        choiceC: "Both the '<head>' section and the '<body>' section are correct",
        correct: "B"
    },
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 100; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

// render progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// counter render

function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// checkAnwer

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}

// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender(){
    scoreDiv.style.display = "block";
    // textAreaInit.style.display="block";
    // saveButton.style.display="block";
    // goBackButton.style.display="block";
    
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "./assests/images/5.png" :
              (scorePerCent >= 60) ? "./assests/images/4.png" :
              (scorePerCent >= 40) ? "./assests/images/3.png" :
              (scorePerCent >= 20) ? "./assests/images/2.png" :
              "./assests/images/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}

//  function viewScores(){
// viewScores.addEventListener("click",)
// }

saveButton.addEventListener("click", function(event) {
    event.preventDefault();
var allDoneSave = {
    scoreResult: scorePerCent.value,
    initials: initials.value,
  };

localStorage.setItem("#allDone", JSON.stringify(allDoneSave));

// var str = JSON.stringify(student);
// console.log(typeof(studentGrade));
// console.log(typeof(JSON.parse(str)));
renderMessage();

});