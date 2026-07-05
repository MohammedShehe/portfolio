// ========================
// PROJECT DATA - COMPLETE
// ========================
const projectsData = [
    {
        title: "Hat-Trick Scents",
        description: "A modern, responsive e-commerce website for luxury perfumes and cosmetics. Features include product catalog, interactive shopping cart, WhatsApp ordering, dark/light theme, and smart chatbot assistant.",
        technologies: "HTML5, CSS3, JavaScript, Bootstrap 5",
        category: "fullstack",
        image: "images/HatTrick.jpeg",
        link: "https://hattrickscents.online"
    },
    {
        title: "Digital Health Tracker",
        description: "A cross-platform mobile health application developed during a 4-month internship. Features include JWT authentication, health metrics logging, FCM notifications, and Google Fit API integration.",
        technologies: "Flutter, Dart, Node.js, Express, MySQL",
        category: "mobile",
        image: "images/dht.jpg",
        link: "https://github.com/mohammedshehe/dht"
    },
    {
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce platform with user authentication, product catalog, shopping cart, and secure transactions.",
        technologies: "HTML, CSS, JS, Node.js, MySQL",
        category: "fullstack",
        image: "images/FBSC.png",
        link: "https://www.fourbrothers.online"
    },
    {
        title: "Files Management System",
        description: "A responsive files management application with proper authentication, view, upload, and delete functionalities.",
        technologies: "JavaScript, HTML, CSS, MySQL, Node.js",
        category: "fullstack",
        image: "images/brothers_cloud.png",
        link: "https://mohammedshehe.github.io/BrothersCloud-frontend/"
    },
    {
        title: "Football Club System",
        description: "A football club management system with player stats, match schedules, and performance analytics.",
        technologies: "HTML, CSS, JavaScript, Node.js, MySQL",
        category: "fullstack",
        image: "images/italykids.png",
        link: "https://github.com/mohammedshehe/ItalyKids-Backend"
    },
    {
        title: "VitalSign Pro",
        description: "A comprehensive healthcare management system with multi-role access, patient tracking, QR code integration, and real-time analytics.",
        technologies: "Python, Tkinter, SQLite, Matplotlib",
        category: "fullstack",
        image: "images/VitalSign.png",
        link: "https://github.com/MohammedShehe/HospitalManagementSystem-Python"
    },
    {
        title: "ABC Medicos - Pharmacy",
        description: "A comprehensive pharmacy management solution with dual-role access, prescription processing, and real-time inventory management.",
        technologies: "PHP, MySQL, JavaScript, Bootstrap",
        category: "fullstack",
        image: "images/PMS.png",
        link: "https://github.com/MohammedShehe/ABCMEDICOS.git"
    },
    {
        title: "MiniMarket E-Commerce",
        description: "A full-featured e-commerce platform with user authentication, product catalog, shopping cart, OTP verification, and order management.",
        technologies: "PHP, MySQL, JavaScript, Bootstrap",
        category: "fullstack",
        image: "images/LawgateMiniMarket.png",
        link: "https://github.com/MohammedShehe/minimarket.git"
    },
    {
        title: "Dynamic Form Generator",
        description: "A dynamic form generator that allows users to create and customize forms with various input types and validations.",
        technologies: "PHP, HTML, CSS, JavaScript",
        category: "backend",
        image: "images/form_generator.png",
        link: "https://github.com/mohammedshehe/form_generator"
    },
    {
        title: "Portfolio Website",
        description: "A responsive portfolio website with project showcase, skills section, and contact form.",
        technologies: "HTML, CSS, JavaScript, Bootstrap",
        category: "frontend",
        image: "images/portfolio.png",
        link: "https://github.com/mohammedshehe/portfolio"
    },
    {
        title: "GameNest",
        description: "A responsive web playground where fun meets design with interactive games.",
        technologies: "HTML, CSS, JavaScript, Bootstrap",
        category: "frontend",
        image: "images/GameNest.png",
        link: "https://mohammedshehe.github.io/GameNest"
    },
    {
        "title": "SalahStreaks",
        "description": "An Islamic gamification mobile app for tracking daily ibadat (worship) with streaks, points, and rewards. Features include Salah tracking with individual prayer logging, Quran verses, Islamic events calendar, reminder system, analytics graphs, and history view.",
        "technologies": "Flutter, Dart, Shared Preferences, Provider, fl_chart, table_calendar, image_picker",
        "category": "mobile",
        "image": "images/salahstreaks.jpeg",
        "link": "https://github.com/mohammedshehe/salahstreaks"
    }
    ];

