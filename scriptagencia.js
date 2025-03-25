// Pantalla de carga
window.addEventListener('load', function() {
    setTimeout(function() {
        const loadingOverlay = document.getElementById('loadingOverlay');
        loadingOverlay.style.opacity = '0';
        setTimeout(() => loadingOverlay.style.display = 'none', 500);
    }, 1500);
});

// Efecto scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Cambio de color del header al hacer scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(29, 53, 87, 0.9)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'var(--primary-blue)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    }
});

// Testimonios (simulación de slider)
const testimonios = [
    {
        quote: "La experiencia en Velocity Motors superó todas mis expectativas. Atención personalizada y vehículos en perfecto estado.",
        name: "Carlos Méndez",
        car: "Porsche 911 Owner",
        img: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        quote: "El equipo de Velocity encontró exactamente el coche que buscaba. Profesionales y transparentes en todo momento.",
        name: "Ana Rodríguez",
        car: "Audi R8 Owner",
        img: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        quote: "Financiación flexible y condiciones excelentes. Mi BMW M8 es una maravilla gracias a Velocity Motors.",
        name: "Javier López",
        car: "BMW M8 Owner",
        img: "https://randomuser.me/api/portraits/men/75.jpg"
    }
];

const testimonialElement = document.querySelector('.testimonial');
let currentTestimonial = 0;

function changeTestimonial() {
    const testimonio = testimonios[currentTestimonial];
    
    testimonialElement.innerHTML = `
        <p class="quote">"${testimonio.quote}"</p>
        <div class="client">
            <img src="${testimonio.img}" alt="Cliente">
            <div class="client-info">
                <h4>${testimonio.name}</h4>
                <span>${testimonio.car}</span>
            </div>
        </div>
    `;
    
    testimonialElement.classList.add('fade-in');
    
    setTimeout(() => {
        testimonialElement.classList.remove('fade-in');
    }, 1000);
    
    currentTestimonial = (currentTestimonial + 1) % testimonios.length;
}

// Cambiar testimonio cada 8 segundos
setInterval(changeTestimonial, 8000);

// Animación de tarjetas al hacer scroll
const featureCards = document.querySelectorAll('.feature-card, .car-card');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

featureCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s ease';
    observer.observe(card);
});