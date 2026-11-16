(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const SITE = window.SITE || {};
  const PROJECTS = (window.PROJECTS || []).filter((p) => p.show !== false);

  /* ---------- i18n ---------- */
  const T = {
    pt: {
      skip: "Pular para os projetos",
      role: "Full Stack Developer",
      place: "São Paulo, Brasil",
      city: "São Paulo",
      status: "Disponível para projetos",
      "nav.projects": "Projetos", "nav.contact": "Contato",
      "hero.title": "Sistemas web que saem do papel e vão para <em>produção.</em>",
      "projects.more": "Ver tudo no GitHub",
      "about.p1": "Sou desenvolvedor full stack especializado em sistemas e plataformas web escaláveis, de ERPs a produtos SaaS em produção.",
      "about.p2": "Gosto de cuidar do ciclo inteiro: entender o problema, modelar os dados, entregar a interface, colocar no ar e manter funcionando.",
      "about.p3": "Formado em Análise e Desenvolvimento de Sistemas pelo IFSP. Certificações AWS Academy, Cisco e Alura.",
      "about.data": "Dados",
      "cta.title": "Tem um projeto? <em>Vamos conversar.</em>",
      "cta.copy": "Copiar", "cta.copied": "Copiado ✓",
      "g.product": "Produtos", "g.site": "Sites", "g.system": "Sistemas"
    },
    en: {
      skip: "Skip to projects",
      role: "Full Stack Developer",
      place: "São Paulo, Brazil",
      city: "São Paulo",
      status: "Available for projects",
      "nav.projects": "Projects", "nav.contact": "Contact",
      "hero.title": "Web systems that leave the whiteboard and reach <em>production.</em>",
      "projects.more": "See everything on GitHub",
      "about.p1": "I'm a full stack developer specialized in scalable web systems and platforms, from ERPs to SaaS products in production.",
      "about.p2": "I like owning the whole cycle: understanding the problem, modeling the data, shipping the interface, deploying it and keeping it running.",
      "about.p3": "Degree in Systems Analysis and Development from IFSP. AWS Academy, Cisco and Alura certifications.",
      "about.data": "Data",
      "cta.title": "Got a project? <em>Let's talk.</em>",
      "cta.copy": "Copy", "cta.copied": "Copied ✓",
      "g.product": "Products", "g.site": "Websites", "g.system": "Systems"
    }
  };

  let lang = "pt";
  try {
    lang = localStorage.getItem("lang") || ((navigator.language || "pt").toLowerCase().startsWith("pt") ? "pt" : "en");
  } catch (e) { /* storage unavailable */ }
  const t = (k) => T[lang][k] ?? k;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  // Tag name -> Simple Icons slug. The first three tags of a project that have an icon are shown.
  const ICONS = {
    "Spring Boot": "springboot", Kafka: "apachekafka", Flutter: "flutter", Docker: "docker",
    Python: "python", Flask: "flask", Streamlit: "streamlit", AWS: "amazonaws", FastAPI: "fastapi",
    "CI/CD": "githubactions"
  };
  const stackIcons = (p) => (p.tags || []).filter((tag) => ICONS[tag]).slice(0, 3).map((tag) =>
    `<i class="ico" title="${esc(tag)}" style="--ico:url(https://cdn.jsdelivr.net/npm/simple-icons@11.15.0/icons/${ICONS[tag]}.svg)"></i>`).join("");

  // Projects grouped by type, in the order each type first appears in projects.js.
  function renderProjects() {
    const types = [...new Set(PROJECTS.map((p) => p.type))];
    $("#projects").innerHTML = types.map((type) => {
      const items = PROJECTS.filter((p) => p.type === type).map((p) => {
        // Sites link to the live page only; products and systems fall back to the repository.
        const url = p.live || (type !== "site" ? p.code : "");
        const name = url
          ? `<a href="${esc(url)}" target="_blank" rel="noopener">${esc(p.name)}</a>`
          : esc(p.name);
        const thumb = p.image
          ? `<a class="thumb" href="${esc(url)}" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true"><img src="${esc(p.image)}" alt="" loading="lazy" width="718" height="449"></a>`
          // No screenshot: a quiet tile with the main stack icons (or the initials) keeps the rows aligned.
          : `<span class="thumb blank" aria-hidden="true">${stackIcons(p) || esc(p.name.split(/\s+/).filter((w) => /^[A-ZÀ-Ú]/.test(w)).slice(0, 2).map((w) => w[0]).join(""))}</span>`;
        return `<li class="item"${p.image ? ` data-img="${esc(p.image)}"` : ""}>
          <div class="item-body">
            <div class="item-head"><h3 class="item-name">${name}</h3><span class="year">${esc(p.year || "")}</span></div>
            <p>${esc(p[lang] || p.pt || "")}</p>
          </div>${thumb}
        </li>`;
      }).join("");
      return `<div class="group"><p class="label">${t("g." + type)}</p><ul class="items">${items}</ul></div>`;
    }).join("");
  }

  function applyLang() {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    $$("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
    $$("[data-i18n-html]").forEach((el) => (el.innerHTML = t(el.dataset.i18nHtml)));
    $$("#lang [data-lang]").forEach((el) => el.classList.toggle("on", el.dataset.lang === lang));
    renderProjects();
    splitTitle();
    markReveals();
  }

  /* ---------- motion ---------- */
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hover = matchMedia("(hover: hover) and (pointer: fine)").matches;
  let booted = false; // after the first paint, re-rendered content appears without replaying the entrance

  // Wrap each word of the title so it can rise out of its own clipped line.
  function splitTitle() {
    const h = $("h1");
    let i = 0;
    const wrap = (text) => text.split(/(\s+)/).map((w) =>
      !w.trim() ? w : `<span class="w"><span style="--i:${i++}">${esc(w)}</span></span>`).join("");
    h.innerHTML = [...h.childNodes].map((n) => (n.nodeType === 3 ? wrap(n.textContent) : `<em>${wrap(n.textContent)}</em>`)).join("");
  }

  function scramble(el) {
    const final = el.textContent, glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ/_-", steps = 16;
    let f = 0;
    const id = setInterval(() => {
      f++;
      el.textContent = [...final].map((c, i) =>
        c === " " || i < (final.length * f) / steps ? c : glyphs[(Math.random() * glyphs.length) | 0]).join("");
      if (f >= steps) clearInterval(id);
    }, 32);
  }

  const io = "IntersectionObserver" in window && !reduced
    ? new IntersectionObserver((entries) => {
        // Elements entering together are staggered in document order.
        entries.filter((en) => en.isIntersecting).forEach((en, i) => {
          const el = en.target;
          el.style.setProperty("--d", i * 70 + "ms");
          el.classList.add("in");
          if (el.classList.contains("label")) setTimeout(() => scramble(el), i * 70);
          io.unobserve(el);
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -5% 0px" })
    : null;

  function markReveals() {
    $$(".role, .status, .prose p, .label, .item, .more, .stack div, .note, .contact-line, .mail, .social, .footer").forEach((el) => {
      if (el.classList.contains("reveal")) return;
      el.classList.add("reveal");
      if (!io || booted) el.classList.add("in"); else io.observe(el);
    });
    // A timer, not rAF: the title must appear even when the tab loads in the background.
    if (!booted) setTimeout(() => $("h1").classList.add("in"), 60);
    booted = true;
  }

  // Scroll progress line and the pointer-following light on the dot grid.
  const root = document.documentElement;
  const onScroll = () => {
    const max = root.scrollHeight - innerHeight;
    root.style.setProperty("--p", max > 0 ? (scrollY / max).toFixed(4) : 0);
  };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll);
  onScroll();

  if (hover && !reduced) {
    addEventListener("pointermove", (e) => {
      root.style.setProperty("--mx", e.clientX + "px");
      root.style.setProperty("--my", e.clientY + "px");
    }, { passive: true });

    // Large site preview that trails the cursor while a project row is hovered.
    const pv = document.createElement("div");
    pv.className = "preview";
    pv.setAttribute("aria-hidden", "true");
    pv.innerHTML = '<img alt="">';
    document.body.append(pv);
    const img = $("img", pv);
    const pos = { x: 0, y: 0, tx: 0, ty: 0 };
    let raf = 0, shown = false;
    const loop = () => {
      pos.x += (pos.tx - pos.x) * 0.16;
      pos.y += (pos.ty - pos.y) * 0.16;
      pv.style.transform = `translate3d(${pos.x.toFixed(1)}px, ${pos.y.toFixed(1)}px, 0)`;
      raf = shown ? requestAnimationFrame(loop) : 0;
    };
    const place = (e) => {
      const w = pv.offsetWidth, h = pv.offsetHeight;
      pos.tx = Math.min(e.clientX + 24, innerWidth - w - 12);
      pos.ty = Math.max(12, Math.min(e.clientY - h / 2, innerHeight - h - 12));
    };
    const list = $("#projects");
    list.addEventListener("pointermove", (e) => {
      const li = e.target.closest(".item[data-img]");
      if (!li) { shown = false; pv.classList.remove("on"); return; }
      place(e);
      if (!shown) { pos.x = pos.tx; pos.y = pos.ty; shown = true; raf = raf || requestAnimationFrame(loop); }
      if (img.getAttribute("src") !== li.dataset.img) img.src = li.dataset.img;
      pv.classList.add("on");
    });
    list.addEventListener("pointerleave", () => { shown = false; pv.classList.remove("on"); });
  }

  $("#lang").addEventListener("click", () => {
    lang = lang === "pt" ? "en" : "pt";
    try { localStorage.setItem("lang", lang); } catch (e) { /* ignore */ }
    applyLang();
  });

  /* ---------- contact ---------- */
  const email = SITE.email || "";
  $("#mail").href = "mailto:" + email;
  $("#mail").textContent = email;
  $("#copy").addEventListener("click", async () => {
    try { await navigator.clipboard.writeText(email); } catch (err) { return; }
    $("#copy").textContent = t("cta.copied");
    setTimeout(() => ($("#copy").textContent = t("cta.copy")), 1800);
  });
  $("#social").innerHTML = Object.entries(SITE.social || {})
    .filter(([, url]) => url)
    .map(([name, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener me">${esc(name)}</a>`)
    .join("");

  /* ---------- footer ---------- */
  const fmt = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" });
  const tick = () => ($("#clock").textContent = fmt.format(new Date()));
  tick(); setInterval(tick, 15000);
  $("#year").textContent = new Date().getFullYear();

  applyLang();
})();
