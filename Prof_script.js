document.addEventListener('DOMContentLoaded', function () {
   const swiper = new Swiper('.swiper-container', {
      // Опции
      direction: 'horizontal',
      loop: true,
      keyboard: {
         enabled: true,

      },
      mousewheel: {
         enabled: true,
         speed: 1000, // Устанавливаем скорость прокрутки в миллисекундах (меньше значение - медленнее прокрутка)
      },
      spaceBetween: 20, // Устанавливаем расстояние между слайдами в пикселях
      on: {
         slideChange: function () {
            stopAllVideos(); // Остановить все видео при смене слайда
         },
      },
   });

   function stopAllVideos() {
      const videos = document.querySelectorAll('.video');
      videos.forEach(video => {
         video.pause(); // Приостановить воспроизведение видео
      });
   }
});


document.addEventListener('DOMContentLoaded', function () {
   translatePage('ru');
});

document.getElementById('ru-btn').addEventListener('click', function () {
   translatePage('ru');
});

document.getElementById('be-btn').addEventListener('click', function () {
   translatePage('be');
});

function translatePage(lang) {
   var elements = document.querySelectorAll('[data-ru], [data-be]');
   elements.forEach(function (element) {
      if (lang === 'ru') {
         element.textContent = element.dataset.ru;
      } else if (lang === 'be') {
         element.textContent = element.dataset.be;
      }
   });
}