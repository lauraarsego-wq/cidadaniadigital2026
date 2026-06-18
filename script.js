// --- Lógica do Jogo da Memória ---

// Dados do jogo: 4 pares de conceitos (Total de 8 cartas)
const itensMemoria = [
    { id: 1, texto: "Deepfake" }, { id: 1, texto: "Deepfake" },
    { id: 2, texto: "Checar Fonte" }, { id: 2, texto: "Checar Fonte" },
    { id: 3, texto: "Fato" }, { id: 3, texto: "Fato" },
    { id: 4, texto: "Fake News" }, { id: 4, texto: "Fake News" }
];

// Embaralha as cartas de forma simples
itensMemoria.sort(() => Math.random() - 0.5);

const gridMemoria = document.getElementById('grid-memoria');
const placarPares = document.getElementById('pares-encontrados');

// Variáveis de controle de estado (Exigência Nível 4)
let cartasViradas = [];
let paresEncontrados = 0;

// Criação dinâmica das cartas no DOM
itensMemoria.forEach((item, index) => {
    const cartaElemento = document.createElement('div');
    cartaElemento.classList.add('carta');
    cartaElemento.dataset.id = item.id;
    cartaElemento.dataset.index = index;
    cartaElemento.textContent = "?"; // Texto inicial oculto

    cartaElemento.addEventListener('click', virarCarta);
    gridMemoria.appendChild(cartaElemento);
});

function virarCarta() {
    const cartaSelecionada = this;

    // Evita clicar na mesma carta ou em cartas já combinadas
    if (cartasViradas.length >= 2 || cartaSelecionada.classList.contains('virada') || cartaSelecionada.classList.contains('combinada')) {
        return;
    }

    // Revela o texto da carta e adiciona a classe visual
    cartaSelecionada.textContent = itensMemoria[cartaSelecionada.dataset.index].texto;
    cartaSelecionada.classList.add('virada');
    cartasViradas.push(cartaSelecionada);

    // Se duas cartas foram viradas, processa a informação
    if (cartasViradas.length === 2) {
        verificarCombinacao();
    }
}

function verificarCombinacao() {
    const [carta1, carta2] = cartasViradas;

    if (carta1.dataset.id === carta2.dataset.id) {
        // Sucesso: Atualiza o estado das cartas para combinadas
        carta1.classList.remove('virada');
        carta2.classList.remove('virada');
        carta1.classList.add('combinada');
        carta2.classList.add('combinada');
        
        // Incrementa a variável de processamento e atualiza o DOM
        paresEncontrados = paresEncontrados + 1;
        placarPares.textContent = paresEncontrados;
        
        cartasViradas = [];
    } else {
        // Erro: Desvira as cartas após 1 segundo
        setTimeout(() => {
            carta1.textContent = "?";
            carta2.textContent = "?";
            carta1.classList.remove('virada');
            carta2.classList.remove('virada');
            cartasViradas = [];
        }, 1000);
    }
}
