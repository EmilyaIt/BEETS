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






         







// let player;
// const playerContainer = $(".player");
 
// let eventsInit = () => {
//  $(".player__start").click(e => {
//    e.preventDefault();
 
//    if (playerContainer.hasClass("paused")) {
//      player.pauseVideo();
//    } else {
//      player.playVideo();
//    }
//  });
 
//  $(".player__playback").click(e => {
//    const bar = $(e.currentTarget);
//    const clickedPosition = e.originalEvent.layerX;
//    const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
//    const newPlaybackPositionSec =
//      (player.getDuration() / 100) * newButtonPositionPercent;
 
//    $(".player__playback-button").css({
//      left: `${newButtonPositionPercent}%`
//    });
 
//    player.seekTo(newPlaybackPositionSec);
//  });
 
//  $(".player__splash").click(e => {
//    player.playVideo();
//  })
// };
 
// const formatTime = timeSec => {
//  const roundTime = Math.round(timeSec);
 
//  const minutes = addZero(Math.floor(roundTime / 60));
//  const seconds = addZero(roundTime - minutes * 60);
 
//  function addZero(num) {
//    return num < 10 ? `0${num}` : num;
//  }
 
//  return `${minutes} : ${seconds}`;
// };
 
// const onPlayerReady = () => {
//  let interval;
//  const durationSec = player.getDuration();
 
//  $(".player__duration-estimate").text(formatTime(durationSec));
 
//  if (typeof interval !== "undefined") {
//    clearInterval(interval);
//  }
 
//  interval = setInterval(() => {
//    const completedSec = player.getCurrentTime();
//    const completedPercent = (completedSec / durationSec) * 100;
 
//    $(".player__playback-button").css({
//      left: `${completedPercent}%`
//    });
 
//    $(".player__duration-completed").text(formatTime(completedSec));
//  }, 1000);
// };
 
// const onPlayerStateChange = event => {
//  /*
//    -1 (?????????????????????????????? ?????????? ???? ????????????)
//    0 (?????????????????????????????? ?????????? ??????????????????)
//    1 (??????????????????????????????)
//    2 (??????????)
//    3 (??????????????????????)
//    5 (?????????? ???????????? ??????????????).
//  */
//  switch (event.data) {
//    case 1:
//      playerContainer.addClass("active");
//      playerContainer.addClass("paused");
//      break;
 
//    case 2:
//      playerContainer.removeClass("active");
//      playerContainer.removeClass("paused");
//      break;
//  }
// };
 
// function onYouTubeIframeAPIReady() {
//  player = new YT.Player("yt-player", {
//    height: "405",
//    width: "660",
//    videoId: "LXb3EKWsInQ",
//    events: {
//      onReady: onPlayerReady,
//      onStateChange: onPlayerStateChange
//    },
//    playerVars: {
//      controls: 0,
//      disablekb: 0,
//      showinfo: 0,
//      rel: 0,
//      autoplay: 0,
//      modestbranding: 0
//    }
//  });
// }
 
// eventsInit();
















let video;
let durationControl; 
let soundControl;
let intervalId;

// ???????????????? ?????????????????? ????????????????
$().ready(function(){
    video = document.getElementById("player"); 

    // ???????????? ???????????????????? ?????????????? onclick ???? ?????? video
    video.addEventListener('click', playStop);

    // ?????????????????????? ?????????????? ?????? ???????????? play
    let playButtons = document.querySelectorAll(".play");
    for (let i = 0; i < playButtons.length;i++){
        playButtons[i].addEventListener('click',playStop);
    }

    // ???????????????????? ?????????????? ?????? ???????????? ??????????????
    let micControl = document.getElementById("mic");
    micControl.addEventListener('click',soundOf)
    
    // ?????????????????????? ?????????????? ?????? ???????????????? ?????????????????????????????????? ??????????
    durationControl = document.getElementById("durationLevel");    
    durationControl.addEventListener('click',setVideoDuration);
    durationControl.addEventListener('onmousemove',setVideoDuration);
    durationControl.addEventListener('mousedown', stopInterval); 
    durationControl.min = 0;
    durationControl.value = 0;    

    // ?????????????????????? ?????????????? ?????? ???????????????? ????????????????????
    soundControl = document.getElementById("micLevel");    
    soundControl.addEventListener('click', changeSoundVolume);
    soundControl.addEventListener('onmousemove', changeSoundVolume);

    // ???????????? ???????????????????????? ?? ?????????????????????? ???????????????? ????????????????????
    soundControl.min = 0;
    soundControl.max = 100;
    // ?????????????????????? ???????????????? ???????????????????????? ????????????????
    soundControl.value = soundControl.max;
    
});

/*
 ?????????????????????????????? ??????????
*/
function playStop(){
    // ???????????????????? ?????? ???????????????? ?????????? ???????????? play
    $(".video__player-img").toggleClass("video__player-img--active");
    
    // ?????????????????????? ???????????????? ?????????????????????????????????? ???????????????????????? ???????????????? ???????????? ?????????????????????????????????? ???????????? ?????????? (?? ????????????????)
    durationControl.max = video.duration;

    // ???????????????? ?????????? ???? ?????????? ???? ??????????, ???????? ???? ???? ?????????????????? ??????????????????????????????. ????????, ????????????????, ????????????????????????????, ???? ??????????????????.
    if (video.paused){
        // ?????????????????? ??????????
        video.play();
        intervalId = setInterval(updateDuration,1)
        // video.webkitRequestFullScreen(); ?????????????????????? ?????????????? ?? ?????????????????????????? ????????????
    }else{
        // ?????????????????????????? ??????????
        video.pause();  
        clearInterval(intervalId);
        // document.webkitExitFullscreen(); ?????????? ???? ???????????????????????????? ????????????
    }
}

/*
    ???????????????????? ????????????
*/
function soundOf(){    
    /*
        ???????????? ???????????????? ???????????? ??????????????????. 
        ???????? ?? ?????? ???????????? ?????????? ???????? ????????, ???? ???? ?????? ??????????????????. 
        ???????????????????????????? ???????????????? ?????????????? ?????????????? ?????????????????? ?? ???????????????????? soundLevel
    */
    if (video.volume ===0){
        video.volume = soundLevel;
        soundControl.value = soundLevel*100;
    }else{
        /*
            ???????? ?? ???????????? ?????????? ?????? ??????????, ???? ???????????????????? ?????????????? ?????????????????? ???? ?????????????? ??????????????.
            ???????????????? ?? ?????????????????? soundLevel
        */
        soundLevel = video.volume;
        video.volume = 0;
        soundControl.value = 0;
    }    
}

function stopInterval(){
    clearInterval(intervalId);
}

/*
    ?????????????????? ?????????????????????? ?????????????????? ???????????? ??????????
*/
function setVideoDuration(){
    video.currentTime = durationControl.value;   
    intervalId = setInterval(updateDuration,1000/66);    
}

/*
    ???????????????????? ???????????? ??????????
*/
function changeSoundVolume(){
    /*
        ????-???? volume ?????????? ?????????????????? ???????????????? ???? 0 ???? 1
        ?????????? ???? 10 ?????? ???????? ?????? ????, ???????? ?????????????????????? ?????????? ???????????? ?????????????????????? ??????????. 
    */
    video.volume = soundControl.value/100;  
}

/*
  ?????????????? ?????? ???????????????????? ?????????????? ???????????????? ?????????????????????????????????? ??????????.   
*/
function updateDuration(){    
    durationControl.value = video.currentTime;
}