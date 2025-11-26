/**
 * Prefilter Primary Search Component - Vanilla JavaScript
 * 
 * This file contains the functionality for the prefilter primary search component.
 * 
 * USAGE:
 * 1. Include the CSS from prefilter-primary-search-component.css in your <head>
 * 2. Include this JavaScript file before the closing </body> tag
 * 3. Add a container: <div id="prefilter-search-container"></div>
 * 4. Initialize the component: initPrefilterPrimarySearch(options)
 * 
 * DEPENDENCIES:
 * - None (pure vanilla JavaScript)
 * 
 * OPTIONS:
 * {
 *   containerId: string (ID of container element, default: 'prefilter-search-container'),
 *   placeholder: string (placeholder text for search input, default: 'Search'),
 *   defaultPrefilter: string (default prefilter option, default: 'CLM Pro'),
 *   options: array (prefilter dropdown options, default: ['CLM Pro', 'Snowflake']),
 *   onPrefilterChange: function(value) (callback when prefilter changes),
 *   onSearch: function(query) (callback when search is performed)
 * }
 */

/**
 * Create prefilter primary search HTML
 * @param {Object} options - Component configuration options
 * @returns {string} Component HTML string
 */
function createPrefilterPrimarySearch(options = {}) {
    const {
        placeholder = 'Search',
        defaultPrefilter = 'CLM Pro',
        options: prefilterOptions = ['CLM Pro', 'Snowflake']
    } = options;
    
    const containerId = options.containerId || 'prefilter-search-container';
    const uniqueId = containerId.replace(/[^a-zA-Z0-9]/g, '_');
    
    let optionsHTML = '';
    prefilterOptions.forEach(option => {
        optionsHTML += `<button class="prefilter-dropdown-item" data-value="${option}">${option}</button>`;
    });
    
    return `
        <div class="prefilter-primary-search-wrapper">
            <div class="prefilter-primary-search">
                <div class="prefilter-wrapper">
                    <button class="prefilter-dropdown" id="prefilterButton_${uniqueId}">
                        <span class="prefilter-text" id="prefilterText_${uniqueId}">${defaultPrefilter}</span>
                        <div class="prefilter-caret-wrapper">
                            <svg class="prefilter-caret" xmlns="http://www.w3.org/2000/svg" width="10.649" height="6" viewBox="0 0 10.649 6">
                                <g transform="translate(10.649) rotate(90)">
                                    <path d="M1.134,10.451A.66.66,0,0,1,.92,10.6a.628.628,0,0,1-.254.053.594.594,0,0,1-.25-.053A.821.821,0,0,1,.2,10.451a.853.853,0,0,1-.145-.218A.593.593,0,0,1,0,9.983V.666A.627.627,0,0,1,.053.412.679.679,0,0,1,.2.2.681.681,0,0,1,.416.047.675.675,0,0,1,.666,0,.715.715,0,0,1,.92.047.567.567,0,0,1,1.134.2L5.792,4.856a.61.61,0,0,1,.156.214A.627.627,0,0,1,6,5.324a.6.6,0,0,1-.052.25.747.747,0,0,1-.156.218Z" fill="#5c5c5c"/>
                                </g>
                            </svg>
                        </div>
                    </button>
                    <div class="prefilter-dropdown-menu" id="prefilterMenu_${uniqueId}">
                        ${optionsHTML}
                    </div>
                </div>
                <div class="search-separator"></div>
                <div class="search-input-container">
                    <input type="text" class="search-input-field" id="searchInput_${uniqueId}" placeholder="${placeholder}" />
                    <div class="search-icon-container">
                        <svg viewBox="0 0 18.509 18.446" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.838,14.99a7.185,7.185,0,0,0,3.076-.692l4.075,4.075a2.446,2.446,0,0,0,3.459-3.459l-4-4.075a7.333,7.333,0,0,0-3.613-9.533,7.171,7.171,0,1,0-3,13.684h0Zm0-12.3A5.074,5.074,0,1,1,2.764,7.765,5.069,5.069,0,0,1,7.838,2.69h0Z" transform="translate(-0.63 -0.619)" fill="#5c5c5c"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * Initialize prefilter primary search component
 * @param {Object} options - Component configuration options
 */
function initPrefilterPrimarySearch(options = {}) {
    const containerId = options.containerId || 'prefilter-search-container';
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.error(`Prefilter primary search container #${containerId} not found`);
        return;
    }
    
    // Render HTML
    container.innerHTML = createPrefilterPrimarySearch(options);
    
    const uniqueId = containerId.replace(/[^a-zA-Z0-9]/g, '_');
    const prefilterButton = document.getElementById(`prefilterButton_${uniqueId}`);
    const prefilterMenu = document.getElementById(`prefilterMenu_${uniqueId}`);
    const prefilterText = document.getElementById(`prefilterText_${uniqueId}`);
    const searchInput = document.getElementById(`searchInput_${uniqueId}`);
    
    if (!prefilterButton || !prefilterMenu || !prefilterText) {
        console.error('Prefilter primary search elements not found after creation');
        return;
    }
    
    // Toggle dropdown on button click
    prefilterButton.addEventListener('click', function(e) {
        e.stopPropagation();
        prefilterMenu.classList.toggle('open');
    });
    
    // Handle option selection
    const dropdownItems = prefilterMenu.querySelectorAll('.prefilter-dropdown-item');
    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            const value = this.getAttribute('data-value');
            prefilterText.textContent = value;
            prefilterMenu.classList.remove('open');
            
            // Call callback if provided
            if (options.onPrefilterChange) {
                options.onPrefilterChange(value);
            }
        });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!prefilterButton.contains(e.target) && !prefilterMenu.contains(e.target)) {
            prefilterMenu.classList.remove('open');
        }
    });
    
    // Handle search input
    if (searchInput && options.onSearch) {
        let debounceTimer;
        searchInput.addEventListener('input', function(e) {
            clearTimeout(debounceTimer);
            const query = e.target.value;
            debounceTimer = setTimeout(() => {
                options.onSearch(query);
            }, 300);
        });
        
        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (options.onSearch) {
                    options.onSearch(e.target.value);
                }
            }
        });
    }
}

// Export for module systems (if using ES6 modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createPrefilterPrimarySearch, initPrefilterPrimarySearch };
}


