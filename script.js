// ============================================
// 2026 MODERN INTERACTIONS
// ============================================

// Mobile Menu
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Contact Form
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputs = contactForm.querySelectorAll('input, select, textarea');
        const name = inputs[0].value;
        const email = inputs[1].value;
        const phone = inputs[2].value;
        const service = inputs[3].value;
        const message = inputs[4].value;

        if (!name || !email || !phone || !service || !message) {
            showNotification('Please fill all fields', 'error');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showNotification('Invalid email', 'error');
            return;
        }

        const btn = contactForm.querySelector('button');
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        setTimeout(() => {
            const services = {
                'pig': 'Pig Farming',
                'poultry': 'Poultry',
                'turkey': 'Turkey',
                'crop': 'Crops',
                'partnership': 'Partnership'
            };

            const msg = `Hi Saakologo,\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${services[service]}\n\nMessage: ${message}`;
            const url = `https://wa.me/233557480306?text=${encodeURIComponent(msg)}`;

            showNotification('Opening WhatsApp...', 'success');
            contactForm.reset();

            setTimeout(() => {
                window.open(url, '_blank');
                btn.disabled = false;
                btn.innerHTML = 'Send Message <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M2 9H16M16 9L9 2M16 9L9 16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
            }, 1500);
        }, 800);
    });
}

// Notifications
function showNotification(msg, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `<span>${msg}</span>`;
    document.body.appendChild(notification);

    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 14px 20px;
                border-radius: 12px;
                font-weight: 600;
                z-index: 1000;
                animation: slideIn 0.3s ease;
            }
            .notification-success {
                background: #388e3c;
                color: white;
            }
            .notification-error {
                background: #f44336;
                color: white;
            }
            @keyframes slideIn {
                from { transform: translateX(400px); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @media (max-width: 480px) {
                .notification { right: 10px; left: 10px; }
            }
        `;
        document.head.appendChild(style);
    }

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Scroll to Top
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
});

console.log('🌾 Saakologo 2026 - Next Generation Agriculture');
