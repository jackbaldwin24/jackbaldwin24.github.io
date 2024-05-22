document.addEventListener('DOMContentLoaded', () => {
    const greetingElement = document.getElementById('greeting');
    const colorButton = document.getElementById('colorButton');
    const partyModeButton = document.getElementById('partyModeButton');
    const epilepsyWarning = document.getElementById('epilepsyWarning');
    const headerElement = document.querySelector('header h1');
    const navElement = document.querySelector('nav ul');
    const navElements = document.querySelectorAll('nav ul li');
    const partyAudio = document.getElementById('partyAudio'); // Get the audio element
    const hour = new Date().getHours();
    let greeting;

    if (hour < 6) {
        greeting = 'Burning the midnight oil, I see!';
    } else if (hour < 12) {
        greeting = 'Good Morning,';
    } else if (hour < 18) {
        greeting = 'Good Afternoon,';
    } else {
        greeting = 'Good Evening,';
    }

    greetingElement.textContent = `${greeting} Welcome to My Website!`;

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

    function changeColor() {
        let colorIndex;
        do {
            colorIndex = Math.floor(Math.random() * colorPairs.length);
        } while (colorIndex === lastColorIndex);

        const [backgroundColor, textColor, greetingTextColor] = colorPairs[colorIndex];

        document.body.style.backgroundColor = backgroundColor;
        document.body.style.color = textColor;

        greetingElement.style.color = greetingTextColor;
        console.log(`Background Color: ${backgroundColor}, Text Color: ${textColor}, Greeting Color: ${greetingTextColor}`);

        lastColorIndex = colorIndex;
    }

    function activatePartyMode() {
        console.log('Activating Party Mode');
        epilepsyWarning.classList.add('hidden');
        headerElement.classList.add('party-mode-header');
        navElement.classList.add('party-mode-nav');
        navElements.forEach((el) => {
            el.classList.add('party-mode-nav');
            el.style.setProperty('--random', Math.random());
        });
        partyModeInterval = setInterval(changeColor, 200); // Decrease the interval to 200ms for faster color changes
        partyAudio.play().catch(error => console.error('Error playing audio:', error)); // Play the audio
        partyModeButton.textContent = 'Turn Off Party Mode';
    }

    function deactivatePartyMode() {
        console.log('Deactivating Party Mode');
        clearInterval(partyModeInterval);
        partyModeInterval = null;
        headerElement.classList.remove('party-mode-header');
        navElement.classList.remove('party-mode-nav');
        navElements.forEach((el) => {
            el.classList.remove('party-mode-nav');
            el.style.removeProperty('--random');
        });
        partyAudio.pause(); // Pause the audio
        partyAudio.currentTime = 0; // Reset the audio
        partyModeButton.textContent = 'Party Mode';
    }

    colorButton.addEventListener('click', changeColor);

    partyModeButton.addEventListener('click', () => {
        if (partyModeInterval) {
            deactivatePartyMode();
        } else {
            if (!epilepsyWarningAcknowledged) {
                epilepsyWarning.classList.remove('hidden');
                if (confirm("Party mode may trigger seizures for people with photosensitive epilepsy. Do you want to continue?")) {
                    epilepsyWarningAcknowledged = true;
                    activatePartyMode();
                } else {
                    epilepsyWarning.classList.add('hidden');
                }
            } else {
                activatePartyMode();
            }
        }
    });
});