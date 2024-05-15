document.addEventListener('DOMContentLoaded', () => {
    const greetingElement = document.getElementById('greeting');
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

    const colorButton = document.getElementById('colorButton');
    const currentColorDiv = document.getElementById('currentColor');

    // Array of color pairs [backgroundColor, textColor, greetingTextColor]
    const colorPairs = [
        ['#FF5733', '#FFFFFF', '#FFD700'], // orange background, white text, gold greeting
        ['#33FF57', '#000000', '#FF4500'], // green background, black text, red greeting
        ['#3357FF', '#FFFFFF', '#FFD700'], // blue background, white text, gold greeting
        ['#F3FF33', '#000000', '#8A2BE2'], // yellow background, black text, purple greeting
        ['#FF33A2', '#FFFFFF', '#32CD32'], // pink background, white text, lime green greeting
        ['#33FFF3', '#000000', '#DA70D6'], // cyan background, black text, orchid greeting
        ['#8A2BE2', '#FFFFFF', '#FFD700'], // purple background, white text, gold greeting
        ['#FF4500', '#FFFFFF', '#33FF57'], // red background, white text, green greeting
        ['#DA70D6', '#000000', '#483D8B'], // orchid background, black text, dark slate blue greeting
        ['#32CD32', '#000000', '#FF4500'], // lime green background, black text, red greeting
        ['#FFD700', '#000000', '#8A2BE2'], // gold background, black text, purple greeting
        ['#87CEEB', '#000000', '#FF69B4']  // sky blue background, black text, hot pink greeting
    ];

    let lastColorIndex = -1;

    colorButton.addEventListener('click', () => {
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
    });
});