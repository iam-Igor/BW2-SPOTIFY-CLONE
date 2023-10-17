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

const searchForm = document.getElementById("search-form");

searchForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const input = document.getElementById("search-input");

  let indexParam = input.value;
  console.log(input.value);

  fetch(
    "https://striveschool-api.herokuapp.com/api/deezer/search?q=" + indexParam
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("error");
      }
    })
    .then((detail) => {
      console.log(detail);
      audiotrack(detail);
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
      button.innerHTML = `<i class="bi bi-pause-circle color1 fs-1 fs-md-4"></i>

      `;
    } else {
      audio.pause();
      button.innerHTML = `<i class="bi bi-play-fill color1 fs-1 fs-md-4"></i>`;
    }
  });
});
