
window.addEventListener('DOMContentLoaded', function () {

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
  if (slideIndex < 1) {
    slideIndex = 20;
    bgUrl = `url('assets/img/${timeOfDay}/${slideIndex}.jpg')`;
    body.style.backgroundImage = bgUrl;
  }
}
body.style.backgroundImage = bgUrl;

slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);

//weather

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
city.value = 'moscow';

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=a628dcdff6ce0aa348f87ec0c7579546&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  weatherDescription.textContent = data.weather[0].description;
}

function setCity(event) {
  if (event.code === 'Enter') {
    getWeather();
    city.blur();
  }
}

document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);

//quotes

const changeQuote = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');

let quotes = [
  "Tomorrow belongs to those who can hear it coming.",
  "Sometimes it's not enough to know what things mean, sometimes you have to know what things don't mean.",
  "Really good music isn't just to be heard, you know? It's almost like a hallucination.",
  "I like the idea of being alone. I like the idea of often being alone in all aspects of my life. I like to feel lonely. I like to need things.",
  "Music can always serve a role in people's lives when it's emotional and warm and inviting and beautiful.",
  "I don't make changes to confuse anyone. I'm just searching. That's what causes me to change. I'm just searching for myself.",
  "It matters not who you love, where you love, why you love, when you love or how you love, it matters only that you love.",
  "The future is uncertain but the end is always near.",
  "People are so brainwashed by the rules that they don't know what really matters.",
  "You've got to believe in yourself, or no one will believe in you. Imagination is like a bird on the wing, flying free for you to use.",
  "Those that have lived longer than us always have something to teach us, that we can take with us for the rest of our lives.",
  "All art is unstable. Its meaning is not necessarily that implied by the author. There is no authoritative voice. There are only multiple readings.",
  "We age not by holding on to youth, but by letting ourselves grow and embracing whatever youthful parts remain.",
  "Live music is the most primal form of energy release you can share with other people besides having sex or taking drugs.",
  "Excess is part of my nature. Dullness is a disease. I really need danger and excitement. I'm never scared of putting myself out on a limb.",
  "Life is an adventure of our own design intersected by fate and a series of lucky and unlucky accidents.",
  "Just another lonely broken hero picking up the pieces of my mind. Running out of faith and hope and reason, I'm running out of time.",
];

let authors = [
  "David Bowie",
  "Bob Dylan",
  "Iggy Pop",
  "Robert Plant",
  "Moby",
  "David Bowie",
  "John Lennon",
  "Jim Morrison",
  "Mick Jagger",
  "Ozzy Osbourne",
  "Johnny Cash",
  "David Bowie",
  "Keith Richards",
  "Kurt Cobain",
  "Freddie Mercury",
  "Patti Smith",
  "Ozzy Osbourne",
];

quote.textContent = quotes[0];
author.textContent = authors[0];

function getQuotes() {
  let quoteIndex = Math.floor(Math.random() * 17);
  quote.textContent = quotes[quoteIndex];
  author.textContent = authors[quoteIndex];
}

changeQuote.addEventListener('click', getQuotes);

//player

let isPlay = false;
const playListContainer = document.querySelector('.player');
const play = document.querySelector('.play');
const playNext = document.querySelector('.play-next');
const playPrev = document.querySelector('.play-prev');
const audio = new Audio();
const playList = [
  {      
    title: 'Moonage Daydream',
    src: 'assets/sounds/Moonage Daydream.mp3',
  },  
  {      
    title: 'Guardian Angel',
    src: 'assets/sounds/Guardian Angel.mp3',
  },
  {      
    title: 'Mr. Blue Sky',
    src: 'assets/sounds/Mr. Blue Sky.mp3',
  },
  {      
    title: 'Out Of Time',
    src: 'assets/sounds/Out Of Time.mp3',
  },
  {      
    title: 'Surrender',
    src: 'assets/sounds/Surrender.mp3',
  },
  {      
    title: 'The Circle Game',
    src: 'assets/sounds/The Circle Game.mp3',
  },
  {      
    title: 'White Room',
    src: 'assets/sounds/White Room.mp3',
  },
  {      
    title: 'Dicke Titten',
    src: 'assets/sounds/Dicke Titten.mp3',
  },
  {      
    title: 'Dodo',
    src: 'assets/sounds/Dodo.mp3',
  },
];
let songIndex = 0;
let songName = -1;

playList.forEach((el, i) => {
  let li = document.createElement('li');
  songName++;
  li.classList.add(`song-${songName}`);
  li.classList.add('play-item');
  li.textContent = playList[i].title;
  playListContainer.append(li);
});

function getSongNext() {
  songIndex++;
  isPlay = false;
  if (songIndex > 8) {
    songIndex = 0;
  }
  playAudio();
}

function getSongPrev() {
  songIndex--;
  isPlay = false;
  if (songIndex < 0) {
    songIndex = 8;
  }
  playAudio();
}

function playAudio() {
  selectCurrentSong();
  audio.src = playList[songIndex].src;
  if (isPlay == false) {
    audio.play();
    isPlay = true;
  } else {
    audio.pause();
    isPlay = false;
  }
}

function toggleBtn() {
  play.classList.toggle('pause');
}

function selectCurrentSong() {
  let inactive = Array.from(document.querySelectorAll('.play-item'));
  inactive.forEach (item => {
    item.classList.remove('item-active');
  });
  if (songIndex === 0) {
    let currentSong = document.querySelector('.song-0');
    currentSong.classList.add('item-active');
  } else if (songIndex === 1) {
    let currentSong = document.querySelector('.song-1');
    currentSong.classList.add('item-active');
  } else if (songIndex === 2) {
    let currentSong = document.querySelector('.song-2');
    currentSong.classList.add('item-active');
  } else if (songIndex === 3) {
    let currentSong = document.querySelector('.song-3');
    currentSong.classList.add('item-active');
  } else if (songIndex === 4) {
    let currentSong = document.querySelector('.song-4');
    currentSong.classList.add('item-active');
  } else if (songIndex === 5) {
    let currentSong = document.querySelector('.song-5');
    currentSong.classList.add('item-active');
  } else if (songIndex === 6) {
    let currentSong = document.querySelector('.song-6');
    currentSong.classList.add('item-active');
  } else if (songIndex === 7) {
    let currentSong = document.querySelector('.song-7');
    currentSong.classList.add('item-active');
  } else if (songIndex === 8) {
    let currentSong = document.querySelector('.song-8');
    currentSong.classList.add('item-active');
  }
}

play.addEventListener('click', playAudio);
play.addEventListener('click', toggleBtn);
playNext.addEventListener('click', getSongNext);
playPrev.addEventListener('click', getSongPrev);
});
