import Player from '@vimeo/player';
console.log(Player);

const throttle = require('lodash.throttle');

const iframe = document.querySelector('#vimeo-player');
console.log(iframe);

const player = new Player(iframe);

// player.on('play', function () {
//   console.log('played the video!');
// });

const LS_KEY = 'videoplayer-current-time';

const onPlay = function (data) {
  // data is an object containing properties specific to that event
  localStorage.setItem(LS_KEY, JSON.stringify(data.seconds));
};

player.on('timeupdate', throttle(onPlay, 1000));

const LSTime = Number(localStorage.getItem(LS_KEY));

player
  .setCurrentTime(LSTime)
  .then(function (seconds) {
    // seconds = the actual time that the player seeked to
  })
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        // the time was less than 0 or greater than the video’s duration
        break;

      default:
        // some other error occurred
        break;
    }
  });
