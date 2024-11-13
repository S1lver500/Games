const playBoard = document.querySelector(".play-board"); // Spielfeld
let scoreElement = document.querySelector(".score"); // Score
let highScoreElement = document.querySelector(".high-score"); // HighScore

let gameOver = false; // GameOver Variable
let foodX, foodY; // Position des Essens
let snakeX = 15, snakeY = 15; // Startposition des Schlangenkopfes
let snakeBody = []; // Array zur Speicherung des Körpers
let velocityX = 0, velocityY = 0; // Bewegungsgeschwindigkeit
let setIntervalId; // Variable zum Speichern des Intervalls
let score = 0; // Score am anfang des Spiels ist 0
let foodVisible = true; // Kontrolliert ob das Essen sichtbar ist oder nicht
let directionChanged = false; // begrenzt Richtungsänderung pro Frame

let highScore = localStorage.getItem("high-score") || 0; // ladet gespeicherte HihgScore oder setz ihn auf 0
highScoreElement.innerText = `High Score: ${highScore}`; // zeigt HighScore im Spiel an

// Funktion zur zufälligen Positionierung des Essens
const changeFoodPosition = () => {
    let positionValid = false;

    while (!positionValid) {
        // Zufälliges Auftreten von Essen
        foodX = Math.floor(Math.random() * 30) + 1;
        foodY = Math.floor(Math.random() * 30) + 1;
        
        // Überprüfen, ob das Essen nicht auf dem Schlangenkörper oder dem Kopf liegt
        positionValid = !snakeBody.some(segment => segment[0] === foodX && segment[1] === foodY);
        positionValid = positionValid && !(snakeX === foodX && snakeY === foodY);
    }
}

// Funktion zum Zurücksetzen des Spiels
const resetGame1 = () => {
    clearInterval(setIntervalId); // Spiel pausieren
    
    // alles zurücksetzen
    score = 0;
    snakeBody = [];
    snakeX = 15; 
    snakeY = 15;
    velocityX = 0; 
    velocityY = 0;
    foodVisible = true;
    gameOver = false;

    // Score auf dem Seite Aktualisieren
    scoreElement.innerText = `Score: ${score}/100`; 
    highScoreElement.innerText = `High Score: ${highScore}`;

    // neue Position von Essen
    changeFoodPosition(); 

    // Erstellt das Essen-Element auf dem Spielfeld
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;
    htmlMarkup += `<div class="head" style="grid-area: ${snakeY} / ${snakeX}"></div>`;
    playBoard.innerHTML = htmlMarkup;

    // aktualisiert das Spiel jede 125ms
    setIntervalId = setInterval(initGame, 125);
}

// diese Funktion wird angerufen wenn das Spiel vorbei ist
const handleGameOver = () => {
    clearInterval(setIntervalId); // beendet das Spielintervall
    alert("Game Over!"); // zeigt alert an
    resetGame1();  // Startet das Spiel neu
}

// Funktion für start von Confetti
const triggerConfetti = () => {
    startConfetti(); // // Start von Confetti
    setTimeout(() => {
        stopConfetti(); // Animation endet
        setTimeout(() => {
            alert("Congratulations! You won!"); // Alert anzeigen
            resetGame1(); // Startet das Spiel neu
        }, 2000);
    }, 6000); 
}

// Funktion zum Ändern der Richtung der Schlange
const changeDirection = (e) => {
    if (directionChanged || disableArrows) return; // verhindert mehrere male pro Frame zu bewegen
    // Ändert die Richtung des Kopfes
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1; // nach oben
        directionChanged = true;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1; // nach unten
        directionChanged = true;
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0; // nach links
        directionChanged = true;
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0; // nach rechts
        directionChanged = true;
    }
}

// Hauptspiel Funktion die jede 125ms ausgeführt wird
const initGame = () => {
    if (gameOver) return handleGameOver(); // beendet das Spiel wenn gameOver true ist
    let htmlMarkup = ``; // erstellt das Essen Element auf dem Spielfeld

    if (foodVisible) {
        htmlMarkup += `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`; // Erstellt das Essen-Element auf dem Spielfeld
    }

    // Kontrolliert ob die schlange das Essen berührt
    if (snakeX === foodX && snakeY === foodY) {
        snakeBody.push([foodX, foodY]); // fügt ein Segment zum Körper
        score++; // +1 score

        highScore = score >= highScore ? score : highScore; // wenn nötig ist HighScore wird aktualisiert
        localStorage.setItem("high-score", highScore); // neues HighScore wird gespeichert

        // HightScore und Score werden aktualisiert
        scoreElement.innerText = `Score: ${score}/100`;
        highScoreElement.innerText = `High Score: ${highScore}`;

        if (score < 100) { // wenn Score 100 ist
            changeFoodPosition(); // ändert Position des Essens
        } else {
            foodVisible = false; // Essen ist nicht sichtbar
            clearInterval(setIntervalId); // Spiel pausieren
            setTimeout(triggerConfetti, 500); // Animation starten
        }
    }

    // neue Segmente folden dem Kopf
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    snakeBody[0] = [snakeX, snakeY]; // Kopf der Schlange ist immer das erste Segment

    // Aktualisierung der Kopfposition
    snakeX += velocityX;
    snakeY += velocityY;

    directionChanged = false; // erlaubt die Richtung nach jedem Frame zu ändern

    // wenn Schlange die Spielfeldränder berührt
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true; // Spiel beendet sich
    }
    
    // // überprüfung ob die Schlange sich selbst berührt
    for (let i = 0; i < snakeBody.length; i++) {
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;
        // GameOver ist true wenn Schlange sich berührt
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }
    playBoard.innerHTML = htmlMarkup; // Zeichnet neues Spielfeld
}

changeFoodPosition(); // Das Spiel wird mit neues Position des Essens gestartet
setIntervalId = setInterval(initGame, 125); // aktualisiert das Spiel jede 125ms
document.addEventListener("keydown", changeDirection); // Event Listener für Pfeiltasten zur Steuerung