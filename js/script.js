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

const name = document.querySelector('.name');

function setLocalStorage() {
  localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage);

//slider

let body = document.querySelector('body');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
let slideIndex = 1;
let bgUrl = `url('assets/img/${timeOfDay}/${slideIndex}.jpg')`;

function getSlideNext() {
  slideIndex++;
  bgUrl = `url('assets/img/${timeOfDay}/${slideIndex}.jpg')`;
  body.style.backgroundImage = bgUrl;
  if (slideIndex > 20) {
    slideIndex = 1;
    bgUrl = `url('assets/img/${timeOfDay}/${slideIndex}.jpg')`;
    body.style.backgroundImage = bgUrl;
  }
}
function getSlidePrev() {
  slideIndex--;
  bgUrl = `url('assets/img/${timeOfDay}/${slideIndex}.jpg')`;
  body.style.backgroundImage = bgUrl;
  console.log(bgUrl);
  if (slideIndex < 1) {
    slideIndex = 20;
    bgUrl = `url('assets/img/${timeOfDay}/${slideIndex}.jpg')`;
    body.style.backgroundImage = bgUrl;
  }
}
body.style.backgroundImage = bgUrl;

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);
