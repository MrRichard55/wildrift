// Configuración de la escena 3D
function init3DScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('scene3d').appendChild(renderer.domElement);

    // Luz ambiental
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Luz direccional
    const directionalLight = new THREE.DirectionalLight(0xe63946, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Geometría del fondo
    const geometry = new THREE.IcosahedronGeometry(10, 2);
    const material = new THREE.MeshPhongMaterial({ 
        color: 0x1d3557,
        wireframe: true,
        transparent: true,
        opacity: 0.3
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Posición de la cámara
    camera.position.z = 20;

    // Animación
    function animate() {
        requestAnimationFrame(animate);
        mesh.rotation.x += 0.001;
        mesh.rotation.y += 0.002;
        renderer.render(scene, camera);
    }
    animate();

    // Ajustar en redimensionamiento
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}

// Efecto parallax
function initParallax() {
    const parallaxContainer = document.querySelector('.parallax-container');
    
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 10;
        parallaxContainer.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
    });
}

// Efecto VanillaTilt para elementos interactivos
function initTiltEffects() {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 15,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
        scale: 1.05
    });
}

// Modelo 3D de campeón (simulado con CSS)
function initChampionModel() {
    const modelContainer = document.getElementById('champion-model');
    const champions = ['ahri', 'yasuo', 'lux'];
    let currentChamp = 0;
    
    function changeChampion() {
        modelContainer.className = 'champion-3d ' + champions[currentChamp];
        currentChamp = (currentChamp + 1) % champions.length;
    }
    
    changeChampion();
    setInterval(changeChampion, 5000);
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    init3DScene();
    initParallax();
    initTiltEffects();
    initChampionModel();
    
    // Efecto de carga
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 1500);
});

// Efecto hover para tarjetas de habilidades
const abilityCards = document.querySelectorAll('.ability-card');
abilityCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        card.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(20px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'rotateX(0) rotateY(0) translateZ(0)';
    });
});