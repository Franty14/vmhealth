// Año dinámico
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Menú hamburguesa
const burger = document.querySelector('.burger');
const menu = document.querySelector('.menu');
if (burger && menu) {
    burger.addEventListener('click', () => {
        const open = getComputedStyle(menu).display !== 'none';
        menu.style.display = open ? 'none' : 'flex';
        menu.style.flexDirection = 'column';
        menu.style.gap = '8px';
        burger.setAttribute('aria-expanded', String(!open));
    });
    menu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => { if (window.innerWidth < 761) menu.style.display = 'none'; });
    });
}

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Tabs lógica (pilares)
const tabs = document.querySelectorAll('.tab');
const indicator = document.querySelector('.tab-indicator');
const panels = {
    enfoque: document.getElementById('panel-enfoque'),
    mision: document.getElementById('panel-mision'),
    vision: document.getElementById('panel-vision'),
    lema: document.getElementById('panel-lema')
};

function activateTab(tab) {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    // Mostrar panel
    Object.values(panels).forEach(p => p.classList.remove('active'));
    const id = tab.dataset.tab;
    const panel = panels[id];
    if (panel) panel.classList.add('active');

    // Mover indicador (desktop)
    const rect = tab.getBoundingClientRect();
    const parent = tab.parentElement.getBoundingClientRect();
    const ratio = rect.width / parent.width;
    const left = (rect.left - parent.left) / parent.width;
    if (window.innerWidth > 840) {
        indicator.style.width = `${ratio * 100}%`;
        indicator.style.left = `${left * 100}%`;
        indicator.style.top = '50%';
        indicator.style.height = '44px';
    } else {
        // Mobile: indicador abajo, ocupa 100%
        indicator.style.left = '0';
        indicator.style.width = '100%';
        indicator.style.top = 'auto';
        indicator.style.bottom = '0';
    }
}

// Inicializar tabs
if (tabs.length) {
    activateTab(document.querySelector('.tab.active') || tabs[0]);
    tabs.forEach(t => t.addEventListener('click', () => activateTab(t)));
    window.addEventListener('resize', () => {
        const current = document.querySelector('.tab.active') || tabs[0];
        activateTab(current);
    });
}

// Botón enviar (demo)
const btn = document.getElementById('btnEnviar');
if (btn) {
    btn.addEventListener('click', () => {
        btn.disabled = true;
        const original = btn.textContent;
        btn.textContent = 'Enviado ✔';
        setTimeout(() => {
            btn.disabled = false;
            btn.textContent = original;
        }, 1500);
    });
}

// Pequeño “magnet” en CTA
document.querySelectorAll('.magnet').forEach(btn => {
    let raf = null;
    btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        if (!raf) {
            raf = requestAnimationFrame(() => {
                btn.style.transform = `translate(${x * 0.06}px, ${y * 0.06}px)`;
                raf = null;
            });
        }
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = 'translate(0,0)'; });
});

// Scroll suave para anclas
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const id = a.getAttribute('href').slice(1);
        const t = document.getElementById(id);
        if (t) {
            e.preventDefault();
            t.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
