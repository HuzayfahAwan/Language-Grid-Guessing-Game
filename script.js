console.log("script running");

const englishTile = document.querySelector("#English");
const spanishTile = document.querySelector("#Spanish");
const chineseTile = document.querySelector("#Chinese");
const tagalogTile = document.querySelector("#Tagalog");
const vietnameseTile = document.querySelector("#Vietnamese");
const arabicTile = document.querySelector("#Arabic");
const frenchTile = document.querySelector("#French");
const koreanTile = document.querySelector("#Korean");
const russianTile = document.querySelector("#Russian");
const germanTile = document.querySelector("#German");
const haitiancreoleTile = document.querySelector("#HaitianCreole");
const hindiTile = document.querySelector("#Hindi");

const tileNames = [englishTile, spanishTile, chineseTile, tagalogTile, vietnameseTile, arabicTile, frenchTile, koreanTile, russianTile, germanTile, haitiancreoleTile, hindiTile];

const languages = ["ENGLISH", "SPANISH", "CHINESE", "TAGALOG", "VIETNAMESE", "ARABIC", "FRENCH", "KOREAN", "RUSSIAN", "GERMAN", "HAITIANCREOLE", "HINDI"];

const correctGuesses = []

const inputField = document.querySelector("#guess");


inputField.addEventListener("change", (e) => {
  let guess = inputField.value.toUpperCase();
  console.log("Guess has been made");
  console.log(guess);
  for (i = 0; i < 12; i = i + 1) {
    if (guess.split(" ").join("") === languages[i] && correctGuesses.includes(guess.split(" ").join("")) === false) {
      tileNames[i].classList.remove("hidden");
      correctGuesses.push(guess.split(" ").join(""))
      if (correctGuesses.length === 12) {
        inputField.remove()
        const congrats = document.getElementById("congrats")
        const youWon = document.getElementById("youWon")
        congrats.innerHTML = "Congratulations!"
        youWon.innerHTML = "You have guessed all of the top 12 languages spoken in the United States."
      }
    }
  }
  console.log(correctGuesses)
  console.log(correctGuesses.length)
  inputField.value = "";
})