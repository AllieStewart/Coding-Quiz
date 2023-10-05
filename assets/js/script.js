// Header of page variables; the main quiz page
var codingQuizMain = document.getElementById("coding-quiz-title");

// 'View Scores' on top left, 'Time left' on top right, 'Start' button after 'Coding Quiz Challenge'
var viewScores = document.getElementById("view-scores");
var timeLeft = document.getElementById("time-left");
var startButton = document.getElementById("start-button");

// Questions page variables, with spot for questions
var gameQuestions = document.getElementById("game-questions");
var questionsList = gameQuestions.querySelector("p");
// Answers to choose from section, with ordered list
var answersList = gameQuestions.querySelector("ol");
var firstChoice = document.getElementById("button1");
var secondChoice = document.getElementById("button2");
var thirdChoice = document.getElementById("button3");
var fourthChoice = document.getElementById("button4");

// End of quiz page variables, with a 'Submit' button
var gameOver = document.getElementById("game-over");
var finalScore = document.getElementById("final-score");
//var gameOverForm = document.getElementById("game-over-form"); // Never used the form
var initialsID = document.getElementById("initials");
var submitButton = document.getElementById("submit-button");

// View high scores page variables, with 'Go back' and 'Clear high scores' buttons
var showScores = document.getElementById("show-scores");
var goBackButton = document.getElementById("go-back-button");
var clearHSButton = document.getElementById("clear-hs-button");

// Underneath questions page, Correct!/Wrong! variables
var answersCorrectWrong = document.getElementById("answers-correct-wrong");
var answerState = document.getElementById("answer-state");

// Hidden toggle for pages
var hiddenPage = document.getElementById(".hidden");
// Do not seem to have a use for the "visible" element
// var visiblePage = document.getElementById(".visible");


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
// 'timer' for the setInterval, 'timerCount' for actual countdown + ending score,
// 'currQuestion' is index of "question" in "questions[]", 
// 'selectedAnswer' is user's selected answer
var timer;
var timerCount = 0;
var currQuestion = 0;
var selectedAnswer = 0;

// The user's 'initials' and 'score', as defaults
var userScore = {
    initials: initialsID,
    score: timerCount.value = 0
};

// Starts the quiz, toggles main display to be off, toggles questions page(s)
function startQuiz()
{
    // Timer counter set to 70 seconds
    timerCount = 70;

    startTimer();
    toggleDisplay(codingQuizMain);
    toggleDisplay(gameQuestions);
    showQuestion();
}

// Starts the timer for function 'startQuiz'
function startTimer()
{
    // Timer has setInterval
    timer = setInterval(function() {
        timerCount--;
        timeLeft.textContent = timerCount;
        // If time is less than or equal to 0 seconds
        if (timerCount <= 0) {
            // Stops timer
            clearInterval(timer);
            // Ends quiz if questions are done before timer is 0
            if(currQuestion < questions.length - 1)
            {
                endQuiz();
            }
        }
    }, 1000);
}

// Displays the questions, toggles 'Correct!/Wrong!' box underneath
function showQuestion()
{
    nextQuestion();
    toggleDisplay(answersCorrectWrong);
}

// For putting new questions/choices on each page
function nextQuestion()
{
    questionsList.textContent = questions[currQuestion].question;

    firstChoice.textContent = questions[currQuestion].answers[0];
    secondChoice.textContent = questions[currQuestion].answers[1];
    thirdChoice.textContent = questions[currQuestion].answers[2];
    fourthChoice.textContent = questions[currQuestion].answers[3];

}

// For 'Correct!' or 'Wrong!', change to next question
function changeState(selectedAnswer)
{
    if(questions[currQuestion].correct === questions[currQuestion].answers[selectedAnswer])
    {
        answerState.textContent="Correct!";
    }

    else
    {
        timerCount -= 10;
        timeLeft.textContent = timerCount;
        answerState.textContent="Wrong!";
    }

    // Increment after answer is selected
    currQuestion++;
    // Changes page as long as there are still questions
    if (currQuestion < questions.length)
    {
        nextQuestion();
    }
    // Ends quiz once questions run out
    else
    {
        endQuiz();
    }
}

// If user chooses first choice
function chooseFirst() 
{ 
    changeState(0); 
}

// If user chooses second choice
function chooseSecond() 
{ 
    changeState(1); 
}

// If user chooses third choice
function chooseThird() 
{ 
    changeState(2); 
}

// If user chooses fourth choice
function chooseFourth() 
{ 
    changeState(3); 
}

// Ends the quiz, toggles display for game over screen, removes questions,
// sets the timer's counter to the user's score and displays it on screen
function endQuiz()
{
    toggleDisplay(gameOver);
    toggleDisplay(gameQuestions);
    clearInterval(timer);
    finalScore.innerText = timerCount.toString();
    userScore.score = timerCount.toString();
}

// Saves high score to local storage
function saveHighScore(event)
{
    event.preventDefault();

    toggleDisplay(gameOver);
    // Cannot enter empty space for initials
    if (initialsID.value === "") {
        alert("Enter your initials.");
        return;
    }
    // can't seem to get 'initials' to store...
    userScore.initials =  initialsID.value;
    
    var saveScores = localStorage.getItem("high scores");
    var scoreArr;
    // If there are no saved scores, make an array
    if(saveScores === null)
    {
        scoreArr = [];
    }
    // Else, parse the saved scores
    else
    {
        scoreArr = JSON.parse(saveScores);
    }
    // Push userScore onto array, store in local storage
    scoreArr.push(userScore);
    localStorage.setItem("high scores", JSON.stringify(scoreArr));

    getHighScores();
}

// Gets high scores from local storage, 'View High Scores'
function getHighScores(event)
{
    toggleDisplay(showScores);
    // Parses local storage key
    var getHS = JSON.parse(localStorage.getItem("high scores"));

    // If not null, get values
    if(getHS !== null)
    {
        initialsID.value = getHS.initials;
        finalScore.innerHTML = getHS.score;

    }
        // Fill in ordered list with elements from userScore [initials and score]
        for (var i = 0; i < getHS.length; i++)
        {
            var newScore = document.createElement("ol");
            newScore.innerHTML = getHS[i].initials + ": " + getHS[i].score;
            showScores.appendChild(newScore);
        }
    

}

// Toggles blocks of code display or hide
function toggleDisplay(x)
{
    x.classList.toggle("hidden");
}

// Click "Start" to start the quiz
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
//^ Could not get to work :/

// Click on "Go back" to return to previous screen
goBackButton.addEventListener("click", function()
{
    // Resets questions + quiz
    currQuestion = 0;
    toggleDisplay(codingQuizMain);
    toggleDisplay(answersCorrectWrong);
});

// Click on "Clear high scores" to clear high scores
clearHSButton.addEventListener("click", function()
{
    localStorage.removeItem("high scores");
});

// Click on "Submit" to submit new high score with initials
submitButton.addEventListener("click", function(event)
{
    saveHighScore(event);
});