// Frases de campeones de League of Legends
const frasesCampeones = [
    {
        frase: "El cambio es buena cosa.",
        campeon: "Kha'Zix"
    },
    {
        frase: "El miedo es el primer paso hacia la derrota.",
        campeon: "Aatrox"
    },
    {
        frase: "La oscuridad es mi aliada.",
        campeon: "Nocturne"
    },
    {
        frase: "La precisión es la diferencia entre un rey y un asesino.",
        campeon: "Jhin"
    },
    {
        frase: "El conocimiento es el arma definitiva.",
        campeon: "Ryze"
    },
    {
        frase: "La paciencia es una virtud mortal.",
        campeon: "Kindred"
    },
    {
        frase: "El caos no es un pozo, es una escalera.",
        campeon: "Shaco"
    },
    {
        frase: "La fuerza de un hombre no se mide por su tamaño, sino por el tamaño de su corazón.",
        campeon: "Braum"
    },
    {
        frase: "La justicia viene con un precio.",
        campeon: "Garen"
    },
    {
        frase: "Un tonto y su vida pronto se separan.",
        campeon: "Fizz"
    }
];

// Elementos del DOM
const fechaElement = document.getElementById('fecha');
const horaElement = document.getElementById('hora');
const fraseElement = document.getElementById('frase');
const campeonElement = document.getElementById('campeon');

// Función para actualizar la fecha y hora
function actualizarReloj() {
    const ahora = new Date();
    
    // Formatear fecha
    const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const fechaFormateada = ahora.toLocaleDateString('es-ES', opcionesFecha);
    
    // Formatear hora
    const horas = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const segundos = ahora.getSeconds().toString().padStart(2, '0');
    const horaFormateada = `${horas}:${minutos}:${segundos}`;
    
    // Actualizar elementos
    fechaElement.textContent = fechaFormateada;
    horaElement.textContent = horaFormateada;
}

// Función para cambiar la frase del campeón
function cambiarFrase() {
    // Seleccionar una frase aleatoria
    const indiceAleatorio = Math.floor(Math.random() * frasesCampeones.length);
    const { frase, campeon } = frasesCampeones[indiceAleatorio];
    
    // Aplicar animación
    fraseElement.classList.remove('fade-in');
    campeonElement.classList.remove('fade-in');
    
    // Forzar reflow para reiniciar la animación
    void fraseElement.offsetWidth;
    void campeonElement.offsetWidth;
    
    // Actualizar texto y aplicar animación
    fraseElement.textContent = frase;
    campeonElement.textContent = `- ${campeon}`;
    fraseElement.classList.add('fade-in');
    campeonElement.classList.add('fade-in');
}

// Inicializar
actualizarReloj();
cambiarFrase();

// Actualizar cada segundo
setInterval(actualizarReloj, 1000);

// Cambiar frase cada 5 segundos
setInterval(cambiarFrase, 5000);