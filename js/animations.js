// ========================
// GSAP ANIMATIONS
// ========================

const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Register ScrollTrigger plugin
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// ========================
// PRELOADER
// ========================
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1200);
    }
});

// ========================
// SCROLL INDICATOR FADE
// ========================
function initScrollIndicatorFade() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (!scrollIndicator) return;

    let hasFaded = false;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100 && !hasFaded) {
            scrollIndicator.classList.add('fade-out');
            hasFaded = true;
        } else if (window.scrollY <= 100 && hasFaded) {
            scrollIndicator.classList.remove('fade-out');
            hasFaded = false;
        }
    }, { passive: true });
}

// ========================
// HERO ANIMATIONS
// ========================
function heroAnimations() {
    if (typeof gsap === 'undefined') return;

    const hero = document.querySelector('.hero');
    if (!hero) return;

    if (prefersReducedMotion) {
        gsap.set('.hero-title, .hero-subtitle, .hero-cta .btn-primary, .hero-cta .btn-secondary, .stat-item, .scroll-indicator, .hero-badge', { opacity: 1, y: 0, scale: 1 });
        return;
    }

    const lines = document.querySelectorAll('.hero-title .line-1, .hero-title .line-2');
    lines.forEach(line => {
        const inner = line.querySelector('.text-gradient, .text-gradient-secondary');
        if (!inner) return;
        const words = inner.textContent.split(' ');
        inner.innerHTML = words.map(w => `<span class="word-wrap"><span class="word">${w}</span></span>`).join(' ');
    });

    gsap.set('.hero-title .word-wrap', { overflow: 'hidden', display: 'inline-block' });

    gsap.from('.hero-title .word', {
        opacity: 0,
        y: 60,
        rotateX: 45,
        stagger: 0.06,
        duration: 0.9,
        ease: 'power4.out',
        delay: 0.4
    });

    gsap.from('.hero-badge', {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        delay: 0.1,
        ease: 'back.out(1.7)'
    });

    gsap.from('.hero-subtitle', {
        opacity: 0,
        y: 40,
        duration: 1,
        delay: 1.1,
        ease: 'power3.out'
    });

    gsap.from('.hero-cta .btn-primary, .hero-cta .btn-secondary', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        delay: 1.4,
        ease: 'power3.out'
    });

    gsap.from('.stat-item', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.12,
        delay: 1.7,
        ease: 'power3.out'
    });

    gsap.from('.scroll-indicator', {
        opacity: 0,
        y: 20,
        duration: 1,
        delay: 1.9,
        ease: 'power3.out'
    });
}

// ========================
// PARTICLES (Three.js)
// ========================
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas || typeof THREE === 'undefined') return;
    if (prefersReducedMotion) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    canvas.appendChild(renderer.domElement);

    const isSmallScreen = window.innerWidth < 768;
    const count = isSmallScreen ? 900 : 2000;

    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 10;
        colors[i] = Math.random() * 0.5 + 0.5;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particlesMaterial = new THREE.PointsMaterial({
        size: isSmallScreen ? 0.025 : 0.03,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
        vertexColors: true
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 3;

    let mouseX = 0;
    let mouseY = 0;
    let smoothX = 0;
    let smoothY = 0;

    function updatePointer(clientX, clientY) {
        mouseX = (clientX / window.innerWidth - 0.5) * 2;
        mouseY = (clientY / window.innerHeight - 0.5) * 2;
    }

    document.addEventListener('mousemove', (e) => updatePointer(e.clientX, e.clientY));
    document.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches[0]) updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });

    let rafId;
    function animateParticles() {
        rafId = requestAnimationFrame(animateParticles);

        particlesMesh.rotation.x += 0.0003;
        particlesMesh.rotation.y += 0.0005;

        smoothX += (mouseX - smoothX) * 0.03;
        smoothY += (mouseY - smoothY) * 0.03;

        particlesMesh.rotation.x += (smoothY * 0.02 - particlesMesh.rotation.x) * 0.02;
        particlesMesh.rotation.y += (smoothX * 0.02 - particlesMesh.rotation.y) * 0.02;

        renderer.render(scene, camera);
    }
    animateParticles();

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const width = canvas.clientWidth || window.innerWidth;
            const height = canvas.clientHeight || window.innerHeight;
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
        }, 150);
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(rafId);
        } else {
            animateParticles();
        }
    });
}