// ========================
// RENDER PROJECTS
// ========================
function renderProjects(category = 'all') {
    console.log('🔄 Rendering projects with category:', category);
    
    const projectsGrid = document.getElementById('projectsGrid');
    
    if (!projectsGrid) {
        console.error('❌ Projects grid not found!');
        return;
    }
    
    const filtered = category === 'all' 
        ? projectsData 
        : projectsData.filter(p => p.category === category);
    
    if (filtered.length === 0) {
        projectsGrid.innerHTML = '<p style="color: var(--text-secondary); text-align: center; padding: 40px;">No projects found in this category.</p>';
        return;
    }
    
    let html = '';
    for (let i = 0; i < filtered.length; i++) {
        const project = filtered[i];
        const imagePath = project.image || 'images/placeholder.png';
        
        html += `
            <div class="project-card">
                <div class="project-card-image" style="background-image: url('${imagePath}'); background-size: cover; background-position: center; background-color: #6c2bd9;">
                    <img src="${imagePath}" alt="${project.title}" loading="eager" 
                         onerror="this.style.display='none'; this.parentElement.style.backgroundImage='linear-gradient(135deg, #6c2bd9, #4a1a9e)'">
                </div>
                <div class="project-card-body">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tags">
                        ${project.technologies.split(',').map(tech => 
                            `<span class="project-tag">${tech.trim()}</span>`
                        ).join('')}
                    </div>
                    <a href="${project.link}" target="_blank" rel="noopener" class="btn-primary" style="padding: 10px 25px; font-size: 0.85rem;">
                        <span>View Project</span>
                        <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        `;
    }
    
    projectsGrid.innerHTML = html;
    console.log('✅ Projects rendered successfully! Total:', filtered.length);
}

// ========================
// FILTER BUTTONS
// ========================
function initFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderProjects(this.dataset.filter);
        });
    });
}

// ========================
// PDF PREVIEW
// ========================
function initPdfPreview() {
    const previewBtns = document.querySelectorAll('.preview-pdf');
    const pdfModal = document.getElementById('pdfModal');
    const pdfPreviewFrame = document.getElementById('pdfPreviewFrame');
    const pdfModalTitle = document.getElementById('pdfModalTitle');
    const closePdfModal = document.getElementById('closePdfModal');
    
    previewBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const pdfPath = this.dataset.pdf;
            const title = this.dataset.title;
            
            if (pdfModalTitle) pdfModalTitle.textContent = title;
            if (pdfPreviewFrame) pdfPreviewFrame.src = pdfPath;
            if (pdfModal) {
                pdfModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    function closePdf() {
        if (pdfModal) {
            pdfModal.classList.remove('active');
            if (pdfPreviewFrame) pdfPreviewFrame.src = '';
            document.body.style.overflow = '';
        }
    }
    
    if (closePdfModal) closePdfModal.addEventListener('click', closePdf);
    if (pdfModal) {
        pdfModal.addEventListener('click', (e) => {
            if (e.target === pdfModal) closePdf();
        });
    }
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePdf();
    });
}

