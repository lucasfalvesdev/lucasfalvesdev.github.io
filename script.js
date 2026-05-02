// ============================================
//   LUCAS FERNANDES — script.js
// ============================================

// ---------- ESTADO GLOBAL ----------
let currentLang  = localStorage.getItem('lang')  || 'pt';
let currentTheme = localStorage.getItem('theme') || 'dark';

// ---------- TRADUÇÕES ----------
const translations = {
  pt: {
    nav_about:    'Sobre',
    nav_skills:   'Skills',
    nav_projects: 'Projetos',
    nav_contact:  'Contato',

    status:    'Disponível para contratação',
    hero_role: 'Desenvolvedor Backend & Arquiteto de Sistemas',
    btn_cv:    'Baixar CV',
    btn_github:'Ver GitHub →',

    label_summary:  'resumo',
    summary_text:   'Engenheiro de Software com foco em <strong>sistemas escaláveis</strong>, <strong>arquitetura de software</strong> e <strong>computação de alta performance</strong>. Apaixonado por resolver problemas complexos com código limpo e eficiente.',
    stat_years:     'Anos de estudo',
    stat_langs:     'Linguagens',
    stat_curiosity: 'Curiosidade',

    label_projects: 'projetos',
    title_projects: 'Projetos',
    proj1_title:    'Batalha Naval',
    proj1_desc:     'Jogo implementado com coordenadas cartesianas e lógica avançada de proximidade. Arquitetura orientada a objetos com foco em performance.',
    proj2_title:    'Geometria Computacional',
    proj2_desc:     'Análise e manipulação de pontos no plano cartesiano. Algoritmos de geometria computacional para resolução de problemas geométricos complexos.',
    proj_link:      'Ver código →',
    proj_more:      'Mais projetos no GitHub',
    proj_explore:   'Explorar →',

    label_contact:  'contato',
    title_contact:  'Vamos nos conectar',
  },

  en: {
    nav_about:    'About',
    nav_skills:   'Skills',
    nav_projects: 'Projects',
    nav_contact:  'Contact',

    status:    'Available for hire',
    hero_role: 'Backend Developer & Systems Architect',
    btn_cv:    'Download CV',
    btn_github:'View GitHub →',

    label_summary:  'summary',
    summary_text:   'Software Engineer focused on <strong>scalable systems</strong>, <strong>software architecture</strong> and <strong>high-performance computing</strong>. Passionate about solving complex problems with clean and efficient code.',
    stat_years:     'Years of study',
    stat_langs:     'Languages',
    stat_curiosity: 'Curiosity',

    label_projects: 'projects',
    title_projects: 'Projects',
    proj1_title:    'Battleship',
    proj1_desc:     'Game built with Cartesian coordinates and advanced proximity logic. Object-oriented architecture focused on performance.',
    proj2_title:    'Computational Geometry',
    proj2_desc:     'Analysis and manipulation of points on the Cartesian plane. Computational geometry algorithms for solving complex geometric problems.',
    proj_link:      'View code →',
    proj_more:      'More projects on GitHub',
    proj_explore:   'Explore →',

    label_contact:  'contact',
    title_contact:  "Let's Connect",
  }
};

// ---------- APLICAR TRADUÇÕES ----------
function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) {
      el.innerHTML = t[key];
    }
  });

  document.documentElement.lang = lang === 'pt' ? 'pt-br' : 'en';
}

// ---------- TOGGLE IDIOMA ----------
function toggleLang() {
  currentLang = currentLang === 'pt' ? 'en' : 'pt';
  localStorage.setItem('lang', currentLang);

  const label = document.getElementById('langLabel');
  if (label) label.textContent = currentLang === 'pt' ? 'EN' : 'PT';

  // Fade suave ao trocar
  document.body.classList.add('lang-switching');
  setTimeout(() => {
    applyTranslations(currentLang);
    document.body.classList.remove('lang-switching');
  }, 150);
}

// ---------- TOGGLE TEMA ----------
function toggleTheme() {
  currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
  localStorage.setItem('theme', currentTheme);
  applyTheme(currentTheme);
}

function applyTheme(theme) {
  const icon = document.getElementById('themeIcon');
  if (theme === 'light') {
    document.body.classList.add('light');
    if (icon) icon.textContent = '🌙';
  } else {
    document.body.classList.remove('light');
    if (icon) icon.textContent = '☀️';
  }
}

// ---------- SCROLL REVEAL ----------
function initReveal() {
  const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
  );

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ---------- TOPBAR EFEITO SCROLL ----------
function initTopbar() {
  const topbar = document.querySelector('.topbar');
  if (!topbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      topbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
    } else {
      topbar.style.boxShadow = 'none';
    }
  });
}

// ---------- HIGHLIGHT LINK ATIVO ----------
function initActiveLinks() {
  const sections = document.querySelectorAll('section[id], header[id]');
  const links    = document.querySelectorAll('.topbar-links a');

  const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            links.forEach(link => {
              link.classList.remove('active');
              if (link.getAttribute('href') === '#' + entry.target.id) {
                link.classList.add('active');
              }
            });
          }
        });
      },
      { threshold: 0.4 }
  );

  sections.forEach(s => observer.observe(s));
}

// ---------- DOWNLOAD CV ----------
function downloadCV() {
  const link = document.createElement('a');
  link.href     = 'assets/cv-lucas-fernandes.pdf';
  link.download = 'CV_Lucas_Fernandes.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ---------- SCROLL TO TOP ----------
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', () => {
  // Aplica tema salvo
  applyTheme(currentTheme);

  // Aplica idioma salvo e atualiza label do botão
  const label = document.getElementById('langLabel');
  if (label) label.textContent = currentLang === 'pt' ? 'EN' : 'PT';
  applyTranslations(currentLang);

  // Inicia funcionalidades
  initReveal();
  initTopbar();
  initActiveLinks();
});
