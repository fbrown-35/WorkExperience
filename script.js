function generateDataUnitsQuestion() {
    return {
        question: 'How many MB in 1 GB?',
        answer: '1000',
        hasBinaryGrid: false,
        hasHexGrid: false
    };
}

function generateDecimalToBinaryQuestion() {
    const decimal = Math.floor(Math.random() * 256);
    const binary = decimal.toString(2).padStart(8, '0');
    return {
        question: `What is decimal ${decimal} in 8-bit binary?`,
        answer: binary,
        hasBinaryGrid: true,
        hasHexGrid: false
    };
}

function generateBinaryToDecimalQuestion() {
    const binary = Array.from({length: 8}, () => Math.floor(Math.random() * 2)).join('');
    const decimal = parseInt(binary, 2);
    return {
        question: `What is binary ${binary} in decimal?`,
        answer: decimal.toString(),
        hasBinaryGrid: false,
        hasHexGrid: false
    };
}

function generateHexToBinaryQuestion() {
    const hex = Math.floor(Math.random() * 256).toString(16).padStart(2, '0').toUpperCase();
    const binary = parseInt(hex, 16).toString(2).padStart(8, '0');
    return {
        question: `What is hexadecimal ${hex} in 8-bit binary?`,
        answer: binary,
        hasBinaryGrid: true,
        hasHexGrid: false
    };
}

function generateBinaryToHexQuestion() {
    const binary = Array.from({length: 8}, () => Math.floor(Math.random() * 2)).join('');
    const hex = parseInt(binary, 2).toString(16).padStart(2, '0').toUpperCase();
    return {
        question: `What is binary ${binary} in hexadecimal?`,
        answer: hex,
        hasBinaryGrid: false,
        hasHexGrid: false
    };
}

function generateHexToDecimalQuestion() {
    const hex = Math.floor(Math.random() * 256).toString(16).padStart(2, '0').toUpperCase();
    const decimal = parseInt(hex, 16);
    return {
        question: `What is hexadecimal ${hex} in decimal?`,
        answer: decimal.toString(),
        hasBinaryGrid: false,
        hasHexGrid: false
    };
}

function generateDecimalToHexQuestion() {
    const decimal = Math.floor(Math.random() * 256);
    const hex = decimal.toString(16).padStart(2, '0').toUpperCase();
    return {
        question: `What is decimal ${decimal} in hexadecimal?`,
        answer: hex,
        hasBinaryGrid: false,
        hasHexGrid: false
    };
}

function createQuestionBox(question, answer, hasBinaryGrid, hasHexGrid) {
    const questionBox = document.createElement('div');
    questionBox.className = 'question-box';
    questionBox.dataset.correctAnswer = answer;
    let html = `<p class="question-text">${question}</p>`;
    if (hasBinaryGrid) {
        html += '<p class="number-grid">128 64 32 16 8 4 2 1</p>';
    }
    if (hasHexGrid) {
        html += '<p class="number-grid">8 4 2 1 8 4 2 1</p>';
    }
    html += '<input type="text" class="answer-input">';
    html += '<button class="submit-button">Submit</button>';
    html += '<img src="assets/correct.png" class="img-correct" alt="Correct">';
    html += '<img src="assets/incorrect.png" class="img-incorrect" alt="Incorrect">';
    questionBox.innerHTML = html;
    return questionBox;
}

function generateQuestionsForTab(tabId) {
    const container = document.querySelector(`#${tabId} .questions-container`);
    container.innerHTML = '';
    const questionTypes = tabId === 'data-binary-quiz' ? [
        generateDataUnitsQuestion,
        generateDecimalToBinaryQuestion,
        generateBinaryToDecimalQuestion,
        generateHexToBinaryQuestion,
        generateBinaryToHexQuestion,
        generateHexToDecimalQuestion,
        generateDecimalToHexQuestion
    ] : [
        generateDecimalToHexQuestion,
        generateHexToDecimalQuestion,
        generateBinaryToHexQuestion,
        generateHexToBinaryQuestion,
        generateDecimalToHexQuestion,
        generateHexToDecimalQuestion,
        generateBinaryToHexQuestion,
        generateHexToBinaryQuestion,
        generateDecimalToHexQuestion,
        generateHexToDecimalQuestion
    ];
    for (let i = 0; i < 10; i++) {
        const questionType = questionTypes[i % questionTypes.length];
        const { question, answer, hasBinaryGrid, hasHexGrid } = questionType();
        const questionBox = createQuestionBox(question, answer, hasBinaryGrid, hasHexGrid);
        container.appendChild(questionBox);
    }
}

function bindSubmitButtons() {
    document.querySelectorAll('.submit-button').forEach(button => {
        button.onclick = function () {
            const questionBox = this.closest('.question-box');
            const userAnswer = questionBox.querySelector('.answer-input').value.trim();
            const correctAnswer = questionBox.dataset.correctAnswer;
            const submitButton = questionBox.querySelector('.submit-button');
            const inputBox = questionBox.querySelector('.answer-input');
            const imageCorrect = questionBox.querySelector('.img-correct');
            const imageIncorrect = questionBox.querySelector('.img-incorrect');
            const scoreCounter = document.querySelector('.score-counter');
            let score = parseInt(scoreCounter.textContent.split(': ')[1].split('/')[0]);
            submitButton.classList.remove('correct-answer-button', 'incorrect-answer-button');
            submitButton.style.backgroundColor = '#007bff';
            if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
                submitButton.classList.add('correct-answer-button');
                inputBox.style.backgroundColor = '#55ff55';
                inputBox.style.opacity = 0.5;
                imageCorrect.style.opacity = 1;
                imageCorrect.style.height = '100px';
                imageIncorrect.style.opacity = 0;
                imageIncorrect.style.height = '0px';
                score++;
                scoreCounter.innerHTML = 'Score: ' + score + '/10';
            } else {
                submitButton.classList.add('incorrect-answer-button');
                inputBox.style.backgroundColor = '#ff5555';
                inputBox.style.opacity = 0.5;
                imageCorrect.style.opacity = 0;
                imageCorrect.style.height = '0px';
                imageIncorrect.style.opacity = 1;
                imageIncorrect.style.height = '100px';
            }
        };
    });
}

document.addEventListener('DOMContentLoaded', function() {
    generateQuestionsForTab('data-binary-quiz');
    generateQuestionsForTab('hex-quiz');
    bindSubmitButtons();
});

document.querySelectorAll('.tab-button').forEach(button => {
    button.addEventListener('click', () => {
        const tabId = button.dataset.tab;
        document.querySelectorAll('.tab-page').forEach(page => {
            page.classList.add('hidden');
        });
        document.getElementById(tabId).classList.remove('hidden');
        document.querySelectorAll('.tab-button').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');
        bindSubmitButtons();
    });
});