let bands = loadBands();

bands.forEach(function (band, index) {
  if (band.id === undefined) {
    band.id = Date.now() + index;
  }
});

const bandForm = document.getElementById("band-form");
const submitButton = document.getElementById("submit-button");
const cancelButton = document.getElementById("cancel-button");
const cardsContainer = document.getElementById("cards-container");
const searchInput = document.getElementById("search-input");

let editingBandId = null;

renderBands(bands);

function getFormData() {
  return {
    name: document.getElementById("band-name").value,
    genre: document.getElementById("band-genre").value,
    foundedYear: document.getElementById("band-year").value,
    city: document.getElementById("band-city").value,
    status: document.getElementById("band-status").value
  };
}

function fillForm(band) {
  document.getElementById("band-name").value = band.name;
  document.getElementById("band-genre").value = band.genre;
  document.getElementById("band-year").value = band.foundedYear;
  document.getElementById("band-city").value = band.city;
  document.getElementById("band-status").value = band.status;
}

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

function saveBand(data) {
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
    return;
  }

  const band = bands.find(function (item) {
    return item.id === editingBandId;
  });

  band.name = data.name.trim();
  band.genre = data.genre.trim();
  band.foundedYear = data.foundedYear.trim();
  band.city = data.city.trim();
  band.status = data.status;
}

function resetForm() {
  editingBandId = null;
  bandForm.reset();
  submitButton.textContent = "Adicionar";
  cancelButton.hidden = true;
  clearErrors();
}

function startEditBand(bandId) {
  const band = bands.find(function (item) {
    return item.id === bandId;
  });
  if (!band) return;

  editingBandId = band.id;
  fillForm(band);
  submitButton.textContent = "Salvar alterações";
  cancelButton.hidden = false;

  bandForm.scrollIntoView({ behavior: "smooth" });
}

function deleteBand(bandId) {
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
}

function renderSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  if (searchTerm === "") {
    renderBands(bands);
    return;
  }

  const filteredBands = bands.filter(function (band) {
    return band.name.toLowerCase().includes(searchTerm);
  });

  renderBands(filteredBands);
}

bandForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const data = getFormData();
  const errors = validateBand(data);

  if (Object.keys(errors).length > 0) {
    clearErrors();
    showErrors(errors);
    return;
  }

  saveBand(data);
  saveBands(bands);
  renderBands(bands);
  resetForm();
});

cardsContainer.addEventListener("click", function (event) {
  const editButton = event.target.closest(".btn-edit");
  if (editButton) {
    startEditBand(Number(editButton.closest(".card").dataset.id));
    return;
  }

  const deleteButton = event.target.closest(".btn-delete");
  if (deleteButton) {
    deleteBand(Number(deleteButton.closest(".card").dataset.id));
  }
});

cancelButton.addEventListener("click", resetForm);

searchInput.addEventListener("input", renderSearch);
