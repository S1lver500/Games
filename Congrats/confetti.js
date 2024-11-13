const canvas = document.getElementById('confettiCanvas'); // Element auf dem das Konfetti gezeichnet wird
const ctx = canvas.getContext('2d');

// verschiedene Farben für Konfetti
const confettiColors = ['#f2b233', '#de1111', '#a2b1d6', '#ffcc00', '#99cc00', '#ff9900', '#ff6600'];
const gravity = 0.3; // Gravitation für Konfetti
const confettiCount = 10; // Anzahl neuen Konfetti Stücke die pro Frafe hinzugefügt werden
let confetti = []; // Array um alle Konfetti Stücke zu speichern
let isConfettiRunning = false; // Status für die Animation
let allowNewConfetti = true; // ist es erlaubt neue Konfetti Stücke zu erstellen oder nicht
let animationFrameId; // ID für Animationsrahmen

// Größe des Canvas ist entsprechend der Fenstergröße
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Funktion für erstellung von neue Konfetti Stücke
function createConfetti() {
    for (let i = 0; i < confettiCount; i++) {
        confetti.push({
            x: Math.random() * canvas.width, // zufällige horizontale Position 
            y: Math.random() * canvas.height - canvas.height,// zufällige vertikale Position über dem Canvas
            width: Math.random() * 10 + 5, // zufällige Breite von Konfetti
            height: Math.random() * 10 + 5, // zufällige Höhe von Konfetti
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)], // zufällige Farbe
            velocityX: Math.random() * 3 - 1.5, // zufällige horizontale Geschwindigkeit
            velocityY: Math.random() * 3 + 3,// zufällige vertikale Geschwindigkeit
            opacity: Math.random() * 0.8 + 0.5 // zufällige Transparenz
        });
    }
}

// Funktion zur Aktualisierung der Konfetti Position auf dem Canvas
function updateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // löschen Inhalt des Canvas für den nächsten Frame

    confetti = confetti.filter(piece => piece.y <= canvas.height); // Konfetti entfernen die aus dem Sichtbereich gefallen sind

    confetti.forEach((piece) => {
        piece.x += piece.velocityX; // Aktualisieren der horizontalen Position
        piece.y += piece.velocityY; // Aktualisieren der vertikalen Position
        piece.velocityY += gravity; // graviti hinzugefügt

        ctx.fillStyle = piece.color; // Farbe hinzugefügt
        ctx.globalAlpha = piece.opacity; // Transparenz hinzugefügt
        ctx.fillRect(piece.x, piece.y, piece.width, piece.height); // Konfetti auf dem Canvas zeigen
    });

    if (allowNewConfetti) {
        createConfetti(); // erstellen von neue Konfetti Stücke solange das erlaubt ist
    }

    if (confetti.length > 0 || allowNewConfetti) {
        animationFrameId = requestAnimationFrame(updateConfetti); // fortsetzen der Animation solange noch Konfetti vorhanden ist
    } else {
        isConfettiRunning = false; // Animation stoppen wenn alle Konfetti weg sind
    }
}

// Funkzuon zum Starten der Konfetti Animation
function startConfetti() {
    if (!isConfettiRunning) { // nur wenn Animation nicht bereits Läuft
        isConfettiRunning = true; // Animation als laufend zeigen
        allowNewConfetti = true; // es wird erlaubt neue Konfetti Stücke zu erstellen
        updateConfetti(); // Animationsschleife starten
    }
}

// Funktion zum Stopppen von neue konfetti
function stopConfetti() {
    allowNewConfetti = false; // keine Konfetti mehr erstellen
}

// Event Listener der die Canvas Größe an das Fenster anpasst wenn Fenster verändert wird
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth; // setzt neue Breite des Canvas
    canvas.height = window.innerHeight;  // setzt neue Höhe des Canvas
});
