document.documentElement.classList.add('js');

// Subtle border under the header once the page is scrolled
const header = document.querySelector('.site-header');

window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// Gentle fade-in as content scrolls into view
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => {
    // Small stagger between siblings
    const siblings = Array.from(el.parentElement.children);
    el.style.transitionDelay = `${siblings.indexOf(el) * 0.08}s`;
    revealObserver.observe(el);
});

// Remember the language the visitor picks, so the root address sends them there next time
document.querySelectorAll('.lang-switch a').forEach(link => {
    link.addEventListener('click', () => {
        try {
            localStorage.setItem('lang', link.dataset.lang);
        } catch (e) {}
    });
});

document.getElementById('year').textContent = new Date().getFullYear();
