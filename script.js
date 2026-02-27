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
        card.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
        card.style.color = 'white';
        card.querySelector('.insight-title').style.color = 'white';
        card.querySelector('.insight-description').style.color = 'rgba(255,255,255,0.9)';
        card.querySelector('.insight-number').style.color = 'white';
    });
    card.addEventListener('mouseleave', () => {
        card.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
        card.style.color = '#333';
        card.querySelector('.insight-title').style.color = '#333';
        card.querySelector('.insight-description').style.color = '#666';
        card.querySelector('.insight-number').style.webkitBackgroundClip = 'text';
        card.querySelector('.insight-number').style.webkitTextFillColor = 'transparent';
        card.querySelector('.insight-number').style.backgroundClip = 'text';
    });
});
