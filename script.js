// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
const navLinks = navMenu.querySelectorAll('a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
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

// Contact Form Handler
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name') || contactForm.querySelector('input[type="text"]').value,
            email: formData.get('email') || contactForm.querySelector('input[type="email"]').value,
            phone: formData.get('phone') || contactForm.querySelector('input[type="tel"]').value,
            service: contactForm.querySelector('select').value,
            message: contactForm.querySelector('textarea').value
        };

        // Validate form data
        if (!data.name || !data.email || !data.phone || !data.service || !data.message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        // Validate phone format
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        if (!phoneRegex.test(data.phone)) {
            showNotification('Please enter a valid phone number', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending...';

        // Simulate API call with timeout
        setTimeout(() => {
            // Generate WhatsApp message
            const whatsappMessage = `Hi Saakologo Farms,\n\nName: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nService: ${data.service}\nMessage: ${data.message}`;
            const whatsappUrl = `https://wa.me/233557480306?text=${encodeURIComponent(whatsappMessage)}`;

            showNotification('Message sent successfully! Redirecting to WhatsApp...', 'success');

            // Reset form
            contactForm.reset();

            // Redirect to WhatsApp after 1.5 seconds
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
            }, 1500);

            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }, 1000);
    });
}

// Notification System
function showNotification(message, type = 'success') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

    document.body.appendChild(notification);

    // Add styles for notification
    const style = document.createElement('style');
    if (!document.querySelector('#notification-styles')) {
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 5px;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                animation: slideIn 0.3s ease;
                z-index: 1000;
                max-width: 400px;
            }

            .notification-success {
                background-color: #4caf50;
                color: white;
            }

            .notification-error {
                background-color: #f44336;
                color: white;
            }

            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
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
                    top: 10px;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Auto remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Scroll to top button
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.id = 'scrollToTop';
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'scroll-to-top';
    document.body.appendChild(button);

    const style = document.createElement('style');
    style.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background-color: #388e3c;
            color: white;
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            z-index: 999;
            transition: all 0.3s ease;
        }

        .scroll-to-top.show {
            display: flex;
        }

        .scroll-to-top:hover {
            background-color: #1b5e20;
            transform: translateY(-5px);
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.3);
        }

        @media (max-width: 480px) {
            .scroll-to-top {
                bottom: 20px;
                right: 20px;
                width: 45px;
                height: 45px;
                font-size: 1rem;
            }
        }
    `;
    document.head.appendChild(style);

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

// Initialize scroll to top button
createScrollToTopButton();

// Intersection Observer for animations
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

// Observe service cards and feature items
document.querySelectorAll('.service-card, .feature-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

// Form input validation with real-time feedback
const inputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');

inputs.forEach(input => {
    input.addEventListener('blur', () => {
        validateInput(input);
    });

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
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = emailRegex.test(value);
    } else if (input.type === 'tel') {
        const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
        isValid = phoneRegex.test(value);
    } else if (input.tagName === 'SELECT') {
        isValid = value !== '';
    }

    if (isValid) {
        input.classList.remove('error');
        input.classList.add('valid');
    } else {
        input.classList.remove('valid');
        input.classList.add('error');
    }

    return isValid;
}

// Add validation styles
const validationStyles = document.createElement('style');
validationStyles.textContent = `
    .contact-form input.valid,
    .contact-form select.valid,
    .contact-form textarea.valid {
        border-color: #4caf50;
        background-color: rgba(76, 175, 80, 0.05);
    }

    .contact-form input.error,
    .contact-form select.error,
    .contact-form textarea.error {
        border-color: #f44336;
        background-color: rgba(244, 67, 54, 0.05);
    }
`;
document.head.appendChild(validationStyles);

// Performance optimization - lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// Log when page loads
console.log('Saakologo Farms website loaded successfully!');
