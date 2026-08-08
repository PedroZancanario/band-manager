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

function validateBand(data) {
  const errors = {};

  if (data.name.trim() === "") {
    errors.name = "Band name is required.";
  }

  if (data.genre.trim() === "") {
    errors.genre = "Genre is required.";
  }

  if (data.city.trim() === "") {
    errors.city = "City is required.";
  }

  const year = Number(data.foundedYear);
  if (data.foundedYear.trim() === "" || Number.isNaN(year)) {
    errors.foundedYear = "Founded year must be a valid year.";
  } else if (year < 1900 || year > 2100) {
    errors.foundedYear = "Founded year must be between 1900 and 2100.";
  }

  if (data.status !== "ativa" && data.status !== "inativa") {
    errors.status = "Status must be selected.";
  }

  return errors;
}

function resetForm() {
  editingBandId = null;
  bandForm.reset();
  submitButton.textContent = "Adicionar";
  cancelButton.hidden = true;
  clearErrors();
}

bandForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const data = {
    name: document.getElementById("band-name").value,
    genre: document.getElementById("band-genre").value,
    foundedYear: document.getElementById("band-year").value,
    city: document.getElementById("band-city").value,
    status: document.getElementById("band-status").value
  };

  const errors = validateBand(data);

  if (Object.keys(errors).length > 0) {
    clearErrors();
    showErrors(errors);
    return;
  }

  if (editingBandId === null) {
    const band = {
      id: Date.now(),
      name: data.name.trim(),
      genre: data.genre.trim(),
      foundedYear: data.foundedYear.trim(),
      city: data.city.trim(),
      status: data.status
    };

    bands.push(band);
  } else {
    const band = bands.find(function (item) {
      return item.id === editingBandId;
    });

    band.name = data.name.trim();
    band.genre = data.genre.trim();
    band.foundedYear = data.foundedYear.trim();
    band.city = data.city.trim();
    band.status = data.status;
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
