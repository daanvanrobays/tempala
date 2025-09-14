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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe service cards for animation
document.querySelectorAll('.service-card').forEach(card => {
    observer.observe(card);
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(30, 58, 138, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.backgroundColor = '#1e3a8a';
        header.style.backdropFilter = 'none';
    }
});

window.addEventListener('load', () => {
    // Add particle effect to hero section
    createParticles();

});

// Create floating particles for adventure feel
function createParticles() {
    const hero = document.querySelector('.hero');
    for (let i = 0; i < 500; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            pointer-events: none;
            animation: float-${i % 3} ${3 + Math.random() * 2}s infinite ease-in-out;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        hero.appendChild(particle);
    }
}

// Add particle animation keyframes
const particleStyles = document.createElement('style');
particleStyles.textContent = `
    @keyframes float-0 {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }
    @keyframes float-1 {
        0%, 100% { transform: translateX(0px) rotate(0deg); }
        50% { transform: translateX(20px) rotate(180deg); }
    }
    @keyframes float-2 {
        0%, 100% { transform: translate(0px, 0px) rotate(0deg); }
        50% { transform: translate(15px, -15px) rotate(180deg); }
    }
`;
document.head.appendChild(particleStyles);

// Skill tags hover effect
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
        this.style.transition = 'transform 0.3s ease';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Active navigation link highlighting and services heading color change
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

    // Change services heading color based on scroll height
    const servicesHeading = document.querySelector('.services h2');
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (window.scrollY / documentHeight) * 100;

    if (scrollPercent > 24) {
        servicesHeading.style.color = '#ffffff';
    } else {
        servicesHeading.style.color = '#2d5a3d';
    }
});

// Enhanced parallax effect for hero section with adventure elements
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        // Add rotation effect for more dynamic feel
        const rotation = scrolled * 0.02;
        hero.style.filter = `hue-rotate(${rotation}deg)`;
    }
    
    // Add floating animation to service icons
    const serviceIcons = document.querySelectorAll('.service-icon');
    serviceIcons.forEach((icon, index) => {
        const offset = Math.sin(Date.now() * 0.001 + index) * 5;
        icon.style.transform = `translateY(${offset}px) rotate(${offset * 0.5}deg)`;
    });
});

// Form input focus effects
document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', function() {
        if (this.value === '') {
            this.parentElement.classList.remove('focused');
        }
    });
});

// Add CSS for form focus effects
const formStyle = document.createElement('style');
formStyle.textContent = `
    .form-group.focused label {
        color: #3b82f6;
        font-weight: 600;
    }
`;
document.head.appendChild(formStyle);