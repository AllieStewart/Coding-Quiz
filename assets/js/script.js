// Header of page variables
var viewScores = document.getElementById("view-scores");
var timeLeft = document.getElementById("time-left");
var startButton = document.querySelector("start-button");

// Questions page variables
var gameQuestions = document.getElementById("game-questions");
var answersList = gameQuestions.querySelector("ol");

// End of quiz page variables
var gameOver = document.getElementById("game-over");
var finalScore = document.getElementById("final-score");
var gameOverForm = document.getElementById("game-over-form");
var initialsID = document.getElementById("initials");
var submitButton = document.querySelector("submit-button");

// View high scores page variables
var showScores = document.getElementById("show-scores");
var goBackButton = document.querySelector("go-back-button");
var clearHSButton = document.querySelector("clear-hs-button");

// Underneath questions page, Correct!/Wrong! variables
var answersCorrectWrong = document.getElementById("answers-correct-wrong");
var answerState = document.getElementById("answer-state");

// Questions; array of objects for each question, answers, and correct # (index)
var questions = [
    {
        question: "?",
        answers: ["yes", "no"],
        correct: 0,
    },
    {
        question: "?",
        answers: ["yes", "no"],
        correct: 0,
    },
    {
        question: "?",
        answers: ["yes", "no"],
        correct: 0,
    },
    {
        question: "?",
        answers: ["yes", "no"],
        correct: 0,
    },
    {
        question: "?",
        answers: ["yes", "no"],
        correct: 0,
    }
];

// Other variables for function values (defaults)
var timer = 0;
var timerCount;
var isCorrect = false;

// Loads high scores from previous playthrough (if any)
function init()
{
    //getHighScores();
}

// Starts the quiz
function startQuiz()
{
    isWin = false;
    timerCount = 70;

    startTimer();
}

// Starts the timer for the quiz
function startTimer()
{
    // Edit functionality
    timer = setInterval(function() {
        timerCount--;
        timerElement.textContent = timerCount;
        if (timerCount >= 0) {
          // Tests if win condition is met
          if (isCorrect && timerCount > 0) {
            // Clears interval and stops timer
            clearInterval(timer);
            endQuiz();
          }
        }
        // Tests if time has run out
        if (timerCount === 0) {
          // Clears interval
          clearInterval(timer);
          endQuiz();
        }
      }, 1000);
}

// For answering questions
function answerQuestion()
{

}

// For "Correct" or "Wrong"
function changeState()
{

}

// Ends the quiz
function endQuiz()
{

}

// Saves high score to local storage
function saveHighScore()
{
    // needs to save initials + score from timer
    // initialsID + timeLeft?
}

// Gets high scores from local storage [View High Scores]
function getHighScores()
{
    // needs to retrieve list of initials + scores
}

// Clears high scores from local storage
function clearHighScores()
{
    // needs to clear high score
}

// checkWin()?

// add event.preventDefault(); under functions

// Click "start" to start the quiz
startButton.addEventListener("click", startQuiz);

// Click on "View high scores" to view scores
showScores.addEventListener("click", getHighScores);

// Click on "Go back" to return to previous screen
//goBackButton.addEventListener("click", <return to page>)

// Click on "Clear high scores" to clear high scores
clearHSButton.addEventListener("click", clearHighScores);

// Click on "Submit" to submit new high score with initials
submitButton.addEventListener("click", saveHighScore);