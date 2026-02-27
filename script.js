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

// Hamburger menu toggle
const menuToggle = document.getElementById('menu-toggle');
const navList = document.getElementById('nav-list');
if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
        navList.classList.toggle('open');
        menuToggle.classList.toggle('active');
    });
    // Optional: close menu when a link is clicked (for better UX)
    navList.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navList.classList.remove('open');
            menuToggle.classList.remove('active');
        });
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
