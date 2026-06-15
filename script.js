// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scroll
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

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputs = contactForm.querySelectorAll('input, select, textarea');
    const name = inputs[0].value;
    const email = inputs[1].value;
    const phone = inputs[2].value;
    const service = inputs[3].value;
    const message = inputs[4].value;

    if (!name || !email || !phone || !service || !message) {
        alert('Please fill all fields');
        return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert('Invalid email');
        return;
    }

    const serviceMap = {
        'pig': 'Pig Farming',
        'poultry': 'Poultry',
        'turkey': 'Turkey',
        'crop': 'Crops',
        'partnership': 'Partnership'
    };

    const msg = `Hi Saakologo Farms,\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${serviceMap[service]}\n\nMessage: ${message}`;
    const whatsappUrl = `https://wa.me/233557480306?text=${encodeURIComponent(msg)}`;

    window.open(whatsappUrl, '_blank');
    contactForm.reset();
});

console.log('Saakologo Farms 2026 - Sharp Modern Design');
