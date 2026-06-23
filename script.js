// Controle do Modo Escuro
const btnMode = document.getElementById('toggle-dark-mode');
btnMode.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

// Manipulação do DOM: Validador de Links Simples
function analisarLink() {
    const urlInput = document.getElementById('url-input').value;
    const resultadoDiv = document.getElementById('resultado-link');
    
    if (!urlInput) return;

    resultadoDiv.classList.remove('hidden');
    // Simulação básica de verificação exigida no escopo do projeto
    if (urlInput.includes("fake") || urlInput.includes("verdade-urgente")) {
        resultadoDiv.style.borderColor = "#dc3545";
        resultadoDiv.innerHTML = "⚠️ Atenção: Este link contém padrões frequentemente associados a redes de desinformação automatizada. Verifique fontes oficiais.";
    } else {
        resultadoDiv.style.borderColor = "#28a745";
        resultadoDiv.innerHTML = "✅ O formato do link parece padrão. Lembre-se sempre de cruzar as informações com outras mídias confiáveis.";
    }
}

// Manipulação do DOM: Validador do Quiz
function validarQuiz() {
    const p1 = document.querySelector('input[name="p1"]:checked');
    const p2 = document.querySelector('input[name="p2"]:checked');
    const resultadoDiv = document.getElementById('resultado-quiz');

    if (!p1 || !p2) {
        resultadoDiv.classList.remove('hidden');
        resultadoDiv.style.borderColor = "#ffc107";
        resultadoDiv.innerHTML = "⚠️ Por favor, responda a todas as perguntas antes de enviar.";
        return;
    }

    let acertos = 0;
    if (p1.value === "correto") acertos++;
    if (p2.value === "correto") acertos++;

    resultadoDiv.classList.remove('hidden');
    resultadoDiv.style.borderColor = "#28a745";
    resultadoDiv.innerHTML = `📊 Você acertou ${acertos} de 2 perguntas! ${acertos === 2 ? 'Parabéns! Você tem um ótimo olhar crítico.' : 'Continue estudando os sinais para não ser enganado.'}`;
}

