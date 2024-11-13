document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container'); // container um Kreise hinzufügen
    const body = document.body; // body Element

    const colorThemes = [ // Farben 
        { className: 'theme-orange', btnColor: '#ffcdb9', cardColor: '#ffcdb9', circleColor: '#ffcab8', backgroundColor: '#FFD1C1' }, // Orange theme
        { className: 'theme-green', btnColor: '#bdfccd', cardColor: '#bdfccd', circleColor: '#cdfdbd', backgroundColor: '#D1FFC1' }, // Green theme
        { className: 'theme-blue', btnColor: '#bbc8ff', cardColor: '#bbc8ff', circleColor: '#bccdff', backgroundColor: '#C1D1FF' }, // Blue theme
        { className: 'theme-pink', btnColor: '#fdbcf5', cardColor: '#fdbcf5', circleColor: '#ffb5da', backgroundColor: '#FFC1E0' }, // Pink theme
        { className: 'theme-violet', btnColor: '#eabeff', cardColor: '#eabeff', circleColor: '#e9baff', backgroundColor: '#E1C1FF' }, // Violet theme
        { className: 'theme-cyan', btnColor: '#b8f7ff', cardColor: '#b8f7ff', circleColor: '#b2fff5', backgroundColor: '#C1FFF7' }  // Cyan theme
    ];

    // Funktion für zufällige Farbeauswahl
    function getRandomColorTheme() {
        const randomIndex = Math.floor(Math.random() * colorThemes.length); // zufälliger Index für Farbschema
        return colorThemes[randomIndex]; // rückgabe des zufälligen Farbschemas
    }

    // Выбираем один случайный цвет для всех кружков при загрузке страницы
    const randomColorTheme = getRandomColorTheme();

    body.style.backgroundColor = randomColorTheme.backgroundColor; // Hintergrundfarbe auf das zufällige Farbschema setzen
    body.style.setProperty('--card-color', randomColorTheme.cardColor); // CSS Variable für Kartenelemente
    body.style.setProperty('--button_color', randomColorTheme.btnColor); // CSS Variable für button Farbe

    body.classList.remove(...colorThemes.map(theme => theme.className)); // Entfernt alle vorherigen Themenklassen vom body
    body.classList.add(randomColorTheme.className); // Klasse mit aktuellen Thema hinzugefügt

    // Funktion zum erstellen von Kreisen
    function generateCircle() {
        const circle = document.createElement('div'); // neues div Element
        circle.classList.add('circle'); // Klasse circle hinzugefügt

        // zufällige größe des Kreises
        const size = Math.random() * 70 + 30;
        circle.style.width = `${size}px`;
        circle.style.height = `${size}px`;

        // zufällige Position auf dem x Achse
        const positionX = Math.random() * 100;
        circle.style.left = `${positionX}vw`;

        // zufällige Animationsdauer
        const duration = Math.random() * 10 + 10;
        circle.style.animationDuration = `${duration}s`;

        circle.style.backgroundColor = randomColorTheme.circleColor; // stellt die Farbe des Kreises auf die Farbe des zufälligen Themas

        container.appendChild(circle); // den erstellten Kreis zum Container hinzufügen

        // Kreis nach dem Animationsende entfernen
        setTimeout(() => {
            circle.remove();
        }, duration * 1000);
    }

    // Funktion zum erstellen mehrere Kreise gleichzeitig
    function generateMultipleCircles() {
        const circleCount = Math.floor(Math.random() * 3) + 2; // zufällige Anzahl von Kreisen
        for (let i = 0; i < circleCount; i++) { // erstellen die festgelegte Anzahl von Kreisen
            generateCircle();
        }
    }

    // zufällige Interval um Kreise zu erstellen
    setInterval(generateMultipleCircles, Math.random() * 1000 + 500);
});
