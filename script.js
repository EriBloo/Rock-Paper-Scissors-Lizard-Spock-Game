const wins = {
    "rock" : ["scissors", "lizard"], 
    "paper": ["rock", "spock"], 
    "scissors" : ["paper", "lizard"],
    "lizard" : ["spock", "paper"], 
    "spock" : ["scissors", "rock"]
}

const loses = {
    "rock" : ["paper", "spock"], 
    "paper" : ["scissors", "lizard"],
    "scissors" : ["rock", "spock"], 
    "lizard" : ["rock", "scissors"], 
    "spock" : ["paper", "lizard"]
}

const outcomes = {
    "rock" : { "scissors" : "crushes", "lizard" : "crushes" },
    "paper" : { "rock" : "covers", "spock" : "disproves" },
    "scissors" : { "paper": "cuts", "lizard" : "decapitates" },
    "lizard" : { "spock" : "poisons", "paper" : "eats" },
    "spock" : { "scissors" : "smashes", "rock" : "vaporizes" }
}

let difficulty = "easy";
const previousChoices = [];
let playerWins = 0;
let computerWins = 0;

function addHighlightMoves(e) {
    for (i = 0; i <= 1; i++) {
        win = document.querySelector(`button[data="${wins[e.target.getAttribute("data")][i]}"`);
        win.classList.add("highlight-green")
        lose = document.querySelector(`button[data="${loses[e.target.getAttribute("data")][i]}"]`);
        lose.classList.add("highlight-red")
    }
}

function removeHighlightMoves(e) {
    for (i = 0; i <= 1; i++) {
        win = document.querySelector(`button[data="${wins[e.target.getAttribute("data")][i]}"]`);
        win.classList.remove("highlight-green")
        lose = document.querySelector(`button[data="${loses[e.target.getAttribute("data")][i]}"]`);
        lose.classList.remove("highlight-red")
    }
}

function computerEasy(options = ["rock", "paper", "scissors", "lizard", "spock"]) {
    return options[Math.floor(Math.random() * options.length)];
}

function computerMedium() {
    if (previousChoices.length === 0) {
        return computerEasy();
    }
    else {
        const possible = [];
        for (const prev of previousChoices) {
            possible.push(loses[prev][0]);
            possible.push(loses[prev][1]);
        }
        console.log(possible)
        return computerEasy(possible);
    }
}

function printOutcome(winner, winningPick, losingPick) {
    if (winner === "you") {
        playerWins += 1;
        document.querySelector(".computer-pick").textContent = `Computer picks ${losingPick}`;
        document.querySelector(".outcome").textContent = `${winningPick.charAt(0).toUpperCase() + winningPick.slice(1)} ${outcomes[winningPick][losingPick]} ${losingPick}`;
        document.querySelector(".winner").textContent = "You win";
    }
    else if (winner === 'tie') {
        document.querySelector(".computer-pick").textContent = `Computer picks ${losingPick}`;
        document.querySelector(".outcome").textContent = "Nothing happens"
        document.querySelector(".winner").textContent = "Tie"
    }
    else {
        computerWins += 1;
        document.querySelector(".computer-pick").textContent = `Computer picks ${winningPick}`;
        document.querySelector(".outcome").textContent = `${winningPick.charAt(0).toUpperCase() + winningPick.slice(1)} ${outcomes[winningPick][losingPick]} ${losingPick}`;
        document.querySelector(".winner").textContent = "Computer wins";

    }

    document.querySelector(".score").textContent = `${playerWins} - ${computerWins}`
}

function playerAction(e) {
    let player = e.target.getAttribute('data');
    let computer;
    let winner;

    switch (difficulty) {
        case "easy":
            computer = computerEasy();
            break;
        case "medium":
            computer = computerMedium();
            break;
        case "hard":
            computer = computerHard();
            break;
    }

    if (wins[player].includes(computer)) {
        winner = 'you';
        printOutcome(winner, player, computer);
    }
    else if (player === computer) {
        winner = 'tie';
        printOutcome(winner, player, computer);
    }
    else {
        winner = 'computer';
        printOutcome(winner, computer, player);
    }

    previousChoices.push(player);
    if (previousChoices.length > 10) {
        previousChoices.shift();
    }
}

function chooseDifficulty(e) {
    let newDiff = e.target.getAttribute("data");
    let oldDiff = document.querySelector(`button[data="${difficulty}"]`)

    if (difficulty === newDiff) {
        return;
    }

    oldDiff.classList.remove("highlight-grey");
    e.target.classList.add("highlight-grey");
    difficulty = newDiff;
}

const moves = Array.from(document.querySelector(".buttons").children);
moves.forEach((move) => move.addEventListener("mouseenter", addHighlightMoves));
moves.forEach((move) => move.addEventListener("mouseleave", removeHighlightMoves));
moves.forEach((move) => move.addEventListener("click", playerAction))

document.querySelector(".new-game").addEventListener("click", () => {location.reload()});

const difficulties = Array.from(document.querySelector(".difficulty-wrapper").children);
difficulties.forEach((diff) => diff.addEventListener("click", chooseDifficulty))