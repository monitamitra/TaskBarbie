/*TODO: change up*/
const btnStartElement = document.querySelector('[data-action="start"]');
const btnStopElement = document.querySelector('[data-action="stop"]');
const btnPauseElement = document.querySelector('[data-action="pause"]');

const breakAlert = document.getElementById("break_alert");
const endAlert = document.getElementById("end_alert");

const breakText = document.getElementById("break_text");
const endText = document.getElementById("finish_text");

const closeBreak = document.getElementById("close_break");
const closeEnd = document.getElementById("close_end");

const hours = document.querySelector('.hours');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');

const alertSound = document.getElementById('alertSound');

let timerTime = 0;
let interval;
let breakInterval = 0;
let pauseTime;
let userDurationHours, userDurationMinutes;
let userInputHours, userInputMinutes;
let isPaused = false;
let breakCounter = 0;

const timer = document.getElementById('timer');

// want to exit the break, want to start the break
const start = () => {
  breakAlert.classList.add("hidden");
  endAlert.classList.add("hidden");
  if (isPaused) {
    isPaused = false;
    timerTime = pauseTime;
    btnStartElement.classList.add("hidden");
    btnPauseElement.classList.remove("hidden");
  } else {
    // get user input and parse
    // also make user input box go away once started
    userInputHours = document.getElementById("timeHours");
    userInputHours.classList.add("hidden");
    if (userInputHours.value == "") {
            userInputHours.value = 0;
        }
    userDurationHours = parseInt(
        document.getElementById("timeHours").value);

    userInputMinutes = document.getElementById("timeMinutes");
    userInputMinutes.classList.add("hidden");
    if (userInputMinutes.value == "") {
            userInputMinutes.value = 0;
        }
    userDurationMinutes = parseInt(
        document.getElementById("timeMinutes"). value);

    // set starting seconds
    timerTime = (userDurationHours * 3600) + (userDurationMinutes * 60);
    // }

    // hide start and show other buttons
    btnStartElement.classList.add("hidden");

    // TODO: make more efficienct
    if (btnStopElement.classList.contains("hidden")){
        btnStopElement.classList.remove("hidden");
    }
    if (btnPauseElement.classList.contains("hidden")) {
        btnPauseElement.classList.remove("hidden");
    }

    // show the timer
    timer.classList.remove("hidden");

    // display starting time
    hours.innerText = pad(userDurationHours);
    minutes.innerText = pad(userDurationMinutes);
    
    // decrement the timer every second starting right away
    decrementTimer();
    interval = setInterval(decrementTimer, 1000);
  }
}

const stop = () => {
  clearInterval(interval);
  // clearInterval(breakInterval);
  reset();

  btnStartElement.classList.remove("hidden");
  btnStopElement.classList.add("hidden");
  btnPauseElement.classList.add("hidden");
  userInputHours.classList.remove("hidden");
  userInputMinutes.classList.remove("hidden");
  timer.classList.add("hidden");
}

const reset = () => {
  timerTime = 0;
  hours.innerText = '00';
  minutes.innerText = '00';
  seconds.innerText = '00';
}

const pause = () => {
  isPaused = true;
  pauseTime = timerTime;
  // manipulate timer time
  btnStartElement.classList.remove("hidden");
  btnPauseElement.classList.add("hidden");
}

const pad = (number) => {
  return (number < 10) ? '0' + number : number;
}

const decrementTimer = () => {
  if (!isPaused) {
    if (timerTime == 0) {
      invokeEndAlert();
        stop();
    }
    const numberHours = Math.floor(timerTime / 3600);
    const numberMinutes = Math.floor((timerTime % 3600) / 60);
    const numberSeconds = timerTime % 60;
    
    hours.innerText = pad(numberHours);
    minutes.innerText = pad(numberMinutes);
    seconds.innerText = pad(numberSeconds);
    timerTime--;
    breakCounter++;
    if (breakCounter == 13) { //TODO
        invokeBreakAlert();
        breakCounter = 0;
    }
  }
}

btnStartElement.addEventListener('click', startTimer = () => {
  start();
});

btnStopElement.addEventListener('click', stopTimer = () => {
  stop();
});

btnPauseElement.addEventListener('click', pausingTimer = () => {
  pause();
});

closeBreak.addEventListener('click', closingBreak = () => {
  closeBreakDialog();
});

closeEnd.addEventListener('click', closingEnd = () => {
  closeEndDialog();
});

// alert code
function invokeBreakAlert() {
    alertSound.play();
    breakAlert.classList.remove("hidden");
    breakText.innerText = getRandomQuote();
}
function closeBreakDialog() {
    breakAlert.classList.add("hidden");
}
function invokeEndAlert() {
    alertSound.play();
    endAlert.classList.remove("hidden");
    endText.innerText = getRandomQuote();
}
function closeEndDialog() {
    endAlert.classList.add("hidden");
}

// Quote data
let quotes = [];



fetch("https://type.fit/api/quotes")

    .then(response => response.json())

    .then(data => {

        quotes = data;

    })

    .catch(error => console.error("Failed to fetch quotes:", error));



const getRandomQuote = () => {

    if (quotes.length > 0) {

        const index = Math.floor(Math.random() * quotes.length);

        return `"${quotes[index].text}"`;

    } else {

        return { text: "No quotes loaded yet.", author: "" };

    }

};
