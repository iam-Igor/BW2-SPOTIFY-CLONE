// iterate the fetch data: in this case album
// automatically get the first track of the list
// because player requires a "trackId"
// usually get trackId via "URLSearchParams(location.search)"
// if there isn't set the ID of the first track on the album(fetch)

// const player = function (data) {
//    // let currentTrackId = data.tracks.data.id;
//    const btnPrevious = document.getElementById("btn-previous");
//    const btnNext = document.getElementById("btn-next");
//    const progressBar = document.getElementById("progressBar");
//    const currentTime = document.getElementById("currentTime");
//    const duration = document.getElementById("duration");
//    const playerImg = document.getElementById("player-img");
//    const playerTitle = document.getElementById("player-title");
//    const playerArtists = document.getElementById("player-artists");

//    console.log("len: ", data.tracks.data);
//    console.log("interno player: ", data);

//    // get trackId
//    const addressBarContent = new URLSearchParams(location.search);
//    let trackid = parseInt(addressBarContent.get("trackId"));

//    // if there isn't any set first one's Id as track id
//    if (!trackid) {
//       trackid = data.tracks.data[0].id;
//    }

//    // get and current position of the track
//    let position = 0;
//    for (let i = 0; i < data.tracks.data.length; i++) {
//       if (trackid === data.tracks.data[i].id) {
//          position = i;
//       }
//    }

//    let currentTrack = position;

//    // set btn next link
//    if (data.tracks.data[currentTrack - 1]) {
//       btnPrevious.setAttribute(
//          "href",
//          `album.html?musicId=${data.id}&trackId=${
//             data.tracks.data[currentTrack - 1].id
//          }`
//       );
//    }

//    // set btn previous link
//    if (data.tracks.data[currentTrack + 1]) {
//       btnNext.setAttribute(
//          "href",
//          `album.html?musicId=${data.id}&trackId=${
//             data.tracks.data[currentTrack + 1].id
//          }`
//       );
//    }

//    loadDataIntoPlayer(currentTrack);

//    function loadDataIntoPlayer(currentTrack) {
//       //  setting audio file
//       const track = document.createElement("div");
//       track.innerHTML = `
//          <audio id="audio">
//          <source id="track" src="${data.tracks.data[currentTrack].preview}" type="audio/mpeg" />
//          </audio>
//          `;

//       playerImg.setAttribute(
//          "src",
//          data.tracks.data[currentTrack].album.cover_small
//       );

//       playerArtists.innerHTML = "";
//       data.contributors.forEach((artist) => {
//          playerArtists.innerHTML += `
//       <a
//       class="text-decoration-none text-white-50 fs-7"
//       href="#"
//       >${artist.name}</a
//    >
//       `;
//       });

//       playerTitle.innerText = data.tracks.data[currentTrack].title;
//       const playerHolder = document.querySelector("#player-main");
//       playerHolder.appendChild(track);
//       const audio = document.getElementById("audio");

//       // button animation when clicks
//       const btnPlay = document.getElementById("btn-play");
//       const btnClicked = function () {
//          btnPlay.style.transform = "scale(0.8)";
//          setTimeout(function () {
//             btnPlay.style.transform = "scale(1)";
//          }, 150);
//       };

//       // format time
//       const formatTime = function (time) {
//          let minutes = Math.floor(time / 60);
//          let seconds = Math.floor(time % 60);

//          if (seconds < 10) {
//             seconds = "0" + seconds;
//          }

//          return minutes + ":" + seconds;
//       };

//       // console.log(track.querySelector("#audio"));

//       // change volume
//       const volume = document.getElementById("volume");
//       volume.addEventListener("input", function () {
//          track.querySelector("#audio").volume = volume.value / 100;
//       });

//       // update progressbar value
//       audio.addEventListener("timeupdate", function () {
//          const progress = (audio.currentTime / audio.duration) * 100;
//          progressBar.value = progress;

//          currentTime.textContent = formatTime(audio.currentTime);
//          duration.textContent = formatTime(audio.duration);
//       });

//       // changes the playing position
//       progressBar.addEventListener("input", function () {
//          const time = (progressBar.value / 100) * audio.duration;
//          audio.currentTime = time;
//       });

//       btnPlay.addEventListener("click", function () {
//          if (btnPlay.classList.contains("fa-play-circle")) {
//             btnPlay.classList.remove("fa-play-circle");
//             btnPlay.classList.add("fa-pause-circle");
//             btnClicked();
//             audio.play();
//          } else {
//             btnPlay.classList.add("fa-play-circle");
//             btnClicked();
//             audio.pause();
//          }
//       });
//    }
// };

