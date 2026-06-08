async function loadActs() {
  const grid = document.getElementById("acts-grid");

  const res = await fetch("/api/acts");
  const acts = await res.json();

  grid.innerHTML = acts
    .map(
      (act) => `
    <article>
      <a href="/acts/${act.slug}" class="card-link">
        <img src="${act.image}" alt="${act.name}" />
        <div class="card-body">
          <h3>${act.name}</h3>
          <p class="tour-name">${act.tourName}</p>
          <div class="tags">
            <span>${act.type}</span>
            <span>${act.genre}</span>
          </div>
          <p class="fan-name">Fandom: <strong>${act.fanName}</strong></p>
        </div>
      </a>
    </article>
  `
    )
    .join("");
}

loadActs();
