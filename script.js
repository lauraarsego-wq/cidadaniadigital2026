// Breves comentários explicativos para atender à Subcategoria C - Nível 4

// 1. Controle do Botão de Acessibilidade (Modo Escuro)
const toggleBtn = document.getElementById('toggle-dark-mode');
toggleBtn.addEventListener('click', () => {
    // Altera a classe no body disparando a transição do CSS
    document.body.classList.toggle('dark-mode');
});

// 2. Validador Logístico e Estatístico do Link
const urlForm = document.getElementById('url-form');
const urlInput = document.getElementById('user-url');
const urlFeedback = document.getElementById('url-feedback');

urlForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Impede o recarregamento padrão da página
    
    const urlValue = urlInput.value.trim();
    urlFeedback.classList.remove('hidden', 'success', 'danger');

    // Validação inicial básica de presença de valor
    if (!urlValue) {
        urlFeedback.textContent = "⚠️ Por favor, digite uma URL para prosseguir.";
        urlFeedback.classList.add('danger');
        return;
    }

    // Processamento lógico de variáveis antes da amostragem em tela
    const naoSeguro = urlValue.startsWith('http://');
    const contemPalavrasChaveFalsas = urlValue.includes('noticia-fake') || urlValue.includes('ganhe-gratis');

    if (naoSeguro || contemPalavrasChaveFalsas) {
        urlFeedback.textContent = "❌ Alerta de Risco! Este link não usa criptografia segura (HTTPS) ou possui termos comumente associados a golpes cibernéticos.";
        urlFeedback.classList.add('danger');
    } else {
        urlFeedback.textContent = "✅ Estrutura Básica Aceitável! O link utiliza protocolo seguro. Lembre-se de sempre checar o autor e a data de publicação da matéria.";
        urlFeedback.classList.add('success');
    }
});

// 3. Validador do Quiz de Combate à Desinformação
const quizForm = document.getElementById('quiz-form');
const quizFeedback = document.getElementById('quiz-feedback');

quizForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    // Captura as respostas marcadas pelos seletores
    const q1Answer = document.querySelector('input[name="q1"]:checked');
    const q2Answer = document.querySelector('input[name="q2"]:checked');
    
    quizFeedback.classList.remove('hidden', 'success', 'danger');

    // Verifica se o usuário deixou alguma pergunta sem resposta
    if (!q1Answer || !q2Answer) {
        quizFeedback.textContent = "⚠️ Responda todas as perguntas do jogo antes de submeter!";
        quizFeedback.classList.add('danger');
        return;
    }

    // Processamento de pontuação em variáveis numéricas explícitas
    let pontuacaoFinal = 0;
    if (q1Answer.value === 'correto') pontuacaoFinal += 50;
    if (q2Answer.value === 'correto') pontuacaoFinal += 50;

    // Atualiza dinamicamente o DOM com base nos resultados processados
    if (pontuacaoFinal === 100) {
        quizFeedback.textContent = `🎉 Parabéns! Você fez ${pontuacaoFinal} pontos. Suas habilidades de navegação crítica estão excelentes!`;
        quizFeedback.classList.add('success');
    } else {
        quizFeedback.textContent = `💥 Você marcou ${pontuacaoFinal} pontos. Revise os conceitos sobre mídias sintéticas e tente novamente para melhorar sua segurança digital!`;
        quizFeedback.classList.add('danger');
    }
});
