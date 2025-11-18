/**
 * Alert Component - Vanilla JavaScript
 * 
 * This file contains the functionality for alert components.
 * 
 * USAGE:
 * 1. Include the CSS from alert-component.css in your <head>
 * 2. Include this JavaScript file before the closing </body> tag
 * 3. Add alert HTML (see example below)
 * 4. Initialize: initAlert(alertElement) or use data attributes
 * 
 * HTML Structure:
 * <div class="alert" data-alert>
 *     <span class="alert-icon">...</span> <!-- Optional, for success/attention -->
 *     <span class="alert-text">
 *         <strong>Label</strong> could be combination of weights
 *     </span>
 *     <button class="alert-close" aria-label="Close alert">
 *         <svg>...</svg>
 *     </button>
 * </div>
 */

/**
 * Initialize an alert
 * @param {HTMLElement} alertElement - The alert container element
 */
function initAlert(alertElement) {
    if (!alertElement) {
        console.error('Alert element not found');
        return;
    }

    const closeButton = alertElement.querySelector('.alert-close');
    
    if (closeButton) {
        closeButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // Dispatch custom event before removing
            const event = new CustomEvent('alertClose', {
                detail: {
                    alert: alertElement
                },
                bubbles: true
            });
            alertElement.dispatchEvent(event);
            
            // Remove the alert
            alertElement.style.transition = 'opacity 0.3s ease, height 0.3s ease';
            alertElement.style.opacity = '0';
            alertElement.style.height = alertElement.offsetHeight + 'px';
            
            setTimeout(() => {
                alertElement.style.height = '0';
                alertElement.style.overflow = 'hidden';
                setTimeout(() => {
                    alertElement.remove();
                }, 300);
            }, 10);
        });
    }
}

/**
 * Initialize all alerts on the page (auto-initialization)
 */
function initAllAlerts() {
    const alerts = document.querySelectorAll('[data-alert], .alert');
    alerts.forEach(alert => {
        // Only initialize if not already initialized
        if (!alert.hasAttribute('data-initialized')) {
            initAlert(alert);
            alert.setAttribute('data-initialized', 'true');
        }
    });
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initAllAlerts);
    } else {
        // DOM already loaded
        initAllAlerts();
    }
}

// Export for module systems (if using ES6 modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initAlert, initAllAlerts };
}
