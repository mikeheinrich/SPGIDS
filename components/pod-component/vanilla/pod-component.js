/**
 * Pod Component - Vanilla JavaScript
 * 
 * Removable chip/tag with rounded pill shape
 * 
 * USAGE:
 * 1. Include the CSS from pod-component.css
 * 2. Include this JavaScript file
 * 3. Use: createPod(text, onRemove) or initPod(containerId, options)
 */

/**
 * Create pod HTML
 * @param {string} text - Text content of the pod
 * @param {Function} onRemove - Callback when remove button is clicked
 * @param {string} id - Optional unique ID for the pod
 * @returns {string} HTML string
 */
function createPod(text, onRemove = null, id = null) {
    const podId = id || `pod-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    return `
        <span class="pod" data-pod-id="${podId}">
            <span class="pod-text">${text}</span>
            <button type="button" class="pod-remove" aria-label="Remove ${text}" data-pod-id="${podId}">
                <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="8" cy="8" r="8" fill="#5c5c5c"/>
                    <g transform="translate(4 4)">
                        <line x1="8" y2="8" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                        <line x2="8" y2="8" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                    </g>
                </svg>
            </button>
        </span>
    `;
}

/**
 * Initialize pod in a container
 * @param {string} containerId - ID of container element
 * @param {Object} options - Configuration options
 */
function initPod(containerId, options = {}) {
    const {
        text = '',
        onRemove = null
    } = options;
    
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Pod container #${containerId} not found`);
        return;
    }
    
    // Render pod
    container.innerHTML = createPod(text, onRemove);
    
    // Add remove handler
    const removeButton = container.querySelector('.pod-remove');
    if (removeButton && onRemove) {
        removeButton.addEventListener('click', function(e) {
            e.stopPropagation();
            if (onRemove) {
                onRemove(text, container);
            }
        });
    }
}

/**
 * Create multiple pods
 * @param {Array} items - Array of pod items (strings or objects with text property)
 * @param {Function} onRemove - Callback when a pod is removed
 * @returns {string} HTML string with multiple pods
 */
function createPods(items = [], onRemove = null) {
    return items.map((item, index) => {
        const text = typeof item === 'string' ? item : item.text || item.label || '';
        return createPod(text, onRemove, `pod-${index}`);
    }).join('');
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createPod, initPod, createPods };
}

