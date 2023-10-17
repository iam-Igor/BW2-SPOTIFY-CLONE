// SEZIONE 2

const renderSection2 = function (musicData) {
   const section = document.getElementById("section2");
   console.log(section);

   for (let i = 0; i < 6; i++) {
      const newCol2 = document.createElement("div");
      newCol2.classList.add("col", "col-md-4", "mb-3");
      newCol2.innerHTML = `<div class="card d-flex flex-row align-items-center bg-body-secondary border-0">
    <img src="${musicData.data[i].artist.picture_small}" class="card-img-top w-25" alt="${musicData.data[i].artist.name}">
    <div class="card-body">
      <h6 class="card-title">${musicData.data[i].artist.name}</h6>
    </div>
  </div>`;
      section.appendChild(newCol2);
   }
};

// SEZIONE 3

const renderSection3 = function (musicData) {
   const row3 = document.getElementById("row-3");
   console.log(row3);

   for (let i = 0; i < 5; i++) {
      const newCol3 = document.createElement("div");
      newCol3.classList.add("col");
      newCol3.innerHTML = `<div class="card border-0 bg-body-secondary my-3 p-2" style='height:230px'>
        <img src="${musicData.data[i].artist.picture_small}" class="card-img-top" alt="${musicData.data[i].artist.name}" />
        <div class="card-body">
          <a href='./details.html?musicId=${musicData.data[i].artist.id}' class="card-title fw-bold" style='font-size:15px'>${musicData.data[i].artist.name}</a>
          <p class="card-text">${musicData.data[i].album.title}</p>
        </div>
      </div>`;
      row3.appendChild(newCol3);
   }
};

// SEZIONE PREFERITI
const generateFavourites = function (musicData) {
   const ul = document.getElementById("favourites");
   for (let k = 0; k < musicData.data.length; k++) {
      const newLi = document.createElement("li");
      newLi.classList.add("lh-base", "text-secondary", "link-light");
      newLi.innerText = `${musicData.data[k].title}`;
      ul.appendChild(newLi);
   }
};
const audiotrack = function (event) {
   const audioSrc = document.getElementById("audio");
   audioSrc.src = event.data[0].preview;

   const artistInfo = document.querySelectorAll(".now-playing-artist");
   artistInfo.forEach((artist) => {
      artist.textContent = `${event.data[0].artist.name}    
    &#8226;`;

      console.log((artist.textContent = `${event.data[0].artist.name}`));
   });

   const titleInfo = document.querySelectorAll(".now-playing-title");
   titleInfo.forEach((title) => {
      title.textContent = `${event.data[0].title}`;
   });

   const imgInfo = document.querySelectorAll(".now-playing-img");
   imgInfo.forEach((img) => {
      img.src = `${event.data[0].album.cover_big}`;
   });
};
const form = document.getElementById("form-search");
form.addEventListener("click", function (e) {
   e.preventDefault();
   const input = document.getElementById("search-input");
   let index = input.value;
   fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=" + index)
      .then((res) => {
         if (res.ok) {
            return res.json();
         } else {
            throw new Error("Errore nel contattare il server");
         }
      })
      .then((music) => {
         console.log(music);
         renderSection2(music);
         renderSection3(music);
         generateFavourites(music);
         generateDetails(music);
         audiotrack(music);
      })
      .catch((err) => {
         console.log("Si è verificato un errore", err);
      });
});

const audio = document.getElementById("audio");

const playPauseButton = document.querySelectorAll(".play-pause");
const stopButton = document.getElementById("stop");
const volumeControl = document.getElementById("volume");
const nextButton = document.querySelector(".skip-button:nth-child(3)");
const prevButton = document.querySelector(".skip-button:nth-child(1)");

playPauseButton.forEach((button) => {
   button.addEventListener("click", function () {
      if (audio.paused) {
         audio.play();
         button.innerHTML = `<i class="bi bi-pause-circle color1 fs-1 fs-md-4"></i>`;
      } else {
         audio.pause();
         button.innerHTML = `<i class="bi bi-play-fill color1 fs-1 fs-md-4"></i>`;
      }
   });
});

// DETTAGLIO

const addressBarContent = new URLSearchParams(location.search);
const musicId = addressBarContent.get("musicId");

const generateDetails = function (details) {
   const row1 = document.getElementById("row-1");
   for (let j = 0; j <= details.tracks.data.length; j++) {
      row1.innerHTML = `<div class="col col-4">
     <img
     src="${details.artist.picture_medium}"
      alt=""
      class="img-fluid"/>
    </div>
   <div class="col-8 pt-3">
    <h6>${details.title}</h6>
     <h1>${details.tracks.data[j].title}</h1>
     <a href='./details.html?musicId=${details.artist.id}'>${details.artist.name}</a>
    <p> Ascolta le tue canzoni preferite!</p>
     <div class="d-flex align-items-center">
       <a href="#" class="btn btn-success rounded-4 me-2 px-4"
         >Play</a
      >
      <a
        href="#"
         class="btn btn-black btn-outline-light rounded-4 mx-2 px-4"
         >Salva</a
       >
       <i class="bi bi-three-dots ms-3"></i>
     </div>
  </div>`;
   }
};

const getDetails = function () {
   fetch("https://striveschool-api.herokuapp.com/api/deezer/album/75621062")
      .then((res) => {
         if (res.ok) {
            console.log(res);
            return res.json();
         } else {
            throw new Error("Errore nel caricamento dei dettagli");
         }
      })
      .then((musicData) => {
         generateDetails(musicData);
      })
      .catch((err) => {
         console.log("Errore", err);
      });
};

getDetails();
