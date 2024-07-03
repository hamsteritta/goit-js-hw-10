import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datetimeInput = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const dayObj = document.querySelector('[data-days]');
const hourObj = document.querySelector('[data-hours]');
const minuteObj = document.querySelector('[data-minutes]');
const secondObj = document.querySelector('[data-seconds]');
let userSelectedDate = null;

function changeBtnStatus(status = false) {
    if (status) {
        btnStart.disabled = false;
    } else {
        btnStart.disabled = true;
    }
}

function changeInputStatus(status = false) {
    if (status) {
        datetimeInput.disabled = false;
    } else {
        datetimeInput.disabled = true;
    }
}

function userMessage(message) {
    iziToast.info({
        message: message,
        position: 'center',
        color: 'blue',
    });
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function showTime({ days, hours, minutes, seconds }) {
    dayObj.textContent = days.toString().padStart(2, '0');
    hourObj.textContent = hours.toString().padStart(2, '0');
    minuteObj.textContent = minutes.toString().padStart(2, '0');
    secondObj.textContent = seconds.toString().padStart(2, '0');
}

function start() {
    if (userSelectedDate) {
        let timerInterval = setInterval(() => {
            let diferentTime = userSelectedDate - new Date().getTime();
            if (diferentTime > 0) {
                showTime(convertMs(diferentTime));                
            } else {
                clearInterval(timerInterval);
                changeBtnStatus(true);
                changeInputStatus(true);
                userMessage('Timer finished');
            }        
        }, 1000);
    }    
}


changeBtnStatus(false);

const flatpickrOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      userSelectedDate = selectedDates[0];
      if (!userSelectedDate || userSelectedDate < new Date()) { 
        userMessage("Please choose a date in the future");
        changeBtnStatus(false);
      } else {
        changeBtnStatus(true);
      }

  },
};

flatpickr(datetimeInput, flatpickrOptions);

btnStart.addEventListener('click', () => { 
    changeBtnStatus(false);
    changeInputStatus(false);
    start();
});


