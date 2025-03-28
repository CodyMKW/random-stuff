let startTime;
let endTime;
let isCheatActive = false;

const startButton = document.getElementById('startButton');
const result = document.getElementById('result');

startButton.addEventListener('click', () => {
  if (startButton.classList.contains('ready')) {
    endTime = new Date();
    const reactionTime = isCheatActive ? 150 : endTime - startTime;
    result.textContent = `Your reaction time: ${reactionTime} ms`;
    startButton.textContent = 'Play Again';
    startButton.classList.remove('ready');
    isCheatActive = false;
  } else {
    result.textContent = '';
    startButton.textContent = 'Wait for Green';
    startButton.style.backgroundColor = '#333333';
    const randomDelay = Math.floor(Math.random() * 5000) + 1000;
    setTimeout(() => {
      startTime = new Date();
      startButton.classList.add('ready');
      startButton.textContent = 'Click!';
    }, randomDelay);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'c' || event.key === 'C') {
    isCheatActive = true;
  }
});
