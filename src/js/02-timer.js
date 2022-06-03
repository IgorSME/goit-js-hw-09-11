import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    input: document.querySelector('input#datetime-picker'),
    start: document.querySelector("button[data-start]"),
    days: document.querySelector("span[data-days]"),
    hours: document.querySelector("span[data-hours]"),
    minutes: document.querySelector("span[data-minutes]"),
    seconds: document.querySelector("span[data-seconds]"),
}


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        const targetTime = selectedDates[0].getTime();
        const currentTime = Date.now();
        if (targetTime < currentTime) {
            Notify.failure('Please choose a date in the future');
            // alert("Please choose a date in the future")
            return
        }
        refs.start.addEventListener("click", () => {
            const intervalId = setInterval(() => {
                const delta = targetTime - Date.now();
                // console.log(delta);
                if (delta < 0) {
                    clearInterval(intervalId);
                    return
                }
                const time = convertMs(delta);
                updateClockFace(time);
            }, 1000)
        }
        )
    }
}
const fp = flatpickr(refs.input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function updateClockFace({ days, hours, minutes, seconds }) {
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;
    
}
function addLeadingZero(value) {
    return String(value).padStart(2, "0")
}