const guessInput = document.getElementById('guessInput'); // Eingabefeld
let randomNumber = Math.floor(Math.random() * 100) + 1; // Zufallszahl zwischen 1 und 100 generieren
let attempts = 0; // Zähler von Versuche
let maxAttempts = 10; // Maximale Anzahl der Versuche

// Funktion um 
function checkGuess() {
    const userGuess = document.getElementById('guessInput').value; // Wert aus dem Engabefeld
    const message = document.getElementById('message'); // Nachrichtfeld für Hinweisen
    
    attempts++; // Anzahl der Versuche erhöhen
    const remainingAttempts = maxAttempts - attempts; // verbleibenden versuche berechnen

    // Überprüfung ob die richtige Zahl geraten würde
    if (userGuess == randomNumber) {
        // Nachricht anzeigen
        message.textContent = `You guessed! The number was ${randomNumber}!`;
        message.style.color = 'green';
        guessInput.disabled = true; // Einzeigefeld ausschalten
        startConfetti(); // Animation starten
        setTimeout(() => { stopConfetti(); }, 2000); // Animation beenden
    } else if (attempts < maxAttempts) { // wenn Anzahl von Versuchen weniger als Maximum ist

        if (userGuess > randomNumber) { // wenn geratene Zahl großer als Zufallszahl ist
            message.textContent = "It's high! Try again.";
        } else { // wenn geratene Zahl kleiner als Zufallszahl ist
            message.textContent = "It's low! Try again.";
        }

        message.style.color = 'black'; // Nachrichtenfarbe zurücksetzen
        document.getElementById('attempts').textContent = `Attempts left: ${remainingAttempts}`; // Verbleibene Versuche aktualisieren
    } else { // wenn maximaler Anzahl der Versuche erreicht ist
        // Nachricht anzeigen
        message.textContent = `Game over! The number was ${randomNumber}.`;
        message.style.color = 'red';
        guessInput.disabled = true; // Einzeigefeld ausschalten
        document.getElementById('attempts').textContent = 'No attempts left.'; // Nachricht ändern
    }
}

// Funktion um das Spiel zurücksetzen
function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1; // Generation von neue Zufallszahl
    attempts = 0; // Anzahl von Versuchen auf 0 setzen
    document.getElementById('guessInput').disabled = false; // Eingabefeld wieder aktivieren
    document.getElementById('message').textContent = ''; // Nachricht leeren
    document.getElementById('attempts').textContent = `Attempts left: ${maxAttempts}`; // Nachricht von Versuchen aktualisieren
    document.getElementById('guessInput').value = ''; // Eingabefeld zurücksetzen
    setTimeout(() => { // nach kurze Verzögerung zur Eingabefeld fokusieren
        document.getElementById('guessInput').focus();
    }, 800);
}

// Eingabe des Spielers überprüfen
guessInput.addEventListener('input', function (e) {
    const value = parseInt(e.target.value);
    
    if (value > 100) { // wenn die Eingabe größer als 100 ist 
        e.target.value = 100; // wird auf 100 eingesetzt
    } else if (value < 1) { // wenn die Eingabe kleiner als 1 ist 
        e.target.value = 1; // wird auf 1 eingesetzt
    }
});

// wenn Eingabefeld den Fokus verliert
guessInput.addEventListener('blur', function (e) {
    setTimeout(() => { // nach kurze Zeit
        guessInput.focus(); // Fokus zur Eingabefeld setzen
    }, 800);
});

// verhindert die Eingabe ungültigen Symbolen
guessInput.addEventListener('keydown', function (e) {
    if (e.key === 'e' || e.key === '+' || e.key === '-' || e.key === '.') {
        e.preventDefault();
    }
});
