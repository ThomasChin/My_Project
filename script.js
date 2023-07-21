// Function to get and display the leaderboard
function showLeaderboard() {
  let scores = JSON.parse(localStorage.getItem('scores')) || [];
  let leaderboard = scores
    .sort((a, b) => b.score - a.score)
    .map((entry, index) => `<p>${index + 1}. ${entry.name}: ${entry.score}</p>`)
    .join('');
  document.getElementById('score-container').innerHTML = leaderboard;
}

// Function to start the game and record the score
function playGame() {
  const playerName = prompt('Enter your name:');
  if (!playerName) return;

  // For simplicity, let's assume the game generates a random score between 0 and 100
  const score = Math.floor(Math.random() * 101);

  let scores = JSON.parse(localStorage.getItem('scores')) || [];
  scores.push({ name: playerName, score: score });
  localStorage.setItem('scores', JSON.stringify(scores));

  showLeaderboard();
}

// Attach event listener to the "Play Game" button
document.getElementById('play-btn').addEventListener('click', playGame);

// Show the leaderboard when the page loads
showLeaderboard();
