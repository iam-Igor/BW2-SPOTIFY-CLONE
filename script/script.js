// EVENT LISTENER PER CHIUDERE SEZ. AMICI ED INGRANDIRE SEZ. CENTRALE

const closeBtn = document.getElementsByClassName("close-tab")[0];
closeBtn.addEventListener("click", function () {
  const friendstab = document.getElementById("friends-activity");
  friendstab.classList.add("d-lg-none");

  const mainContent = document.getElementById("main-content");
  mainContent.classList.add("col-md-10");
});

// EVENT LISTENER PER AGGIORNARE AVANZAMENTO BARRA PLAYER DESKTOP

const audioSrc = document.getElementById("audio");

const progressBar = document.getElementsByClassName("progress-bar")[0];
audioSrc.addEventListener("timeupdate", function () {
  const currentTime = audioSrc.currentTime;
  const duration = audioSrc.duration;
  const songStart = document.getElementsByClassName("song-start")[0];
  const songEnd = document.getElementsByClassName("song-end")[0];

  const formattedCurrentTime = formatTime(currentTime);
  songStart.textContent = formattedCurrentTime;

  const remainingTime = duration - currentTime;

  const formattedRemainingTime = formatTime(remainingTime);
  songEnd.textContent = formattedRemainingTime;

  if (songEnd.textContent === "NaN:NaN") {
    songEnd.textContent = "";
  }

  const percentagePlayed = (currentTime / duration) * 100;

  progressBar.style.width = percentagePlayed + "%";
});

// GESTIONE VOLUME DEL PLAYER
const volumeInput = document.getElementById("volume");

volumeInput.addEventListener("input", function () {
  const volume = volumeInput.value;
  audioSrc.volume = volume;

  audioSrc.volume = volumeInput.value / 100;
});

