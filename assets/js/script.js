// Header of page variables
var codingQuizMain = document.getElementById("coding-quiz-title");

//View Scores on top left, Time left on top right, start button after Coding Quiz Challenge
var viewScores = document.getElementById("view-scores");
var timeLeft = document.getElementById("time-left");
var startButton = document.querySelector("#start-button");

// Questions page variables
var gameQuestions = document.getElementById("game-questions");
var questionsList = gameQuestions.querySelector("p");
// Answers to choose from section
var answersList = gameQuestions.querySelector("ol");
var firstChoice = document.getElementById("button1");
var secondChoice = document.getElementById("button2");
var thirdChoice = document.getElementById("button3");
var fourthChoice = document.getElementById("button4");

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


// Questions; array of objects for each question, answers, and correct answer
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
var currQuestion = 0;
var selectedAnswer = 0;

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
    currQuestion = 0;

    startTimer();
    toggleDisplay(codingQuizMain);
    toggleDisplay(gameQuestions);
    showQuestion();
    toggleDisplay(answersCorrectWrong);
}

// Starts the timer for startQuiz
function startTimer()
{
    timer = setInterval(function() {
        timerCount--;
        timeLeft.textContent = timerCount;
        // If time is less than or equal to 0 seconds
        if (timerCount <= 0) {
            // Clears interval and stops timer
            clearInterval(timer);

            if(currQuestion < questions.length - 1)
            {
                endQuiz();
            }
        }
    }, 1000);
}


function showQuestion()
{
    nextQuestion();
}

// For changing questions
function nextQuestion()
{
    questionsList.textContent = questions[currQuestion].question;

    firstChoice.textContent = questions[currQuestion].answers[0];
    secondChoice.textContent = questions[currQuestion].answers[1];
    thirdChoice.textContent = questions[currQuestion].answers[2];
    fourthChoice.textContent = questions[currQuestion].answers[3];

}

// For "Correct" or "Wrong", change to next question
function changeState(selectedAnswer)
{
    if(questions[currQuestion].answers === questions[currQuestion].answers[selectedAnswer])
    {
        answerState.textContent="Correct!";
    }

    else
    {
        timerCount -= 10;
        timerCount.textContent = timerCount;
        answerState.textContent="Wrong!";
    }

    currQuestion++;
    if (currQuestion < questions.length - 1)
    {
        nextQuestion();
    }

    else
    {
        endQuiz();
    }
}

function chooseFirst() 
{ 
    changeState(0); 
}

function chooseSecond() 
{ 
    changeState(1); 
}

function chooseThird() 
{ 
    changeState(2); 
}

function chooseFourth() 
{ 
    changeState(3); 
}

// Ends the quiz
function endQuiz()
{
    toggleDisplay(gameOver);
    toggleDisplay(gameQuestions);
    finalScore.textContent = timeLeft;
    saveHighScore();
}

// Saves high score to local storage
function saveHighScore()
{
    event.preventDefault();
    if (initialsID.value === "") {
        alert("Enter your initials.");
        return;
    }

    finalScore.textContent = timerCount;
    timerCount = timeLeft.value;
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

// Click "start" to start the quiz
startButton.addEventListener("click", startQuiz);

// Selecting an answer
firstChoice.addEventListener("click", chooseFirst);
secondChoice.addEventListener("click", chooseSecond);
thirdChoice.addEventListener("click", chooseThird);
fourthChoice.addEventListener("click", chooseFourth);

// Click on "View high scores" to view scores
showScores.addEventListener("click", function(event)
{
    getHighScores(event);
});

// Click on "Go back" to return to previous screen
goBackButton.addEventListener("click", function(event)
{
    toggleDisplay(event);
});

// Click on "Clear high scores" to clear high scores
clearHSButton.addEventListener("click", clearHighScores);

// Click on "Submit" to submit new high score with initials
submitButton.addEventListener("click", saveHighScore);