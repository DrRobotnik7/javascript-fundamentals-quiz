const $highScores = document.getElementById("highscores");
const $clear = document.getElementById("clear");
let userScore = getData('userScore');

function getData(key) {
  const v = localStorage.getItem(key);
  if(!v) {
    return "";
  }
  return JSON.parse(v);
}

// This for loop creates a list element, injects the text showing the users initials and score and appends to the high scores list
for(var i=0; i<userScore.length; i++) {
  let $li = document.createElement("li");
  $li.innerHTML = "Initials: " + userScore[i]['initials'] + " Score: " + userScore[i]['highScore'];
  $highScores.appendChild($li);
}

// This clears the list of high scores if the user clicks on 'Clear Highscores' - the user is then redirected to the start of the quiz

$clear.addEventListener("click", function() {
  localStorage.clear();
  window.location.href = "index.html";
});