/**
 * Accordion Component - Vanilla JavaScript
 * 
 * This file contains the functionality for accordion components with expandable/collapsible content.
 * 
 * USAGE:
 * 1. Include the CSS from accordion-component.css in your <head>
 * 2. Include this JavaScript file before the closing </body> tag
 * 3. Add accordion HTML (see example below)
 * 4. Initialize: initAccordion(accordionElement) or use data attributes
 * 
 * HTML Structure:
 * <div class="accordion" data-accordion>
 *     <button class="accordion-header">
 *         <span>Accordion Title</span>
 *         <span class="accordion-icon">
 *             <svg viewBox="0 0 14 14">...</svg>
 *         </span>
 *     </button>
 *     <div class="accordion-content">
 *         <div class="accordion-content-inner">
 *             Content goes here
 *         </div>
 *     </div>
 * </div>
 */

/**
 * Initialize an accordion
 * @param {HTMLElement} accordionElement - The accordion container element
 */
function initAccordion(accordionElement) {
    if (!accordionElement) {
        console.error('Accordion element not found');
        return;
    }

    const header = accordionElement.querySelector('.accordion-header');
    const content = accordionElement.querySelector('.accordion-content');
    
    if (!header || !content) {
        console.warn('Accordion header or content not found');
        return;
    }

    // Set initial ARIA attributes
    const isOpen = accordionElement.classList.contains('active');
    header.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    header.setAttribute('aria-controls', accordionElement.id || `accordion-${Date.now()}`);
    accordionElement.setAttribute('role', 'region');
    
    // If no ID, add one
    if (!accordionElement.id) {
        accordionElement.id = `accordion-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        header.setAttribute('aria-controls', accordionElement.id);
    }

    // Click handler
    header.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const wasOpen = accordionElement.classList.contains('active');
        
        if (wasOpen) {
            // Close accordion
            accordionElement.classList.remove('active');
            header.classList.remove('active');
            header.setAttribute('aria-expanded', 'false');
        } else {
            // Open accordion
            accordionElement.classList.add('active');
            header.classList.add('active');
            header.setAttribute('aria-expanded', 'true');
        }
        
        // Dispatch custom event
        const event = new CustomEvent('accordionToggle', {
            detail: {
                isOpen: !wasOpen,
                accordion: accordionElement,
                header: header,
                content: content
            },
            bubbles: true
        });
        accordionElement.dispatchEvent(event);
    });

    // Keyboard support
    header.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            header.click();
        }
    });
}

/**
 * Initialize all accordions on the page (auto-initialization)
 */
function initAllAccordions() {
    const accordions = document.querySelectorAll('[data-accordion], .accordion');
    accordions.forEach(accordion => {
        // Only initialize if not already initialized
        if (!accordion.hasAttribute('data-initialized')) {
            initAccordion(accordion);
            accordion.setAttribute('data-initialized', 'true');
        }
    });
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAllAccordions);
    } else {
        // DOM already loaded
        initAllAccordions();
    }
}

// Export for module systems (if using ES6 modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initAccordion, initAllAccordions };
}

