// SEZIONE 1

const renderMusic = function (arrayOfMusic) {
  const row = document.getElementById('row-1')
  arrayOfMusic.forEach((music) => {
    const newCol = document.createElement('div')
    newCol.classList.add('col')
    newCol.innerHTML = `<div class="card">
        <img src="..." class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">titolo</h5>
          <p class="card-text">artista</p>
          <p class="card-text">Scolta il nuovo singolo di </p>
          <a href="#" class="btn btn-primary">Play</a>
          <a href="#" class="btn btn-primary">Salva</a>
          <i class="bi bi-three-dots"></i>
        </div>
      </div>`
    row.appendChild(newCol)
  })
}

const getMusic = function () {
  fetch('https://striveschool-api.herokuapp.com/api/deezer/')
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error('Errore nel contattare il server')
      }
    })
    .catch((err) => {
      console.log('Si è verificato un errore', err)
    })
}

getMusic()
