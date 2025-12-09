/**
 * Label Component - Vanilla JavaScript
 * 
 * Colored tags without remove button
 * 
 * USAGE:
 * 1. Include the CSS from label-component.css
 * 2. Include this JavaScript file
 * 3. Use: createLabel(text, variant) or initLabel(containerId, options)
 */

/**
 * Create label HTML
 * @param {string} text - Text content of the label
 * @param {string} variant - Variant: 'default', 'success', 'info', 'attention'
 * @returns {string} HTML string
 */
function createLabel(text, variant = 'default') {
    const variantClass = `label--${variant}`;
    
    return `
        <span class="label ${variantClass}">
            <span class="label-text">${text}</span>
        </span>
    `;
}

/**
 * Initialize label in a container
 * @param {string} containerId - ID of container element
 * @param {Object} options - Configuration options
 */
function initLabel(containerId, options = {}) {
    const {
        text = '',
        variant = 'default'
    } = options;
    
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Label container #${containerId} not found`);
        return;
    }
    
    // Render label
    container.innerHTML = createLabel(text, variant);
}

/**
 * Create multiple labels
 * @param {Array} items - Array of label items (strings or objects with text and variant)
 * @returns {string} HTML string with multiple labels
 */
function createLabels(items = []) {
    return items.map((item) => {
        const text = typeof item === 'string' ? item : item.text || item.label || '';
        const variant = typeof item === 'object' && item.variant ? item.variant : 'default';
        return createLabel(text, variant);
    }).join('');
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createLabel, initLabel, createLabels };
}



