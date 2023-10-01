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
var timerCount = 70;
var isCorrect = false;

// Loads high scores from previous playthrough (if any)
function init()
{
    //getsHighScores();
}

// Starts the quiz
function startQuiz()
{

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

// Ends the quiz
function endQuiz()
{

}

// Saves high score to local storage
function saveHighScore()
{

}

// Clears high scores
function clearHighScores()
{

}

// checkWin()?

// function for replacing old questions with new ones?

// add functions under this and button names (Submit, Start, Go Back, etc)
// button.addEventListener('click', functions (event){
//     event.preventDefault();
// }

startButton.addEventListener("click", startQuiz);

//goBackButton.addEventListener("click", <return to page>)

clearHSButton.addEventListener("click", clearHighScores);

submitButton.addEventListener("click", saveHighScore);