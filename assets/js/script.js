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

// View high scores page variables
var showScores = document.getElementById("show-scores");
var goBackButton = document.querySelector("go-back-button");
var clearHSButton = document.querySelector("clear-hs-button");

// Underneath questions page, Correct!/Wrong! variables
var answersCorrectWrong = document.getElementById("answers-correct-wrong")
var asnwerState = document.getElementById("answer-state");

// Saves high score to local storage
function saveHighScore(){

}

// function for replacing old questions with new ones?

// add functions under this and button names (Submit, Start, Go Back, etc)
// button.addEventListener('click', functions (event){
//     event.preventDefault();
// }