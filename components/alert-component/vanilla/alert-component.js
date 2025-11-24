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

/**
 * Create and initialize an alert dynamically
 * @param {Object} options - Alert configuration
 * @param {string} options.variant - Alert variant: 'success', 'warning', 'error', 'info', 'default'
 * @param {string} options.message - Alert message text
 * @param {string} [options.title] - Optional alert title
 * @param {boolean} [options.dismissible=true] - Whether the alert can be dismissed
 * @param {HTMLElement} [options.container] - Container element to append the alert to
 * @returns {HTMLElement} The created alert element
 */
function createAlert(options = {}) {
    const {
        variant = 'default',
        message = '',
        title = '',
        dismissible = true,
        container = document.body
    } = options;
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${variant}`;
    alert.setAttribute('data-alert', '');
    
    // Build alert content
    let alertHTML = '';
    
    // Add icon for success/attention variants
    if (variant === 'success' || variant === 'attention') {
        alertHTML += '<span class="alert-icon">';
        if (variant === 'success') {
            alertHTML += '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C3.58 0 0 3.58 0 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8zm4.5 6L7 11.5 3.5 8l1.41-1.41L7 8.68l4.09-4.09L12.5 6z" fill="currentColor"/></svg>';
        }
        alertHTML += '</span>';
    }
    
    // Add text content
    alertHTML += '<span class="alert-text">';
    if (title) {
        alertHTML += `<strong>${title}</strong> `;
    }
    alertHTML += message;
    alertHTML += '</span>';
    
    // Add close button if dismissible
    if (dismissible) {
        alertHTML += '<button class="alert-close" aria-label="Close alert">';
        alertHTML += '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.854 3.146a.5.5 0 0 0-.708 0L8 7.293 3.854 3.146a.5.5 0 1 0-.708.708L7.293 8l-4.147 4.146a.5.5 0 0 0 .708.708L8 8.707l4.146 4.147a.5.5 0 0 0 .708-.708L8.707 8l4.147-4.146a.5.5 0 0 0 0-.708z" fill="currentColor"/></svg>';
        alertHTML += '</button>';
    }
    
    alert.innerHTML = alertHTML;
    
    // Append to container
    if (container) {
        container.appendChild(alert);
    }
    
    // Initialize the alert
    initAlert(alert);
    
    return alert;
}

// Export for module systems (if using ES6 modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initAlert, initAllAlerts, createAlert };
}
