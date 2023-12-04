// Helper functions to save using same code multiple times
function show(element){
  element.classList.remove("hide");
}

function hide(element){
  element.classList.add("hide");
}

function getData(key) {
  const v = localStorage.getItem(key);
  if(!v) {
    return "";
  }
  return JSON.parse(v);
}

function setData(key, value) {
  return localStorage.setItem(key, JSON.stringify(value));
}

// Fetching HTML elements and assigning them to variables so they can be interacted with and manipulated in JavaScript
const $time = document.getElementById("time");
const $questions = document.getElementById("questions");
const $questionTitle = document.getElementById("question-title");
const $choices = document.getElementById("choices");
const $start = document.getElementById("start");
const $startScreen = document.getElementById("start-screen");
const $endScreen = document.getElementById("end-screen");
const $feedback = document.getElementById("feedback");
const $finalScore = document.getElementById("final-score");
const $initials = document.getElementById("initials");
const $submit = document.getElementById("submit");

// Declaring variables globally so they can be accessed by functions in forthcoming logic
let feedbackTimeout;
let currentTime;
let timer;
let currentQuestion;
let currentScore = 0;

// If this is the first attempt the users score object is set as an empty array here. If it is not the first attempt, the variable now stores all of the data held in local storage 
let userScore = getData('userScore') || [];

// When the start button is clicked the timer countdown begins and the first question is shown
$start.addEventListener("click", function() {
  startTimer();
  presentNextQuestion();
});

// When the submit button is clicked at the end of the quiz the users initials and score are added to an array of user scores in the local storage
$submit.addEventListener("click", function() {
  userScore.push({
    'initials': $initials.value,
    'highScore': currentScore
  });
  
  // The user scores object array is now updated
  setData('userScore', userScore)

  // The user is taken from the quiz to the high scores
  window.location.href = "highscores.html";
});

// This code block sets the timer to 75 seconds and intialises the score to 0. It hides the start screen and shows the question
function startTimer() {
  currentQuestion = -1; // This is set to -1 so that when 1 is added for the first question, this will be index 0 of the questions array
  currentTime = 75;
  currentScore = 0;
  show($questions);
  hide($startScreen);
  
  // This sets the timer to decrement by 1 every second - it also triggers the gameOver function when the timer gets to 0
  timer = setInterval(function(){
    currentTime -= 1;
    $time.innerHTML = currentTime
    if(currentTime <= 0) {
      gameOver();
    } 
  }, 1000);
}

// When the timer reaches 0, the timer stops decrementing, the quiz disappears and the end screen is shown to the user with their score and an initials input box
function gameOver() {
  clearInterval(timer);
  $finalScore.innerHTML = currentScore;
  hide($start);
  hide($questions);
  show($endScreen);
}

// This function builds the next question and answer buttons from the array of questions
function presentNextQuestion() {
  currentQuestion += 1;
  if(currentQuestion === questions.length) {
    gameOver();
    return; // This return stops the rest of the function from being executed if the quiz ends
  }
  $choices.innerHTML = ""; // This clears the previous questions multiple choice options
  $questionTitle.innerHTML = questions[currentQuestion]["question"];
  for (let i=0; i < questions[currentQuestion]["options"].length; i++){
    const $optionButton = document.createElement("button");
    $optionButton.innerHTML = questions[currentQuestion]["options"][i];
    $optionButton.addEventListener("click", pickAnswer);
    $choices.append($optionButton);
  }
}

// This function informs the user whether they got the answer correct or incorrect and plays the associated sound.
function pickAnswer(event) {
  var audio;
  clearTimeout(feedbackTimeout);

  if(questions[currentQuestion]["answer"] !== event.srcElement.innerHTML) {
    currentTime -= 10; // If wrong the time is reduced by 10 seconds
    $feedback.innerHTML = "Wrong!";
    audio = new Audio('./assets/sfx/incorrect.wav');
  } else {
    $feedback.innerHTML = "Correct!";
    currentScore += 1; // If correct the users current score increases by 1
    audio = new Audio('./assets/sfx/correct.wav');
  }
  audio.play();
  
  show($feedback); // This shows the user whether they got the question right or wrong

  feedbackTimeout = setTimeout(function() {
    hide($feedback);
  }, 4000); // This hides the feedback after 4 seconds
  presentNextQuestion(); // This triggers the next question function
}

