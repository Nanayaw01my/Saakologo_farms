// ============================================
// MOBILE MENU
// ============================================

const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu when link is clicked
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// ============================================
// SMOOTH SCROLLING
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

function createScrollToTopButton() {
    const button = document.createElement('button');
    button.id = 'scrollToTop';
    button.className = 'scroll-to-top';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(button);

    // Add styles
    const styles = `
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: linear-gradient(135deg, #388e3c, #2e7d32);
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
            z-index: 999;
            transition: all 0.3s ease;
        }

        .scroll-to-top.show {
            display: flex;
        }

        .scroll-to-top:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 48px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 480px) {
            .scroll-to-top {
                bottom: 20px;
                right: 20px;
                width: 45px;
                height: 45px;
            }
        }
    `;

    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.classList.add('show');
        } else {
            button.classList.remove('show');
        }
    });

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

createScrollToTopButton();

// ============================================
// CONTACT FORM HANDLER
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', handleFormSubmit);
}

function handleFormSubmit(e) {
    e.preventDefault();

    // Get form inputs
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    const data = {};

    inputs.forEach(input => {
        if (input.type !== 'submit') {
            if (input.name) {
                data[input.name] = input.value;
            } else if (input.placeholder) {
                if (input.type === 'text' && !data.name) data.name = input.value;
                else if (input.type === 'email') data.email = input.value;
                else if (input.type === 'tel') data.phone = input.value;
                else if (input.tagName === 'TEXTAREA') data.message = input.value;
            }
        }
    });

    // Get values from inputs if not captured by name/placeholder
    const allInputs = contactForm.querySelectorAll('input, select, textarea');
    if (!data.name && allInputs[0]) data.name = allInputs[0].value;
    if (!data.email && allInputs[1]) data.email = allInputs[1].value;
    if (!data.phone && allInputs[2]) data.phone = allInputs[2].value;
    if (!data.service && allInputs[3]) data.service = allInputs[3].value;
    if (!data.message && allInputs[4]) data.message = allInputs[4].value;

    // Validate
    if (!data.name || !data.email || !data.phone || !data.service || !data.message) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        showNotification('Please enter a valid email', 'error');
        return;
    }

    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    if (!phoneRegex.test(data.phone)) {
        showNotification('Please enter a valid phone number', 'error');
        return;
    }

    // Submit
    const button = contactForm.querySelector('button[type="submit"]');
    const originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';

    setTimeout(() => {
        const serviceNames = {
            'pig': 'Pig Farming',
            'poultry': 'Poultry Farming',
            'turkey': 'Turkey Production',
            'crop': 'Crop Farming',
            'partnership': 'Business Partnership',
            'consultation': 'Expert Consultation'
        };

        const serviceName = serviceNames[data.service] || data.service;
        const whatsappMessage = `Hello Saakologo Farms,\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nService: ${serviceName}\n\nMessage:\n${data.message}`;
        const whatsappUrl = `https://wa.me/233557480306?text=${encodeURIComponent(whatsappMessage)}`;

        showNotification('✓ Message ready! Opening WhatsApp...', 'success');
        contactForm.reset();

        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
        }, 1500);

        button.disabled = false;
        button.innerHTML = originalText;
    }, 1000);
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================

function showNotification(message, type = 'success') {
    const existing = document.querySelector('.notification');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    document.body.appendChild(notification);

    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 16px 24px;
                border-radius: 8px;
                box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
                animation: slideIn 0.3s ease;
                z-index: 1000;
                max-width: 400px;
                font-weight: 500;
            }

            .notification-success {
                background: linear-gradient(135deg, #388e3c, #2e7d32);
                color: white;
            }

            .notification-error {
                background: linear-gradient(135deg, #f44336, #d32f2f);
                color: white;
            }

            .notification-content {
                display: flex;
                align-items: center;
                gap: 12px;
            }

            @keyframes slideIn {
                from {
                    transform: translateX(400px);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            @media (max-width: 480px) {
                .notification {
                    right: 10px;
                    left: 10px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// ============================================
// FORM VALIDATION
// ============================================

const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => validateInput(input));
    input.addEventListener('input', () => {
        if (input.classList.contains('error')) {
            validateInput(input);
        }
    });
});

function validateInput(input) {
    let isValid = true;
    const value = input.value.trim();

    if (!value) {
        isValid = false;
    } else if (input.type === 'email') {
        isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    } else if (input.type === 'tel') {
        isValid = /^[\d\s\-\+\(\)]{10,}$/.test(value);
    } else if (input.tagName === 'SELECT') {
        isValid = value !== '';
    }

    input.classList.toggle('error', !isValid);
    input.classList.toggle('valid', isValid);
}

// Add validation styles
const validationStyles = document.createElement('style');
validationStyles.textContent = `
    .contact-form input.valid,
    .contact-form select.valid,
    .contact-form textarea.valid {
        border-color: #4caf50 !important;
        background-color: rgba(76, 175, 80, 0.05);
    }

    .contact-form input.error,
    .contact-form select.error,
    .contact-form textarea.error {
        border-color: #f44336 !important;
        background-color: rgba(244, 67, 54, 0.05);
    }
`;
document.head.appendChild(validationStyles);

// ============================================
// INTERSECTION OBSERVER - ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe service cards, feature boxes, testimonials
document.querySelectorAll(
    '.service-card, .feature-box, .testimonial-card, .stat-card, .process-step'
).forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// LAZY LOAD IMAGES
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                }
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================

const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.12)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    lastScroll = window.scrollY;
});

// ============================================
// INITIALIZATION
// ============================================

console.log('🌾 Saakologo Farms - Professional Agriculture Platform');
console.log('✓ All systems ready. Together, let\'s grow agriculture!');
