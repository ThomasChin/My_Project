const firebaseConfig = {
  apiKey: "AIzaSyDz0D3gOMDNIO5ZK_yleQk1-p7VxgkUnTg",
  authDomain: "thomas-chin.firebaseapp.com",
  projectId: "thomas-chin",
  storageBucket: "thomas-chin.appspot.com",
  messagingSenderId: "520663111964",
  appId: "1:520663111964:web:c2a1d757b761c08774c2d9",
  measurementId: "G-KWDSQ2ZF68"
};

firebase.initializeApp(firebaseConfig);

let score = 0;
const leaderboardRef = firebase.database().ref("leaderboard");

function updateScore() {
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = score.toString();
}

function updateLeaderboard() {
    leaderboardRef.orderByChild("score").limitToLast(10).on("value", (snapshot) => {
        const leaderboardElement = document.getElementById("leaderboard");
        leaderboardElement.innerHTML = "";

        snapshot.forEach((childSnapshot) => {
            const entry = childSnapshot.val();
            const listItem = document.createElement("li");
            listItem.textContent = `${entry.name} - ${entry.score}`;
            leaderboardElement.appendChild(listItem);
        });
    });
}

function handleClick() {
    score += 1;
    updateScore();

    const playerName = prompt("Congratulations! You achieved a score of " + score + ". Please enter your name:");

    // Push the new score and name to the leaderboard
    leaderboardRef.push({ name: playerName, score: score });
}

const clickButton = document.getElementById("clickButton");
clickButton.addEventListener("click", handleClick);

// Call the updateLeaderboard function to initialize the leaderboard
updateLeaderboard();
