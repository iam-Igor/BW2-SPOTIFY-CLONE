import { player } from "./player.js";

// when user close the right side container modify the layout
const displayDynamicalyWhenCloseRight = function () {
   const rightContainer = document.getElementById("friends-activity");
   const btnRightContainerClose = rightContainer.querySelector(".close-tab");

   if (rightContainer) {
      btnRightContainerClose.addEventListener("click", function () {
         // console.log("time to reset");
         const playList = document.getElementById(
            "rendered-playlist-middle-container"
         );
         const leftContainer = document.getElementById("left-container");
         const mainContainer = document.getElementById("main-container");
         const mainContent = document.getElementById("main-content");

         playList.classList.remove("col-md-8");
         playList.classList.add("col-md-9");
         leftContainer.classList.add("col-md-3");
         mainContainer.classList.remove("row-cols-3");
         mainContent.classList.remove("col-md-10");
         // mainContainer.classList.add("row-cols-2");
      });
   }
};

displayDynamicalyWhenCloseRight();

const albumName = document.getElementById("album-name");
const recordType = document.getElementById("record-type");
const albumArtist = document.getElementById("album-artist");
const albumCoverArt = document.getElementById("album-cover-art");
const albumDuration = document.getElementById("album-duration");
const releasedYear = document.getElementById("album-released-year");
const albumTracks = document.getElementById("album-tracks");
const albumArtistName = document.getElementById("album-artist-name");
const albumListTracks = document.getElementById("album-tracks-continer");

// a function that calculates duration of tracks or duration of album
const secToTime = function (duration, type = "albumDuration") {
   const milliseconds = duration * 1000;
   const seconds = Math.floor((milliseconds / 1000) % 60);
   const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
   const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);

   // calculate track length
   if (type === "track") {
      let duration = [
         hours.toString().padStart(2, "0"),
         minutes.toString().padStart(2, "0"),
         seconds.toString().padStart(2, "0"),
      ];

      duration[0] === "00" ? duration.shift() : duration;
      return duration.join(":");
   } else {
      // calculates album length
      return ` ${hours.toString()}hr ${minutes
         .toString()
         .padStart(2, "0")}min ${seconds.toString().padStart(2, "0")}sec.`;
   }
};

const renderAlbum = function (album) {
   // console.log(album);

   // setting data
   albumName.innerText = album.title;
   // recordType.innerText = album.record_type.toUpperCase();
   albumArtist.setAttribute("src", `${album.artist.picture}`);
   albumCoverArt.setAttribute("src", `${album.cover_medium}`);
   albumDuration.innerText = secToTime(album.duration);
   releasedYear.innerText = album.release_date.substring(
      0,
      album.release_date.indexOf("-")
   );
   albumTracks.innerText = album.nb_tracks + " brani";
   albumArtistName.innerText = album.artist.name;

   // creating album track list
   // console.log("length :", album.tracks.data.length);
   album.tracks.data.forEach((track, index) => {
      const trackRow = document.createElement("div");
      // console.log(album);
      trackRow.className = "row row-cols-3 tracks mx-0 mb-2";
      trackRow.innerHTML = `
         <div class="col-6 d-flex align-items-center ps-0 ps-md-3">
            <p class="ps-4 pe-3 m-0 number >${index + 1}</p>
            <img src="${album.artist.picture_small}" class="me-2">

            <div class="moving">
            <a href="album.html?musicId=${album.id}&trackId=${
         track.id
      }" class="mb-0 card-text ">${track.title}</a>
            <p class="mb-0"><small class="text-body-secondary ">${
               track.artist.name
            }</small></p>
         </div>
         <div class="ms-3">
         <i class="bi bi-play-fill fs-3 play-track2"></i>
         </div>
      </div>
         </div>
         <div class="col-3 d-flex justify-content-end align-items-center">
            <p class="card-text">${track.rank}</p>
         </div>
         <div class="col-3 d-flex justify-content-end align-items-center pe-3">
            <p class="card-text pe-4">${secToTime(track.duration, "track")}</p>
         </div>
      `;
      albumListTracks.appendChild(trackRow);
   });

   // setting height of bg black
   const bgBlack = document.querySelector(".album-bg-black");
   const fullHeight = document.querySelector(".tracks-and-header");

   console.log(
      "height: ",
      fullHeight.clientHeight,
      bgBlack.clientHeight,
      window.innerHeight / 2,
      fullHeight.clientHeight - window.innerHeight / 2
   );

   // fullHeight.style.height =
   //    window.innerHeight - musicBar.innerHeight - header.innerHeight + "px";

   // bgBlack.style.height =
   //    fullHeight.clientHeight -
   //    window.innerHeight / 2 -
   //    musicBar.innerHeight -
   //    header.innerHeight +
   //    "px";

   // bgBlack.style.height =
   //    fullHeight.clientHeight - window.innerHeight / 2 + "px";
};

