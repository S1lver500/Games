const cards = document.querySelectorAll(".card"); // Karten
const timerElement = document.getElementById("timeLeft"); // Timer
const flipCountElement = document.getElementById("flipCount"); // Zähler für umdrehungen
const resetButton = document.querySelector(".reset-button"); // restart button

let matchedCard = 0; // Zähler für passende Paare
let cardOne, cardTwo; // Variablen, um zwei ausgewählte Karten zu speichern
let disableDeck = false; // Verhindert weitere Klicks, während zwei Karten verglichen werden

let flipCount = 0; // Zähler für die Umdrehungen
let timeLeft = 60; // Zeait für den Timer
let timerId; // für Timer Speicherung
let gameEnded = false; // variable um anzuzeigen ob das Spiel zu ende ist oder nicht
let isFirstFlip = true; // schaut nach erstes flip um Timer zu starten

// Funktion für den Timer
function startTimer() {
    timerId = setInterval(() => {
        timeLeft--; // Reduziert die Zeit
        timerElement.textContent = timeLeft; // Zeit auf dem Seite aktualisieren
        if (timeLeft <= 0) { // wenn Zeit abgelaufen ist
            clearInterval(timerId); // timer stoppen
            endGame("Time's up!"); // alert anzeigen und Spiel stoppen
            shuffleCard(); // Karten mischen
        }
    }, 1000); // Timer läuft jede Sekunde
}

// Funktion die das Spiel beendet
function endGame(message) {
    gameEnded = true; // Spiel ist beendet
    alert(message); // alert anzeigen
    resetGame(); // Spiel zurücksetzen
}

// Funktion zum Umdrehen der Karte bei Klick
function flipCard(e) {
    if (gameEnded) return; // nichts machen wenn das Spiel zu ende ist
    let clickedCard = e.target; // angeklickte Karte

    if (clickedCard !== cardOne && !disableDeck) { // wenn das nicht dieselbe Karte ist
        clickedCard.classList.add("flip"); // Karte umdrehen
        flipCount++; // +1 Umdrehung
        flipCountElement.textContent = flipCount; // Umdrehungen auf die Seite aktualisieren

        if (isFirstFlip) { // wenn das die erste Umdrehung ist
            isFirstFlip = false; // erstes flip ist vorbei
            startTimer(); // Timer startet
        }

        if (!cardOne) {
            return cardOne = clickedCard; // wenn keine erste Karte ausgewählt ist, speichere die angeklickte Karte als erste
        }

        cardTwo = clickedCard; // angeklickte Karte als zweite speichern
        disableDeck = true; // man darf nicht anderen Karten anklicken bis dieses Paar überprüft wird
        let cardOneImg = cardOne.querySelector("img").src,
        cardTwoImg = cardTwo.querySelector("img").src;
        matchCards(cardOneImg, cardTwoImg); // beiden Karten vergleichen
    }
}

// Funktion zum Vergleichen der beiden Kartenbilder
function matchCards(img1, img2) {
    if (img1 === img2) { // wenn die Bilder übereinstimmen
        matchedCard++; // +1 passende Paar
        if (matchedCard == 8) { // wenn alle Paare gefunden sind
            startConfetti(); // Gratulation Effekt hinzufügen
            setTimeout(() => {
                stopConfetti(); // Gratulation Effekt beenden
                return shuffleCard(); // Karten werden neu gemischt
            }, 2000);
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = ""; // setzt Kartenvariablen zurück
        return disableDeck = false;
    }
    
    // wenn die Karten nicht übereinstimmen
    setTimeout(() => {
        // shake Animation wird hinzugefügt
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    // nach der shake Animation werden die Karten wieder umgedreht
    setTimeout(() => {
        // entfernt die Animation und Karte dreht sich wieder um
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = ""; // setzt Kartenvariablen zurück
        disableDeck = false; // man darf wieder Karten anklicken
    }, 1200);
}

// Funktion zum Mischen der Karten
function shuffleCard() {
    // alles wird zurückgesetzt
    matchedCard = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    flipCount = 0;
    flipCountElement.textContent = flipCount;
    timeLeft = 60;
    timerElement.textContent = timeLeft;

    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]; // Array mit Kartennummern
    arr.sort(() => Math.random() > 0.5 ? 1 : -1); // Zufällige Neuanordnung

    cards.forEach(card => {
        card.classList.add("hidden"); // die Bilder verschtecken sich
    });

    cards.forEach((card, index) => {
        card.classList.remove("flip"); // alle Karten drehen sich um

        // zufällige Bildquelle für jede Karte
        let imgTag = card.querySelector("img");
        imgTag.src = `Memory/Images/img-${arr[index]}.png`;
        card.addEventListener("click", flipCard); // Klick Event wird wieder hinzugefügt

        setTimeout(() => {
            card.classList.remove("hidden"); // Bilder wieder anzeigen
        }, 500);
    });

    clearInterval(timerId); // Timer zurücksetzen
    gameEnded = false; // Spiel ist nicht zu Ende
    isFirstFlip = true; // erste Umdrehung zurücksetzen
}

// Function für refresh button
function resetGame() {
    if(disableDeck) return;
    shuffleCard(); // Karten werden gemischt
    isFirstFlip = true; // erste umdrehung zurücksetzen
}

// Event Listener wird zur Refresh Knopf
resetButton.addEventListener("click", resetGame);

shuffleCard(); // Karten werden gemischt wenn die Seite geladen ist

// Klick Event für allen Karten wird hinzugefügt
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});