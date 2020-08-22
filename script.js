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

function highlightMoves(e) {
    for (i = 0; i <= 1; i++) {
        win = document.querySelector(`button[data="${wins[e.target.getAttribute("data")][i]}"`);
        win.classList.add("highlight-green")
        lose = document.querySelector(`button[data="${loses[e.target.getAttribute("data")][i]}"`);
        lose.classList.add("highlight-red")
    }
}

function removeHighlight(e) {
    for (i = 0; i <= 1; i++) {
        win = document.querySelector(`button[data="${wins[e.target.getAttribute("data")][i]}"`);
        win.classList.remove("highlight-green")
        lose = document.querySelector(`button[data="${loses[e.target.getAttribute("data")][i]}"`);
        lose.classList.remove("highlight-red")
    }
}

const moves = Array.from(document.querySelector(".buttons").querySelectorAll("button"));

moves.forEach((move) => move.addEventListener("mouseenter", highlightMoves));
moves.forEach((move) => move.addEventListener("mouseleave", removeHighlight));