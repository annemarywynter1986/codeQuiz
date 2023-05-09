const username = document.querySelector('#username')
const saveScoreBtn = document.querySelector('#saveScoreBtn')
const finalScore = document.querySelector('#finalScore')
const mostRecentScore = localStorage.getItem('mostRecentScore')
const playAgainBtnEl = document.querySelector('#play-again')
const goHomeBtn = document.querySelector('#go-home')

const highScores = JSON.parse(localStorage.getItem('highScores')) || []

const MAX_HIGH_SCORES = 5

$('#play-again').css("display", "none")

finalScore.innerText = mostRecentScore

// playAgainBtnEl.hide();
// goHomeBtn.hide();

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
    window.location.assign('/')


}

// saveScoreBtn.on('click', '#saveScoreBtn', function (event) {
function displayBtns(event) {
    if (saveScoreBtn.disabled === true) {
        $('#play-again').css("display", "none")
        $('#go-home').css("display", "none")
      
    }else {
        $('#go-home').css("display", "block")
        $('#go-home').css("display", "block")

    }
}
 displayBtns();