const player = function (data) {
  // let currentTrackId = data.tracks.data.id;
  const btnPrevious = document.getElementById("btn-previous");
  const btnNext = document.getElementById("btn-next");
  const progressBar = document.getElementById("progressBar");
  const currentTime = document.getElementById("currentTime");
  const duration = document.getElementById("duration");
  const playerImg = document.getElementById("player-img");
  const playerTitle = document.getElementById("player-title");
  const playerArtists = document.getElementById("player-artists");

  // console.log("len: ", data.tracks.data);
  // console.log("interno player: ", data);

  // get trackId
  const addressBarContent = new URLSearchParams(location.search);
  let trackid = parseInt(addressBarContent.get("trackId"));
  let artistId = parseInt(addressBarContent.get("artistId"));
  let albumId = parseInt(addressBarContent.get("albumId"));
  let obj;

  if (artistId) {
    obj = data;
  } else {
    obj = data.tracks;
  }

  // console.log("new obj", obj);

  // if there isn't any set first one's Id as track id
  if (!trackid) {
    trackid = obj.data[0].id;
  }

  // get and current position of the track
  let position = 0;
  for (let i = 0; i < obj.data.length; i++) {
    if (trackid === obj.data[i].id) {
      position = i;
    }
  }

  let currentTrack = position;

  if (artistId) {
    // set btn next link
    if (obj.data[currentTrack - 1]) {
      btnPrevious.setAttribute(
        "href",
        `artist.html?musicId=${obj.data[currentTrack].artist.id}&trackId=${
          obj.data[currentTrack - 1].id
        }&artistId=${obj.data[currentTrack].artist.id}`
      );
    }

    // set btn previous link
    if (obj.data[currentTrack + 1]) {
      btnNext.setAttribute(
        "href",
        `artist.html?musicId=${obj.data[currentTrack].artist.id}&trackId=${
          obj.data[currentTrack + 1].id
        }&artistId=${obj.data[currentTrack].artist.id}`
      );
    }
  } else {
    // set btn next link
    if (obj.data[currentTrack - 1]) {
      btnPrevious.setAttribute(
        "href",
        `album.html?musicId=${data.id}&trackId=${obj.data[currentTrack - 1].id}`
      );
    }

    // set btn previous link
    if (obj.data[currentTrack + 1]) {
      btnNext.setAttribute(
        "href",
        `album.html?musicId=${data.id}&trackId=${obj.data[currentTrack + 1].id}`
      );
    }
  }

  loadDataIntoPlayer(currentTrack);

  function loadDataIntoPlayer(currentTrack) {
    //  setting audio file
    const track = document.createElement("div");
    track.innerHTML = `
         <audio id="audio">
         <source id="track" src="${obj.data[currentTrack].preview}" type="audio/mpeg" />
         </audio>
         `;

    console.log("cuurent playeeee", obj.data[currentTrack].album);

    playerImg.setAttribute("src", obj.data[currentTrack].album.cover_small);
    playerImg.setAttribute(
      "data-cover",
      obj.data[currentTrack].album.cover_medium
    );

    playerArtists.innerHTML = "";

    // check and modify
    if (obj.data.contributors) {
      obj.data.contributors.forEach((artist) => {
        playerArtists.innerHTML += `
      <a
      class="text-decoration-none text-white-50 fs-7"
      href="#"
      >${obj.artist.name}</a
   >
      `;
      });
    } else {
      playerArtists.innerHTML += `
         <a
         class="text-decoration-none text-white-50 fs-7"
         href="#"
         >${obj.data[currentTrack].artist.name}</a
      >
         `;
    }

    playerTitle.innerText = obj.data[currentTrack].title;
    const playerHolder = document.querySelector("#player-main");
    playerHolder.appendChild(track);
    const audio = document.getElementById("audio");

    // button animation when clicks
    const btnPlay = document.getElementById("btn-play");
    const btnClicked = function () {
      btnPlay.style.transform = "scale(0.8)";
      setTimeout(function () {
        btnPlay.style.transform = "scale(1)";
      }, 150);
    };

    // format time
    const formatTime = function (time) {
      let minutes = Math.floor(time / 60);
      let seconds = Math.floor(time % 60);

      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      return minutes + ":" + seconds;
    };

    // console.log(track.querySelector("#audio"));

    // change volume
    const volume = document.getElementById("volume");
    volume.addEventListener("input", function () {
      track.querySelector("#audio").volume = volume.value / 100;
    });

    // update progressbar value
    audio.addEventListener("timeupdate", function () {
      const progress = (audio.currentTime / audio.duration) * 100;
      progressBar.value = progress;

      currentTime.textContent = formatTime(audio.currentTime);
      duration.textContent = formatTime(audio.duration);
    });

    // changes the playing position
    progressBar.addEventListener("input", function () {
      const time = (progressBar.value / 100) * audio.duration;
      audio.currentTime = time;
    });

    btnPlay.addEventListener("click", function () {
      if (btnPlay.classList.contains("fa-play-circle")) {
        btnPlay.classList.remove("fa-play-circle");
        btnPlay.classList.add("fa-pause-circle");
        btnClicked();
        audio.play();
      } else {
        btnPlay.classList.add("fa-play-circle");
        btnClicked();
        audio.pause();
      }
    });

    if (window.innerWidth <= 768) {
      console.log("small device");
      const popUp = document.createElement("div");
      popUp.className = "pop-up z-2 d-none";
      popUp.innerHTML = `
         <div class="z-3 d-flex flex-column align-items-center">
            <div
               class="btn m-3 pe-4 w-100 d-flex align-items-end justify-content-end mb-5"
            >
               <i id="close-btn_" class="fas fa-times fs-1"></i>
            </div>
            <div class="mt-5 pt-3 mb-5">
               <img
               id="pop-up-cover-img"
                  src="https://placekitten.com/300"
                  class="rounded mx-auto d-block mt-5"
                  alt="cover image"
               />
            </div>
            <p class="text-white fs-2 mb-0" id="mob-artist">fedez</p>
        <p class="text-white fs-4 mb-2" id="mob-title">ciaos</p>
            <div class="player-center w-75">
               <div
                  class="player-buttons d-flex justify-content-center mt-3 align-items-center mb-3"
               >
                  <a href="#" id="btn-previous" class="mt-1"
                     ><i class="fas fa-step-backward text-white-50 fs-5"></i
                  ></a>
                  <i id="btn-play" class="fas fa-play-circle fs-2 px-3"></i>
                  <a href="#" id="btn-next" class="mt-1"
                     ><i class="fas fa-step-forward text-white-50 fs-5"></i
                  ></a>
               </div>
               <div
                  class="progress text-white-50 d-flex align-items-center mb-3 mt-2"
               >
                  <span class="mx-2 fs-6 mb-1" id="currentTime">0:00</span>
                  <label class="d-none" for="progressBar">Duration</label>
                  <input
                     class="w-100 sliderRange"
                     id="progressBar"
                     type="range"
                     min="0"
                     max="100"
                     value="0"
                  />
                  <span class="mx-2 fs-6 mb-1" id="duration">0:00</span>
               </div>
            </div>
         </div>
         `;
      document.querySelector("body").append(popUp);

      // open popup when user click on cover image of the player
      const coverImg = document.getElementById("player-img");
      coverImg.addEventListener("click", function () {
        popUp.classList.remove("d-none");
        const popUpProgressBar = popUp.querySelector("#progressBar");
        const popUpCurrentTime = popUp.querySelector("#currentTime");
        const popUpDuration = popUp.querySelector("#duration");
        const popUpBtnPlay = popUp.querySelector("#btn-play");
        const popUpCoverImg = popUp.querySelector("#pop-up-cover-img");
        const retreaveCover =
          document.getElementById("player-img").dataset.cover;

        const artistname = popUp.querySelector("#mob-artist");
        const titlename = popUp.querySelector("#mob-title");

        document.querySelector("#player-title");
        document.querySelector("#player-artists");

        artistname.textContent =
          document.querySelector("#player-title").textContent;
        titlename.textContent =
          document.querySelector("#player-artists").textContent;

        popUpCoverImg.setAttribute("src", retreaveCover);
        console.log("get img:", retreaveCover);

        console.log("popup progress:", popUpProgressBar);

        // update progressbar value
        audio.addEventListener("timeupdate", function () {
          const progress = (audio.currentTime / audio.duration) * 100;
          popUpProgressBar.value = progress;

          popUpCurrentTime.textContent = formatTime(audio.currentTime);
          popUpDuration.textContent = formatTime(audio.duration);
        });

        // changes the playing position
        popUpProgressBar.addEventListener("input", function () {
          const time = (popUpProgressBar.value / 100) * audio.duration;
          audio.currentTime = time;
        });

        popUpBtnPlay.addEventListener("click", function () {
          if (popUpBtnPlay.classList.contains("fa-play-circle")) {
            popUpBtnPlay.classList.remove("fa-play-circle");
            popUpBtnPlay.classList.add("fa-pause-circle");
            btnClicked();
            audio.play();
          } else {
            popUpBtnPlay.classList.add("fa-play-circle");
            btnClicked();
            audio.pause();
          }
        });
      });

      // close btn popup
      const btnClose = popUp.querySelector("#close-btn_");
      btnClose.addEventListener("click", function () {
        popUp.classList.add("d-none");
      });

      console.log(" btn close", btnClose);
      console.log("this is popup", popUp);
    } else {
      console.log("large device");
    }

    console.log("width: ", window.innerWidth);
  }
};

export { player };
