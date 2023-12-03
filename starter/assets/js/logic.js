// To do list
// Update questions
// Go back functionality
// Clear high scores functionality
// Local storage
// When click submit button my initials and score are saved locally

//Tried but can't do
//The feedback countdown needs to reset with each click as it hides after 4 seconds starting from the first answer clicked
// Audio functions for correct and wrong answers

// Helper functions
function show(element){
  element.classList.remove("hide");
}
function hide(element){
  element.classList.add("hide");
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
let currentTime;
let timer;
let currentQuestion;
let currentScore = 0;

$start.addEventListener("click", function() {
    startTimer();
    presentNextQuestion();
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
    if(currentTime === 0) {
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
  if(questions[currentQuestion]["answer"] !== event.srcElement.innerHTML) {
    currentTime -= 10;
    $feedback.innerHTML = "Wrong!";
  } else {
    $feedback.innerHTML = "Correct!";
    currentScore += 1;
  }
  show($feedback);
  setTimeout(function() {
    hide($feedback);
  }, 4000);
  presentNextQuestion();
}

// // THEN I can save my initials and score
// window.onload = function() {

//   // Check for LocalStorage support.
//   if (localStorage) {

//     // Add an event listener for form submissions
//     document.getElementById('submit').addEventListener('click', function() {
//       // Get the value of the name field.
//       var name = document.getElementById('initials').value;

//       // Save the name in localStorage.
//       localStorage.setItem('initials', initials);
//     });

//   }

// }
