console.log("sono collegato");

const renderAlbum = function (album) {
   const albumName = document.getElementById("album-name");
   const recordType = document.getElementById("record-type");
   const albumArtist = document.getElementById("album-artist");

   // setting data
   albumName.innerText = album.title;
   recordType.innerText = album.record_type.toUpperCase();
   albumArtist.setAttribute("src", `${album.artist.picture}`);

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
