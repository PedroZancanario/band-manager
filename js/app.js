const bands = loadBands();

renderBands(bands);

const bandForm = document.getElementById("band-form");

bandForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("band-name").value;
  const genre = document.getElementById("band-genre").value;
  const foundedYear = document.getElementById("band-year").value;
  const city = document.getElementById("band-city").value;
  const status = document.getElementById("band-status").value;

  const band = {
    name: name,
    genre: genre,
    foundedYear: foundedYear,
    city: city,
    status: status
  };

  bands.push(band);

  saveBands(bands);

  renderBands(bands);

  bandForm.reset();
});
