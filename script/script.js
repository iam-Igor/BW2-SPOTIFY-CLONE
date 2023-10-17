
      const searchButton = document.getElementById("searchButton");
      const searchInput = document.getElementById("searchInput");
      const searchResults = document.getElementById("searchResults");

      searchButton.addEventListener("click", async () => {
        const searchTerm = searchInput.value;
        if (searchTerm) {
          try {
            const apiUrl = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${searchTerm}`;
            const response = await fetch(apiUrl);
            const data = await response.json();
            console.log("Data from API:", data);

            if (data && data.data) {
              displaySearchResults(data.data);
            }
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        }
      });

      function displaySearchResults(results) {
        const resultsContainer = document.getElementById("searchResults");
        resultsContainer.innerHTML = "";
        results.forEach((result) => {
          const div = document.createElement("div");
          div.classList.add("col-md-4", "mb-3", "text-white");

          const div1 = document.createElement("div");
          div.classList.add("col-md-4", "mb-3");

          const img = document.createElement("img");
          img.src = result.album.cover_medium;
          img.classList.add("img-fluid", "rounded");

          const title = document.createElement("h4");
          title.textContent = result.title;

          const name = document.createElement("h4");
          name.innerHTML = `<p style="font-size: 14px;">${result.artist.name}</p>`;

          const duration = document.createElement("p");
          const durationInSeconds = result.duration;
          const minutes = Math.floor(durationInSeconds / 60);
          const seconds = durationInSeconds % 60;
          duration.textContent = `Durata: ${minutes}m ${seconds}s`;

          div.appendChild(img);
          div.appendChild(title);
          div.appendChild(name);
          div.appendChild(duration);

          resultsContainer.appendChild(div);
        });
      }
    