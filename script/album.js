console.log("sono collegato");

const renderAlbum = function (album) {
   const secToTime = function (duration) {
      const milliseconds = duration * 1000;
      const seconds = Math.floor((milliseconds / 1000) % 60);
      const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
      const hours = Math.floor((milliseconds / 1000 / 60 / 60) % 24);

      return ` ${hours.toString()}hr ${minutes
         .toString()
         .padStart(2, "0")}min ${seconds.toString().padStart(2, "0")}sec.`;
   };

   const albumName = document.getElementById("album-name");
   const recordType = document.getElementById("record-type");
   const albumArtist = document.getElementById("album-artist");
   const albumCoverArt = document.getElementById("album-cover-art");
   const albumDuration = document.getElementById("album-duration");
   const releasedYear = document.getElementById("album-released-year");
   const albumTracks = document.getElementById("album-tracks");
   const albumArtistName = document.getElementById("album-artist-name");

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
