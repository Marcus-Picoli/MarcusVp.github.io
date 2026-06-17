/* ═══════════════════════════════════════════════
   MARCUS BLOG — Componentes Compartilhados
   Tema: Futurista Neon / Preto Vermelho Dourado
   ═══════════════════════════════════════════════ */

(function () {
  const HEADER_HTML = `
<header class="site-header">
  <nav class="nav-inner">
    <a href="index.html" class="nav-brand">
      <span class="nav-brand-icon">MVP</span>
    </a>

    <button id="nav-toggle" class="nav-toggle" aria-label="Menu">☰</button>

    <ul class="nav-links">
      <li><a href="index.html">Início</a></li>
      <li><a href="about.html">Sobre Mim</a></li>
      <li><a href="curriculum.html">Currículo</a></li>
      <li><a href="receitas.html">Receitas</a></li>
      <li><a href="contact.html">Contato</a></li>
    </ul>

    <div class="nav-controls">
      <button id="btn-font-down" class="icon-btnL" title="Diminuir fonte" aria-label="Diminuir fonte">A−</button>
      <button id="btn-font-up"   class="icon-btnL" title="Aumentar fonte" aria-label="Aumentar fonte">A+</button>
      <button id="btn-theme"     class="icon-btn"  title="Alternar tema"  aria-label="Alternar tema">Claro</button>
    </div>
  </nav>
</header>`;

  const FOOTER_HTML = `
<footer class="site-footer">
  <div class="footer-inner">
    <div>
      <span class="footer-brand"></span>
      <p class="footer-desc">Um espaço onde código, ideias e histórias se encontram. Desenvolvedor em formação, curioso por natureza.</p>
    </div>
    <div>
      <p class="footer-heading">Navegação</p>
      <ul class="footer-links">
        <li><a href="index.html">Início</a></li>
        <li><a href="about.html">Sobre Mim</a></li>
        <li><a href="curriculum.html">Currículo</a></li>
        <li><a href="receitas.html">Receitas</a></li>
        <li><a href="contact.html">Contato</a></li>
      </ul>
    </div>
    <div>
      <p class="footer-heading">Destaques</p>
      <ul class="footer-links">
        <li><a href="receitas-mousse.html">Mousse de Maracujá</a></li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2025 Marcus.dev · Forjado com HTML, CSS &amp; JS</p>
    <span class="footer-accent"></span>
  </div>
</footer>`;

  document.addEventListener('DOMContentLoaded', () => {
    const headerPlaceholder = document.getElementById('site-header-placeholder');
    if (headerPlaceholder) headerPlaceholder.outerHTML = HEADER_HTML;

    const footerPlaceholder = document.getElementById('site-footer-placeholder');
    if (footerPlaceholder) footerPlaceholder.outerHTML = FOOTER_HTML;
  });
})();
