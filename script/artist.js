import { secToTime, displayDynamicalyWhenCloseRight } from "./album.js";
import { player } from "./player.js";

displayDynamicalyWhenCloseRight();

// get trackId
const addressBarContent = new URLSearchParams(location.search);
let artistId = addressBarContent.get("musicId");

// render track list
const renderArtistPage = function (artist) {
   const artistName = document.getElementById("name-artist");
   const monthlyListeners = document.getElementById("listeners");
   const coverPicture = document.getElementById("artist-cover-img-xl");
   const trackContainer = document.getElementById("album-tracks-continer");

   artistName.innerText = artist.name;
   monthlyListeners.innerText = artist.nb_fan;
   coverPicture.setAttribute("src", artist.picture_xl);

   // render each track
   const appendEachTrackToContainer = function (data) {
      trackContainer.innerHTML = "";
      data.data.forEach((track, index) => {
         const eachTrack = document.createElement("div");
         eachTrack.className = "row row-cols-3 tracks mx-0 mb-2 track-row";
         // eachTrack.innerHTML = `
         //    <div
         //       class="col-6 d-flex align-items-center ps-3"
         //    >
         //       <p class="ps-4 pe-3 m-0">${index + 1}</p>
         //       <div>
         //          <a href="artist.html?artistId=${artist.id}&trackId=${
         //    track.id
         // }&musicId=${artist.id}" class="mb-0 card-text">
         //            ${track.title}
         //          </a>
         //          <p class="mb-0">
         //             <small
         //                class="text-body-secondary text-dark-emphasis"
         //                ><a href="artist.html?artistId=${artist.id}&musicId=${
         //    artist.id
         // }">${track.artist.name}</a></small
         //             >
         //          </a>
         //       </div>
         //    </div>
         //    <div
         //       class="col-3 d-flex justify-content-end align-items-center"
         //    >
         //       <p class="card-text">${track.rank}</p>
         //    </div>
         //    <div
         //       class="col-3 d-flex justify-content-end align-items-center pe-3"
         //    >
         //       <p class="card-text pe-4">${secToTime(
         //          track.duration,
         //          "track"
         //       )}</p>
         //    </div>
         // `;
         // imported one from album
         eachTrack.innerHTML = `
         <div class="col-6 d-flex align-items-center ps-0 ps-md-3 single-card">
            <p class="ps-4 pe-3 m-0 number">${index + 1}</p>
            <img src="${track.album.cover_small}" class="me-2">

            <div class="moving">
            <a href="artist.html?artistId=${artist.id}&trackId=${
            track.id
         }&musicId=${artist.id}" class="mb-0 card-text ">${track.title}</a>

            <p class="mb-0"><a href="artist.html?artistId=${
               artist.id
            }&musicId=${artist.id}">${track.artist.name}</a></p>

         </div>
         <div >
            <i class="bi bi-play-fill fs-3 play-track "></i>
            </div>
         </div>
         <div class="col-3 d-flex justify-content-end align-items-center ">
            <p class="card-text">${track.rank}</p>
         </div>
         <div class="col-3 d-flex justify-content-end align-items-center pe-3">
            <p class="card-text pe-4">
            ${secToTime(track.duration, "track")}
         </p>
         </div>
         `;
         trackContainer.appendChild(eachTrack);
      });
   };

   // fetch each track
   fetch(artist.tracklist)
      .then((resposne) => {
         if (!resposne.ok) {
            throw new Error("ERROR FETCH!");
         }
         return resposne.json();
      })
      .then((response) => {
         console.log("fetch went fine!", response);
         appendEachTrackToContainer(response);
         player(response);
      })
      .catch((err) => console.log("Error occured!", err));
};

// fetch artist
const fetchDataArtist = function (artistId) {
   fetch("https://striveschool-api.herokuapp.com/api/deezer/artist/" + artistId)
      .then((response) => {
         if (!response.ok) {
            throw new Error("ERROR FETCH!");
         }
         return response.json();
      })
      .then((response) => {
         console.log("Fetch went fine!", response);
         renderArtistPage(response);
      })
      .catch((err) => {
         console.log("Error!", err);
      });
};

fetchDataArtist(artistId);
