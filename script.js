// Firebase config
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Variables
let currentPlayer = 1;
let gameRef = db.ref("games/123");

// Invite Friend
function invitePlayer() {
    const gameCode = prompt("Enter game code to join:");
    gameRef = db.ref("games/" + gameCode);

    gameRef.once("value", (snapshot) => {
        if (snapshot.exists()) {
            alert("Player joined!");
        } else {
            alert("Invalid game code");
        }
    });
}

// Roll Dice
document.getElementById('rollDiceBtn').addEventListener('click', () => {
    let diceValue = Math.floor(Math.random() * 6) + 1;
    document.getElementById('diceResult').textContent = "Rolled: " + diceValue;
    gameRef.child('currentTurn').set(currentPlayer === 1 ? 2 : 1); // Switch turn
});

// Listen for game updates
gameRef.on('value', (snapshot) => {
    const gameData = snapshot.val();
    if (gameData.currentTurn === 1) {
        alert("Player 1's turn");
    } else {
        alert("Player 2's turn");
    }
});
