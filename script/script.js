// SEZIONE 1
const addressBarContent = new URLSearchParams(location.search)
const albumId = addressBarContent.get('albumId')

const renderMusic = function (arrayOfMusic) {
  const row = document.getElementById('row-1')
  console.log(row)
  for (let i = 0; i <= arrayOfMusic.length; i++) {
    const newCol = document.createElement('div')

    newCol.classList.add('col')
    newCol.innerHTML = `<div class="card">
        <img src="${arrayOfMusic.data[i].artist.picture}" class="card-img-top" alt="${arrayOfMusic.data[i].artist.name}">
        <div class="card-body">
          <h5 class="card-title">${arrayOfMusic.data[i].album.title}</h5>
          <p class="card-text">${arrayOfMusic.data[i].artist.name}</p>
          <p class="card-text">Ascolta il nuovo album di ${arrayOfMusic.data[i].artist.name}</p>
          <a href="#" class="btn btn-primary">Play</a>
          <a href="#" class="btn btn-primary">Salva</a>
          <i class="bi bi-three-dots"></i>
        </div>
      </div>`
    row.appendChild(newCol)
    console.log(newCol)
  }
}

const getMusic = function () {
  fetch('https://striveschool-api.herokuapp.com/api/deezer/search?q=hits')
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error('Errore nel contattare il server')
      }
    })
    .then((music) => {
      renderMusic(music)
    })
    .catch((err) => {
      console.log('Si è verificato un errore', err)
    })
}

getMusic()
