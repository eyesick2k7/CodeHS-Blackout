// ==UserScript==
// @name         CodeHS Blackout
// @version      1.6.1
// @description  Makes white elements black
// @author       eyesick2k7
// @match        https://codehs.com/*
// ==/UserScript==

(function() {
    const white = 'white';
    const black = 'black';
    const gray = '#060606';
    const blue = '#00008B';

    function applyGlobalDarkMode()
    {
        // List of class name prefixes to exclude
        const excludedClasses = ['btn', 'icon', 'fas', 'lesson-key', 'ace', 'asdfasdf', 'percentage-passed', 'progressbar', 'bg-blue', 'bg-slate'];

        // Iterate over all elements
        document.querySelectorAll('*').forEach(element =>
        {
            const classList = [...element.classList];
            const shouldSkip = excludedClasses.some(prefix => classList.some(className => className.startsWith(prefix)));

            if (!shouldSkip)
            {
                element.style.setProperty('background-color', black, 'important');
                element.style.setProperty('color', white, 'important');
            }
        });

        console.log('Global dark mode applied');
    }

    function forceBorderStyle()
    {
        const elements = document.querySelectorAll('input, button, select');
        elements.forEach(element =>
        {
            element.style.setProperty('border', `1px solid ${white}`, 'important');
        });

        console.log('Forced border style applied');
    }

    function fixStuff()
    {
        const originalConsoleLog = console.log; // Save the original console.log
        let lastLog = ''; // Variable to store the last log message

        // Override console.log
        console.log = function(...args)
        {
            lastLog = args.join(' '); // Store the last log message as a string
            originalConsoleLog.apply(console, args); // Call the original console.log to still display in the console
        };
        console.log(`Fixed:`);

        const xButton = document.querySelector("#messages-unread > tbody > tr > td:nth-child(3) > button");
        if (xButton)
        {
            xButton.style.color = white;
            xButton.style.border = black;
            console.log(`Message's "x" button`);
        }

        const editorBackgrounds =
        [
            document.querySelector("#ace-editor > div.ace_gutter"),
            document.querySelector("#ace-editor > div.ace_scroller")
        ].filter(Boolean);
        editorBackgrounds.forEach(element =>
        {
            element.style.backgroundColor = black;
            console.log(`Editor's backgrounds`);
        });

        document.querySelectorAll('*').forEach(element =>
        {
            if (element.textContent === 'Completed' || element.textContent === 'Not Started')
            {
                element.style.backgroundColor = 'transparent';
                element.style.color = white;
                console.log(`"Completed" and "Not Started" backgrounds & color`);
            }
        });

        document.querySelectorAll('*').forEach(element =>
        {
            if (element.classList.contains('percent-box') || element.classList.contains('btn-main-silver'))
            {
                element.style.color = white;
                console.log(`Percent box's text & "Resume" color`);
            }
        });

        document.querySelectorAll('*').forEach(element =>
        {
            if (element.classList.contains('bg-slate'))
            {
                element.style.setProperty('background-color', blue, 'important');
            }
        });

        if (lastLog === 'Fixed:') console.log('nothing');
    }

    applyGlobalDarkMode();
    forceBorderStyle();
    fixStuff();

    // Set up a MutationObserver to reapply the styles if new elements are added
    const observer = new MutationObserver(applyGlobalDarkMode);
    observer.observe(document.body, {childList: true, subtree: true});

    // Set up a MutationObserver to reapply the styles if new elements are added
    const observer2 = new MutationObserver(fixStuff);
    observer2.observe(document.body, {childList: true, subtree: true});
})();
