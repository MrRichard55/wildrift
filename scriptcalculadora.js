// Consejos y datos de Wild Rift
const gameTips = [
    "El daño físico escala con AD (Ataque)",
    "El daño mágico escala con AP (Habilidad)",
    "La penetración de armadura reduce defensas",
    "La resistencia mágica reduce daño de habilidades",
    "La velocidad de ataque mejora DPS",
    "El robo de vida sustrae salud con ataques",
    "La letalidad ignora parte de la armadura",
    "La reducción de enfriamiento permite usar habilidades más seguido",
    "La velocidad de movimiento es clave para esquivar habilidades",
    "La visión controla el mapa y evita emboscadas"
];

// Elementos del DOM
const display = document.getElementById('display');
const buttons = document.querySelectorAll('.calc-btn');
const gameTipElement = document.getElementById('gameTip');

// Variables de la calculadora
let currentInput = '0';
let previousInput = '';
let operation = undefined;
let resetScreen = false;

// Actualizar consejo del juego
function updateGameTip() {
    const randomIndex = Math.floor(Math.random() * gameTips.length);
    gameTipElement.textContent = gameTips[randomIndex];
    gameTipElement.classList.add('fade-in');
    
    setTimeout(() => {
        gameTipElement.classList.remove('fade-in');
    }, 1000);
}

// Actualizar display
function updateDisplay() {
    display.value = currentInput;
}

// Manejar números
function inputNumber(number) {
    if (currentInput === '0' || resetScreen) {
        currentInput = number;
        resetScreen = false;
    } else {
        currentInput += number;
    }
}

// Manejar decimal
function inputDecimal() {
    if (resetScreen) {
        currentInput = '0.';
        resetScreen = false;
        return;
    }
    
    if (!currentInput.includes('.')) {
        currentInput += '.';
    }
}

// Manejar operaciones
function handleOperation(op) {
    if (currentInput === '0' && op !== 'DEL' && op !== 'AC') return;
    
    switch(op) {
        case 'AC':
            currentInput = '0';
            previousInput = '';
            operation = undefined;
            break;
        case 'DEL':
            if (currentInput.length === 1) {
                currentInput = '0';
            } else {
                currentInput = currentInput.slice(0, -1);
            }
            break;
        case '%':
            currentInput = (parseFloat(currentInput) / 100).toString();
            break;
        case '=':
            if (operation === undefined) return;
            calculate();
            operation = undefined;
            break;
        default:
            if (operation !== undefined) calculate();
            previousInput = currentInput;
            operation = op;
            resetScreen = true;
    }
}

// Calcular resultado
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    
    if (isNaN(prev)) return;
    
    switch(operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    
    currentInput = result.toString();
    previousInput = '';
}

// Event listeners
buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
        
        if (value >= '0' && value <= '9') {
            inputNumber(value);
        } else if (value === '.') {
            inputDecimal();
        } else {
            handleOperation(value);
        }
        
        updateDisplay();
    });
});

// Inicializar
updateDisplay();
updateGameTip();

// Cambiar consejo cada 5 segundos
setInterval(updateGameTip, 5000);

// Teclado
document.addEventListener('keydown', (e) => {
    if ((e.key >= '0' && e.key <= '9') || e.key === '.') {
        const button = document.querySelector(`.calc-btn[data-value="${e.key}"]`);
        if (button) button.click();
    } else if (e.key === 'Enter') {
        document.querySelector('.special').click();
    } else if (e.key === 'Escape') {
        document.querySelector('.calc-btn[data-value="AC"]').click();
    } else if (e.key === 'Backspace') {
        document.querySelector('.calc-btn[data-value="DEL"]').click();
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        const button = document.querySelector(`.calc-btn[data-value="${e.key}"]`);
        if (button) button.click();
    }
});