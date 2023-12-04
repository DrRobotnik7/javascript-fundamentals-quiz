// Helper functions
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

let feedbackTimeout;
let currentTime;
let timer;
let currentQuestion;
let currentScore = 0;

let userScore = getData('userScore') || [];

$start.addEventListener("click", function() {
  startTimer();
  presentNextQuestion();
});

$submit.addEventListener("click", function() {
  userScore.push({
    'initials': $initials.value,
    'highScore': currentScore
  });
  
  setData('userScore', userScore)
  window.location.href = "highscores.html";
});

function startTimer() {
  currentQuestion = -1;
  currentTime = 75;
  currentScore = 0;
  show($questions);
  hide($startScreen);
  
  timer = setInterval(function(){
    currentTime -= 1;
    $time.innerHTML = currentTime
    if(currentTime <= 0) {
      gameOver();
    } 
  }, 1000);
}
function gameOver() {
  clearInterval(timer);
  $finalScore.innerHTML = currentScore;
  hide($start);
  hide($questions);
  show($endScreen);
}

function presentNextQuestion() {
  currentQuestion += 1;
  if(currentQuestion === questions.length) {
    gameOver();
    return;
  }
  $choices.innerHTML = "";
  $questionTitle.innerHTML = questions[currentQuestion]["question"];
  for (let i=0; i < questions[currentQuestion]["options"].length; i++){
    const $optionButton = document.createElement("button");
    $optionButton.innerHTML = questions[currentQuestion]["options"][i];
    $optionButton.addEventListener("click", pickAnswer);
    $choices.append($optionButton);
  }
}

function pickAnswer(event) {
  var audio;
  clearTimeout(feedbackTimeout);

  if(questions[currentQuestion]["answer"] !== event.srcElement.innerHTML) {
    currentTime -= 10;
    $feedback.innerHTML = "Wrong!";
    audio = new Audio('./assets/sfx/incorrect.wav');
  } else {
    $feedback.innerHTML = "Correct!";
    currentScore += 1;
    audio = new Audio('./assets/sfx/correct.wav');
  }
  audio.play();
  
  show($feedback);

  feedbackTimeout = setTimeout(function() {
    hide($feedback);
  }, 4000);
  presentNextQuestion();
}

