const quizForm = document.getElementById('quiz-form');
const submitBtn = document.getElementById('submit-btn');
const resultsDiv = document.getElementById('results');
const scoreSpan = document.getElementById('score');
const feedbackContainer = document.getElementById('feedback-container');

const correctAnswers = {
    q1: 'c',
    q2: 'b',
    q3: 'a',
    q4: 'b',
    q5: 'c',
    q6: 'b',
    q7: 'b',
    q8: 'b',
    q9: 'b',
    q10: 'c'
};

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

submitBtn.addEventListener('click', () => {
    let score = 0;
    feedbackContainer.innerHTML = '';
    const questions = document.querySelectorAll('.question');
    
    questions.forEach((question, index) => {
        const questionName = `q${index + 1}`;
        const userAnswer = quizForm.elements[questionName].value;
        const correctAnswer = correctAnswers[questionName];
        const correctRationale = rationales[questionName];
        const correctOptionText = getCorrectOptionText(question, correctAnswer);
        
        const feedbackItem = document.createElement('div');
        feedbackItem.classList.add('feedback-item');
        
        if (userAnswer === correctAnswer) {
            score++;
            feedbackItem.innerHTML = `
                <p class="correct">Questão ${index + 1}: Resposta correta!</p>
                <p class="info">${correctOptionText}</p>
                <p class="info"><strong>Explicação:</strong> ${correctRationale}</p>
            `;
        } else {
            const selectedOption = question.querySelector(`input[name="${questionName}"]:checked`);
            const selectedText = selectedOption ? selectedOption.nextElementSibling.textContent : 'Não respondida';

            feedbackItem.innerHTML = `
                <p class="incorrect">Questão ${index + 1}: Resposta incorreta.</p>
                <p>Sua resposta: ${selectedText}</p>
                <p>A resposta correta é: ${correctOptionText}</p>
                <p class="info"><strong>Explicação:</strong> ${correctRationale}</p>
            `;
        }
        feedbackContainer.appendChild(feedbackItem);
    });

    scoreSpan.textContent = score;
    resultsDiv.style.display = 'block';
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
});

function getCorrectOptionText(questionElement, correctAnswerValue) {
    const options = questionElement.querySelectorAll('.options input');
    let correctText = '';
    options.forEach(option => {
        if (option.value === correctAnswerValue) {
            correctText = option.nextElementSibling.textContent;
        }
    });
    return correctText;
}