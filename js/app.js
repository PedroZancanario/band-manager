let bands = loadBands();

bands.forEach(function (band, index) {
  if (band.id === undefined) {
    band.id = Date.now() + index;
  }
});

renderBands(bands);

const bandForm = document.getElementById("band-form");
const submitButton = document.getElementById("submit-button");
const cancelButton = document.getElementById("cancel-button");

let editingBandId = null;

function resetForm() {
  editingBandId = null;
  bandForm.reset();
  submitButton.textContent = "Adicionar";
  cancelButton.hidden = true;
}

bandForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("band-name").value;
  const genre = document.getElementById("band-genre").value;
  const foundedYear = document.getElementById("band-year").value;
  const city = document.getElementById("band-city").value;
  const status = document.getElementById("band-status").value;

  if (editingBandId === null) {
    const band = {
      id: Date.now(),
      name: name,
      genre: genre,
      foundedYear: foundedYear,
      city: city,
      status: status
    };

    bands.push(band);
  } else {
    const band = bands.find(function (item) {
      return item.id === editingBandId;
    });

    band.name = name;
    band.genre = genre;
    band.foundedYear = foundedYear;
    band.city = city;
    band.status = status;
  }

  saveBands(bands);

  renderBands(bands);

  resetForm();
});

const cardsContainer = document.getElementById("cards-container");

cardsContainer.addEventListener("click", function (event) {
  const editButton = event.target.closest(".btn-edit");
  if (editButton) {
    const card = editButton.closest(".card");
    const bandId = Number(card.dataset.id);

    const band = bands.find(function (item) {
      return item.id === bandId;
    });
    if (!band) return;

    editingBandId = band.id;

    document.getElementById("band-name").value = band.name;
    document.getElementById("band-genre").value = band.genre;
    document.getElementById("band-year").value = band.foundedYear;
    document.getElementById("band-city").value = band.city;
    document.getElementById("band-status").value = band.status;

    submitButton.textContent = "Salvar alterações";
    cancelButton.hidden = false;

    bandForm.scrollIntoView({ behavior: "smooth" });
    return;
  }

  const deleteButton = event.target.closest(".btn-delete");
  if (!deleteButton) return;

  const card = deleteButton.closest(".card");
  const bandId = Number(card.dataset.id);

  const confirmed = confirm("Tem certeza que deseja excluir esta banda?");
  if (!confirmed) return;

  bands = bands.filter(function (item) {
    return item.id !== bandId;
  });

  if (editingBandId === bandId) {
    resetForm();
  }

  saveBands(bands);

  renderBands(bands);
});

cancelButton.addEventListener("click", resetForm);

const searchInput = document.getElementById("search-input");

searchInput.addEventListener("input", function () {
  const term = searchInput.value.trim().toLowerCase();

  if (term === "") {
    renderBands(bands);
    return;
  }

  const filteredBands = bands.filter(function (band) {
    return band.name.toLowerCase().includes(term);
  });

  renderBands(filteredBands);
});
