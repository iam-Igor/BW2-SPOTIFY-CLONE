fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=hits")
  .then((res) => {
    if (res.ok) {
      return res.json();
      console.log(res);
    } else {
      throw new Error("error");
    }
  })
  .then((detail) => {
    console.log(detail);
  });
