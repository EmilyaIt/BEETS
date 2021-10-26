// let player;
// const playerContainer = $(".player");

// const formatTime = timeSec => {
//   const roundTime = Math.round(timeSec);

//   const minutes = addZero(Math.floor(roundTime / 60));
//   const seconds = addZero(roundTime - minutes * 60);

//   function addZero(num) {
//     return num < 10 ? `0${num}` : num;
//   }

//   return `${minutes} : ${seconds}`;
// };

// const onPlayerReady = () => {
//   let interval;
//   const durationSec = player.getDuration();

//   $(".player__duration-estimate").text(formatTime(durationSec));

//   if (typeof interval !== "undefined") {
//     clearInterval(interval);
//   }

//   interval = setInterval(() => {
//     const completedSec = player.getCurrentTime();
//     const completedPercent = (completedSec / durationSec) * 100;

//     $("player__playback-button").css({
//       left: `${completedPercent}%`
//     });

//     $(".player__duration-completed").text(formatTime(completedSec));
//   }, 1000);
// };

// const onPlayerStateChange = event => {
//   switch (event.data) {
//     case 1:
//       playerContainer.addClass("active");
//       playerContainer.addClass("paused");
//       break;
//     case 2:
//       playerContainer.removeClass("active");
//       playerContainer.removeClass("paused");
//       break;  
//   }
// }

// function onYouTubeIframeAPIReady() {
//   player = new YT.Player("yt-player", {
//     height: "233",
//     width: "394",
//     // width: 24.625rem;
//   // height: 14.575rem;
//   // width: 394px;
// // height: 233.2px;
//     videoId: "LXb3EKWsInQ",
//     events: {
//       onReady: onPlayerReady,
//       onStateChange: onPlayerStateChange
//     },
//     playerVars: {
//       controls: 0,
//       disablekd: 0,
//       showinfo: 0,
//       rel: 0,
//       autoplay: 0,
//       modestbranding: 0
//     }
//   });
// }






         







let player;
const playerContainer = $(".player");
 
let eventsInit = () => {
 $(".player__start").click(e => {
   e.preventDefault();
 
   if (playerContainer.hasClass("paused")) {
     player.pauseVideo();
   } else {
     player.playVideo();
   }
 });
 
 $(".player__playback").click(e => {
   const bar = $(e.currentTarget);
   const clickedPosition = e.originalEvent.layerX;
   const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
   const newPlaybackPositionSec =
     (player.getDuration() / 100) * newButtonPositionPercent;
 
   $(".player__playback-button").css({
     left: `${newButtonPositionPercent}%`
   });
 
   player.seekTo(newPlaybackPositionSec);
 });
 
 $(".player__splash").click(e => {
   player.playVideo();
 })
};
 
const formatTime = timeSec => {
 const roundTime = Math.round(timeSec);
 
 const minutes = addZero(Math.floor(roundTime / 60));
 const seconds = addZero(roundTime - minutes * 60);
 
 function addZero(num) {
   return num < 10 ? `0${num}` : num;
 }
 
 return `${minutes} : ${seconds}`;
};
 
const onPlayerReady = () => {
 let interval;
 const durationSec = player.getDuration();
 
 $(".player__duration-estimate").text(formatTime(durationSec));
 
 if (typeof interval !== "undefined") {
   clearInterval(interval);
 }
 
 interval = setInterval(() => {
   const completedSec = player.getCurrentTime();
   const completedPercent = (completedSec / durationSec) * 100;
 
   $(".player__playback-button").css({
     left: `${completedPercent}%`
   });
 
   $(".player__duration-completed").text(formatTime(completedSec));
 }, 1000);
};
 
const onPlayerStateChange = event => {
 /*
   -1 (воспроизведение видео не начато)
   0 (воспроизведение видео завершено)
   1 (воспроизведение)
   2 (пауза)
   3 (буферизация)
   5 (видео подают реплики).
 */
 switch (event.data) {
   case 1:
     playerContainer.addClass("active");
     playerContainer.addClass("paused");
     break;
 
   case 2:
     playerContainer.removeClass("active");
     playerContainer.removeClass("paused");
     break;
 }
};
 