// this is only for the artist
// render artist's tracks
const visualizeAlbums = function (albums, musicId) {
   // console.log("this is artist: ", albums);
   const albumListTracks = document.getElementById("album-tracks-continer");

   const secToTime = function (duration, type = "albumDuration") {
      const milliseconds = duration * 1000;
      const seconds = Math.floor((milliseconds / 1000) % 60);
      const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
      const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);

      // calculate track length
      if (type === "track") {
         let duration = [
            hours.toString().padStart(2, "0"),
            minutes.toString().padStart(2, "0"),
            seconds.toString().padStart(2, "0"),
         ];

         duration[0] === "00" ? duration.shift() : duration;
         return duration.join(":");
      } else {
         // calculates album length
         return ` ${hours.toString()}hr ${minutes
            .toString()
            .padStart(2, "0")}min ${seconds.toString().padStart(2, "0")}sec.`;
      }
   };

   albums.data.forEach((album, index) => {
      // console.log("inside album", albums);
      const trackRow = document.createElement("div");
      trackRow.className = "row row-cols-3 tracks mx-0 mb-2";
      trackRow.innerHTML = `
           <div class="col-6 d-flex align-items-center ps-0 ps-md-3 single-card">
              <p class="ps-4 pe-3 m-0 number">${index + 1}</p>
              <img src="${album.album.cover_small}" class="me-2">

              <div class="moving">
              <a href="artist.html?musicId=${musicId}&trackId=${
         album.id
      }" class="mb-0 card-text ">${album.title}</a>

    
              <p class="mb-0"><small class="text-body-secondary">${
                 album.artist.name
              }</small></p>
              
           </div>
           <div >
              <i class="bi bi-play-fill fs-3 play-track "></i>
              </div>
           </div>
           <div class="col-3 d-flex justify-content-end align-items-center ">
              <p class="card-text">${album.rank}</p>
           </div>
           <div class="col-3 d-flex justify-content-end align-items-center pe-3">
              <p class="card-text pe-4">
              ${secToTime(album.duration, "track")}
            </p>
           </div>
        `;
      albumListTracks.appendChild(trackRow);
   });
};

const audiotrack3 = function (event) {
   const audioSrc = document.getElementById("audio");
   // console.log(event);
   const playBtnArtist = document.querySelectorAll(".play-track2");

   for (let i = 0; i < playBtnArtist.length; i++) {
      playBtnArtist[i].addEventListener("click", function () {
         audioSrc.src = event.preview;
         // console.log((audioSrc.src = event.tracks.data[i].preview));
         const artistInfo = document.querySelectorAll(".now-playing-artist");
         artistInfo.forEach((artist) => {
            artist.textContent = event.artist.name;
         });

         const titleInfo = document.querySelectorAll(".now-playing-title");
         titleInfo.forEach((title) => {
            title.textContent = event.tracks.data[i].title;
         });

         const imgInfo = document.querySelectorAll(".now-playing-img");
         imgInfo.forEach((img) => {
            img.src = event.tracks.data[i].album.cover_big;
         });
      });
   }
};

const audiotrack2 = function (event) {
   // console.log(event);

   const audioSrc = document.getElementById("audio");
   // console.log(audioSrc);

   const playBtnArtist = document.querySelectorAll(".play-track");

   for (let i = 0; i < playBtnArtist.length; i++) {
      playBtnArtist[i].addEventListener("click", function () {
         audioSrc.src = event.data[i].preview;
         // console.log((audioSrc.src = event.data[i].preview));
         const artistInfo = document.querySelectorAll(".now-playing-artist");
         artistInfo.forEach((artist) => {
            artist.textContent = event.data[i].artist.name;
         });

         const titleInfo = document.querySelectorAll(".now-playing-title");
         titleInfo.forEach((title) => {
            title.textContent = event.data[i].title;
         });

         const imgInfo = document.querySelectorAll(".now-playing-img");
         imgInfo.forEach((img) => {
            img.src = event.data[i].album.cover_big;
         });
      });
   }
};

// set artist profile
const visualizeArtist = function (artist) {
   albumName.innerText = artist.name;

   albumArtist.setAttribute("src", `${artist.picture_medium}`);
   albumCoverArt.setAttribute("src", `${artist.picture_medium}`);

   albumTracks.innerText = artist.nb_album + " " + "album";
};

const addressBarContent = new URLSearchParams(location.search);
const musicId = addressBarContent.get("musicId");

// fetch artist's tracks
const renderArtist = function (artist) {
   fetch(
      "https://striveschool-api.herokuapp.com/api/deezer/artist/" +
         musicId +
         "/top?limit=50"
   )
      .then((res) => {
         if (res.ok) {
            return res.json();
         } else {
            throw new Error();
         }
      })
      .then((suggested) => {
         console.log(suggested);
         visualizeAlbums(suggested, musicId);
         audiotrack2(suggested);
      })
      .catch((err) => {
         console.log(err);
      });
};

const loadAlbum = function () {
   fetch("https://striveschool-api.herokuapp.com/api/deezer/album/" + musicId)
      .then((response) => {
         if (!response.ok) {
            throw new Error("Fetching respose ERROR!");
         }
         return response.json();
      })
      .then((respone) => {
         console.log("Fetch went fine!", respone);
         renderAlbum(respone);
         // audiotrack3(respone);
         player(respone);
      })
      .catch((err) => console.log("Fetching issue", err));
};

loadAlbum();

// fetch for artists
const loadArtist = function () {
   fetch("https://striveschool-api.herokuapp.com/api/deezer/artist/" + musicId)
      .then((response) => {
         if (!response.ok) {
            throw new Error("Fetching respose ERROR!");
         } else {
            return response.json();
         }
      })
      .then((response) => {
         console.log("Fetch went fine!", response);
         // fertch artist's tracks
         renderArtist(response);
         // render artist profile
         visualizeArtist(response);
      })
      .catch((err) => console.log("Fetching issue", err));
};

loadArtist();

// get the artist
// render each track

export { displayDynamicalyWhenCloseRight, secToTime };
