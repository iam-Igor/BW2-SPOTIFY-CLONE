document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const albumId = urlParams.get('albumId');
    const artistId = urlParams.get('artistId');
  
    if (albumId) {
      // Carica i dettagli dell'album in base all'ID
      fetchAlbumDetails(albumId);
    } else if (artistId) {
      // Carica i dettagli dell'artista in base all'ID
      fetchArtistDetails(artistId);
    }
  
    // Aggiungi un event listener per la funzione di ricerca
    const searchForm = document.getElementById('search-form');
    searchForm.addEventListener('submit', handleSearch);
  });
  
  function fetchAlbumDetails(albumId) {
    const albumDetailsContainer = document.getElementById('album-details');
    
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/${albumId}`)
      .then(response => response.json())
      .then(data => {
        // Visualizza i dettagli dell'album nel container
        albumDetailsContainer.innerHTML = JSON.stringify(data, null, 2);
      })
      .catch(error => console.error('Errore nella richiesta API:', error));
  }
  
  function fetchArtistDetails(artistId) {
    const artistDetailsContainer = document.getElementById('artist-details');
  
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/artist/${artistId}`)
      .then(response => response.json())
      .then(data => {
        // Visualizza i dettagli dell'artista nel container
        artistDetailsContainer.innerHTML = JSON.stringify(data, null, 2);
      })
      .catch(error => console.error('Errore nella richiesta API:', error));
  }
  
  function handleSearch(event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value;
    // Esegui la ricerca
    fetchSearchResults(query);
  }
  
  function fetchSearchResults(query) {
    fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`)
      .then(response => response.json())
      .then(data => {
        // Visualizza i risultati della ricerca
        console.log('Risultati della ricerca:', data);
      })
      .catch(error => console.error('Errore nella richiesta API:', error));
  }
  