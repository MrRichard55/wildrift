// Inicializar efectos 3D
VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
    scale: 1.05
});

// Menú hamburguesa
const hamburger = document.getElementById('hamburger');
const nav = document.querySelector('.nav');

hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Reloj en tiempo real
function updateClock() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fechaElement = document.getElementById('fecha');
    const horaElement = document.getElementById('hora');
    
    fechaElement.textContent = now.toLocaleDateString('es-ES', options);
    horaElement.textContent = now.toLocaleTimeString('es-ES');
}

// Frases de campeones
const frasesCampeones = [
    { frase: "El cambio es buena cosa.", campeon: "Kha'Zix" },
    { frase: "El miedo es el primer paso hacia la derrota.", campeon: "Aatrox" },
    { frase: "La oscuridad es mi aliada.", campeon: "Nocturne" },
    { frase: "La precisión es la diferencia entre un rey y un asesino.", campeon: "Jhin" },
    { frase: "El conocimiento es el arma definitiva.", campeon: "Ryze" }
];

function updateQuote() {
    const randomIndex = Math.floor(Math.random() * frasesCampeones.length);
    const fraseElement = document.getElementById('frase');
    const campeonElement = document.getElementById('campeon');
    
    fraseElement.textContent = frasesCampeones[randomIndex].frase;
    campeonElement.textContent = `- ${frasesCampeones[randomIndex].campeon}`;
    
    // Animación
    fraseElement.style.animation = 'none';
    campeonElement.style.animation = 'none';
    void fraseElement.offsetWidth;
    void campeonElement.offsetWidth;
    fraseElement.style.animation = 'fadeIn 1s ease';
    campeonElement.style.animation = 'fadeIn 1s ease';
}

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Cerrar menú móvil si está abierto
        if (nav.classList.contains('active')) {
            nav.classList.remove('active');
            hamburger.classList.remove('active');
        }
        
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Cambiar color header al hacer scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.7)';
    } else {
        header.style.background = 'rgba(29, 53, 87, 0.9)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
    }
});

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    updateClock();
    updateQuote();
    
    // Actualizar reloj cada segundo
    setInterval(updateClock, 1000);
    
    // Cambiar frase cada 5 segundos
    setInterval(updateQuote, 5000);
    
    // Cargar las páginas completas dinámicamente
    document.querySelectorAll('.section-button').forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                // Aquí podrías cargar el contenido de la página completa dinámicamente
                window.location.href = this.getAttribute('href');
            }
        });
    });
});