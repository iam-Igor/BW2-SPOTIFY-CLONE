console.log("sono collegato");

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
      })
      .catch((err) => console.log("Fetching issue", err));
};

loadAlbum();
