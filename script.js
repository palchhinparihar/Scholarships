// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Hamburger menu toggle (robust): toggles ARIA, supports keyboard, and closes on outside click
const menuToggle = document.getElementById('menu-toggle');
const navList = document.getElementById('nav-list');

// Debug logs to help verify behavior on mobile browsers
console.log('hamburger init — menuToggle found:', !!menuToggle, 'navList found:', !!navList);

function closeNav() {
    if (!navList) return;
    navList.classList.remove('open');
    // remove any temporary inline debug styles
    navList.style.opacity = '';
    navList.style.pointerEvents = '';
    navList.style.transform = '';
    navList.style.display = '';
    if (menuToggle) {
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
    }
    document.body.classList.remove('nav-open');
}

function openNav() {
    if (!navList) return;
    navList.classList.add('open');
    // TEMPORARY: force visible via inline styles to debug mobile rendering
    navList.style.opacity = '1';
    navList.style.pointerEvents = 'auto';
    navList.style.transform = 'translateX(-50%) translateY(0)';
    navList.style.display = 'flex';
    if (menuToggle) {
        menuToggle.classList.add('active');
        menuToggle.setAttribute('aria-expanded', 'true');
    }
    document.body.classList.add('nav-open');
}

if (menuToggle && navList) {
    // ensure ARIA state
    menuToggle.setAttribute('aria-expanded', 'false');

    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const willOpen = !navList.classList.contains('open');
        console.log('hamburger clicked — willOpen:', willOpen);
        if (navList.classList.contains('open')) closeNav(); else openNav();
        // Log class state after toggle
        console.log('navList.classList.contains("open") =>', navList.classList.contains('open'));
    });

    // keyboard support (Enter / Space)
    menuToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            menuToggle.click();
        }
    });

    // close when a nav link is clicked
    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => closeNav());
    });

    // close when clicking outside the nav list
    document.addEventListener('click', (e) => {
        if (!navList.contains(e.target) && !menuToggle.contains(e.target) && navList.classList.contains('open')) {
            closeNav();
        }
    });

    // close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navList.classList.contains('open')) closeNav();
    });
}

// Toggle details on cards
function toggleDetails(card) {
    card.style.transform = card.style.transform === 'scale(1.05)' ? 'scale(1)' : 'scale(1.05)';
}

// Toggle hidden content
function toggleQuestion(btn) {
    const hiddenContent = btn.nextElementSibling;
    hiddenContent.classList.toggle('hidden');
    btn.textContent = hiddenContent.classList.contains('hidden') ? 
        btn.textContent.replace('Hide', 'Show').replace('Explore', 'Show') : 
        'Hide Details';
}

// Add scroll animation
function revealOnScroll() {
    const elements = document.querySelectorAll('.viz-section, .stats-section');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.animation = 'fadeInUp 0.6s ease-out';
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// Interactive hover effects
document.querySelectorAll('.insight-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.background = 'linear-gradient(135deg, #e6c69b, #c5854a)';
        card.style.color = 'white';
        const t = card.querySelector('.insight-title');
        const d = card.querySelector('.insight-description');
        const n = card.querySelector('.insight-number');
        if (t) t.style.color = 'white';
        if (d) d.style.color = 'rgba(255,255,255,0.95)';
        if (n) n.style.color = 'white';
    });
    card.addEventListener('mouseleave', () => {
        // Clear inline styles so CSS rules take effect again
        card.style.background = '';
        card.style.color = '';
        const t = card.querySelector('.insight-title');
        const d = card.querySelector('.insight-description');
        const n = card.querySelector('.insight-number');
        if (t) t.style.color = '';
        if (d) d.style.color = '';
        if (n) {
            n.style.color = '';
            n.style.webkitBackgroundClip = '';
            n.style.webkitTextFillColor = '';
            n.style.backgroundClip = '';
            n.style.background = '';
        }
    });
});