// ========================
// CHATBOT - FULL DATA
// ========================
const botResponses = {
    about: "Mohammed Aminu Shehe is a passionate full-stack web and mobile developer born on 12th June 2005. He's currently in his 3rd year of Diploma in CSE at Lovely Professional University, Punjab. He completed a 4-month internship at NyotaTech Hub in Zanzibar (Jan 2026 - May 2026) and a 2-months training at eGovernment Agency, Zanzibar.",
    skills: "MO has expertise in: HTML/CSS (95%), JavaScript (90%), Dart (85%), Python (85%), PHP (85%), Flutter (85%), React (85%), Node.js (80%), Firebase (80%), Bootstrap (95%), Git/GitHub (90%), UI/UX Design (85%), RESTful APIs (85%), and Problem Solving (90%).",
    projects: "MO has developed 10+ projects including: \n🔹 Hat-Trick Scents - E-commerce website for luxury perfumes with WhatsApp ordering & chatbot. \n🔹 SalahStreaks - Islamic gamification mobile app for tracking daily ibadat with streaks, points, Quran verses, and reminders. \n🔹 Digital Health Tracker - Mobile health monitoring app. \n🔹 E-Commerce Platform - Full-featured online store. \n🔹 Files Management System - Document organization system. \n🔹 Football Club System - Team management platform. \n🔹 VitalSign Pro - Healthcare management system. \n🔹 ABC Medicos Pharmacy - Pharmacy management. \n🔹 MiniMarket E-Commerce - Grocery store platform. \n🔹 Dynamic Form Generator - Form builder tool. \n🔹 Portfolio Website - Personal portfolio. \n🔹 GameNest - Gaming platform.",
    experience: "MO's experience includes: \n1. Mobile Development Intern at NyotaTech Hub (Jan-May 2026) - Built Flutter apps including SalahStreaks with Firebase integration and state management using Provider. \n2. Full-Stack Web Training at eGovernment Agency (Jul-Aug 2025) - Built responsive UIs and RESTful APIs using Node.js and Express. \n3. Currently pursuing Diploma in CSE at LPU (2023-Present) with 8.5+ CGPA.",
    education: "MO is currently in his 3rd (final) year of Diploma in Computer Science Engineering at Lovely Professional University, Punjab. He maintains a CGPA of 8.5+. He completed his Higher Secondary Education in Science stream from Zanzibar, Tanzania.",
    certificates: "MO holds 7 certificates: \n1. My Curriculum Vitae \n2. Summer Training Certificate (eGAZ) \n3. JavaScript Advanced Concepts \n4. Cyber Security - Hackafest \n5. Kali Linux & Windows Hacking \n6. eGAZ Industrial Training \n7. NyotaTech Hub Internship.",
    contact: "You can reach MO via: \n📧 Email: molittle1011@gmail.com \n📱 Phone: +255 677 532 140 \n📍 Location: Fuoni, Zanzibar \n💬 WhatsApp: +255 677 532 140 \nAlso connect on GitHub, LinkedIn, Instagram, and Twitter.",
    future: "MO plans to complete his Diploma in CSE (2026), then pursue a Bachelor's degree. His goal is to become a tech lead and eventually start his own tech company focusing on innovative health-tech and fintech solutions. He's currently working on expanding SalahStreaks to include community features and real-time leaderboards.",
    hobbies: "MO is a football enthusiast who enjoys playing and watching football. He also loves reading tech blogs, exploring new technologies, and contributing to open-source projects. In his free time, he works on Islamic apps to benefit the Ummah.",
    achievements: "MO's achievements include: \n✅ Maintaining 8.5+ CGPA \n✅ Completing 2 prestigious internships \n✅ Developing 10+ production-ready projects \n✅ Winning Hackafest cybersecurity quiz \n✅ Getting certified in 7 technologies \n✅ Building SalahStreaks with 50+ daily active users \n✅ Successfully deploying Hat-Trick Scents e-commerce platform"
};

const keywordMapping = {
    about: ["about", "background", "who", "information", "tell me", "introduce", "bio", "profile"],
    skills: ["skill", "technology", "tech", "expertise", "proficient", "know", "languages", "frameworks"],
    projects: ["project", "work", "portfolio", "built", "developed", "creation", "app", "application", "salahstreaks", "hat-trick", "e-commerce"],
    experience: ["experience", "intern", "internship", "work", "job", "career", "professional"],
    education: ["education", "study", "student", "school", "college", "university", "lpu", "degree"],
    certificates: ["certificate", "certification", "credential", "achievement", "award", "recognition"],
    contact: ["contact", "reach", "email", "phone", "whatsapp", "call", "message", "connect"],
    future: ["future", "plan", "goal", "aspiration", "career", "dream", "aim", "objective"],
    hobbies: ["hobby", "interest", "football", "soccer", "sport", "fun", "play", "enjoy"],
    achievements: ["achievement", "accomplish", "success", "win", "award", "honor", "recognition"]
};

