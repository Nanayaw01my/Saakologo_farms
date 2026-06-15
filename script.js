// Mobile Menu
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
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

    const serviceNames = {
        'pig': 'Pig Farming',
        'poultry': 'Poultry Farming',
        'turkey': 'Turkey Production',
        'crop': 'Crop Farming',
        'partnership': 'Partnership'
    };

    const msg = `Hi Saakologo Farms,\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nService: ${serviceNames[service]}\n\nMessage: ${message}`;
    const whatsappUrl = `https://wa.me/233557480306?text=${encodeURIComponent(msg)}`;

    window.open(whatsappUrl, '_blank');
    contactForm.reset();
});

console.log('Saakologo Farms - Professional Agricultural Solutions');
