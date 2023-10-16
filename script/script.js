const searchForm = document.getElementById("search-form");

searchForm.addEventListener("click", function (e) {
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
    });
});
