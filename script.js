/* ==========================================================================
   AULA 3 & 4: INTERATIVIDADE E MANIPULAÇÃO DINÂMICA DO DOM
   ========================================================================== */

// Aguarda o DOM estar 100% carregado antes de executar o script
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. CONTROLE DO MODO ESCURO
    const btnMode = document.getElementById('toggle-dark-mode');
    if (btnMode) {
        btnMode.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
        });
    }

    // 2. LÓGICA DO JOGO DA MEMÓRIA TEMÁTICO
    const icones = ['🤖', '🤖', '🛡️', '🛡️', '🔍', '🔍', '📱', '📱', '🔐', '🔐', '📡', '📡'];
    let cartasViradas = [];
    let acertosMemoria = 0;
    let jogoBloqueado = false;

    function criarJogo() {
        const board = document.getElementById('memoria-board');
        if (!board) return;

        // Embaralha os ícones de forma aleatória
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
        
        // Evita cliques múltiplos na mesma carta ou com o tabuleiro bloqueado
        if (jogoBloqueado) return;
        if (cartaClicada.classList.contains('virada') || cartaClicada.classList.contains('par-encontrado')) return;

        cartaClicada.classList.add('virada');
        cartasViradas.push(cartaClicada);
        
        if (cartasViradas.length === 2) {
            jogoBloqueado = true; // Bloqueia novos cliques até processar o par
            checarPar();
        }
    }

    function checarPar() {
        const [carta1, carta2] = cartasViradas;
        
        if (carta1.dataset.value === carta2.dataset.value) {
            carta1.classList.add('par-encontrado');
            carta2.classList.add('par-encontrado');
            acertosMemoria++;
            cartasViradas = [];
            jogoBloqueado = false;
            
            if (acertosMemoria === icones.length / 2) {
                const msg = document.getElementById('memoria-mensagem');
                if (msg) {
                    msg.classList.remove('hidden');
                    msg.innerHTML = "🎉 Parabéns! Você encontrou todas as conexões seguras!";
                }
            }
        } else {
            // Se as cartas forem diferentes, vira de volta após 1 segundo
            setTimeout(() => {
                carta1.classList.remove('virada');
                carta2.classList.remove('virada');
                cartasViradas = [];
                jogoBloqueado = false;
            }, 1000);
        }
    }

    // Inicializa o jogo automaticamente ao abrir a página
    criarJogo();
});

// 3. FERRAMENTA: ANALISADOR DE LINKS SUSPEITOS
function analisarLink() {
    const urlInput = document.getElementById('url-input');
    const resultadoDiv = document.getElementById('resultado-link');
    
    if (!urlInput || !resultadoDiv) return;
    
    const valorUrl = urlInput.value.trim();
    if (!valorUrl) return;

    resultadoDiv.classList.remove('hidden');
    
    if (valorUrl.includes("fake") || valorUrl.includes("urgente") || valorUrl.includes("ganhe-dinheiro")) {
        resultadoDiv.style.borderColor = "#dc3545";
        resultadoDiv.innerHTML = "⚠️ Padrão suspeito detectado na URL. Evite compartilhar links alarmistas sem antes cruzar informações.";
    } else {
        resultadoDiv.style.borderColor = "#28a745";
        resultadoDiv.innerHTML = "✅ Formato padrão estruturado. Lembre-se sempre de checar fontes jornalísticas confiáveis.";
    }
}

// 4. COMPONENTE: VALIDADOR DO QUIZ CRÍTICO
function validarQuiz() {
    const p1 = document.querySelector('input[name="p1"]:checked');
    const resultadoDiv = document.getElementById('resultado-quiz');
    
    if (!resultadoDiv) return;

    resultadoDiv.classList.remove('hidden');
    
    if (p1 && p1.value === "correto") {
        resultadoDiv.style.borderColor = "#28a745";
        resultadoDiv.innerHTML = "📊 Resposta Correta! Você conhece os sinais críticos visuais para detectar mídias manipuladas.";
    } else {
        resultadoDiv.style.borderColor = "#dc3545";
        resultadoDiv.innerHTML = "❌ Resposta incorreta ou vazia. Lembre-se: piscadas não naturais e falhas de áudio denunciam deepfakes.";
    }
}
