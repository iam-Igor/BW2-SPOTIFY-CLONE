const container = document.querySelector(".container");
container.classList.add("transition-slide-up");

const addressBarContent = new URLSearchParams(location.search);
const musicId = addressBarContent.get("musicId");

const backBtn = document.getElementById("back");

backBtn.addEventListener("click", function () {
  window.history.back();
});

const getPlayer = function (music) {
  let trackToShow = music.tracks.data;
  console.log(trackToShow);

  for (let i = 0; i < trackToShow.length; i++) {
    const songTitle = document.getElementById("song-title");
    songTitle.innerText = `${trackToShow[i].title}`;

    const artistname = document.getElementById("artist-name");
    artistname.innerText = `${music.artist.name}`;

    const imageAlbum = document.getElementById("album-img");
    imageAlbum.src = `${trackToShow[i].album.cover_medium}`;

    const audioSource = document.getElementById("audio-player");
    audioSource.src = `${trackToShow[i].preview}`;

    console.log(music);

    const playbtn = document.getElementById("play-pause");
    playbtn.addEventListener("click", function () {
      if (audioSource.paused) {
        audioSource.play();
        playbtn.innerHTML = `<i class="bi bi-pause-circle color1 fs-1 text-white"></i> `;
      } else {
        audioSource.pause();
        playbtn.innerHTML = `<i class="bi bi-play-circle color1 fs-1 text-white"></i>`;
      }
    });

    audioSource.addEventListener("timeupdate", function () {
      const progressBar = document.getElementsByClassName("progress")[0];
      const currentTime = audioSource.currentTime;
      const duration = audioSource.duration;
      const percentagePlayed = (currentTime / duration) * 100;

      progressBar.style.width = percentagePlayed + "%";
    });
  }
};

fetch("https://striveschool-api.herokuapp.com/api/deezer/album/" + musicId)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Fetching respose ERROR!");
    } else {
      return response.json();
    }
  })
  .then((response) => {
    console.log("Fetch went fine!", response);
    getPlayer(response);
  })
  .catch((err) => console.log("Fetching issue", err));

const HeartAnimation = document.getElementsByClassName("HeartAnimation")[0];

HeartAnimation.addEventListener("click", function () {
  HeartAnimation.classList.toggle("animate");
});
