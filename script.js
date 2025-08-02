const words = [
  "about", "apple", "angel", "adult", "alien", "alert", "acorn", "abbey", "after", "again",
  "beach", "blush", "blown", "brave", "bride", "bring", "brown", "bison", "bread", "brush",
  "cabin", "candy", "chair", "chess", "climb", "cloud", "clean", "crane", "crisp", "civic",
  "dealt", "debut", "drill", "draft", "doubt", "drink", "demon", "dwell", "dance", "drown",
  "eagle", "early", "elbow", "elite", "entry", "enjoy", "event", "equal", "extra",
  "fable", "fancy", "flood", "flame", "fresh", "flute", "frost", "fleet", "fruit", "funny",
  "gland", "grape", "globe", "gloom", "grind", "groom", "green", "glass", "guess",
  "habit", "happy", "honey", "horse", "hover", "house", "heart", "hinge", "hover", "hurry",
  "image", "index", "input", "irony", "ivory", "ideal", "jelly", "jolly", "joint", "jumpy",
  "kneel", "knife", "knead", "laugh", "lemon", "loyal", "latch", "lunar", "lobby", "lucky",
  "magic", "medal", "metal", "minor", "moist", "mouse", "mango", "noble", "nerve", "nurse",
  "night", "naive", "niche", "ninja", "offer", "orbit", "optic", "ocean", "onion", "oxide",
  "piano", "plant", "pound", "pride", "proxy", "picky", "print", "quiet", "quick", "reach",
  "raise", "raven", "rider", "risky", "roast", "rinse", "river", "siren", "shiny", "spend",
  "spine", "sweat", "stone", "sheep", "sweet", "sugar", "table", "taste", "treat", "track",
  "truth", "toast", "ultra", "uncle", "under", "upper", "vague", "vivid", "vital", "vigor",
  "wound", "waste", "woven", "wider", "whale", "witty", "water", "young", "yield", "youth",
  "zebra", "zesty", "zoned"
];

const randomIndex = Math.floor(Math.random() * 1000000) % words.length;
const secretWord = words[randomIndex];

console.log("The word to guess is:", secretWord); 

const maxRows = 6;
const maxCols = 5;

let currentRow = 0;
let currentCol = 0;

let gameOver = false;

const playAgainButton = document.getElementById("play-again");
playAgainButton.addEventListener("click", () => {
location.reload(); 
});

document.addEventListener("keydown", (e) => {

  if (gameOver) return;

  const key = e.key.toLowerCase();

  if (key.length === 1 && key >= "a" && key <= "z" && currentCol < maxCols) {
    const tileIndex = currentRow * maxCols + currentCol;
    const tile = document.getElementById(`tile-${tileIndex}`);
    tile.textContent = key.toUpperCase();
    currentCol++;
  }

  if (key === "backspace" && currentCol > 0) {
    currentCol--;
    const tileIndex = currentRow * maxCols + currentCol;
    const tile = document.getElementById(`tile-${tileIndex}`);
    tile.textContent = "";
  }

  if (key === "enter" && currentCol === maxCols) {
    const word = [];
    for (let i = 0; i < maxCols; i++) {
      const tileIndex = currentRow * maxCols + i;
      const tile = document.getElementById(`tile-${tileIndex}`);
      word.push(tile.textContent.toLowerCase());
    }
  
    const guessedWord = word.join("");
    for (let i = 0; i < maxCols; i++) {
      const tileIndex = currentRow * maxCols + i;
      const tile = document.getElementById(`tile-${tileIndex}`);
      const letter = guessedWord[i];
    
      if (secretWord[i] === letter) {
        tile.style.backgroundColor = "green";
      } else if (secretWord.includes(letter)) {
        tile.style.backgroundColor = "gold";
      } else {
        tile.style.backgroundColor = "gray";
      }
    }

    const messageElement = document.getElementById("message");
  
    if (guessedWord === secretWord) {
      messageElement.textContent = "🎉 You won!";
      gameOver = true;
      playAgainButton.style.display = "inline-block";
    } else {  
      currentRow++;
      currentCol = 0;
  
      if (currentRow === maxRows) {
        messageElement.textContent = `💀 You lost! The word was "${secretWord}"`;
        gameOver = true;
        playAgainButton.style.display = "inline-block";
      }
    }
   
  }
});
