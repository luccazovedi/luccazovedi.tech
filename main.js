(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const SITE = window.SITE || {};
  const PROJECTS = (window.PROJECTS || []).filter((p) => p.show !== false);
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- i18n ---------- */
  const T = {
    pt: {
      skip: "Pular para os projetos",
      role: "Full Stack Developer",
      city: "São Paulo",
      "nav.projects": "Projetos", "nav.about": "Sobre", "nav.contact": "Contato",
      "hero.eyebrow": "Disponível para projetos · São Paulo, Brasil",
      "hero.title": "Sistemas web que saem do papel e vão para <em>produção.</em>",
      "hero.lede": "Sou desenvolvedor full stack. Trabalho do requisito à manutenção: ERPs, SaaS e sites para negócios reais.",
      "hero.cta1": "Ver projetos", "hero.cta2": "Falar comigo",
      "projects.label": "01 — Trabalhos selecionados",
      "projects.title": "O que eu <em>construí.</em>",
      "projects.more": "Ver tudo no GitHub",
      "about.label": "02 — Sobre",
      "about.title": "Do requisito à <em>manutenção.</em>",
      "about.p1": "Sou desenvolvedor full stack especializado em sistemas e plataformas web escaláveis, de ERPs a produtos SaaS em produção.",
      "about.p2": "Gosto de cuidar do ciclo inteiro: entender o problema, modelar os dados, entregar a interface, colocar no ar e manter funcionando.",
      "about.p3": "Formado em Análise e Desenvolvimento de Sistemas pelo IFSP. Certificações AWS Academy, Cisco e Alura.",
      "about.data": "Dados",
      "cta.label": "03 — Contato",
      "cta.title": "Tem um projeto?<br><em>Vamos conversar.</em>",
      "cta.copy": "Copiar e-mail", "cta.copied": "Copiado ✓",
      "footer.nav": "Navegação", "footer.social": "Redes", "footer.local": "Local",
      "footer.place": "São Paulo, Brasil", "footer.top": "Voltar ao topo ↑",
      "f.all": "Todos", "f.product": "Produtos", "f.site": "Sites", "f.system": "Sistemas",
      "t.product": "Produto", "t.site": "Site", "t.system": "Sistema",
      live: "Ver site", code: "Código", private: "Código privado"
    },
    en: {
      skip: "Skip to projects",
      role: "Full Stack Developer",
      city: "São Paulo",
      "nav.projects": "Projects", "nav.about": "About", "nav.contact": "Contact",
      "hero.eyebrow": "Available for projects · São Paulo, Brazil",
      "hero.title": "Web systems that leave the whiteboard and reach <em>production.</em>",
      "hero.lede": "I'm a full stack developer. I work from requirements to maintenance: ERPs, SaaS and websites for real businesses.",
      "hero.cta1": "View projects", "hero.cta2": "Get in touch",
      "projects.label": "01 — Selected work",
      "projects.title": "What I've <em>built.</em>",
      "projects.more": "See everything on GitHub",
      "about.label": "02 — About",
      "about.title": "From requirements to <em>maintenance.</em>",
      "about.p1": "I'm a full stack developer specialized in scalable web systems and platforms, from ERPs to SaaS products in production.",
      "about.p2": "I like owning the whole cycle: understanding the problem, modeling the data, shipping the interface, deploying it and keeping it running.",
      "about.p3": "Degree in Systems Analysis and Development from IFSP. AWS Academy, Cisco and Alura certifications.",
      "about.data": "Data",
      "cta.label": "03 — Contact",
      "cta.title": "Got a project?<br><em>Let's talk.</em>",
      "cta.copy": "Copy email", "cta.copied": "Copied ✓",
      "footer.nav": "Navigation", "footer.social": "Social", "footer.local": "Location",
      "footer.place": "São Paulo, Brazil", "footer.top": "Back to top ↑",
      "f.all": "All", "f.product": "Products", "f.site": "Websites", "f.system": "Systems",
      "t.product": "Product", "t.site": "Website", "t.system": "System",
      live: "Visit", code: "Code", private: "Private code"
    }
  };

  let lang = "pt";
  try {
    lang = localStorage.getItem("lang") || ((navigator.language || "pt").toLowerCase().startsWith("pt") ? "pt" : "en");
  } catch (e) { /* storage unavailable */ }
  let filter = "all";
  const t = (k) => T[lang][k] ?? k;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function renderFilters() {
    const types = ["all", ...new Set(PROJECTS.map((p) => p.type))];
    $("#filters").innerHTML = types
      .map((f) => `<button type="button" role="tab" data-f="${f}" aria-selected="${f === filter}">${t("f." + f)}</button>`)
      .join("");
  }

  function renderProjects() {
    $("#projects").innerHTML = PROJECTS.map((p, i) => {
      const links = [
        p.live ? `<a href="${esc(p.live)}" target="_blank" rel="noopener">${t("live")} ↗</a>` : "",
        p.code ? `<a href="${esc(p.code)}" target="_blank" rel="noopener">${t("code")} ↗</a>` : "",
        !p.live && !p.code ? `<span class="private">${t("private")}</span>` : ""
      ].join("");
      return `<li class="project reveal${filter !== "all" && p.type !== filter ? " hide" : ""}" data-type="${p.type}">
        <span class="p-num">${String(i + 1).padStart(2, "0")}</span>
        <div class="p-body">
          <h3 class="p-name">${esc(p.name)}</h3>
          <p class="p-meta">${t("t." + p.type)} · ${esc(p.year || "")}</p>
        </div>
        <div class="p-body">
          <p class="p-desc">${esc(p[lang] || p.pt || "")}</p>
          <div class="tags">${(p.tags || []).map((x) => `<span>${esc(x)}</span>`).join("")}</div>
        </div>
        <div class="p-links">${links}</div>
      </li>`;
    }).join("");
    observe();
  }

  function applyLang() {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    $$("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
    $$("[data-i18n-html]").forEach((el) => (el.innerHTML = t(el.dataset.i18nHtml)));
    $$("#lang [data-lang]").forEach((el) => el.classList.toggle("on", el.dataset.lang === lang));
    renderFilters();
    renderProjects();
  }

  $("#lang").addEventListener("click", () => {
    lang = lang === "pt" ? "en" : "pt";
    try { localStorage.setItem("lang", lang); } catch (e) { /* ignore */ }
    applyLang();
  });

  $("#filters").addEventListener("click", (e) => {
    const b = e.target.closest("button[data-f]");
    if (!b) return;
    filter = b.dataset.f;
    $$("#filters button").forEach((x) => x.setAttribute("aria-selected", x === b));
    $$(".project").forEach((li) => li.classList.toggle("hide", filter !== "all" && li.dataset.type !== filter));
  });

  /* ---------- reveal on scroll ---------- */
  const io = "IntersectionObserver" in window && !reduced
    ? new IntersectionObserver((entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" })
    : null;
  function observe() {
    $$(".reveal:not(.in)").forEach((el, i) => {
      if (!io) return el.classList.add("in");
      if (el.closest(".hero-inner")) {
        // Above the fold: animate in on load, without waiting for the observer.
        el.style.setProperty("--d", i * 90 + "ms");
        return setTimeout(() => el.classList.add("in"), 60);
      }
      io.observe(el);
    });
  }

  /* ---------- small bits ---------- */
  const stack = ["Laravel", "PHP", "Node.js", "TypeScript", "React", "Next.js", "Astro", "Tailwind CSS", "PostgreSQL", "MySQL", "Supabase", "Docker", "GitHub Actions", "n8n", "AWS"];
  $("#marquee").innerHTML = [...stack, ...stack].map((s) => `<span>${s}</span>`).join("");

  const fmt = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" });
  const tick = () => { const v = fmt.format(new Date()); $("#clock").textContent = v; $("#clock2").textContent = v + " BRT"; };
  tick(); setInterval(tick, 15000);
  $("#year").textContent = new Date().getFullYear();

  const email = SITE.email || "";
  $("#mail").href = "mailto:" + email;
  $("#mail-text").textContent = email;
  $("#copy").addEventListener("click", async (e) => {
    try { await navigator.clipboard.writeText(email); } catch (err) { return; }
    e.currentTarget.textContent = t("cta.copied");
    setTimeout(() => ($("#copy").textContent = t("cta.copy")), 1800);
  });
  if (SITE.linkedin) $("#social-extra").innerHTML = `<a href="${esc(SITE.linkedin)}" target="_blank" rel="noopener">LinkedIn ↗</a>`;
  $("#social-extra").insertAdjacentHTML("beforeend", `<a href="mailto:${esc(email)}">E-mail ↗</a>`);

  applyLang();

  /* ---------- hero shader: flowing noise rendered as a dot matrix ---------- */
  const canvas = $("#shader");
  const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
  if (!gl) { canvas.style.background = "radial-gradient(60% 60% at 75% 40%, rgba(212,255,79,.14), transparent)"; return; }

  const vs = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
  const fs = `
precision highp float;
uniform vec2 r; uniform float t; uniform vec2 m;
float h(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float a=.5,v=0.;for(int i=0;i<5;i++){v+=a*n(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}
void main(){
  float cell=max(7.,r.x/190.);
  vec2 g=floor(gl_FragCoord.xy/cell)*cell+cell*.5;
  vec2 uv=(g-.5*r)/r.y;
  vec2 q=uv*1.5+vec2(t*.03,-t*.02);
  vec2 w=vec2(fbm(q+vec2(0.,t*.05)),fbm(q+vec2(5.2,1.3)-t*.04));
  float f=fbm(q+2.2*w+(m-.5)*.35);
  f=smoothstep(.3,.74,f);
  f*=smoothstep(-.9,.7,uv.x+.2);
  float d=length(gl_FragCoord.xy-g)/cell;
  float dotm=1.-smoothstep(f*.5-.06,f*.5,d);
  vec3 bg=vec3(.039,.039,.043);
  vec3 ac=mix(vec3(.93,.93,.92),vec3(.83,1.,.31),smoothstep(.25,.9,f));
  gl_FragColor=vec4(mix(bg,ac,dotm*(.2+f*.8)),1.);
}`;
  const sh = (type, src) => { const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; };
  const prog = gl.createProgram();
  gl.attachShader(prog, sh(gl.VERTEX_SHADER, vs));
  gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const uR = gl.getUniformLocation(prog, "r"), uT = gl.getUniformLocation(prog, "t"), uM = gl.getUniformLocation(prog, "m");

  const mouse = [0.5, 0.5], target = [0.5, 0.5];
  addEventListener("pointermove", (e) => { target[0] = e.clientX / innerWidth; target[1] = 1 - e.clientY / innerHeight; }, { passive: true });

  function resize() {
    const dpr = Math.min(devicePixelRatio || 1, 1.5);
    canvas.width = Math.round(canvas.clientWidth * dpr);
    canvas.height = Math.round(canvas.clientHeight * dpr);
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  addEventListener("resize", resize);
  resize();

  let visible = true, raf = 0;
  const start = performance.now();
  function frame(now) {
    mouse[0] += (target[0] - mouse[0]) * 0.04;
    mouse[1] += (target[1] - mouse[1]) * 0.04;
    gl.uniform2f(uR, canvas.width, canvas.height);
    gl.uniform1f(uT, (now - start) / 1000);
    gl.uniform2f(uM, mouse[0], mouse[1]);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (visible && !reduced) raf = requestAnimationFrame(frame);
  }
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(([en]) => {
      visible = en.isIntersecting && !document.hidden;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(frame);
    }).observe(canvas);
  } else {
    raf = requestAnimationFrame(frame);
  }
  document.addEventListener("visibilitychange", () => {
    cancelAnimationFrame(raf);
    if (!document.hidden && visible) raf = requestAnimationFrame(frame);
  });
  if (reduced) frame(start + 8000);
})();
