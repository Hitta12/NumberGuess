/ Window onload event triggers my game logic to prepare for play
window.onload = function () {
  console.log("Welcome to Numbricks!");

  //   Variable Declarations for game

  let playing = false;
  let history = [];
  let seconds = 0;
  let minutes = 0;
  let hours = 0;
  let attempts = 0;
  let highscore = 0;
  let randomNumber;
  const input = document.getElementById("guess");
  const feedbackP = document.getElementById("feedback");
  const historyP = document.getElementById("history");
  const timeP = document.getElementById("time");
  const btn = document.getElementById("guess-btn");
  const quitBtn = document.getElementById("quit-btn");
  const highscoreP = document.getElementById("highscore");
  const currentscoreP = document.getElementById("currentscore");

  // Event Listeners

  btn.addEventListener("click", startGame);
  quitBtn.addEventListener("click", resetGame);

  function startGame() {
    // Assign random number to guess
    randomNumber = Math.floor(Math.random() * 100) + 1;
    // Change playing status to true
    playing = true;
    // Change btn text
    btn.textContent = "Guess";
    // Enable input
    input.disabled = false;

    btn.removeEventListener("click", startGame);
    btn.addEventListener("click", guess);

    // Start game clock
    const duration = setInterval(clock, 1000);

    function clock() {
      if (playing) {
        seconds++;
      }
      if (seconds > 59) {
        seconds = 0;
        minutes++;
      } else if (minutes > 59) {
        seconds = 0;
        minutes = 0;
        hours++;
      } else if (hours > 24 || !playing) {
        clearInterval(duration);
      }

      currenttime = `${hours
        .toString()
        .padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
      timeP.textContent = currenttime;
    }
  }

  function guess() {
    if (playing) {
      giveFeedback(input.value);
    }
  }

  function resetGame() {
    playing = false;
    btn.removeEventListener("click", guess);
    btn.addEventListener("click", startGame);

    btn.textContent = "Start";
    input.disabled = true;
    feedbackP.textContent = "Guess a whole number between 1 and 100";
    historyP.textContent = "-";
    timeP.textContent = "00:00:00";
    seconds = 0;
    minutes = 0;
    hours = 0;
    attempts = 0;
    currentscoreP.textContent = attempts;
    history = [];
  }

  function giveFeedback(guess) {
    if (checkInput(parseInt(guess))) {
      if (history.includes(guess)) {
        feedbackP.innerHTML = `Ya knuckle-head.. You already guessed <span>${guess}</span>.`;
      } else {
        // Add guess to history array
        history.push(guess);
        // Change history p to display history
        historyP.textContent = history.join(" ");
        // Check to see if the guess matches the number
        checkCorrectAnswer(guess);
      }
    } else {
      feedbackP.textContent =
        "You aren't playing right... Enter a whole number between 1 and 100.";
    }

    // Reset input
    input.value = "";
    input.focus();
  }

  function checkInput(guess) {
    if (guess < 1 || guess > 100 || isNaN(guess)) {
      return false;
    } else return true;
  }

  function checkCorrectAnswer(guess) {
    attempts++;
    currentscoreP.textContent = attempts;
    
    if (guess > randomNumber) {
      feedbackP.textContent = `${guess} is too high. Try again`;
    } else if (guess < randomNumber) {
      feedbackP.textContent = `${guess} is too low. Maybe next time`;
    } else {
      playing = false;
      feedbackP.textContent = `CONGRATS! ${guess} is the correct number.`;
      input.disabled = true;
      if (highscore) {
        highscore = highscore > attempts ? attempts : highscore;
      } else highscore = attempts;

      highscoreP.textContent = highscore;
    }
  }
};
