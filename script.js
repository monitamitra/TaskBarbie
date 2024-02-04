/*TODO: change up*/
const btnStartElement = document.querySelector('[data-action="start"]');
const btnStopElement = document.querySelector('[data-action="stop"]');
const btnPauseElement = document.querySelector('[data-action="pause"]');
const btnBreakElement = document.querySelector('[data-action="break"]');
const hours = document.querySelector('.hours');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
let timerTime = 0;
let interval;
let pauseTime;
let userDurationHours, userDurationMinutes;
let userInputHours, userInputMinutes;
let isPaused = false;

const timer = document.getElementById('timer');


const start = () => {
  if (isPaused) {
    isPaused = false;
    timerTime = pauseTime;
  }
  else {
    // get user input and parse
    // also make user input box go away once started
    let userInputHours = document.getElementById("timeHours");
    userInputHours.classList.add("hidden");
    if (userInputHours.value == "") {
            userInputHours.value = 0;
        }
    let userDurationHours = parseInt(
        document.getElementById("timeHours").value);

    let userInputMinutes = document.getElementById("timeMinutes");
    userInputMinutes.classList.add("hidden");
    if (userInputMinutes.value == "") {
            userInputMinutes.value = 0;
        }
    let userDurationMinutes = parseInt(
        document.getElementById("timeMinutes").
    value);

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
    if (btnBreakElement.classList.contains("hidden")) {
        btnBreakElement.classList.remove("hidden");
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
  reset();

  btnStartElement.classList.remove("hidden");

  btnStopElement.classList.add("hidden");
  btnPauseElement.classList.add("hidden");
  btnBreakElement.classList.add("hidden");
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
  // clearInterval(interval);
  // manipulate timer time
  btnStartElement.classList.remove("hidden");
  btnPauseElement.classList.add("hidden");
}

const take_break = () => {
  
}

const pad = (number) => {
  return (number < 10) ? '0' + number : number;
}

const decrementTimer = () => {
  if (!isPaused) {
    if (timerTime <= 0) {
        stop();
    }
    const numberHours = Math.floor(timerTime / 3600);
    const numberMinutes = Math.floor((timerTime % 3600) / 60);
    const numberSeconds = timerTime % 60;
    
    hours.innerText = pad(numberHours);
    minutes.innerText = pad(numberMinutes);
    seconds.innerText = pad(numberSeconds);
    timerTime--;
  }
}

btnStartElement.addEventListener('click', startTimer = () => {
  start();
});

btnStopElement.addEventListener('click', stopTimer = () => {
  stop();
});

btnPauseElement.addEventListener('click', stopTimer = () => {
  pause();
});

btnBreakElement.addEventListener('click', stopTimer = () => {
  take_break();
});