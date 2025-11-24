/**
 * Search Component
 * Primary and secondary search inputs with typeahead functionality
 * 
 * Usage:
 * 1. Include search-component.css
 * 2. Include search-component.js
 * 3. Call initSearch({ containerId: '...', variant: 'primary'|'secondary', data: [...] })
 */

// Sample data for testing
const DEFAULT_SEARCH_DATA = [
    'Apple',
    'Application',
    'Apply',
    'Banana',
    'Band',
    'Bank',
    'Baseball',
    'Basketball',
    'Cat',
    'Category',
    'Computer',
    'Cookie',
    'Dashboard',
    'Data',
    'Database',
    'Document',
    'Dog',
    'Dollar',
    'Email',
    'Employee',
    'Error',
    'File',
    'Folder',
    'Function',
    'Graph',
    'Group',
    'Home',
    'Image',
    'Information',
    'Item',
    'List',
    'Menu',
    'Message',
    'Network',
    'Notification',
    'Page',
    'Panel',
    'Profile',
    'Project',
    'Report',
    'Search',
    'Settings',
    'System',
    'Table',
    'Task',
    'Template',
    'User',
    'View',
    'Window',
    'Workflow'
];

function createSearchHTML(variant = 'primary') {
    const variantClass = variant === 'primary' ? 'search-input-wrapper--primary' : 'search-input-wrapper--secondary';
    
    return `
        <div class="search-input-wrapper ${variantClass}">
            <input type="text" class="search-input" placeholder="Search" autocomplete="off">
            <div class="search-icons">
                <button class="clear-icon" aria-label="Clear search" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                        <circle cx="8" cy="8" r="8" fill="currentColor"/>
                        <g transform="translate(4 4)">
                            <line x1="8" y2="8" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                            <line x2="8" y2="8" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                        </g>
                    </svg>
                </button>
                <div class="search-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18.509" height="18.446" viewBox="0 0 18.509 18.446">
                        <path d="M7.838,14.99a7.185,7.185,0,0,0,3.076-.692l4.075,4.075a2.446,2.446,0,0,0,3.459-3.459l-4-4.075a7.333,7.333,0,0,0-3.613-9.533,7.171,7.171,0,1,0-3,13.684h0Zm0-12.3A5.074,5.074,0,1,1,2.764,7.765,5.069,5.069,0,0,1,7.838,2.69h0Z" transform="translate(-0.63 -0.619)"/>
                    </svg>
                </div>
            </div>
        </div>
        <div class="search-typeahead"></div>
    `;
}

function filterData(query, data) {
    if (!query || query.trim() === '') {
        return [];
    }
    
    const lowerQuery = query.toLowerCase().trim();
    return data.filter(item => {
        const lowerItem = typeof item === 'string' ? item.toLowerCase() : item.label?.toLowerCase() || '';
        return lowerItem.includes(lowerQuery);
    }).slice(0, 10); // Limit to 10 results
}

function renderTypeahead(container, items, onSelect) {
    const typeahead = container.querySelector('.search-typeahead');
    if (!typeahead) return;
    
    if (items.length === 0) {
        typeahead.innerHTML = '<div class="search-typeahead-no-results">No results found</div>';
        typeahead.classList.add('visible');
        return;
    }
    
    typeahead.innerHTML = items.map((item, index) => {
        const text = typeof item === 'string' ? item : item.label;
        const value = typeof item === 'string' ? item : item.value || item.label;
        return `<div class="search-typeahead-item" data-index="${index}" data-value="${value}">${text}</div>`;
    }).join('');
    
    typeahead.classList.add('visible');
    
    // Add click handlers
    typeahead.querySelectorAll('.search-typeahead-item').forEach(item => {
        item.addEventListener('click', () => {
            const value = item.dataset.value;
            const input = container.querySelector('.search-input');
            if (input) {
                input.value = value;
                container.querySelector('.search-input-wrapper').classList.remove('focused');
                typeahead.classList.remove('visible');
                updateClearButton(container);
                if (onSelect) {
                    onSelect(value);
                }
            }
        });
        
        item.addEventListener('mouseenter', () => {
            typeahead.querySelectorAll('.search-typeahead-item').forEach(i => i.classList.remove('highlighted'));
            item.classList.add('highlighted');
        });
    });
}

