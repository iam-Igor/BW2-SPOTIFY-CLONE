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

   console.log("len: ", data.tracks.data);

   // get trackId
   const addressBarContent = new URLSearchParams(location.search);
   let trackid = parseInt(addressBarContent.get("trackId"));

   // if there isn't any set first one's Id as track id
   if (!trackid) {
      trackid = data.tracks.data[0].id;
   }

   // get and current position of the track
   let position = 0;
   for (let i = 0; i < data.tracks.data.length; i++) {
      if (trackid === data.tracks.data[i].id) {
         position = i;
      }
   }

   let currentTrack = position;

   // set btn next link
   if (data.tracks.data[currentTrack - 1]) {
      btnPrevious.setAttribute(
         "href",
         `album.html?musicId=${data.id}&trackId=${
            data.tracks.data[currentTrack - 1].id
         }`
      );
   }

   // set btn previous link
   if (data.tracks.data[currentTrack + 1]) {
      btnNext.setAttribute(
         "href",
         `album.html?musicId=${data.id}&trackId=${
            data.tracks.data[currentTrack + 1].id
         }`
      );
   }

   loadDataIntoPlayer(currentTrack);

   function loadDataIntoPlayer(currentTrack) {
      //  setting audio file
      const track = document.createElement("div");
      track.innerHTML = `
         <audio id="audio">
         <source id="track" src="${data.tracks.data[currentTrack].preview}" type="audio/mpeg" />
         </audio>
         `;

      playerImg.setAttribute(
         "src",
         data.tracks.data[currentTrack].album.cover_small
      );

      playerArtists.innerHTML = "";
      data.contributors.forEach((artist) => {
         playerArtists.innerHTML += `
      <a
      class="text-decoration-none text-white-50 fs-7"
      href="#"
      >${artist.name}</a
   >
      `;
      });

      playerTitle.innerText = data.tracks.data[currentTrack].title;
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
   }
};

export { player };

// const loadAlbum = function () {
//    fetch("https://striveschool-api.herokuapp.com/api/deezer/album/75621062")
//       .then((response) => {
//          if (!response.ok) {
//             throw new Error("Fetching respose ERROR!");
//          }
//          return response.json();
//       })
//       .then((respone) => {
//          console.log("Fetch went fine!", respone);
//          //  renderAlbum(respone);
//          //  audiotrack3(respone);
//          player(respone);
//       })
//       .catch((err) => console.log("Fetching issue", err));
// };

// loadAlbum();
