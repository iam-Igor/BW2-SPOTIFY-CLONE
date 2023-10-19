const fetchDataArtist = function (artistID = 412) {
   fetch("https://striveschool-api.herokuapp.com/api/deezer/artist/" + 412)
      .then((response) => {
         if (!response.ok) {
            throw new Error("ERROR FETCH!");
         }
         return response.json();
      })
      .then((response) => {
         console.log("Fetch went fine!", response);
      })
      .catch((err) => {
         console.log("Error!", err);
      });
};

fetchDataArtist();
