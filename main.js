// BWRCI shared navigation and footer injection

const NAV_HTML = `
<nav class="nav" id="nav">
  <div class="nav-inner">
    <a href="index.html" class="nav-brand">
      <span class="nav-brand-abbr">BWRCI</span>
      <span class="nav-brand-full">Better World Regulatory Coalition</span>
    </a>
    <ul class="nav-links" id="nav-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="media.html">Media</a></li>
      <li><a href="press.html">Press</a></li>
      <li><a href="recommend.html">Recommend a Nation</a></li>
      <li><a href="qsafp.html">QSAFP</a></li>
      <li><a href="aeges.html">AEGES</a></li>
      <li><a href="appointments.html" class="nav-cta-btn">Appointments</a></li>
    </ul>
    <button class="nav-hamburger" id="hamburger" aria-label="Toggle menu">
      <span></span><span></span><span></span>
    </button>
  </div>
  <div class="nav-mobile" id="nav-mobile">
    <a href="index.html">Home</a>
    <a href="media.html">Media</a>
    <a href="press.html">Press</a>
    <a href="recommend.html">Recommend a Nation</a>
    <a href="qsafp.html">QSAFP</a>
    <a href="aeges.html">AEGES</a>
    <a href="contact.html">Contact</a>
    <a href="appointments.html" class="nav-cta-btn">Appointments</a>
  </div>
</nav>`;

const FOOTER_HTML = `
<div class="signup-band">
  <div class="container">
    <div class="signup-band-text">
      <h3>Stay Informed</h3>
      <p>Updates on testbed nations, open-core releases, and coalition milestones.</p>
    </div>
    <div>
      <form class="signup-form" action="https://formspree.io/f/xaqjddlp" method="POST">
        <input type="hidden" name="_subject" value="New BWRCI Signup" />
        <div class="signup-form-row">
          <input type="email" name="email" placeholder="your@email.com" required />
          <button type="submit" class="btn btn-gold">Subscribe</button>
        </div>
        <p class="signup-fine">Unsubscribe at any time. No spam.</p>
      </form>
    </div>
  </div>
</div>

<footer class="footer">
  <div class="container">
    <div class="footer-top">
      <div>
        <p class="footer-brand-name">BWRCI</p>
        <p class="footer-brand-full">The Better World Regulatory Coalition Inc.</p>
        <p class="footer-tagline">Because the wealth of nations belongs to the people of each nation, first.</p>
        <div class="footer-address">
          1130 South Canal Street #1365<br/>
          Chicago, Illinois 60607<br/>
          United States<br/>
          <a href="mailto:info@bwrci.org">info@bwrci.org</a><br/>
          <a href="tel:8187131510">818.713.1510</a>
        </div>
      </div>
      <div class="footer-col">
        <h4>Organisation</h4>
        <a href="index.html">Home</a>
        <a href="press.html">Press</a>
        <a href="media.html">Media</a>
        <a href="contact.html">Contact</a>
        <a href="privacy.html">Privacy Policy</a>
      </div>
      <div class="footer-col">
        <h4>Protocols</h4>
        <a href="qsafp.html">QSAFP</a>
        <a href="aeges.html">AEGES</a>
        <a href="recommend.html">Testbed Nations</a>
        <a href="appointments.html">Appointments</a>
      </div>
      <div class="footer-col">
        <h4>Ecosystem</h4>
        <a href="https://pielogic.com" target="_blank">Inclusionism: Finally!</a>
        <a href="http://qsafp.org" target="_blank">QSAFP.org</a>
        <a href="http://getaeges.org" target="_blank">AEGES.org</a>
        <a href="http://aicomsci.org" target="_blank">AiCOMSCI.org</a>
        <a href="https://x.com/bwrci_qsafp" target="_blank">X / Twitter</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© 2025 The Better World Regulatory Coalition Inc. · All Rights Reserved</p>
      <p><a href="privacy.html">Privacy Policy</a></p>
    </div>
  </div>
</footer>`;

