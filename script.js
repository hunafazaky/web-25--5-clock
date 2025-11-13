const breakIncrement = document.querySelector("#break-increment");
const breakDecrement = document.querySelector("#break-decrement");
const breakLength = document.querySelector("#break-length");

const sessionIncrement = document.querySelector("#session-increment");
const sessionDecrement = document.querySelector("#session-decrement");
const sessionLength = document.querySelector("#session-length");

const minutes = document.querySelector("#minutes");
const seconds = document.querySelector("#seconds");

const toggle = document.querySelector("#start_stop");
const reset = document.querySelector("#reset");
const timerLabel = document.querySelector("#timer-label");
const audio = document.querySelector("#beep");

let running = false;
let timerID = null;
let isLoop = Infinity;
let currentState = "Session";
let times = Number(sessionLength.innerHTML) * 60;

breakIncrement.addEventListener("click", () => {
  const num = Number(breakLength.innerHTML);
  if (num < 60) breakLength.innerHTML = num + 1;
});

breakDecrement.addEventListener("click", () => {
  const num = Number(breakLength.innerHTML);
  if (num > 1) breakLength.innerHTML = num - 1;
});

sessionIncrement.addEventListener("click", () => {
  const num = Number(sessionLength.innerHTML);
  if (num < 60) {
    sessionLength.innerHTML = num + 1;
    minutes.innerHTML = sessionLength.innerHTML.toString().padStart(2, "0");
    times = Number(sessionLength.innerHTML) * 60;
  }
});

sessionDecrement.addEventListener("click", () => {
  const num = Number(sessionLength.innerHTML);
  if (num > 1) {
    sessionLength.innerHTML = num - 1;
    minutes.innerHTML = sessionLength.innerHTML.toString().padStart(2, "0");
    times = Number(sessionLength.innerHTML) * 60;
  }
});

toggle.addEventListener("click", () => {
  audio.setAttribute("src", "#");
  audio.play();
  audio.setAttribute(
    "src",
    "https://assets.mixkit.co/active_storage/sfx/993/993-preview.mp3"
  );
  if (!running) {
    running = true;
    timerID = setInterval(() => {
      if (times > 0) {
        if (times > isLoop) {
          audio.currentTime = 0;
          audio.play().catch((err) => console.log("Play failed:", err));
        }
        times--;
        minutes.innerHTML = Math.floor(times / 60)
          .toString()
          .padStart(2, "0");
        seconds.innerHTML = (times % 60).toString().padStart(2, "0");
      } else {
        if (currentState === "Session") {
          currentState = "Break";
          timerLabel.innerHTML = currentState;
          times = Number(breakLength.innerHTML) * 60 + 1;
          isLoop = times - 3;
        } else if (currentState === "Break") {
          currentState = "Session";
          timerLabel.innerHTML = currentState;
          times = Number(sessionLength.innerHTML) * 60 + 1;
          isLoop = times - 3;
        }
      }
    }, 1000);
  } else {
    clearInterval(timerID);
    running = false;
  }
});

reset.addEventListener("click", () => {
  clearInterval(timerID);
  sessionLength.innerHTML = "25";
  breakLength.innerHTML = "5";
  minutes.innerHTML = "25";
  seconds.innerHTML = "00";
  times = Number(sessionLength.innerHTML) * 60;
  currentState = "Session";
  timerLabel.innerHTML = currentState;
  running = false;
  audio.pause();
  audio.currentTime = 0;
  isLoop = Infinity;
});
