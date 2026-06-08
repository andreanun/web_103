import { Router } from "express";
import path from "path";
import { fileURLToPath } from "url";
import { acts } from "../data/acts.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const router = Router();

router.get("/api/acts", (req, res) => {
  res.json(acts);
});

router.get("/acts/:slug", (req, res) => {
  const act = acts.find((a) => a.slug === req.params.slug);

  if (!act) {
    return res
      .status(404)
      .sendFile(path.join(__dirname, "../../client/404.html"));
  }

  res.send(renderDetail(act));
});

function renderDetail(act) {
  const cities = act.usCities.map((c) => `<li>${c}</li>`).join("");

  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${act.name} — K-Pop US Tours 2025</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.min.css" />
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <header class="container">
      <nav>
        <ul>
          <li><strong><a href="/">🎤 K-Pop US Tours 2025</a></strong></li>
        </ul>
        <ul>
          <li><a href="/">← Back to all acts</a></li>
        </ul>
      </nav>
    </header>

    <main class="container">
      <div class="detail-hero">
        <img src="${act.image}" alt="${act.name}" class="detail-img" />
        <div class="detail-meta">
          <h1>${act.name}</h1>
          <p class="tour-name">${act.tourName}</p>
          <div class="tags">
            <span>${act.type}</span>
            <span>${act.genre}</span>
          </div>
        </div>
      </div>

      <div class="detail-grid">
        <section>
          <h2>About</h2>
          <p>${act.description}</p>
          <blockquote>${act.highlight}</blockquote>
        </section>

        <aside>
          <h3>Details</h3>
          <dl>
            <dt>Label</dt>
            <dd>${act.label}</dd>
            <dt>Debut Year</dt>
            <dd>${act.debutYear}</dd>
            <dt>Members</dt>
            <dd>${act.members}</dd>
            <dt>Fandom Name</dt>
            <dd>${act.fanName}</dd>
          </dl>

          <h3>US Tour Cities</h3>
          <ul>${cities}</ul>
        </aside>
      </div>
    </main>

    <footer class="container">
      <p>K-Pop US Tours 2025 — A fan guide to the biggest acts that hit the US this year.</p>
    </footer>
  </body>
</html>`;
}

export default router;
