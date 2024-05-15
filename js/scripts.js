document.addEventListener('DOMContentLoaded', () => {
    const greetingElement = document.getElementById('greeting');
    const colorButton = document.getElementById('colorButton');
    const partyModeButton = document.getElementById('partyModeButton');
    const currentColorDiv = document.getElementById('currentColor');
    const epilepsyWarning = document.getElementById('epilepsyWarning');
    const hour = new Date().getHours();
    let greeting;

    if (hour < 12) {
        greeting = 'Good Morning';
    } else if (hour < 18) {
        greeting = 'Good Afternoon';
    } else {
        greeting = 'Good Evening';
    }

    greetingElement.textContent = `${greeting}, Welcome to My Website!`;

    // Array of color pairs [backgroundColor, textColor, greetingTextColor]
    const colorPairs = [
        ['#FF5733', '#FFFFFF', '#FFD700'], // orange background, white text, gold greeting
        ['#33FF57', '#000000', '#FF4500'], // green background, black text, red greeting
        ['#3357FF', '#FFFFFF', '#FFD700'], // blue background, white text, gold greeting
        ['#F3FF33', '#000000', '#8A2BE2'], // yellow background, black text, purple greeting
        ['#FF33A2', '#FFFFFF', '#32CD32'], // pink background, white text, lime green greeting
        ['#33FFF3', '#000000', '#000080'], // cyan background, black text, navy greeting
        ['#8A2BE2', '#FFFFFF', '#FFD700'], // purple background, white text, gold greeting
        ['#FF4500', '#FFFFFF', '#33FF57'], // red background, white text, green greeting
        ['#DA70D6', '#000000', '#483D8B'], // orchid background, black text, dark slate blue greeting
        ['#32CD32', '#000000', '#FF4500'], // lime green background, black text, red greeting
        ['#FFD700', '#000000', '#8A2BE2'], // gold background, black text, purple greeting
        ['#87CEEB', '#000000', '#FF69B4']  // sky blue background, black text, hot pink greeting
    ];

    let lastColorIndex = -1;
    let partyModeInterval = null;
    let epilepsyWarningAcknowledged = false;

    function getContrastYIQ(hexcolor) {
        hexcolor = hexcolor.replace('#', '');
        const r = parseInt(hexcolor.substr(0, 2), 16);
        const g = parseInt(hexcolor.substr(2, 2), 16);
        const b = parseInt(hexcolor.substr(4, 2), 16);
        const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        return (yiq >= 128) ? 'black' : 'white';
    }

    function changeColor() {
        let colorIndex;
        do {
            colorIndex = Math.floor(Math.random() * colorPairs.length);
        } while (colorIndex === lastColorIndex);

        const [backgroundColor, textColor, greetingTextColor] = colorPairs[colorIndex];

        document.body.style.backgroundColor = backgroundColor;
        document.body.style.color = textColor;
        currentColorDiv.textContent = `Current Color: ${backgroundColor}`;
        currentColorDiv.style.color = textColor;

        greetingElement.style.color = greetingTextColor;
        console.log(`Background Color: ${backgroundColor}, Text Color: ${textColor}, Greeting Color: ${greetingTextColor}`);

        lastColorIndex = colorIndex;
    }

    colorButton.addEventListener('click', changeColor);

    partyModeButton.addEventListener('click', () => {
        if (partyModeInterval) {
            clearInterval(partyModeInterval);
            partyModeInterval = null;
            partyModeButton.textContent = 'Party Mode';
        } else {
            if (!epilepsyWarningAcknowledged) {
                epilepsyWarning.classList.remove('hidden');
                if (confirm("Party Mode may trigger seizures for people with photosensitive epilepsy. Do you want to continue?")) {
                    epilepsyWarningAcknowledged = true;
                    epilepsyWarning.classList.add('hidden');
                    partyModeInterval = setInterval(changeColor, 200);
                    partyModeButton.textContent = 'Turn Off Party Mode';
                } else {
                    epilepsyWarning.classList.add('hidden');
                }
            } else {
                partyModeInterval = setInterval(changeColor, 200);
                partyModeButton.textContent = 'Turn Off Party Mode';
            }
        }
    });
});