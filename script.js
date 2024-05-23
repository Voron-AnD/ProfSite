document.addEventListener('DOMContentLoaded', function () {
   fetch('questions.json')
      .then(response => response.json())
      .then(data => renderQuestions(data))
      .catch(error => console.error('Error loading questions:', error));
});

function renderQuestions(questions) {
   const questionsContainer = document.getElementById('questions');
   questions.forEach((question, index) => {
      const questionDiv = document.createElement('div');
      questionDiv.className = 'question';
      questionDiv.innerHTML = `
         <p>${index + 1}. ${question.text}</p>
         <label><input type="radio" name="q${index + 1}" value="${question.options[0].value}"> ${question.options[0].text}</label><br>
         <label><input type="radio" name="q${index + 1}" value="${question.options[1].value}"> ${question.options[1].text}</label>
      `;
      questionsContainer.appendChild(questionDiv);
   });
}

function calculateResult() {
   const form = document.forms['testForm'];
   let scores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
   let allAnswered = true;

   for (let i = 1; i <= 20; i++) {
      const answer = form[`q${i}`].value;
      if (!answer) {
         allAnswered = false;
         break;
      }
      scores[answer]++;
   }

   if (!allAnswered) {
      alert('Ответьте на все вопросы!');
      return;
   }

   const results = [
      'Человек - Природа',
      'Человек - Техника',
      'Человек - Человек',
      'Человек - Знаковая система',
      'Человек - Художественный образ'
   ];

   let maxScore = 0;
   let maxCategory = '';
   for (let key in scores) {
      if (scores[key] > maxScore) {
         maxScore = scores[key];
         maxCategory = results[key - 1];
      }
   }

   document.getElementById('result').innerText = `Ваш тип профессии: ${maxCategory}`;
   document.getElementById('toHome').style.display = 'block'; // Показываем кнопку "На главную"
}

function goToHome() {
   window.location.href = 'index.html'; // Переход на главную страницу
}

