let startTime;
let endTime;
let isCheatActive = false;
let isWaiting = false; // Flag to track if the test is waiting to turn green

const startButton = document.getElementById('startButton');
const result = document.getElementById('result');

startButton.addEventListener('click', () => {
  if (isWaiting) {
    // User clicked too early
    result.textContent = 'Too early! Wait for the green signal.';
    resetTest();
  } else if (startButton.classList.contains('ready')) {
    // User clicked after the button turned green
    endTime = new Date();
    const reactionTime = isCheatActive ? 150 : endTime - startTime;
    result.textContent = `Your reaction time: ${reactionTime} ms${isCheatActive ? ' (you cheating bastard!)' : ''}`;
    resetTest();
  } else {
    // Start the test
    result.textContent = '';
    startButton.textContent = 'Wait for Green';
    startButton.classList.remove('ready');
    isWaiting = true;
    const randomDelay = Math.floor(Math.random() * 5000) + 1000;
    setTimeout(() => {
      startTime = new Date();
      startButton.classList.add('ready');
      startButton.textContent = 'Click!';
      isWaiting = false;
    }, randomDelay);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === 'c') {
    isCheatActive = true;
  }
});

function resetTest() {
  startButton.textContent = 'Play Again';
  startButton.classList.remove('ready');
  isWaiting = false;
  isCheatActive = false;
}
