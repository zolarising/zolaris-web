import './style.css';

// ─────────────────────────────────────────────
// 1. Inyectar Progress Bar y Scroll-To-Top
// ─────────────────────────────────────────────
function injectUXElements() {
    if (!document.getElementById('page-progress')) {
        const bar = document.createElement('div');
        bar.id = 'page-progress';
        document.body.prepend(bar);
    }

    if (!document.getElementById('scroll-top-btn')) {
        const btn = document.createElement('button');
        btn.id = 'scroll-top-btn';
        btn.setAttribute('aria-label', 'Volver al inicio de la página');
        btn.style.cssText = 'position:fixed;bottom:96px;right:24px;z-index:40;width:48px;height:48px;border-radius:9999px;background:#1e293b;border:1px solid #475569;color:#94a3b8;display:flex;align-items:center;justify-content:center;box-shadow:0 10px 25px rgba(0,0,0,0.4);cursor:pointer;';
        btn.innerHTML = `<svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 15l7-7 7 7"/>
        </svg>`;
        btn.addEventListener('mouseover', () => { btn.style.background = '#F7A600'; btn.style.color = '#0B2B46'; btn.style.borderColor = '#F7A600'; });
        btn.addEventListener('mouseout', () => { btn.style.background = '#1e293b'; btn.style.color = '#94a3b8'; btn.style.borderColor = '#475569'; });
        btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
        document.body.appendChild(btn);
    }
}

// ─────────────────────────────────────────────
// 2. Scroll handlers (progress bar + scroll-to-top)
// ─────────────────────────────────────────────
function initScrollHandlers() {
    const progressBar = document.getElementById('page-progress');
    const scrollBtn   = document.getElementById('scroll-top-btn');

    window.addEventListener('scroll', () => {
        const scrollable = document.documentElement.scrollHeight - window.innerHeight;
        const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
        if (progressBar) progressBar.style.width = pct + '%';
        if (scrollBtn) {
            if (window.scrollY > 400) scrollBtn.classList.add('visible');
            else scrollBtn.classList.remove('visible');
        }
    }, { passive: true });
}

// ─────────────────────────────────────────────
// 3. IntersectionObserver para animaciones .reveal
// (zolaris-token.html, nosotros.html, etc.)
// ─────────────────────────────────────────────
function initRevealAnimations() {
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));
}

// ─────────────────────────────────────────────
// 4. Inicializar Contadores Animados
// ─────────────────────────────────────────────
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    if (counters.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const targetValue = parseInt(target.getAttribute('data-target'), 10) || 0;
                let count = 0;
                
                const duration = 2000;
                const frames = 60;
                const totalFrames = Math.round((duration / 1000) * frames);
                const increment = targetValue / totalFrames;
                
                const updateCount = () => {
                    count += increment;
                    if (count < targetValue) {
                        target.innerText = Math.ceil(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        target.innerText = targetValue;
                    }
                };
                
                updateCount();
                observer.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
}

// ─────────────────────────────────────────────
// 5. Inicializar todo al cargar el DOM
// ─────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    injectUXElements();
    initScrollHandlers();
    initRevealAnimations();
    initCounters();
});
