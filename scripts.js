document.addEventListener('DOMContentLoaded', function () {
   fetch('questions.json')
      .then(response => response.json())
      .then(data => {
         const form = document.getElementById('riasecForm');
         data.questions.forEach((questionObj, index) => {
            const questionDiv = document.createElement('div');
            questionDiv.className = 'question';

            const label = document.createElement('label');
            label.setAttribute('for', `question${index + 1}`);
            label.textContent = `${index + 1}. ${questionObj.question}`;

            const optionsDiv = document.createElement('div');
            optionsDiv.className = 'options';
            questionObj.options.forEach((option, optionIndex) => {
               const optionLabel = document.createElement('label');
               const optionInput = document.createElement('input');
               optionInput.type = 'radio';
               optionInput.name = `question${index + 1}`;
               optionInput.value = option.value;
               optionInput.required = true;
               optionLabel.appendChild(optionInput);
               optionLabel.appendChild(document.createTextNode(option.text));
               optionsDiv.appendChild(optionLabel);
            });

            questionDiv.appendChild(label);
            questionDiv.appendChild(optionsDiv);
            form.appendChild(questionDiv);
         });
      });

   document.getElementById('submitButton').addEventListener('click', function (event) {
      event.preventDefault();
      const form = document.getElementById('riasecForm');
      const formData = new FormData(form);
      const scores = {
         R: 0,
         I: 0,
         A: 0,
         S: 0,
         E: 0,
         C: 0
      };

      let allAnswered = true;
      formData.forEach((value) => {
         if (!value) {
            allAnswered = false;
            return;
         }
         scores[value]++;
      });

      if (!allAnswered) {
         alert('Пожалуйста, ответьте на все вопросы.');
         return;
      }

      const result = `Ваш результат: Реалистический (R): ${scores.R}, Интеллектуальный (I): ${scores.I}, Артистический (A): ${scores.A}, Социальный (S): ${scores.S}, Предприимчивый (E): ${scores.E}, Конвенциональный (C): ${scores.C}`;
      document.getElementById('result').textContent = result;

      document.getElementById('homeButton').style.display = 'block';
   });

   document.getElementById('homeButton').addEventListener('click', function () {
      window.location.href = 'index.html';
   });
});
