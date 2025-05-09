// Configurações
const config = {
    starCount: 500,
    maxStarSize: 3,
    minStarSize: 1,
    speed: 0.05,
    constellations: [
        { name: "Kauane,", x: 0.2, y: 0.3 },
        { name: "te amo!", x: 0.7, y: 0.2 },
        { name: "eu", x: 0.5, y: 0.7 }
    ],
    specialDate: new Date(2023, 5, 24) // 24 de Junho de 2023
};

// Elementos
const starContainer = document.getElementById('star-container');
const toggleBtn = document.getElementById('toggle-animation');
const densityBtn = document.getElementById('change-density');
const dateDisplay = document.getElementById('special-date');

// Estado
let stars = [];
let animationId = null;
let isAnimating = true;
let currentDensity = 1;

// Formatador de data
function formatDate(date) {
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('pt-BR', options);
}

// Atualiza a exibição da data
dateDisplay.textContent = formatDate(config.specialDate);

// Cria estrelas
function createStars() {
    starContainer.innerHTML = '';
    stars = [];
    
    // Adiciona constelações
    config.constellations.forEach(cons => {
        const el = document.createElement('div');
        el.className = 'constellation';
        el.textContent = cons.name;
        el.style.left = `${cons.x * 100}%`;
        el.style.top = `${cons.y * 100}px`;
        starContainer.appendChild(el);
    });
    
    // Adiciona a lua   
    const moon = document.createElement('div');
    moon.className = 'moon';
    moon.style.left = '75%';
    moon.style.top = '15%';
    starContainer.appendChild(moon);
    
    // Cria estrelas
    for (let i = 0; i < config.starCount * currentDensity; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // Tamanho aleatório
        const size = Math.random() * (config.maxStarSize - config.minStarSize) + config.minStarSize;
        
        // Posição aleatória
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        // Opacidade aleatória
        const opacity = Math.random() * 0.8 + 0.2;
        
        // Cor aleatória (maior chance de ser branca/azulada)
        const colors = ['#ffffff', '#f5f7fa', '#aac8ff', '#d1e3ff'];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        star.style.opacity = opacity;
        star.style.backgroundColor = color;
        star.style.borderRadius = '50%';
        star.style.position = 'absolute';
        star.style.boxShadow = `0 0 ${size * 2}px ${color}`;
        
        // Adiciona animação de brilho
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite alternate`;
        
        starContainer.appendChild(star);
        stars.push({
            element: star,
            x, y,
            size,
            speed: config.speed * (Math.random() * 0.5 + 0.5),
            angle: Math.random() * Math.PI * 2
        });
    }
}

// Anima as estrelas
function animateStars() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    stars.forEach(star => {
        // Move as estrelas em pequenos círculos para simular cintilação
        star.angle += star.speed * 0.01;
        
        const newX = star.x + Math.cos(star.angle) * star.size;
        const newY = star.y + Math.sin(star.angle) * star.size * 0.5;
        
        star.element.style.left = `${newX}px`;
        star.element.style.top = `${newY}px`;
        
        // Efeito de parallax para estrelas maiores (mais próximas)
        const parallaxX = (centerX - newX) * star.size * 0.0005;
        const parallaxY = (centerY - newY) * star.size * 0.0005;
        
        star.element.style.transform = `translate(${parallaxX}px, ${parallaxY}px)`;
    });
    
    if (isAnimating) {
        animationId = requestAnimationFrame(animateStars);
    }
}

// Inicia a animação
function startAnimation() {
    if (!animationId) {
        isAnimating = true;
        animateStars();
    }
}

// Pausa a animação
function stopAnimation() {
    isAnimating = false;
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = null;
    }
}

// Event listeners
toggleBtn.addEventListener('click', () => {
    if (isAnimating) {
        stopAnimation();
        toggleBtn.textContent = 'Continuar Animação';
    } else {
        startAnimation();
        toggleBtn.textContent = 'Pausar Animação';
    }
});

densityBtn.addEventListener('click', () => {
    currentDensity = currentDensity === 1 ? 1.5 : currentDensity === 1.5 ? 0.5 : 1;
    createStars();
    if (isAnimating) {
        startAnimation();
    }
    densityBtn.textContent = 
        currentDensity === 1 ? 'Mais Estrelas' : 
        currentDensity === 1.5 ? 'Menos Estrelas' : 'Densidade Normal';
});

// Redimensionamento
window.addEventListener('resize', () => {
    createStars();
    if (isAnimating) {
        startAnimation();
    }
});

// Inicialização
createStars();
startAnimation();