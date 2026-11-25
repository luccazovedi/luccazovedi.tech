(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const SITE = window.SITE || {};
  const PROJECTS = (window.PROJECTS || []).filter((p) => p.show !== false);
  const { esc, ARROW } = window.Render;

  /* ---------- i18n ---------- */
  const T = {
    pt: {
      skip: "Pular para os trabalhos",
      city: "São Paulo",
      status: "Disponível para novos projetos",
      "nav.work": "Trabalhos", "nav.process": "Como trabalho", "nav.contact": "Contato",
      "hero.title": "Sistemas web que saem do papel e vão para produção.",
      "hero.lead": "Sou Lucca Zovedi, desenvolvedor full stack em São Paulo. Construo sistemas web, produtos SaaS e sites para negócios, do requisito à manutenção.",
      "hero.cta": "Falar sobre um projeto", "hero.work": "Ver trabalhos",
      "f.product": "Produtos SaaS", "f.product.d": "Do MVP à cobrança recorrente: autenticação, painel, integrações e pagamentos.",
      "f.site": "Sites para negócios", "f.site.d": "Rápidos, bem posicionados no Google e feitos para converter visita em contato.",
      "f.system": "Sistemas", "f.system.d": "ERPs, APIs e microsserviços com dados bem modelados e deploy automatizado.",
      "projects.more": "Ver todos os repositórios no GitHub",
      "process.lead": "Cuido do ciclo inteiro, então não existe o momento em que o projeto passa de mão e se perde.",
      s1: "Entender o problema", "s1.d": "O que precisa mudar no negócio e como saber se mudou.",
      s2: "Modelar os dados", "s2.d": "Entidades, regras e banco definidos antes da primeira tela.",
      s3: "Entregar a interface", "s3.d": "Telas rápidas, acessíveis e fáceis de usar no celular.",
      s4: "Colocar no ar", "s4.d": "Domínio, deploy, CI/CD e monitoramento configurados.",
      s5: "Manter funcionando", "s5.d": "Correções e melhorias depois da entrega, sem sumir.",
      stack: "Ferramentas", "about.data": "Dados",
      "about.p3": "Formado em Análise e Desenvolvimento de Sistemas pelo IFSP. Certificações AWS Academy, Cisco e Alura.",
      "cta.title": "Tem um projeto? Vamos conversar.",
      "cta.lead": "Conte o que você precisa. Respondo com os próximos passos e uma estimativa.",
      "cta.copy": "Copiar", "cta.copied": "Copiado", "cta.copyfail": "Não deu para copiar. Selecione o endereço.",
      "c.kind": "Tipo de projeto", "c.site": "Site", "c.system": "Sistema web", "c.product": "Produto SaaS", "c.other": "Outro",
      "c.msg": "Sobre o projeto", "c.ph": "O que você quer construir, para quem e até quando.",
      "c.send": "Escrever e-mail", "c.hint": "Abre no seu app de e-mail, já preenchido.",
      "c.subject": "Projeto", "c.hello": "Olá, Lucca! Vi seu site e queria conversar sobre",
      top: "Voltar ao topo",
      "g.product": "Produtos", "g.site": "Sites", "g.system": "Sistemas"
    },
    en: {
      skip: "Skip to work",
      city: "São Paulo",
      status: "Available for new projects",
      "nav.work": "Work", "nav.process": "Process", "nav.contact": "Contact",
      "hero.title": "Web systems that leave the whiteboard and reach production.",
      "hero.lead": "I'm Lucca Zovedi, a full stack developer in São Paulo. I build web systems, SaaS products and business websites, from requirements to maintenance.",
      "hero.cta": "Talk about a project", "hero.work": "See the work",
      "f.product": "SaaS products", "f.product.d": "From MVP to recurring billing: auth, dashboard, integrations and payments.",
      "f.site": "Business websites", "f.site.d": "Fast, well ranked on Google and built to turn visits into leads.",
      "f.system": "Systems", "f.system.d": "ERPs, APIs and microservices with well-modeled data and automated deploys.",
      "projects.more": "See every repository on GitHub",
      "process.lead": "I own the whole cycle, so there is no handoff where the project gets lost.",
      s1: "Understand the problem", "s1.d": "What has to change in the business and how to tell it did.",
      s2: "Model the data", "s2.d": "Entities, rules and database settled before the first screen.",
      s3: "Ship the interface", "s3.d": "Fast, accessible screens that work well on a phone.",
      s4: "Put it live", "s4.d": "Domain, deploy, CI/CD and monitoring set up.",
      s5: "Keep it running", "s5.d": "Fixes and improvements after launch, without disappearing.",
      stack: "Tools", "about.data": "Data",
      "about.p3": "Degree in Systems Analysis and Development from IFSP. AWS Academy, Cisco and Alura certifications.",
      "cta.title": "Got a project? Let's talk.",
      "cta.lead": "Tell me what you need. I'll reply with next steps and an estimate.",
      "cta.copy": "Copy", "cta.copied": "Copied", "cta.copyfail": "Couldn't copy. Select the address instead.",
      "c.kind": "Project type", "c.site": "Website", "c.system": "Web system", "c.product": "SaaS product", "c.other": "Other",
      "c.msg": "About the project", "c.ph": "What you want to build, for whom and by when.",
      "c.send": "Write email", "c.hint": "Opens your email app, already filled in.",
      "c.subject": "Project", "c.hello": "Hi Lucca! I saw your site and wanted to talk about",
      top: "Back to top",
      "g.product": "Products", "g.site": "Websites", "g.system": "Systems"
    }
  };

  let lang = "pt";
  try {
    lang = localStorage.getItem("lang") || ((navigator.language || "pt").toLowerCase().startsWith("pt") ? "pt" : "en");
  } catch (e) { /* storage unavailable */ }
  if (!T[lang]) lang = "pt";
  const t = (k) => T[lang][k] ?? k;

  function applyLang() {
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    $$("[data-i18n]").forEach((el) => (el.textContent = t(el.dataset.i18n)));
    $$("[data-i18n-ph]").forEach((el) => (el.placeholder = t(el.dataset.i18nPh)));
    $$("#lang [data-lang]").forEach((el) => el.classList.toggle("on", el.dataset.lang === lang));
    $("#projects").innerHTML = window.Render.projects(PROJECTS, lang, t);
  }

  $("#lang").addEventListener("click", () => {
    lang = lang === "pt" ? "en" : "pt";
    try { localStorage.setItem("lang", lang); } catch (e) { /* ignore */ }
    applyLang();
  });

  /* ---------- contact ---------- */
  const email = SITE.email || "";
  const mail = $("#mail");
  mail.href = "mailto:" + email;
  mail.textContent = email;

  const copy = $("#copy"), status = $("#copy-status");
  let copyTimer = 0;
  copy.addEventListener("click", async () => {
    let ok = true;
    try { await navigator.clipboard.writeText(email); } catch (err) { ok = false; }
    copy.textContent = ok ? t("cta.copied") : t("cta.copy");
    copy.classList.toggle("done", ok);
    status.textContent = ok ? t("cta.copied") : t("cta.copyfail");
    if (!ok) getSelection().selectAllChildren(mail);
    clearTimeout(copyTimer);
    copyTimer = setTimeout(() => { copy.textContent = t("cta.copy"); copy.classList.remove("done"); }, 1800);
  });

  $("#social").innerHTML = Object.entries(SITE.social || {})
    .filter(([, url]) => url)
    .map(([name, url]) => `<a class="link" href="${esc(url)}" target="_blank" rel="noopener me">${esc(name)}${ARROW}</a>`)
    .join("");

  // The composer only builds a mailto link: nothing is sent from the page.
  $("#composer").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const kind = form.querySelector("input[name=kind]:checked");
    const label = kind ? $(`span`, kind.parentElement).textContent : "";
    const msg = form.msg.value.trim();
    const subject = `${t("c.subject")}: ${label}`;
    const body = `${t("c.hello")} ${label.toLowerCase()}.\n\n${msg}`;
    location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });

  /* ---------- footer ---------- */
  const fmt = new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" });
  const clock = $("#clock");
  const tick = () => { const d = new Date(); clock.textContent = fmt.format(d); clock.dateTime = d.toISOString(); };
  tick(); setInterval(tick, 15000);
  $("#year").textContent = new Date().getFullYear();

  applyLang();
})();
