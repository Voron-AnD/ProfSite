document.addEventListener('DOMContentLoaded', function () {
   // Загрузка вопросов из JSON файла
   fetch('questions.json')
      .then(response => response.json())
      .then(data => setupQuiz(data))
      .catch(error => console.error('Ошибка загрузки вопросов:', error));

   // Функция для создания формы теста
   function setupQuiz(questions) {
      const form = document.getElementById("quiz-form");

      questions.forEach((question, index) => {
         const questionContainer = document.createElement("div");
         questionContainer.classList.add("question-container");

         const questionElement = document.createElement("p");
         questionElement.textContent = `${index + 1}. ${question.question}`;
         questionContainer.appendChild(questionElement);

         const answerList = document.createElement("ul");
         question.answers.forEach((answer, answerIndex) => {
            const listItem = document.createElement("li");
            const input = document.createElement("input");
            input.type = "radio";
            input.name = `question${index}`;
            input.value = answerIndex + 1;
            input.required = true;

            const label = document.createElement("label");
            label.textContent = answer;

            listItem.appendChild(input);
            listItem.appendChild(label);
            answerList.appendChild(listItem);
         });

         questionContainer.appendChild(answerList);
         form.appendChild(questionContainer);
      });
   }

   // Обработчик кнопки "Получить результат"
   document.getElementById("calculate-result").addEventListener("click", function () {
      // Вызвать функцию для расчета результата теста
      calculateResult();
      // Показать кнопки "Пройти тест ещё раз" и "На главную"
      document.getElementById("retry-test").style.display = "inline-block";
      document.getElementById("go-to-main").style.display = "inline-block";
   });

   // Обработчик кнопки "Пройти тест ещё раз"
   document.getElementById("retry-test").addEventListener("click", function () {
      // Сбросить результаты теста
      resetResult();
      // Скрыть кнопки "Пройти тест ещё раз" и "На главную"
      document.getElementById("retry-test").style.display = "none";
      document.getElementById("go-to-main").style.display = "none";
   });

   // Обработчик кнопки "На главную"
   document.getElementById("go-to-main").addEventListener("click", function () {
      // Перейти на главную страницу
      window.location.href = "../index.html"; // Замените "main.html" на адрес вашей главной страницы
   });
});

// Функция для расчета результата теста
function calculateResult() {
   const inputs = document.querySelectorAll("input[type=radio]:checked");
   const totalQuestions = document.querySelectorAll(".question-container").length;

   // Проверяем, что ответы даны на все вопросы
   if (inputs.length < totalQuestions) {
      alert("Ответьте на все вопросы!");
      return;
   }

   // Продолжаем вычисления результата
   const scores = {
      сварщик: 0,
      тракторист: 0,
      водитель: 0
   };

   inputs.forEach(input => {
      const questionIndex = input.name.replace("question", "");
      const answerIndex = parseInt(input.value) - 1;
      const profession = Object.keys(scores)[answerIndex];
      scores[profession]++;
   });

   const result = document.getElementById("result");
   const maxScore = Math.max(...Object.values(scores));
   const resultProfession = Object.keys(scores).find(profession => scores[profession] === maxScore);

   result.textContent = `Ваша подходящая профессия: ${resultProfession}`;
}

// Функция для сброса результатов теста
function resetResult() {
   // Очистить результаты теста
   const result = document.getElementById("result");
   result.textContent = "";

   // Очистить выбранные ответы
   const inputs = document.querySelectorAll("input[type=radio]:checked");
   inputs.forEach(input => {
      input.checked = false;
   });
}
