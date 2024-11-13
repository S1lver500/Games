// Buttons
const memoryButton = document.getElementById("memoryButton");
const snakeButton = document.getElementById("snakeButton");
const numberGuessButton = document.getElementById("numberGuess");

// Wrappers
const snakeWrapper = document.getElementById('wrapper');
const memoryWrapper = document.getElementById('memory-wrapper');
const numberGuessWrapper = document.getElementById('numberGuess-wrapper');

let disableArrows = false; // Snake beweguzng

snakeButton.addEventListener('click', () => {
    // alles wegmachen
    memoryWrapper.style.display = 'none';
    numberGuessWrapper.style.display = 'none';

    disableArrows = false; // Snake bewegung anschalten

    snakeWrapper.style.display = 'flex'; // Spiel anzeigen
});

memoryButton.addEventListener('click', () => {
    // alles wegmachen
    snakeWrapper.style.display = 'none';
    numberGuessWrapper.style.display = 'none';

    disableArrows = true; // Snake bewegung ausmachen

    memoryWrapper.style.display = 'flex'; // Spiel anzeigen
});

numberGuessButton.addEventListener('click', () => {
    // alles wegmachen
    memoryWrapper.style.display = 'none';
    snakeWrapper.style.display = 'none';

    disableArrows = true; // Snake bewegung ausmachen

    numberGuessWrapper.style.display = 'flex'; // Spiel anzeigen
});
