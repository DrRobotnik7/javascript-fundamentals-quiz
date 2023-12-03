// Helper functions
function show(element){
  element.classList.remove("hide");
}
function hide(element){
  element.classList.add("hide");
}

// WHEN I click the start button
// THEN a timer starts and I am presented with a question
const $time = document.getElementById("time");
const $questions = document.getElementById("questions");
const $questionTitle = document.getElementById("question-title");
const $choices = document.getElementById("choices");
const $start = document.getElementById("start");
const $startScreen = document.getElementById("start-screen");
const $endScreen = document.getElementById("end-screen");
const $feedback = document.getElementById("feedback");
const $finalScore = document.getElementById("final-score");

let currentTime;
let timer;
let currentQuestion;
let currentScore = 0;

$start.addEventListener("click", function(event) {
    startTimer();
    presentNextQuestion();
});

// WHEN all questions are answered or the timer reaches 0
// THEN the game is over
// WHEN the game is over
// THEN I can save my initials and score
function startTimer() {
  currentQuestion = -1;
  currentTime = 75;
  currentScore = 0;
  show($questions);
  hide($startScreen);
  
  timer = setInterval(function(){
    currentTime -= 1;
    $time.innerHTML = currentTime
    if(currentTime === 0) {
      gameOver();
    } 
  }, 1000);
}
function gameOver() {
  clearInterval(timer);
  // game over
  $finalScore.innerHTML = currentScore;
  hide($start);
  hide($questions);
  hide($feedback);
  show($endScreen);
}

// WHEN I answer a question
// THEN I am presented with another question
function presentNextQuestion() {
  currentQuestion += 1;
  if(currentQuestion === questions.length) {
    gameOver();
    return;
  }
  $choices.innerHTML = "";
  $questionTitle.innerHTML = questions[currentQuestion]["question"];
  // "options":["A","B","C","D"],
  for (let i=0; i < questions[currentQuestion]["options"].length; i++){
    // create a button
    const $optionButton = document.createElement("button");
    // set the innerHTML of the button to be the option
    $optionButton.innerHTML = questions[currentQuestion]["options"][i];
    // add event listener to the button
    $optionButton.addEventListener("click", pickAnswer);
    // append the button to $choices
    $choices.append($optionButton);
  }
}

function pickAnswer(event) {
  console.log(event);
  // WHEN I answer a question incorrectly
  // THEN time is subtracted from the clock
  if(questions[currentQuestion]["answer"] !== event.srcElement.innerHTML) {
    currentTime -= 5;
    $feedback.innerHTML = "Wrong";
  } else {
    $feedback.innerHTML = "Correct";
    currentScore += 1;
  }
  show($feedback);
  setTimeout(function() {
    hide($feedback);
  }, 2500);
  presentNextQuestion();
}



