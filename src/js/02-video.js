import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

// Constants
const STORAGE_KEY = 'videoplayer-current-time';

// DOM Elements
const iframe = document.querySelector('iframe');

// Functions
function onTimeUpdate({ seconds }) {
  localStorage.setItem(STORAGE_KEY, seconds);
}

function getTimeFromStorage() {
  const seconds = localStorage.getItem(STORAGE_KEY);
  return seconds || 0;
}

function init() {
  const player = new Player(iframe);
  const currentTime = getTimeFromStorage();

  player
    .setCurrentTime(currentTime)
    .catch(err => console.log('Error in setCurrentTime: ', err));

  player.on('timeupdate', throttle(onTimeUpdate, 1000));
}

init();