function findBestResponse(message) {
    const lower = message.toLowerCase().trim();
    
    // Check for greetings
    if (lower.match(/^(hi|hello|hey|greetings|good morning|good evening|what's up|yo)/i)) {
        return "Hello! 👋 Great to see you! I'm MO Assistant. How can I help you learn more about Mohammed Aminu Shehe? Feel free to ask about his background, skills, projects, experience, or anything else!";
    }
    
    for (const [category, keywords] of Object.entries(keywordMapping)) {
        if (keywords.some(k => lower.includes(k))) {
            return botResponses[category];
        }
    }
    
    return "That's a great question! 🤔 I specialize in answering questions about Mohammed Aminu Shehe. You can ask about his background, skills, projects, experience, education, certificates, contact info, future plans, hobbies, or achievements. What would you like to know?";
}

function addMessage(message, isUser = false) {
    const chatbotBody = document.getElementById('chatbotBody');
    if (!chatbotBody) return;
    
    const div = document.createElement('div');
    div.className = `chat-message ${isUser ? 'user' : 'bot'}`;
    div.innerHTML = `<div class="message-bubble">${message}</div>`;
    chatbotBody.appendChild(div);
    chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

function handleSend() {
    const chatInput = document.getElementById('chatInput');
    if (!chatInput) return;
    const message = chatInput.value.trim();
    if (!message) return;
    
    addMessage(message, true);
    chatInput.value = '';
    
    setTimeout(() => {
        const response = findBestResponse(message);
        addMessage(response, false);
    }, 300 + Math.random() * 400);
}

function initChatbot() {
    const chatbotBall = document.getElementById('chatbotBall');
    const chatbotPanel = document.getElementById('chatbotPanel');
    const closeChat = document.getElementById('closeChat');
    const sendBtn = document.getElementById('sendBtn');
    const chatInput = document.getElementById('chatInput');

    if (chatbotBall) {
        chatbotBall.addEventListener('click', () => {
            if (chatbotPanel) chatbotPanel.classList.toggle('active');
        });
    }

    if (closeChat) {
        closeChat.addEventListener('click', () => {
            if (chatbotPanel) chatbotPanel.classList.remove('active');
        });
    }

    if (sendBtn) {
        sendBtn.addEventListener('click', handleSend);
    }

    if (chatInput) {
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    }
}

// ========================
// BACK TO TOP
// ========================
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ========================
// NAVIGATION
// ========================
function initNavigation() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            if (navMenu) navMenu.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navToggle) navToggle.classList.remove('active');
            if (navMenu) navMenu.classList.remove('active');
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// ========================
// THEME TOGGLE
// ========================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;

    const savedTheme = localStorage.getItem('theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme || (systemDark ? 'dark' : 'light');
    
    document.body.dataset.theme = currentTheme;
    const icon = themeToggle.querySelector('i');
    if (icon) {
        icon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    themeToggle.addEventListener('click', () => {
        const newTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
        document.body.dataset.theme = newTheme;
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = newTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
        localStorage.setItem('theme', newTheme);
    });
}

// ========================
// CUSTOM CURSOR
// ========================
function initCustomCursor() {
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (!cursorDot || !cursorOutline) return;

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
        cursorOutline.style.left = mouseX + 'px';
        cursorOutline.style.top = mouseY + 'px';
    });

    function animateCursor() {
        outlineX += (mouseX - outlineX) * 0.1;
        outlineY += (mouseY - outlineY) * 0.1;
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    document.querySelectorAll('a, button, .project-card, .certificate-card, .filter-btn, .social-icon').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('hover');
            cursorOutline.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('hover');
            cursorOutline.classList.remove('hover');
        });
    });
}

// ========================
// STAT COUNTER
// ========================
function animateCounters() {
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.dataset.count);
        if (isNaN(target)) return;
        let current = 0;
        const increment = Math.ceil(target / 50);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            stat.textContent = current + '+';
        }, 40);
    });
}

function initCounterObserver() {
    const heroElement = document.querySelector('.hero');
    if (!heroElement) return;
    
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                heroObserver.disconnect();
            }
        });
    }, { threshold: 0.3 });
    heroObserver.observe(heroElement);
}

// ========================
// SMOOTH SCROLL
// ========================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const offset = 80;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}

// ========================
// CONTACT FORM
// ========================
function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 5000);
    });
}


// NEWSLETTER FORM - FormSubmit.co
// ========================
function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    
    // Remove any existing submit listeners
    const newForm = form.cloneNode(true);
    form.parentNode.replaceChild(newForm, form);
    
    newForm.addEventListener('submit', function(e) {
        // Let the form submit naturally to FormSubmit.co
        // But show a loading state
        const btn = this.querySelector('button');
        const originalIcon = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        btn.style.pointerEvents = 'none';
        btn.style.opacity = '0.7';
        
        // Re-enable after 5 seconds (in case of slow response)
        setTimeout(() => {
            btn.innerHTML = originalIcon;
            btn.style.pointerEvents = 'auto';
            btn.style.opacity = '1';
        }, 5000);
    });
}

// ========================
// INITIALIZE ALL
// ========================
function initializeApp() {
    console.log('🚀 Initializing app...');
    renderProjects();
    initFilters();
    initPdfPreview();
    initChatbot();
    initBackToTop();
    initNavigation();
    initThemeToggle();
    initCustomCursor();
    initCounterObserver();
    initSmoothScroll();
    initContactForm();
    initNewsletter();
    console.log('✅ App initialized successfully!');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

window.addEventListener('load', () => {
    console.log('📱 Window loaded');
    renderProjects();
});

console.log('✅ main.js loaded successfully!');
console.log('📊 Total projects:', projectsData.length);