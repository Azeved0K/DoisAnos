// Lista de motivos com emojis e fotos correspondentes
const reasons = [
    { text: "Seu sorriso ilumina meu dia", emoji: "😊", foto: "nos.jpg" },
    { text: "Seu abraço aconchegante", emoji: "🤗", foto: "nos2.jpg" },
    { text: "Seu jeito de cuidar de mim", emoji: "🥰", foto: "nos3.jpg" },
    { text: "Sua voz que me acalma", emoji: "🎶", foto: "nos4.jpg" },
    { text: "Seu olhar que me derrete", emoji: "😍", foto: "nos5.jpg" },
    { text: "Sua paciência comigo", emoji: "🧘", foto: "nos6.jpg" },
    { text: "Seu senso de humor", emoji: "😂", foto: "nos7.jpg" },
    { text: "Sua inteligência", emoji: "🧠", foto: "nos8.jpg" },
    { text: "Seu cheiro", emoji: "👃", foto: "nos9.jpg" },
    { text: "Seu coração bondoso", emoji: "💖", foto: "nos10.jpg" },
    { text: "Seu apoio incondicional", emoji: "💪", foto: "nos11.jpg" },
    { text: "Sua coragem", emoji: "🦁", foto: "nos12.jpg" },
    { text: "Seu jeito único de ser", emoji: "✨", foto: "nos13.jpg" },
    { text: "Sua paixão pelas coisas", emoji: "🔥", foto: "nos14.jpg" },
    { text: "Seu toque especial", emoji: "👐", foto: "nos15.jpg" },
    { text: "Sua companhia que me completa", emoji: "👫", foto: "nos16.jpg" },
    { text: "Seus pequenos gestos", emoji: "💝", foto: "nos17.jpg" },
    { text: "Sua honestidade", emoji: "📜", foto: "nos18.jpg" },
    { text: "Seu amor incondicional", emoji: "💞", foto: "nos19.jpg" },
    { text: "Porque você é você", emoji: "🌟", foto: "nos20.jpg" }
];

// Elementos do DOM
const reasonsContainer = document.getElementById('reasonsContainer');
const showReasonBtn = document.getElementById('showReasonBtn');
const counter = document.getElementById('counter');

// Estado
let revealedCount = 0;
const maxReasons = reasons.length;
let usedIndexes = [];

// Atualiza o contador
function updateCounter() {
    counter.textContent = `${revealedCount}/${maxReasons} motivos revelados`;
}

// Mostra um motivo aleatório
function showRandomReason() {
    if (revealedCount >= maxReasons) {
        showReasonBtn.disabled = true;
        showReasonBtn.textContent = "Todos os motivos revelados!";
        return;
    }
    
    // Encontra um índice não utilizado
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * maxReasons);
    } while (usedIndexes.includes(randomIndex));
    
    usedIndexes.push(randomIndex);
    revealedCount++;
    updateCounter();
    
    // Cria o card do motivo
    const reason = reasons[randomIndex];
    const reasonCard = document.createElement('div');
    reasonCard.className = 'reason-card';
    
    reasonCard.innerHTML = `
        ${reason.foto ? `<img src="motivos/imgs/${reason.foto}" class="foto" alt="${reason.text}">` : `<div class="emoji">${reason.emoji}</div>`}
        <div class="reason-text">${reason.text}</div>
    `;
    
    reasonsContainer.appendChild(reasonCard);
    
    // Trigger da animação após um pequeno delay
    setTimeout(() => {
        reasonCard.classList.add('visible');
    }, 10);
    
    // Desabilita o botão se todos os motivos foram mostrados
    if (revealedCount >= maxReasons) {
        showReasonBtn.disabled = true;
        showReasonBtn.textContent = "Todos os motivos revelados! (mas existem muitos outros motivos)";
    }
}

// Event listener para o botão
showReasonBtn.addEventListener('click', showRandomReason);

// Inicializa o contador
updateCounter();

// Mostra o primeiro motivo automaticamente
setTimeout(showRandomReason, 500);