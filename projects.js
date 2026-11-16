/*
 * Projetos exibidos na página. Edite aqui para decidir cada um:
 *   show:  false esconde o projeto sem apagar
 *   type:  "product" | "site" | "system"  (define o grupo na página)
 *   live:  URL do site no ar (opcional)
 *   code:  URL do repositório (só aparece em "product" e "system";
 *          projetos do tipo "site" mostram apenas o link do site)
 *   image: prévia do site (arquivo em assets/, opcional)
 * A ordem da lista é a ordem na página.
 */
window.SITE = {
  email: "luccazovedi@gmail.com",
  // Redes exibidas no contato e no rodapé. Deixe "" para esconder uma delas.
  social: {
    GitHub: "https://github.com/luccazovedi",
    LinkedIn: "https://www.linkedin.com/in/luccazovedi",
    Instagram: "https://www.instagram.com/luccazovedi",
    X: "https://x.com/luccazovedi"
  }
};

window.PROJECTS = [
  {
    show: true,
    type: "product",
    name: "MeuChatFinanceiro",
    year: "2026",
    pt: "Assistente financeiro com IA pelo WhatsApp. O usuário registra gastos por texto, áudio ou foto e acompanha tudo em um dashboard com metas, orçamentos, fluxo de caixa e relatórios.",
    en: "AI finance assistant on WhatsApp. Users log expenses by text, audio or photo and track everything on a dashboard with goals, budgets, cash flow and reports.",
    tags: ["Next.js", "TypeScript", "Supabase", "Stripe", "n8n"],
    live: "https://meuchatfinanceiro.com.br",
    image: "assets/meuchatfinanceiro.jpg"
  },
  {
    show: true,
    type: "site",
    name: "DC Produções & Eventos",
    year: "2026",
    pt: "Site institucional de uma produtora de eventos corporativos, shows e audiovisual. HTML, CSS modular e JavaScript puro, com imagens em WebP e animações de scroll.",
    en: "Corporate site for an events and audiovisual production company. Plain HTML, modular CSS and vanilla JavaScript, with WebP images and scroll animations.",
    tags: ["HTML", "CSS", "JavaScript", "Cloudflare"],
    live: "https://luccazovedi.github.io/dcproducoes/",
    image: "assets/dcproducoes.jpg"
  },
  {
    show: true,
    type: "site",
    name: "Julia Personal",
    year: "2026",
    pt: "Landing page de consultoria de treino e nutrição, focada em performance, SEO e conversão. Componentes Astro, dados estruturados e animações sem bibliotecas externas.",
    en: "Landing page for a training and nutrition coach, built for performance, SEO and conversion. Astro components, structured data and library-free animations.",
    tags: ["Astro", "Tailwind CSS", "SEO"],
    live: "https://juliapersonal.com.br",
    image: "assets/julia-personal.jpg"
  },
  {
    show: true,
    type: "site",
    name: "Dra. Taís Bonilha",
    year: "2026",
    pt: "Redesign conceitual, mobile-first, de um site de dermatologia clínica, com calendário de agendamento interativo inspirado no Cal.com.",
    en: "Mobile-first concept redesign of a dermatology clinic site, with an interactive booking calendar inspired by Cal.com.",
    tags: ["HTML", "CSS", "JavaScript"],
    live: "https://luccazovedi.github.io/dra-tais-bonilha-redesign/",
    image: "assets/dra-tais-bonilha.jpg"
  },
  {
    show: true,
    type: "site",
    name: "Vitor Eletricista",
    year: "2026",
    pt: "Site de serviços elétricos em São Paulo com páginas regionais, SEO local completo (schema LocalBusiness, sitemap) e instalação como PWA.",
    en: "Electrical services site in São Paulo with regional pages, full local SEO (LocalBusiness schema, sitemap) and PWA install.",
    tags: ["Tailwind CSS", "SEO local", "PWA"],
    live: "https://luccazovedi.github.io/Vitor-Eletricista/",
    image: "assets/vitor-eletricista.jpg"
  },
  {
    show: true,
    type: "site",
    name: "Hayashi Sushi",
    year: "2026",
    pt: "Site de página única para um restaurante de culinária japonesa, com visual escuro e tipografia serifada. Apresenta a filosofia da casa, os destaques do menu, horários e reservas pelo Instagram.",
    en: "Single-page site for a Japanese restaurant, with a dark look and serif typography. It presents the house philosophy, menu highlights, opening hours and reservations through Instagram.",
    tags: ["HTML", "CSS", "JavaScript"],
    live: "https://luccazovedi.github.io/Hayashi-Sushi/",
    image: "assets/hayashi-sushi.jpg"
  },
  {
    show: true,
    type: "system",
    name: "Sistema de Controle de Academia",
    year: "2026",
    pt: "Gestão de academia com 4 microsserviços Spring Boot, comunicação REST e Kafka, um PostgreSQL por serviço, app Flutter, CI/CD no GitHub Actions e monitoramento com Prometheus e Grafana.",
    en: "Gym management with 4 Spring Boot microservices, REST and Kafka messaging, one PostgreSQL per service, a Flutter app, GitHub Actions CI/CD and Prometheus + Grafana monitoring.",
    tags: ["Spring Boot", "Kafka", "Flutter", "Docker", "CI/CD"],
    code: "https://github.com/luccazovedi/distributed-app-ci-cd"
  },
  {
    show: true,
    type: "system",
    name: "Diagnóstico de Hardware na Nuvem",
    year: "2025",
    pt: "Sistema especialista para diagnóstico de hardware, com interface Streamlit e backend Flask, hospedado na AWS com EC2 e S3.",
    en: "Expert system for hardware diagnosis, with a Streamlit interface and a Flask backend, hosted on AWS with EC2 and S3.",
    tags: ["Python", "Flask", "Streamlit", "AWS"],
    code: "https://github.com/luccazovedi/hardware-diagnosis-cloud-app"
  },
  {
    show: true,
    type: "system",
    name: "Microsserviços com FastAPI",
    year: "2026",
    pt: "Dois microsserviços de pagamento com comunicação síncrona, usados para simular falhas e timeouts entre serviços em Docker.",
    en: "Two payment microservices with synchronous communication, used to simulate failures and timeouts between services in Docker.",
    tags: ["Python", "FastAPI", "Docker"],
    code: "https://github.com/luccazovedi/Microsservice-FastAPI"
  }
];
