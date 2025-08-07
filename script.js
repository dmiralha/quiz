document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quiz-form');
    const resultsDiv = document.getElementById('results');
    const scoreSpan = document.getElementById('score');
    const totalQuestionsSpan = document.getElementById('total-questions');
    let score = 0;
    let answeredQuestionsCount = 0;
    const totalQuestions = document.querySelectorAll('.question').length;
    totalQuestionsSpan.textContent = totalQuestions;

    const rationales = {
        q1: 'O número de combinações é obtido multiplicando-se o número de opções de cada categoria: 3 x 4 x 5 = 60.',
        q2: 'Multiplicando as opções de cada categoria (2 x 3 x 2), obtemos 12 combinações diferentes.',
        q3: 'Multiplicando o número de escolhas em cada categoria (3 x 4 x 2), você obtém 24 combinações diferentes de saladas.',
        q4: 'Esta afirmação é uma tese, pois apresenta uma ideia que pode ser sustentada por argumentos científicos e evidências.',
        q5: 'Esta afirmação é uma observação sobre preferências, mas não é um argumento que sustenta a importância da hidratação para o funcionamento do corpo.',
        q6: 'Este argumento sustenta a tese ao explicar como os vegetais contribuem para a nutrição completa através de seus nutrientes.',
        q7: 'O alto teor de açúcares, gorduras e sódio em ultraprocessados (causa) contribui para o ganho de peso e o risco de doenças crônicas como diabetes tipo 2.',
        q8: 'A prática regular de atividade física (causa) comprovadamente leva à melhora da saúde cardiovascular e ao fortalecimento muscular (consequências).',
        q9: 'A baixa ingestão de fibras (causa) está associada a um maior risco de doenças cardiovasculares e problemas digestivos, como o câncer de cólon (consequências).',
        q10: 'O alto teor de açúcar nessas bebidas (causa) contribui diretamente para o ganho de peso, resistência à insulina (levando a diabetes tipo 2) e cáries dentárias (consequências).'
    };

    const questions = document.querySelectorAll('.question');

    questions.forEach(question => {
        const questionName = question.querySelector('input').name;
        const correctAnswer = question.dataset.correctAnswer;
        const feedbackBox = question.querySelector('.feedback-box');
        const options = question.querySelectorAll('input[type="radio"]');

        options.forEach(option => {
            option.addEventListener('change', (event) => {
                const userAnswer = event.target.value;
                const isCorrect = userAnswer === correctAnswer;

                // Disable all options for this question
                options.forEach(opt => {
                    opt.disabled = true;
                    opt.parentElement.classList.add('answered');
                });
                
                // Highlight the user's choice and the correct choice
                const selectedLabel = event.target.parentElement;
                if (isCorrect) {
                    selectedLabel.classList.add('correct-option');
                    score++;
                } else {
                    selectedLabel.classList.add('incorrect-option');
                    const correctLabel = question.querySelector(`input[value="${correctAnswer}"]`).parentElement;
                    correctLabel.classList.add('correct-option');
                }

                // Show feedback
                const rational = rationales[questionName];
                const feedbackContent = isCorrect
                    ? `<p class="correct">Resposta correta!</p><p class="info"><strong>Explicação:</strong> ${rational}</p>`
                    : `<p class="incorrect">Resposta incorreta.</p><p class="info"><strong>Explicação:</strong> ${rational}</p>`;
                
                feedbackBox.innerHTML = feedbackContent;
                feedbackBox.style.display = 'block';

                answeredQuestionsCount++;
                scoreSpan.textContent = score;

                // Show final results when all questions are answered
                if (answeredQuestionsCount === totalQuestions) {
                    resultsDiv.style.display = 'block';
                    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                }
            });
        });
    });
});