function updateClearButton(container) {
    const input = container.querySelector('.search-input');
    const clearButton = container.querySelector('.clear-icon');
    if (input && clearButton) {
        if (input.value.trim() !== '') {
            clearButton.classList.add('visible');
        } else {
            clearButton.classList.remove('visible');
        }
    }
}

function initSearch(options = {}) {
    const {
        containerId,
        variant = 'primary',
        data = DEFAULT_SEARCH_DATA,
        onSelect,
        onSearch,
        placeholder = 'Search'
    } = options;
    
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Search container #${containerId} not found`);
        return;
    }
    
    // Add class for layout
    container.classList.add('search-container');
    
    // Render HTML
    container.innerHTML = createSearchHTML(variant);
    
    // Get elements
    const input = container.querySelector('.search-input');
    const clearButton = container.querySelector('.clear-icon');
    const wrapper = container.querySelector('.search-input-wrapper');
    const typeahead = container.querySelector('.search-typeahead');
    
    if (!input || !clearButton || !wrapper) {
        console.error('Search component elements not found');
        return;
    }
    
    // Set placeholder
    if (placeholder !== 'Search') {
        input.placeholder = placeholder;
    }
    
    // Input event handlers
    let debounceTimer;
    input.addEventListener('input', (e) => {
        const query = e.target.value;
        updateClearButton(container);
        
        // Debounce search
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            const results = filterData(query, data);
            renderTypeahead(container, results, onSelect);
            
            if (onSearch) {
                onSearch(query, results);
            }
        }, 150);
    });
    
    // Focus handlers
    input.addEventListener('focus', () => {
        wrapper.classList.add('focused');
        const query = input.value;
        if (query.trim() !== '') {
            const results = filterData(query, data);
            renderTypeahead(container, results, onSelect);
        }
    });
    
    input.addEventListener('blur', () => {
        // Delay to allow click events on typeahead items
        setTimeout(() => {
            wrapper.classList.remove('focused');
            if (typeahead) {
                typeahead.classList.remove('visible');
            }
        }, 200);
    });
    
    // Clear button handler
    clearButton.addEventListener('click', (e) => {
        e.stopPropagation();
        input.value = '';
        input.focus();
        updateClearButton(container);
        if (typeahead) {
            typeahead.classList.remove('visible');
        }
        if (onSearch) {
            onSearch('', []);
        }
    });
    
    // Keyboard navigation
    let highlightedIndex = -1;
    input.addEventListener('keydown', (e) => {
        const items = typeahead.querySelectorAll('.search-typeahead-item');
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (items.length > 0) {
                highlightedIndex = (highlightedIndex + 1) % items.length;
                items.forEach((item, i) => {
                    item.classList.toggle('highlighted', i === highlightedIndex);
                });
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (items.length > 0) {
                highlightedIndex = highlightedIndex <= 0 ? items.length - 1 : highlightedIndex - 1;
                items.forEach((item, i) => {
                    item.classList.toggle('highlighted', i === highlightedIndex);
                });
            }
        } else if (e.key === 'Enter') {
            e.preventDefault();
            if (highlightedIndex >= 0 && items[highlightedIndex]) {
                items[highlightedIndex].click();
            }
        } else if (e.key === 'Escape') {
            wrapper.classList.remove('focused');
            if (typeahead) {
                typeahead.classList.remove('visible');
            }
            input.blur();
        }
    });
    
    // Initial state
    updateClearButton(container);
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initSearch, DEFAULT_SEARCH_DATA };
}




