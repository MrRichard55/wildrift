// Configuración de Three.js para fondo 3D
function init3DScene() {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('scene3d').appendChild(renderer.domElement);

    // Luz ambiental
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Luz direccional roja (tema Wild Rift)
    const directionalLight = new THREE.DirectionalLight(0xe63946, 0.3);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // Luz azul
    const directionalLight2 = new THREE.DirectionalLight(0x457b9d, 0.3);
    directionalLight2.position.set(1, -1, -1);
    scene.add(directionalLight2);

    // Crear geometría icosaedro para fondo
    const geometry = new THREE.IcosahedronGeometry(15, 2);
    const material = new THREE.MeshPhongMaterial({ 
        color: 0x1d3557,
        wireframe: true,
        transparent: true,
        opacity: 0.15
    });
    const icosahedron = new THREE.Mesh(geometry, material);
    scene.add(icosahedron);

    // Posición de cámara
    camera.position.z = 25;

    // Animación
    function animate() {
        requestAnimationFrame(animate);
        icosahedron.rotation.x += 0.002;
        icosahedron.rotation.y += 0.003;
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

// Configuración de partículas.js
function initParticles() {
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#e63946"
            },
            "shape": {
                "type": "circle",
                "stroke": {
                    "width": 0,
                    "color": "#000000"
                }
            },
            "opacity": {
                "value": 0.5,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 1,
                    "opacity_min": 0.1,
                    "sync": false
                }
            },
            "size": {
                "value": 3,
                "random": true,
                "anim": {
                    "enable": true,
                    "speed": 2,
                    "size_min": 0.1,
                    "sync": false
                }
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#457b9d",
                "opacity": 0.2,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 1,
                "direction": "none",
                "random": true,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                    "enable": false,
                    "rotateX": 600,
                    "rotateY": 1200
                }
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "grab"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            },
            "modes": {
                "grab": {
                    "distance": 140,
                    "line_linked": {
                        "opacity": 0.5
                    }
                },
                "push": {
                    "particles_nb": 4
                }
            }
        },
        "retina_detect": true
    });
}

// Efectos VanillaTilt
function initTiltEffects() {
    VanillaTilt.init(document.querySelectorAll("[data-tilt]"), {
        max: 8,
        speed: 400,
        glare: true,
        "max-glare": 0.2,
        scale: 1.05
    });
}

// Validación de formulario
function initFormValidation() {
    const form = document.querySelector('.login-form');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Validación simple
        if(username.trim() === '' || password.trim() === '') {
            alert('Por favor completa todos los campos');
            return;
        }
        
        // Simular inicio de sesión
        form.classList.add('loading');
        document.querySelector('.login-btn').innerHTML = '<i class="fas fa-spinner fa-spin"></i> CARGANDO';
        
        setTimeout(() => {
            form.classList.remove('loading');
            document.querySelector('.login-btn').innerHTML = 'INVOCAR <i class="fas fa-chevron-right"></i>';
            alert(`Bienvenido, ${username}! Redirigiendo...`);
            // window.location.href = 'index.html';
        }, 1500);
    });
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    if(typeof THREE !== 'undefined') {
        init3DScene();
    }
    
    if(typeof particlesJS !== 'undefined') {
        initParticles();
    }
    
    initTiltEffects();
    initFormValidation();
    
    // Efecto de carga
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
});