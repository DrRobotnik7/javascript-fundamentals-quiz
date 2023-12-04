const $highScores = document.getElementById("highscores");
const $clear = document.getElementById("clear");
let userScore = getData('userScore');

// Helper functions
function getData(key) {
  const v = localStorage.getItem(key);
  if(!v) {
    return "";
  }
  return JSON.parse(v);
}

for(var i=0; i<userScore.length; i++) {
  let $li = document.createElement("li");
  $li.innerHTML = "Initials: " + userScore[i]['initials'] + " Score: " + userScore[i]['highScore'];
  $highScores.appendChild($li);
}

$clear.addEventListener("click", function() {
  localStorage.clear();
  window.location.href = "index.html";
});