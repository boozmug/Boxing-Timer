let roundTime = 180;
let restTime = 60;
let currentTime = roundTime;
let isRunning = false;
let isRound = true;
let interval;

const bell = new Audio('fight.mp3');

function playBell() {
  bell.currentTime = 0;
  bell.play().catch(() => {
    console.log("Audio blocked until user interacts");
  });
}

function updateDisplay() {
  let min = Math.floor(currentTime / 60);
  let sec = currentTime % 60;
  document.getElementById("timer").innerText =
    `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

function startTimer() {
  if (isRunning) return;

  isRunning = true;
  playBell();

  interval = setInterval(() => {
    currentTime--;
    updateDisplay();

    if (currentTime <= 0) {
      if (isRound) {
        document.getElementById("status").innerText = "Rest";
        currentTime = restTime;
      } else {
        document.getElementById("status").innerText = "Fight";
        currentTime = roundTime;
      }

      isRound = !isRound;
      playBell();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(interval);
  isRunning = false;
}
