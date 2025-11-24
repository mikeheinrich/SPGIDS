/**
 * Text Input Component - Vanilla JavaScript
 * Handles clear icon functionality and input state management
 */

/**
 * Initialize text input with clear icon functionality
 * @param {string|HTMLElement} inputSelector - CSS selector or element for the input
 * @param {Object} options - Configuration options
 */
function initTextInput(inputSelector, options = {}) {
    const input = typeof inputSelector === 'string' 
        ? document.querySelector(inputSelector) 
        : inputSelector;
    
    if (!input) {
        console.warn('Text input element not found:', inputSelector);
        return;
    }

    // Find the wrapper and clear button
    const wrapper = input.closest('.text-input-wrapper') || input.parentElement;
    let clearButton = wrapper.querySelector('.text-input-clear');

    // Create clear button if it doesn't exist
    if (!clearButton) {
        clearButton = document.createElement('button');
        clearButton.type = 'button';
        clearButton.className = 'text-input-clear';
        clearButton.setAttribute('aria-label', 'Clear input');
        
        // Add clear icon SVG
        clearButton.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="8" fill="currentColor"/>
                <g transform="translate(4 4)">
                    <line x1="8" y2="8" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                    <line x2="8" y2="8" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                </g>
            </svg>
        `;
        
        wrapper.appendChild(clearButton);
    }

    // Toggle clear button visibility based on input value
    function updateClearButton() {
        if (input.value && !input.disabled) {
            clearButton.classList.add('visible');
            wrapper.classList.add('has-clear-icon');
        } else {
            clearButton.classList.remove('visible');
            wrapper.classList.remove('has-clear-icon');
        }
    }

    // Clear input value
    function clearInput() {
        input.value = '';
        input.focus();
        updateClearButton();
        
        // Trigger input event for any listeners
        const event = new Event('input', { bubbles: true });
        input.dispatchEvent(event);
        
        // Call optional onClear callback
        if (options.onClear && typeof options.onClear === 'function') {
            options.onClear(input);
        }
    }

    // Event listeners
    clearButton.addEventListener('click', clearInput);
    input.addEventListener('input', updateClearButton);
    input.addEventListener('focus', updateClearButton);
    input.addEventListener('blur', function() {
        // Keep clear button visible on blur if there's a value
        setTimeout(updateClearButton, 100);
    });

    // Initial state
    updateClearButton();

    // Return API for programmatic control
    return {
        clear: clearInput,
        update: updateClearButton,
        input: input,
        clearButton: clearButton
    };
}

/**
 * Initialize all text inputs with clear functionality
 * Scans the document for inputs with .text-input class
 */
function initAllTextInputs() {
    const inputs = document.querySelectorAll('.text-input:not([data-initialized])');
    inputs.forEach(input => {
        input.setAttribute('data-initialized', 'true');
        initTextInput(input);
    });
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllTextInputs);
} else {
    initAllTextInputs();
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initTextInput, initAllTextInputs };
}

