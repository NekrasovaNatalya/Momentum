'use strict'

//time

const time = document.querySelector('.time');

function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
  }
  showTime();

  const day = document.querySelector('.date');

  function showDate() {
    const date = new Date();
    const options = {month: 'long', day: 'numeric', weekday: 'long', timeZone: 'UTC'};
    const currentDate = date.toLocaleDateString('en-US', options);
    day.textContent = currentDate;
  }
  showDate();

//greeting

const greeting = document.querySelector('.greeting');
let timeOfDay;

function getTimesOfDay() {
    const date = new Date();
    const hours = date.getHours();
    

    if (hours/6 <= 1) {
      timeOfDay = 'night';
    } else if (hours/6 <= 2 && hours/6 >= 1) {
      timeOfDay = 'morning';
    } else if (hours/6 <= 3 && hours/6 >= 2) {
      timeOfDay = 'afternoon';
    } else if (hours/6 <= 4 && hours/6 >= 3) {
      timeOfDay = 'evening';
    }

    const greetingText = `Good ${timeOfDay},`;
    greeting.textContent = greetingText;
    setTimeout(showTime, 1000);
}
getTimesOfDay();
