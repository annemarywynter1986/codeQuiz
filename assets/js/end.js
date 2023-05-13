const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')
const playAgainBtnEl = document.querySelector('#play-again')
const goHomeBtn = document.querySelector('#go-home')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5

$('#play-again').css("display", "none")

// this function is to make sure that Save button is disabled untill player adds their name

finalScore.innerText = mostRecentScore


username.addEventListener('keyup', () => {

    saveScoreBtn.disabled = !username.value
    displayBtns();
   
}
)


saveHighScore = e => {
    e.preventDefault()

    const score = {
        score: mostRecentScore,
        name: username.value
    }

    highScores.push(score)

    highScores.sort((a, b) => {
        return b.score - a.score
    })

    highScores.splice(5)

    localStorage.setItem('highScores', JSON.stringify(highScores))
    // window.location.assign('./highcores.html')
    
    }



// function to hide/display 2 buttons based on entering players name, unless this condition is not met JQuery is defaulting these
// two buttons to be hidden

function displayBtns(event) {
    if (saveScoreBtn.disabled === true) {
        $('#play-again').css("display", "none");
    $('#go-home').css("display", "none")
      
    }else {
        $('#play-again').css("display", "block");
       $('#go-home').css("display", "block")

    }
}
 displayBtns();

 //function to click Save button 
 saveScoreBtn.addEventListener("click", function(){
    return window.location.assign('./highscores.html');

 });
