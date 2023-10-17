const renderAlbum = function (album) {
   const secToTime = function (duration, type = "albumDuration") {
      const milliseconds = duration * 1000;
      const seconds = Math.floor((milliseconds / 1000) % 60);
      const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
      const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);

      if (type === "track") {
         let duration = [
            hours.toString().padStart(2, "0"),
            minutes.toString().padStart(2, "0"),
            seconds.toString().padStart(2, "0"),
         ];

         duration[0] === "00" ? duration.shift() : duration;
         return duration.join(":");
      } else {
         return ` ${hours.toString()}hr ${minutes
            .toString()
            .padStart(2, "0")}min ${seconds.toString().padStart(2, "0")}sec.`;
      }
   };

   const albumName = document.getElementById("album-name");
   const recordType = document.getElementById("record-type");
   const albumArtist = document.getElementById("album-artist");
   const albumCoverArt = document.getElementById("album-cover-art");
   const albumDuration = document.getElementById("album-duration");
   const releasedYear = document.getElementById("album-released-year");
   const albumTracks = document.getElementById("album-tracks");
   const albumArtistName = document.getElementById("album-artist-name");
   const albumListTracks = document.getElementById("album-tracks-continer");

   // setting data
   albumName.innerText = album.title;
   recordType.innerText = album.record_type.toUpperCase();
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
   console.log("length :", album.tracks.data.length);
   album.tracks.data.forEach((track, index) => {
      const trackRow = document.createElement("div");
      trackRow.className = "row row-cols-3 tracks mx-0 mb-2";
      trackRow.innerHTML = `
         <div class="col-6 d-flex align-items-center ps-3">
            <p class="ps-4 pe-3 m-0">${index + 1}</p>
            <div >
            <p class="mb-0 card-text">${track.title}</p>
            <p class="mb-0"><small class="text-body-secondary ">${
               track.artist.name
            }</small></p>
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
   const musicBar = document.getElementById("music-bar");
   const header = document.getElementsByTagName("header");

   // fullHeight.style.height =
   //    window.innerHeight - musicBar.innerHeight - header.innerHeight + "px";

   bgBlack.style.height =
      fullHeight.clientHeight -
      window.innerHeight / 2 -
      musicBar.innerHeight -
      header.innerHeight +
      "px";
};

const loadAlbum = function (id = 75621062) {
   fetch("https://striveschool-api.herokuapp.com/api/deezer/album/" + id)
      .then((response) => {
         if (!response.ok) {
            throw new Error("Fetching respose ERROR!");
         }
         return response.json();
      })
      .then((respone) => {
         console.log("Fetch went fine!", respone);
         renderAlbum(respone);
      })
      .catch((err) => console.log("Fetching issue", err));
};

loadAlbum();
