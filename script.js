document.addEventListener("DOMContentLoaded", function () {
  const inputsFirstScreen = document.querySelectorAll('.container:first-child .question input[type="text"], .container:first-child .question input[type="radio"], .container:first-child .question select');
  const inputsSecondScreen = document.querySelectorAll('.container:last-child .question input[type="text"], .container:last-child .question input[type="radio"], .container:last-child .question select');
  const progressBar = document.querySelector('.progress-bar .progress');
  const main = document.querySelectorAll('.main');

  let totalInputsFirstScreen = inputsFirstScreen.length;
  let totalInputsSecondScreen = inputsSecondScreen.length;
  let currentQuestion = 0;

  Array.from(main).forEach((element, index) => {
    if (index !== 0) {
      element.style.display = 'none';
    }
  });

  function updateProgressBar() {
    let filledInputsFirstScreen = 0;
    let filledInputsSecondScreen = 0;

    inputsFirstScreen.forEach(input => {
      if ((input.tagName.toLowerCase() === 'input' && input.type === 'text' && input.value.trim().length >= 3) ||
        (input.tagName.toLowerCase() === 'select' && input.value.trim() !== '') ||
        (input.type === 'radio' && input.checked)) {
        filledInputsFirstScreen++;
      }
    });

    inputsSecondScreen.forEach(input => {
      if ((input.tagName.toLowerCase() === 'input' && input.type === 'text' && input.value.trim().length >= 3) ||
        (input.tagName.toLowerCase() === 'select' && input.value.trim() !== '') ||
        (input.type === 'radio' && input.checked)) {
        filledInputsSecondScreen++;
      }
    });

    const totalFilledInputs = filledInputsFirstScreen + filledInputsSecondScreen;
    const totalInputs = totalInputsFirstScreen + totalInputsSecondScreen;
    const percentage = (totalFilledInputs / totalInputs) * 100;
    progressBar.style.width = percentage + '%';
  }

  function showNextQuestion() {
    main[currentQuestion].style.display = 'none';
    currentQuestion++;
    main[currentQuestion].style.display = 'block';
    updateProgressBar();
  }

  function showPreviousQuestion() {
    main[currentQuestion].style.display = 'none';
    currentQuestion--;
    main[currentQuestion].style.display = 'block';
    updateProgressBar();
  }

  document.querySelector('.next-btn').addEventListener('click', function () {
    if (currentQuestion === 0) {
      showNextQuestion();
    }
  });

  document.querySelector('.save-btn').addEventListener('click', function () {
    if (currentQuestion === 1) {
      showPreviousQuestion();
    }
  });

  inputsFirstScreen.forEach(input => {
    input.addEventListener('input', updateProgressBar);
  });

  inputsSecondScreen.forEach(input => {
    input.addEventListener('input', updateProgressBar);
  });

  updateProgressBar();
});