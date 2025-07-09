document.querySelectorAll('.submit-button').forEach(button => {
    button.addEventListener('click', function() {
        const questionBox = this.closest('.question-box');
        const userAnswer = questionBox.querySelector('.answer-input').value.trim();
        const correctAnswer = questionBox.dataset.correctAnswer;
        const submitButton = questionBox.querySelector('.submit-button');
        const inputBox = questionBox.querySelector('.answer-input');

        const imageCorrect = questionBox.querySelector('.img-correct');
        const imageIncorrect = questionBox.querySelector('.img-incorrect');

        const scoreCounter = document.querySelector('.score-counter');
        var score = 0;

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
    });
});