// Inject nav + footer
document.addEventListener('DOMContentLoaded', () => {
  // Nav
  const navPlaceholder = document.getElementById('nav-placeholder');
  if (navPlaceholder) navPlaceholder.outerHTML = NAV_HTML;

  // Footer
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) footerPlaceholder.outerHTML = FOOTER_HTML;

  // Re-bind nav interactions after injection
  initNav();
  initForms();
  initReveal();
  setActiveNav();
  initNpcSlideshows();
});

function initNav() {
  const hamburger = document.getElementById('hamburger');
  const navMobile = document.getElementById('nav-mobile');
  if (hamburger && navMobile) {
    hamburger.addEventListener('click', () => navMobile.classList.toggle('open'));
    navMobile.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => navMobile.classList.remove('open'))
    );
  }
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.style.background = window.scrollY > 60
        ? 'rgba(7,9,15,0.99)'
        : 'rgba(7,9,15,0.94)';
    }, { passive: true });
  }
  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
  });
}

function setActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    if (a.getAttribute('href') === page) a.classList.add('active');
  });
}

function initForms() {
  document.querySelectorAll('.signup-form').forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const input = form.querySelector('input[type="email"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        });
        if (res.ok) {
          input.value = '';
          btn.textContent = '✓ Subscribed';
          btn.style.background = '#1abc9c';
          setTimeout(() => {
            btn.textContent = 'Subscribe';
            btn.style.background = '';
            btn.disabled = false;
          }, 4000);
        } else { btn.textContent = 'Retry'; btn.disabled = false; }
      } catch { btn.textContent = 'Retry'; btn.disabled = false; }
    });
  });

  // Generic Formspree contact forms
  document.querySelectorAll('.bwrci-form').forEach(form => {
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      btn.textContent = 'Sending…';
      btn.disabled = true;
      try {
        const res = await fetch(form.action, {
          method: 'POST',
          headers: { 'Accept': 'application/json' },
          body: new FormData(form)
        });
        if (res.ok) {
          form.innerHTML = '<p style="color:var(--teal);font-family:var(--font-mono);font-size:12px;letter-spacing:0.1em">✓ MESSAGE RECEIVED — WE WILL BE IN TOUCH</p>';
        } else { btn.textContent = 'Retry'; btn.disabled = false; }
      } catch { btn.textContent = 'Retry'; btn.disabled = false; }
    });
  });
}

function initReveal() {
  if (!('IntersectionObserver' in window)) return;
  const els = document.querySelectorAll(
    '.protocol-card, .pdf-card, .video-card, .mission-pillar, .about-quote'
  );
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = '1';
        e.target.style.transform = 'translateY(0)';
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  els.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    io.observe(el);
  });
}


function initNpcSlideshows() {
  document.querySelectorAll('.npc-section').forEach(section => {
    const slides = Array.from(section.querySelectorAll('.npc-slide'));
    const dotsWrap = section.querySelector('.npc-dots');
    if (!slides.length || !dotsWrap) return;

    const intervalMs = parseInt(section.dataset.slideInterval || '5000', 10);
    let current = slides.findIndex(slide => slide.classList.contains('is-active'));
    if (current < 0) current = 0;
    let timer = null;

    dotsWrap.innerHTML = '';
    const dots = slides.map((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'npc-dot';
      dot.setAttribute('aria-label', `Show No More NPCs slide ${index + 1}`);
      dot.addEventListener('click', () => {
        showSlide(index);
        restart();
      });
      dotsWrap.appendChild(dot);
      return dot;
    });

    function showSlide(index) {
      slides[current].classList.remove('is-active');
      dots[current].classList.remove('is-active');
      current = index;
      slides[current].classList.add('is-active');
      dots[current].classList.add('is-active');
    }

    function nextSlide() {
      showSlide((current + 1) % slides.length);
    }

    function restart() {
      if (timer) clearInterval(timer);
      timer = setInterval(nextSlide, intervalMs);
    }

    slides.forEach((slide, index) => slide.classList.toggle('is-active', index === current));
    dots.forEach((dot, index) => dot.classList.toggle('is-active', index === current));
    restart();
  });
}
