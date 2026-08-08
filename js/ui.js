function renderBands(bands) {
  const container = document.getElementById("cards-container");
  container.innerHTML = "";

  for (const band of bands) {
    const card = document.createElement("article");
    card.classList.add("card");

    const name = document.createElement("h3");
    name.classList.add("card-name");
    name.textContent = band.name;

    const genre = document.createElement("p");
    genre.classList.add("card-genre");
    genre.textContent = band.genre;

    const year = document.createElement("p");
    year.classList.add("card-year");
    year.textContent = band.foundedYear;

    const city = document.createElement("p");
    city.classList.add("card-city");
    city.textContent = band.city;

    const status = document.createElement("span");
    status.classList.add("card-status");
    status.textContent = band.status === "ativa" ? "🟢 Ativa" : "🔴 Inativa";

    const actions = document.createElement("div");
    actions.classList.add("card-actions");

    const editButton = document.createElement("button");
    editButton.type = "button";
    editButton.classList.add("btn", "btn-edit");
    editButton.textContent = "Editar";

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.classList.add("btn", "btn-delete");
    deleteButton.textContent = "Excluir";

    actions.append(editButton, deleteButton);

    card.append(name, genre, year, city, status, actions);
    container.appendChild(card);
  }
}
