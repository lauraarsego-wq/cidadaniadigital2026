// Alternador de Modo Escuro
const btnMode = document.getElementById('toggle-dark-mode');
btnMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// LÓGICA DO JOGO DA MEMÓRIA
const icones = ['🤖', '🤖', '🛡️', '🛡️', '🔍', '🔍', '📱', '📱', '🔐', '🔐', '📡', '📡'];
let cartasViradas = [];
let acertosMemoria = 0;

function criarJogo() {
    const board = document.getElementById('memoria-board');
    // Embaralhar ícones
    const iconesEmbaralhados = icones.sort(() => Math.random() - 0.5);
    
    board.innerHTML = '';
    iconesEmbaralhados.forEach((icone, index) => {
        const elementoCarta = document.createElement('div');
        elementoCarta.classList.add('carta');
        elementoCarta.dataset.value = icone;
        elementoCarta.dataset.index = index;
        elementoCarta.innerText = icone;
        elementoCarta.addEventListener('click', virarCarta);
        board.appendChild(elementoCarta);
    });
}

function virarCarta(e) {
    const cartaClicada = e.target;
    
    if (cartasViradas.length < 2 && !cartaClicada.classList.contains('virada') && !cartaClicada.classList.contains('par-encontrado')) {
        cartaClicada.classList.add('virada');
        cartasViradas.push(cartaClicada);
        
        if (cartasViradas.length === 2) {
            checarPar();
        }
    }
}

function checarPar() {
    const [carta1, carta2] = cartasViradas;
    
    if (carta1.dataset.value === carta2.dataset.value) {
        carta1.classList.add('par-encontrado');
        carta2.classList.add('par-encontrado');
        acertosMemoria++;
        cartasViradas = [];
        
        if (acertosMemoria === icones.length / 2) {
            const msg = document.getElementById('memoria-mensagem');
            msg.classList.remove('hidden');
            msg.innerHTML = "🎉 Parabéns! Você encontrou todas as conexões seguras!";
        }
    } else {
        setTimeout(() => {
            carta1.classList.remove('virada');
            carta2.classList.remove('virada');
            cartasViradas = [];
        }, 1000);
    }
}

// Inicializar Jogo da Memória
criarJogo();

// Validador de Links
function analisarLink() {
    const urlInput = document.getElementById('url-input').value;
    const resultadoDiv = document.getElementById('resultado-link');
    if (!urlInput) return;
    resultadoDiv.classList.remove('hidden');
    if (urlInput.includes("fake") || urlInput.includes("urgente")) {
        resultadoDiv.style.borderColor = "#dc3545";
        resultadoDiv.innerHTML = "⚠️ Padrão suspeito detectado na URL.";
    } else {
        resultadoDiv.style.borderColor = "#28a745";
        resultadoDiv.innerHTML = "✅ Formato padrão estruturado.";
    }
}

// Validador do Quiz
function validarQuiz() {
    const p1 = document.querySelector('input[name="p1"]:checked');
    const resultadoDiv = document.getElementById('resultado-quiz');
    resultadoDiv.classList.remove('hidden');
    if (p1 && p1.value === "correto") {
        resultadoDiv.innerHTML = "📊 Resposta Correta! Você conhece os sinais críticos.";
    } else {
        resultadoDiv.innerHTML = "❌ Resposta incorreta ou vazia. Revise os conceitos.";
    }
}
