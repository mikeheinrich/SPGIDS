/**
 * Button Group Component - Vanilla JavaScript
 * 
 * This file contains the functionality for button groups that act like tabs or radio buttons.
 * Only one button in a group can be active at a time.
 * 
 * USAGE:
 * 1. Include the CSS from button-group-component.css in your <head>
 * 2. Include this JavaScript file before the closing </body> tag
 * 3. Add button group HTML (see example below)
 * 4. Initialize: initButtonGroup(groupElement) or use data attributes
 * 
 * HTML Structure:
 * <div class="btn-group" data-button-group>
 *     <button class="btn-group-item active">Button 1</button>
 *     <button class="btn-group-item">Button 2</button>
 *     <button class="btn-group-item">Button 3</button>
 * </div>
 */

/**
 * Initialize a button group
 * @param {HTMLElement} groupElement - The button group container element
 */
function initButtonGroup(groupElement) {
    if (!groupElement) {
        console.error('Button group element not found');
        return;
    }

    const buttons = groupElement.querySelectorAll('.btn-group-item');
    
    if (buttons.length === 0) {
        console.warn('No button group items found');
        return;
    }

    // Ensure at least one button is active (default to first if none)
    const hasActive = Array.from(buttons).some(btn => btn.classList.contains('active'));
    if (!hasActive && buttons.length > 0) {
        buttons[0].classList.add('active');
        buttons[0].setAttribute('aria-selected', 'true');
    }

    // Add click handlers to each button
    buttons.forEach((button, index) => {
        // Set ARIA attributes for accessibility
        button.setAttribute('role', 'tab');
        button.setAttribute('aria-selected', button.classList.contains('active') ? 'true' : 'false');
        button.setAttribute('tabindex', button.classList.contains('active') ? '0' : '-1');

        // Click handler
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Remove active state from all buttons
            buttons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
                btn.setAttribute('tabindex', '-1');
            });
            
            // Add active state to clicked button
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');
            button.setAttribute('tabindex', '0');
            
            // Dispatch custom event
            const event = new CustomEvent('buttonGroupChange', {
                detail: {
                    selectedIndex: index,
                    selectedButton: button,
                    selectedText: button.textContent.trim()
                },
                bubbles: true
            });
            groupElement.dispatchEvent(event);
        });

        // Keyboard navigation
        button.addEventListener('keydown', function(e) {
            let targetIndex = index;
            
            if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                targetIndex = index > 0 ? index - 1 : buttons.length - 1;
            } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                targetIndex = index < buttons.length - 1 ? index + 1 : 0;
            } else if (e.key === 'Home') {
                e.preventDefault();
                targetIndex = 0;
            } else if (e.key === 'End') {
                e.preventDefault();
                targetIndex = buttons.length - 1;
            } else {
                return; // Not a navigation key
            }
            
            // Trigger click on target button
            buttons[targetIndex].click();
            buttons[targetIndex].focus();
        });
    });

    // Set role and ARIA attributes on container
    groupElement.setAttribute('role', 'tablist');
}

/**
 * Initialize all button groups on the page (auto-initialization)
 */
function initAllButtonGroups() {
    const buttonGroups = document.querySelectorAll('[data-button-group], .btn-group');
    buttonGroups.forEach(group => {
        // Only initialize if not already initialized
        if (!group.hasAttribute('data-initialized')) {
            initButtonGroup(group);
            group.setAttribute('data-initialized', 'true');
        }
    });
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAllButtonGroups);
    } else {
        // DOM already loaded
        initAllButtonGroups();
    }
}

// Export for module systems (if using ES6 modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initButtonGroup, initAllButtonGroups };
}