// ========================
// ABOUT SECTION ANIMATIONS
// ========================
function aboutAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || prefersReducedMotion) return;

    gsap.from('.profile-card', {
        scrollTrigger: {
            trigger: '.about-visual',
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -50,
        duration: 1,
        ease: 'power3.out'
    });

    gsap.from('.about-text .section-badge', {
        scrollTrigger: {
            trigger: '.about-text',
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power3.out'
    });

    gsap.from('.about-text .section-title', {
        scrollTrigger: {
            trigger: '.about-text',
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.15,
        ease: 'power3.out'
    });

    gsap.from('.about-description', {
        scrollTrigger: {
            trigger: '.about-text',
            start: 'top 85%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.25,
        ease: 'power3.out'
    });

    gsap.from('.detail-item', {
        scrollTrigger: {
            trigger: '.about-details',
            start: 'top 90%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out'
    });
}

// ========================
// PROJECTS ANIMATIONS
// ========================
function projectsAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || prefersReducedMotion) return;

    ScrollTrigger.create({
        trigger: '.projects-grid',
        start: 'top 88%',
        once: true,
        onEnter: () => {
            gsap.from('.project-card', {
                opacity: 0,
                y: 50,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power3.out'
            });
        }
    });
}

// ========================
// SKILLS ANIMATIONS
// ========================
function skillsAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const skillItems = document.querySelectorAll('.skill-item');
    skillItems.forEach((item) => {
        const progress = item.querySelector('.skill-progress');
        if (!progress) return;
        const width = progress.style.width || '0%';

        gsap.fromTo(progress,
            { width: '0%' },
            {
                width: width,
                duration: 1.4,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 92%',
                    toggleActions: 'play none none none'
                }
            }
        );
    });

    if (prefersReducedMotion) return;

    gsap.from('.skill-category', {
        scrollTrigger: {
            trigger: '.skills-container',
            start: 'top 88%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 40,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out'
    });
}

// ========================
// EXPERIENCE ANIMATIONS
// ========================
function experienceAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || prefersReducedMotion) return;

    gsap.from('.timeline-item', {
        scrollTrigger: {
            trigger: '.timeline',
            start: 'top 88%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        x: -30,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
    });
}

// ========================
// CERTIFICATES ANIMATIONS
// ========================
function certificatesAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || prefersReducedMotion) return;

    gsap.from('.certificate-card', {
        scrollTrigger: {
            trigger: '.certificates-grid',
            start: 'top 88%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out'
    });
}

// ========================
// CONTACT ANIMATIONS - FIXED: now properly shows form
// ========================
function contactAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || prefersReducedMotion) return;

    // Ensure contact elements are visible first
    gsap.set('.contact-info, .contact-form', { opacity: 1, y: 0 });

    gsap.from('.contact-info, .contact-form', {
        scrollTrigger: {
            trigger: '.contact-wrapper',
            start: 'top 88%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 40,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out'
    });
}

// ========================
// FOOTER ANIMATIONS
// ========================
function footerAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || prefersReducedMotion) return;

    gsap.from('.footer-top > div', {
        scrollTrigger: {
            trigger: '.futuristic-footer',
            start: 'top 92%',
            toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out'
    });
}

// ========================
// SCROLL-TRIGGERED SECTION HEADER FADE-IN
// ========================
function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || prefersReducedMotion) return;

    document.querySelectorAll('.section-header').forEach(header => {
        gsap.from(header, {
            scrollTrigger: {
                trigger: header,
                start: 'top 88%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            y: 30,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
}

// ========================
// NAVIGATION HIGHLIGHT
// ========================
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
}

// ========================
// INITIALIZE ALL ANIMATIONS
// ========================
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initScrollIndicatorFade();

    setTimeout(() => {
        if (typeof gsap !== 'undefined') {
            heroAnimations();
            aboutAnimations();
            projectsAnimations();
            skillsAnimations();
            experienceAnimations();
            certificatesAnimations();
            contactAnimations();
            footerAnimations();
            initScrollAnimations();
            initNavHighlight();

            if (typeof ScrollTrigger !== 'undefined') {
                ScrollTrigger.refresh();
            }
        }
    }, 250);
});

let scrollTriggerResizeTimeout;
window.addEventListener('resize', () => {
    if (typeof ScrollTrigger !== 'undefined') {
        clearTimeout(scrollTriggerResizeTimeout);
        scrollTriggerResizeTimeout = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 250);
    }
});

// Safety net: ensure all content is visible
setTimeout(() => {
    document.querySelectorAll('.skill-category, .certificate-card, .project-card, .contact-info, .contact-form').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.visibility = 'visible';
    });
}, 2500);