function onYouTubeIframeAPIReady() {
 player = new YT.Player("yt-player", {
   height: "405",
   width: "660",
   videoId: "LXb3EKWsInQ",
   events: {
     onReady: onPlayerReady,
     onStateChange: onPlayerStateChange
   },
   playerVars: {
     controls: 0,
     disablekb: 0,
     showinfo: 0,
     rel: 0,
     autoplay: 0,
     modestbranding: 0
   }
 });
}
 
eventsInit();
















// let video;
// let durationControl; 
// let soundControl;
// let intervalId;

// // документ полностью загружен
// $().ready(function(){
//     video = document.getElementById("player"); 

//     // вешаем обработчик события onclick на тег video
//     video.addEventListener('click', playStop);

//     // обработчики событий для кнопок play
//     let playButtons = document.querySelectorAll(".play");
//     for (let i = 0; i < playButtons.length;i++){
//         playButtons[i].addEventListener('click',playStop);
//     }

//     // обработчик событий для кнопки динамик
//     let micControl = document.getElementById("mic");
//     micControl.addEventListener('click',soundOf)
    
//     // обработчики событий для ползунка продолжительности видео
//     durationControl = document.getElementById("durationLevel");    
//     durationControl.addEventListener('click',setVideoDuration);
//     durationControl.addEventListener('onmousemove',setVideoDuration);
//     durationControl.addEventListener('mousedown', stopInterval); 
//     durationControl.min = 0;
//     durationControl.value = 0;    

//     // обработчики событий для ползунка громокости
//     soundControl = document.getElementById("micLevel");    
//     soundControl.addEventListener('click', changeSoundVolume);
//     soundControl.addEventListener('onmousemove', changeSoundVolume);

//     // задаем максимальные и минимальные значения громокости
//     soundControl.min = 0;
//     soundControl.max = 100;
//     // присваиваем ползунку максимальное значение
//     soundControl.value = soundControl.max;
    
// });

// /*
//  Воспроизведение видео
// */
// function playStop(){
//     // показывает или скрывает белую кнопку play
//     $(".video__player-img").toggleClass("video__player-img--active");
    
//     // присваиваем ползунку продолжительности максимальное значение равное продолжительности нашего видео (в секундах)
//     durationControl.max = video.duration;

//     // проверим стоит ли видео на паузе, если да то продолжим воспроизведение. Если, наоборот, проигрыавыется, то остановим.
//     if (video.paused){
//         // запускаем видео
//         video.play();
//         intervalId = setInterval(updateDuration,1)
//         // video.webkitRequestFullScreen(); возможность открыть в полноэкранном режиме
//     }else{
//         // останавливаем видео
//         video.pause();  
//         clearInterval(intervalId);
//         // document.webkitExitFullscreen(); выйти из полноэкранного режима
//     }
// }

// /*
//     Управление звуком
// */
// function soundOf(){    
//     /*
//         Делаем проверку уровня громкости. 
//         Если у нас нашего видео есть звук, то мы его выключаем. 
//         Предварительно запомнив текущую позицию громкости в переменную soundLevel
//     */
//     if (video.volume ===0){
//         video.volume = soundLevel;
//         soundControl.value = soundLevel*100;
//     }else{
//         /*
//             Если у нашего видео нет звука, то выставляем уровень громкости на прежний уровень.
//             Хранится в перменной soundLevel
//         */
//         soundLevel = video.volume;
//         video.volume = 0;
//         soundControl.value = 0;
//     }    
// }

// function stopInterval(){
//     clearInterval(intervalId);
// }

// /*
//     Реализует возможность перемотки нашего видео
// */
// function setVideoDuration(){
//     video.currentTime = durationControl.value;   
//     intervalId = setInterval(updateDuration,1000/66);    
// }

// /*
//     Управление звуком видео
// */
// function changeSoundVolume(){
//     /*
//         Св-во volume может принимать значения от 0 до 1
//         Делим на 10 для того что бы, была возможность более точной регулировки видео. 
//     */
//     video.volume = soundControl.value/100;  
// }

// /*
//   Функция для обновления позиции ползунка продолжительности видео.   
// */
// function updateDuration(){    
//     durationControl.value = video.currentTime;
// }