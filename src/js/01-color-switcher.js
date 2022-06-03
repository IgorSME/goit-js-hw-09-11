

const refs = {
    startBtn: document.querySelector("button[data-start]"),
    stopBtn: document.querySelector("button[data-stop]"),
    body: document.querySelector("body")
}
refs.startBtn.addEventListener("click",onStartClick)
refs.stopBtn.addEventListener("click", onStopClick)

const DELAY = 1000;
let intervalId = null;
let isActive = false;

function onStartClick() {
    if (isActive) {
        //  console.log("test");
        return
    }
    isActive = true;
    intervalId = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, DELAY)
}

function onStopClick() {
    clearInterval(intervalId);
    isActive = false;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}