const formatTime = function (seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${String(minutes).padStart(2, "0")}:${String(
    remainingSeconds
  ).padStart(2, "0")}`;
};

// EVENT LISTENER PER IL CUORE PREFERITI

const HeartAnimation = document.getElementsByClassName("HeartAnimation")[0];

HeartAnimation.addEventListener("click", function () {
  HeartAnimation.classList.toggle("animate");
});

// DETTAGLIO

const generateDetails = function (details) {
  console.log(details);
  const row1 = document.getElementById("row-1");
  for (let j = 0; j < details.data.length; j++) {
    row1.innerHTML = `<div class="col col-4">
     <img
     src="${details.data[j].album.cover_medium}"
      alt=""
      class="img-fluid"/>
    </div>
   <div class="col-8 pt-3">
    <h6>${details.data[j].title}</h6>
     <h1>${details.data[j].album.title}</h1>
     <a href='./album.html?musicId=${details.data[j].artist.id}'>${details.data[j].artist.name}</a>
   
    
     <div class="d-flex align-items-center mt-3">
       <a href="#" class="btn btn-success rounded-4 me-2 px-4 play-pause"
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

// SEZIONE 2

const renderSection2 = function (musicData) {
  const section = document.getElementById("section2");
  console.log(musicData.data);
  for (let i = 0; i < 6; i++) {
    section.innerHTML = `<div class="col mb-3 col-md-4 grow">
    <div
      class="card d-flex flex-row align-items-center bg-body-secondary border-0"
    >
      <img
        src="${musicData.data[0].album.cover_medium}"
        class="card-img-top w-25"
        alt="${musicData.data[0].artist.name}"
      />
      <div class="card-body">
      <a href="./album.html?musicId=${musicData.data[0].album.id}">
        <h6 class="card-title">
          ${musicData.data[0].album.title}
         
        </h6>
        </a>
        </a>
      </div>
    </div>
  </div>
  <div class="col mb-3 col-md-4 grow">
    <div
      class="card d-flex flex-row align-items-center bg-body-secondary border-0"
    >
      <img
        src="${musicData.data[1].album.cover_medium}"
        class="card-img-top w-25"
        alt="${musicData.data[1].artist.name}"
      />
      <div class="card-body">
      <a href="./album.html?musicId=${musicData.data[1].album.id}">
        <h6 class="card-title">
          ${musicData.data[1].album.title}
        </h6>
        </a>
      </div>
    </div>
  </div>
  <div class="col mb-3 col-md-4 grow">
    <div
      class="card d-flex flex-row align-items-center bg-body-secondary border-0"
    >
      <img
        src="${musicData.data[2].album.cover_medium}"
        class="card-img-top w-25"
        alt="${musicData.data[2].artist.name}"
      />
      <div class="card-body">
      <a href="./album.html?musicId=${musicData.data[2].album.id}">
      <h6 class="card-title">
        ${musicData.data[2].album.title}
      </h6>
      </a>
      </div>
    </div>
  </div>
  <div class="col mb-3 col-md-4 grow">
    <div
      class="card d-flex flex-row align-items-center bg-body-secondary border-0"
    >
      <img
        src="${musicData.data[3].album.cover_medium}"
        class="card-img-top w-25"
        alt="${musicData.data[3].artist.name}"
      />
      <div class="card-body">
      <a href="./album.html?musicId=${musicData.data[3].album.id}">
      <h6 class="card-title">
        ${musicData.data[3].album.title}
      </h6>
      </a>
      </div>
    </div>
  </div>
  <div class="col mb-3 col-md-4 grow">
    <div
      class="card d-flex flex-row align-items-center bg-body-secondary border-0"
    >
      <img
        src="${musicData.data[4].album.cover_medium}"
        class="card-img-top w-25"
        alt="${musicData.data[4].artist.name}"
      />
      <div class="card-body">
      <a href="./album.html?musicId=${musicData.data[4].album.id}">
        <h6 class="card-title">
          ${musicData.data[4].album.title}
        </h6>
        </a>
      </div>
    </div>
  </div>
  <div class="col mb-3 col-md-4 grow">
    <div
      class="card d-flex flex-row align-items-center bg-body-secondary border-0"
    >
      <img
        src="${musicData.data[5].album.cover_medium}"
        class="card-img-top w-25"
        alt="${musicData.data[5].artist.name}"
      />
      <div class="card-body">
      <a href="./album.html?musicId=${musicData.data[5].album.id}">
      <h6 class="card-title">
        ${musicData.data[5].album.title}
      </h6>
      </a>
      </div>
    </div>
  </div>`;
  }
};

// SEZIONE 3

const renderSection3 = function (musicData) {
  const row3 = document.getElementById("row-3");
  console.log(musicData);

  row3.innerHTML = `<div class="col grow">
    <div
      class="card border-0 bg-body-secondary my-3 p-2"
      style="height: 260px"
    >
      <img
        src="${musicData.data[6].album.cover_medium}"
        class="card-img-top"
        alt="${musicData.data[6].artist.name}"
      />
      <div class="card-body">
        <a
          href="./album.html?musicId=${musicData.data[6].artist.id}"
          class="card-title fw-bold"
          style="font-size: 15px"
          >${musicData.data[6].artist.name}</a
        >  <p class="card-text text-truncate">
        ${musicData.data[6].album.title}
      </p>
      </div>
    </div>
  </div>
  <div class="col grow"">
    <div
      class="card border-0 bg-body-secondary my-3 p-2"
      style="height: 260px"
    >
      <img
        src="${musicData.data[7].album.cover_medium}"
        class="card-img-top"
        alt="${musicData.data[7].artist.name}"
      />
      <div class="card-body">
        <a
          href="./album.html?musicId=${musicData.data[7].artist.id}"
          class="card-title fw-bold"
          style="font-size: 15px"
          >${musicData.data[7].artist.name}</a
        >  <p class="card-text text-truncate">
        ${musicData.data[7].album.title}
      </p>
      </div>
    </div>
  </div>
  <div class="col grow"">
    <div
      class="card border-0 bg-body-secondary my-3 p-2"
      style="height: 260px"
    >
      <img
        src="${musicData.data[8].album.cover_medium}"
        class="card-img-top"
        alt="${musicData.data[8].artist.name}"
      />
      <div class="card-body">
        <a
          href="./album.html?musicId=${musicData.data[8].artist.id}"
          class="card-title fw-bold"
          style="font-size: 15px"
          >${musicData.data[8].artist.name}</a
        >  <p class="card-text text-truncate">
        ${musicData.data[8].album.title}
      </p>
      </div>
    </div>
  </div>
  <div class="col grow"">
    <div
      class="card border-0 bg-body-secondary my-3 p-2"
      style="height: 260px"
    >
      <img
        src="${musicData.data[9].album.cover_medium}"
        class="card-img-top"
        alt="${musicData.data[9].artist.name}"
      />
      <div class="card-body">
        <a
          href="./album.html?musicId=${musicData.data[9].artist.id}"
          class="card-title fw-bold"
          style="font-size: 15px"
          >${musicData.data[9].artist.name}</a
        >  <p class="card-text text-truncate">
        ${musicData.data[9].album.title}
      </p>
      </div>
    </div>
  </div>
  <div class="col grow"">
    <div
      class="card border-0 bg-body-secondary my-3 p-2"
      style="height: 260px"
    >
      <img
        src="${musicData.data[10].album.cover_medium}"
        class="card-img-top"
        alt="${musicData.data[10].artist.name}"
      />
      <div class="card-body">
        <a
          href="./album.html?musicId=${musicData.data[10].artist.id}"
          class="card-title fw-bold"
          style="font-size: 15px"
          >${musicData.data[10].artist.name}</a
        >
        <p class="card-text text-truncate">
          ${musicData.data[10].album.title}
        </p>
      </div>
    </div>
  </div>
  <div class="col grow"">
    <div
      class="card border-0 bg-body-secondary my-3 p-2 "
      style="height: 260px"
    >
      <img
        src="${musicData.data[11].album.cover_medium}"
        class="card-img-top"
        alt="${musicData.data[11].artist.name}"
      />
      <div class="card-body">
        <a
          href="./album.html?musicId=${musicData.data[11].artist.id}"
          class="card-title fw-bold"
          style="font-size: 15px"
          >${musicData.data[11].artist.name}</a
        >
        <p class="card-text text-truncate">
          ${musicData.data[11].album.title}
        </p>
      </div>
    </div>
  </div>`;
};

// SEZIONE PREFERITI
const generateFavourites = function (musicData) {
  console.log(musicData);
  const ul = document.getElementById("favourites");
  for (let k = 0; k < musicData.data.length; k++) {
    const newLi = document.createElement("li");
    newLi.classList.add("lh-base", "text-secondary", "link-light");
    newLi.innerHTML = `<a href="./album.html?musicId=${musicData.data[k].album.id}">${musicData.data[k].album.title}</a>`;
    ul.appendChild(newLi);
  }
};
const audiotrack = function (event) {
  console.log(event);
  const audioSrc = document.getElementById("audio");
  audioSrc.src = event.data[0].preview;

  console.log((audioSrc.src = event.data[0].preview));
  const artistInfo = document.querySelectorAll(".now-playing-artist");
  artistInfo.forEach((artist) => {
    artist.textContent = event.data[0].artist.name;
  });

  const titleInfo = document.querySelectorAll(".now-playing-title");
  titleInfo.forEach((title) => {
    title.textContent = event.data[0].title;
  });

  const imgInfo = document.querySelectorAll(".now-playing-img");
  imgInfo.forEach((img) => {
    img.src = event.data[0].album.cover_big;
  });

  // EVENT LISTENER PER APRIRE MOB PLAYER
  const musicBarSM = document.getElementById("music-bar2");
  musicBarSM.addEventListener("click", function () {
    const newUrl = `./mobile_player.html?musicId=${event.data[0].album.id}`;
    window.location.href = newUrl;
  });
};

const form = document.getElementById("form-search");
form.addEventListener("submit", function (e) {
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
      renderSection2(music);
      renderSection3(music);
      generateFavourites(music);

      audiotrack(music);
      generateDetails(music);
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
      button.style.transform = "scale(0.8)";
    } else {
      audio.pause();
      button.innerHTML = `<i class="bi bi-play-fill color1 fs-1 fs-md-4"></i>`;
      button.style.transform = "scale(1)";
    }
  });
});

// SEZIONE CERCA MOBILE

const searchButton2 = document.getElementById("search2");

searchButton2.addEventListener("click", function () {
  const navBar = document.getElementById("navbar");
  navBar.classList.remove("d-none");
  navBar.classList.add("slide-in-blurred-top");
});
