// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header state on scroll
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Cursor glow effect
const cursorGlow = document.createElement('div');
cursorGlow.className = 'cursor-glow';
document.body.appendChild(cursorGlow);

let mouseX = 0;
let mouseY = 0;
let glowX = 0;
let glowY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor follow
function animateCursor() {
    const speed = 0.1;
    glowX += (mouseX - glowX) * speed;
    glowY += (mouseY - glowY) * speed;

    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';

    requestAnimationFrame(animateCursor);
}
animateCursor();

// Scroll reveal animation with stagger
const revealElements = document.querySelectorAll('.service-card, .about-content, .contact-info, .hero-content');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            // Stagger service cards
            if (entry.target.classList.contains('service-card')) {
                const cards = document.querySelectorAll('.service-card');
                const cardIndex = Array.from(cards).indexOf(entry.target);
                entry.target.style.transitionDelay = `${cardIndex * 0.15}s`;
            }
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
});

// Magnetic effect on buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px) scale(1.05)`;
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0) scale(1)';
    });
});

// Text scramble effect on hero title hover
const heroTitle = document.querySelector('.hero-content h2');
const originalText = heroTitle ? heroTitle.textContent : '';
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&';

let scrambleInterval;

if (heroTitle) {
    heroTitle.addEventListener('mouseenter', () => {
        let iterations = 0;
        clearInterval(scrambleInterval);

        scrambleInterval = setInterval(() => {
            heroTitle.textContent = originalText
                .split('')
                .map((char, index) => {
                    if (index < iterations) {
                        return originalText[index];
                    }
                    if (char === ' ') return ' ';
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');

            iterations += 1/3;

            if (iterations >= originalText.length) {
                clearInterval(scrambleInterval);
                heroTitle.textContent = originalText;
            }
        }, 30);
    });
}

// Tilt effect on service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateX(0)';
    });
});

// Skill tag random highlight
const skillTags = document.querySelectorAll('.skill-tag');
let highlightInterval;

function randomHighlight() {
    skillTags.forEach(tag => tag.classList.remove('highlight'));

    if (skillTags.length > 0) {
        const randomIndex = Math.floor(Math.random() * skillTags.length);
        skillTags[randomIndex].style.borderColor = 'var(--neon)';
        skillTags[randomIndex].style.color = 'var(--neon)';

        setTimeout(() => {
            skillTags[randomIndex].style.borderColor = '';
            skillTags[randomIndex].style.color = '';
        }, 500);
    }
}

// Start random highlight when about section is visible
const aboutSection = document.querySelector('.about');
if (aboutSection) {
    const aboutObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                highlightInterval = setInterval(randomHighlight, 1500);
            } else {
                clearInterval(highlightInterval);
            }
        });
    }, { threshold: 0.3 });

    aboutObserver.observe(aboutSection);
}
