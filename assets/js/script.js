// Header of page variables
var codingQuizMain = document.getElementById("coding-quiz-title");

var viewScores = document.getElementById("view-scores");
var timeLeft = document.getElementById("time-left");
var startButton = document.querySelector("#start-button");

// Questions page variables
var gameQuestions = document.getElementById("game-questions");
var questionsList = gameQuestions.querySelector("h3");
var answersList = gameQuestions.querySelector("ol");

// End of quiz page variables
var gameOver = document.getElementById("game-over");
var finalScore = document.getElementById("final-score");
var gameOverForm = document.getElementById("game-over-form");
var initialsID = document.getElementById("initials");
var submitButton = document.querySelector("#submit-button");

// View high scores page variables
var showScores = document.getElementById("show-scores");
var goBackButton = document.querySelector("#go-back-button");
var clearHSButton = document.querySelector("#clear-hs-button");

// Underneath questions page, Correct!/Wrong! variables
var answersCorrectWrong = document.getElementById("answers-correct-wrong");
var answerState = document.getElementById("answer-state");

// Hidden/Visible
var hiddenPage = document.getElementById(".hidden");
var visiblePage = document.getElementById(".visible");


// Questions; array of objects for each question, answers, and correct # (index)
var questions = [
    {
        question: "In what order is the JavaScipt file loaded?",
        answers: ["After <head>", "Before </main>", "Before </body>", "After </html>"],
        correct: "Before </body>"
    },
    {
        question: "What operator do you use to compare the same value AND datatype?",
        answers: ["===", "==", "=", ">"],
        correct: "==="
    },
    {
        question: "Which method puts a window on the screen with only one button?",
        answers: ["prompt()", "alert()", "confirm()", "console.log()"],
        correct: "alert()"
    },
    {
        question: "In a Document Object Model (DOM), what element is after the Document?",
        answers: ["Root Element", "Body Element", "Head Element", "Title Element"],
        correct: "Root Element"
    },
    {
        question: "Which method can remove an element from an array?",
        answers: ["pop()", "shift()", "splice()", "All of the above."],
        correct: "All of the above."
    }
];

// Other variables for function values (defaults)
var timer;
var timerCount;
var isCorr = false;
var currQuestion = 0;
var selectedAnswer = 0;
var stateTime = 0;

var userScore = {
    initials: initialsID.value,
    score: timeLeft.value
};

// Loads high scores from previous playthrough (if any)
function init()
{
    getHighScores();
}

// Starts the quiz
function startQuiz()
{
    timerCount = 70;

    startTimer();
    toggleDisplay(codingQuizMain);
    toggleDisplay(gameQuestions);
    showQuestion(0);
    toggleDisplay(answersCorrectWrong);
}

// Starts the timer for startQuiz
function startTimer()
{
    // Edit functionality
    timer = setInterval(function() {
        timerCount--;
        timeLeft.textContent = timerCount;
        if (timerCount >= 0) {
          // Tests if win condition is met
          if (isCorr && timerCount > 0) {
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

// For displaying questions
function showQuestion(currQuestion)
{
     this.thing = currQuestion;
     var thing = questions[currQuestion];

     questionsList.innerText = thing.question;
    
     answersList.innerHTML = "";

     for (let i in thing.answers)
     {
         var ans = thing.answers[i];
         var li = document.createElement("li");
         var button = document.createElement("button");
         button.innerText = ans;
         button.addEventListener("click", function() {
           changeState(i);
         });
         li.appendChild(button);
         answersList.appendChild(li);
     }
}

// For changing questions
function nextQuestion()
{
    if (currQuestion < questions.length - 1)
    {
        currQuestion++;
        showQuestion(currQuestion);
    }

    else
    {
        questionsList.empty();
        answersList.empty();
        endQuiz();
    }
}

// For "Correct" or "Wrong" in showQuestion and answering
function changeState(selectedAnswer)
{
    var correct = questions[this.question].correct == selectedAnswer;
    answerState.innerText = correct ? "Correct!" : "Wrong!";
    if (!correct)
    {
        this.timerCount -= 10;

        if(this.timerCount <=0)
        {
            this.timerCount += 10;
            endQuiz();
        }
    }

}
//     var answerButton = document.getElementById("button");
//     answerButton.addEventListener("click", function(){
//     if(questions[currQuestion].answers[selectedAnswer].correct)
//     {
//         answerState.innerText="Correct!";
//         nextQuestion();
//     }

//     else
//     {
//         nextQuestion();
//         timerCount.textContent = timerCount - 10;
//         answerState.innerText="Wrong!";
//     }
// });

// Ends the quiz
function endQuiz()
{
    toggleDisplay(gameOver);
    saveHighScore();
}

// Saves high score to local storage
function saveHighScore()
{
    localStorage.setItem('userScore', JSON.stringify(userScore));
}

// Gets high scores from local storage [View High Scores]
function getHighScores()
{
    // needs to retrieve list of initials + scores
    var getHS = JSON.parse(localStorage.getItem(userScore));

    if(getHS !== null)
    {
        initialsID.innerHTML = getHS.initials;
        timeLeft.innerHTML = getHS.score;
    }

}

// Clears high scores from local storage
function clearHighScores()
{
    localStorage.clear();
}

// Toggles blocks of code display or hide
function toggleDisplay(x)
{
    x.classList.toggle("hidden");
}

// add event.preventDefault(); under functions

// Click "start" to start the quiz
startButton.addEventListener("click", startQuiz);

// Click on "View high scores" to view scores
showScores.addEventListener("click", getHighScores);

// Click on "Go back" to return to previous screen
//goBackButton.addEventListener("click", );

// Click on "Clear high scores" to clear high scores
clearHSButton.addEventListener("click", clearHighScores);

// Click on "Submit" to submit new high score with initials
submitButton.addEventListener("click", saveHighScore);