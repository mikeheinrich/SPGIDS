/**
 * Query Builder Pattern - Vanilla JavaScript
 * A 3-column pattern for building queries with categories, attributes, and summary
 * 
 * USAGE:
 * 1. Include the CSS from query-builder-pattern.css
 * 2. Include this JavaScript file
 * 3. Include list-group-component.js
 * 4. Add a container: <div id="query-builder-container"></div>
 * 5. Initialize: initQueryBuilder({ containerId: 'query-builder-container', categories: {...} })
 */

// Store query builder instances
let queryBuilderInstances = {};

/**
 * Initialize Query Builder
 * @param {Object} options - Configuration options
 * @param {string} options.containerId - ID of container element
 * @param {Object} options.categories - Object with category names as keys and arrays of attributes as values
 * @param {Object} options.selectedAttributes - Initial selected attributes (optional)
 * @param {Function} options.onSave - Callback when save is clicked (optional)
 * @param {Function} options.onCancel - Callback when cancel is clicked (optional)
 * @param {string} options.title - Title for the query builder (default: "Manage Attributes")
 * @param {string} options.summaryTitle - Title for summary section (default: "Summary")
 * @param {string} options.addButtonText - Text for save button (default: "Save")
 * @param {string} options.cancelButtonText - Text for cancel button (default: "Cancel")
 * @param {string} options.searchPlaceholder - Placeholder for search input (default: "Search...")
 * @param {string} options.noFiltersText - Text when no filters selected (default: "No filters selected")
 * @param {string} options.noResultsText - Text when no results found (default: "No filters found")
 */
function initQueryBuilder(options = {}) {
    const {
        containerId = 'query-builder-container',
        categories = {},
        selectedAttributes = {},
        onSave = null,
        onCancel = null,
        title = 'Manage Attributes',
        summaryTitle = 'Summary',
        addButtonText = 'Save',
        cancelButtonText = 'Cancel',
        searchPlaceholder = 'Search...',
        noFiltersText = 'No filters selected',
        noResultsText = 'No filters found'
    } = options;

    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Query builder container #${containerId} not found`);
        return;
    }

    // Create instance
    const instanceId = containerId;
    const instance = {
        containerId,
        categories,
        selectedAttributes: new Map(),
        selectedCategory: Object.keys(categories)[0] || '',
        searchTerm: '',
        onSave,
        onCancel,
        title,
        summaryTitle,
        addButtonText,
        cancelButtonText,
        searchPlaceholder,
        noFiltersText,
        noResultsText,
        searchInitialized: false
    };

    // Initialize selected attributes from provided data
    Object.entries(selectedAttributes).forEach(([category, items]) => {
        instance.selectedAttributes.set(category, new Set(items));
    });

    queryBuilderInstances[instanceId] = instance;

    // Render HTML (this will also initialize the list group)
    renderQueryBuilder(instanceId);
}

/**
 * Render the query builder HTML
 */
function renderQueryBuilder(instanceId) {
    const instance = queryBuilderInstances[instanceId];
    if (!instance) return;

    const container = document.getElementById(instance.containerId);
    if (!container) return;

    const categoryKeys = Object.keys(instance.categories);
    const currentCategory = instance.selectedCategory;
    const currentAttributes = instance.categories[currentCategory] || [];
    
    // Get selected attributes for current category
    const selectedForCategory = instance.selectedAttributes.get(currentCategory) || new Set();
    
    // Filter out already selected attributes from the center column
    const availableAttributes = currentAttributes.filter(attr => !selectedForCategory.has(attr));
    
    // Filter attributes based on search term
    const filteredAttributes = availableAttributes.filter(attr => {
        if (!instance.searchTerm) return true;
        return attr.toLowerCase().includes(instance.searchTerm.toLowerCase());
    });

    // Build HTML
    container.innerHTML = `
        <div class="query-builder">
            <!-- Column 1: Categories -->
            <div class="query-builder__categories">
                <nav class="list-group" id="${instance.containerId}-categories">
                    <ul class="list-group-list" id="${instance.containerId}-categories-list"></ul>
                </nav>
            </div>

            <!-- Column 2: Attributes -->
            <div class="query-builder__attributes">
                <div class="query-builder__attributes-header">
                    <h3 class="query-builder__attributes-title">${currentCategory}</h3>
                    <div id="${instance.containerId}-search"></div>
                </div>
                <div class="query-builder__attributes-content">
                    ${filteredAttributes.length === 0 ? (
                        `<div class="query-builder__no-results">${instance.noResultsText}</div>`
                    ) : (
                        filteredAttributes.map(attr => {
                            const safeId = `${instance.containerId}-attr-${attr.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`;
                            return `
                                <div class="query-builder__attribute-item">
                                    <input 
                                        type="checkbox" 
                                        id="${safeId}"
                                        name="${safeId}"
                                        class="query-builder__checkbox"
                                        data-category="${currentCategory}"
                                        data-attribute="${attr}"
                                    />
                                    <label 
                                        for="${safeId}"
                                        class="query-builder__attribute-label"
                                    >
                                        ${attr}
                                    </label>
                                </div>
                            `;
                        }).join('')
                    )}
                </div>
            </div>

            <!-- Column 3: Summary -->
            <div class="query-builder__summary">
                <div class="query-builder__summary-header">
                    <h3 class="query-builder__summary-title">${instance.summaryTitle}</h3>
                </div>
                <div class="query-builder__summary-content">
                    ${renderSummary(instanceId)}
                </div>
            </div>
        </div>
    `;

    // Attach event listeners
    attachEventListeners(instanceId);

    // Initialize list group if not already initialized
    const listGroupList = document.getElementById(`${instance.containerId}-categories-list`);
    if (listGroupList && listGroupList.children.length === 0 && typeof initListGroup === 'function') {
        const categoryItems = Object.keys(instance.categories).map(cat => ({
            id: cat,
            name: cat
        }));
        
        try {
            initListGroup({
                containerId: `${instance.containerId}-categories`,
                listId: `${instance.containerId}-categories-list`,
                items: categoryItems,
                initialSelection: currentCategory,
                onItemSelect: (id) => {
                    selectCategory(instanceId, id);
                }
            });
        } catch (error) {
            console.error('Error initializing list group in render:', error);
        }
    } else if (listGroupList && listGroupList.children.length > 0 && typeof selectItem === 'function') {
        // List group is already initialized, just update selection
        selectItem(`${instance.containerId}-categories`, currentCategory);
    }

    // Initialize or update search component after render
    const searchContainer = document.getElementById(`${instance.containerId}-search`);
    const availableAttributesForSearch = (instance.categories[currentCategory] || []).filter(attr => {
        const selectedForCategory = instance.selectedAttributes.get(currentCategory) || new Set();
        return !selectedForCategory.has(attr);
    });
    
    if (instance.searchInitialized && searchContainer && searchContainer.querySelector('.search-input')) {
        // Search component already exists, just update it without re-initializing
        const searchInput = searchContainer.querySelector('.search-input');
        if (searchInput) {
            // Clear the search input value smoothly
            searchInput.value = '';
            instance.searchTerm = '';
            
            // Update the clear button visibility
            const clearButton = searchContainer.querySelector('.clear-icon');
            if (clearButton) {
                clearButton.classList.remove('visible');
            }
            
            // Hide typeahead if visible
            const typeahead = searchContainer.querySelector('.search-typeahead');
            if (typeahead) {
                typeahead.classList.remove('visible');
                typeahead.innerHTML = '';
            }
            
            // Remove focus state
            const wrapper = searchContainer.querySelector('.search-input-wrapper');
            if (wrapper) {
                wrapper.classList.remove('focused');
            }
        }
    } else if (typeof initSearch === 'function') {
        // Search component doesn't exist yet, initialize it
        setTimeout(() => {
            initSearch({
                containerId: `${instance.containerId}-search`,
                variant: 'secondary',
                placeholder: instance.searchPlaceholder,
                data: availableAttributesForSearch,
                onSearch: (query, results) => {
                    updateSearchTerm(instanceId, query);
                }
            });
            
            instance.searchInitialized = true;
            
            // Add id/name to search input to fix form field warnings
            const searchInput = document.querySelector(`#${instance.containerId}-search .search-input`);
            if (searchInput && !searchInput.id) {
                searchInput.id = `${instance.containerId}-search-input`;
                searchInput.name = `${instance.containerId}-search-input`;
            }
        }, 0);
    }
}

/**
 * Render summary section
 */
function renderSummary(instanceId) {
    const instance = queryBuilderInstances[instanceId];
    if (!instance) return '';

    const totalSelected = Array.from(instance.selectedAttributes.values())
        .reduce((sum, set) => sum + set.size, 0);

    if (totalSelected === 0) {
        return `<div class="query-builder__summary-empty">${instance.noFiltersText}</div>`;
    }

    return Array.from(instance.selectedAttributes.entries())
        .map(([category, attributes]) => {
            if (attributes.size === 0) return '';
            
            const attributeArray = Array.from(attributes);
            return `
                <div class="query-builder__summary-category">
                    <h4 class="query-builder__summary-category-title">${category}</h4>
                    <div class="query-builder__summary-tags">
                        ${attributeArray.map(attr => `
                            <div class="query-builder__summary-tag">
                                <span>${attr}</span>
                                <button 
                                    class="query-builder__summary-tag-remove"
                                    data-category="${category}"
                                    data-attribute="${attr}"
                                    aria-label="Remove ${attr}"
                                >
                                    <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="8" cy="8" r="8" fill="currentColor"/>
                                        <g transform="translate(4 4)">
                                            <line x1="8" y2="8" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                                            <line x2="8" y2="8" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                                        </g>
                                    </svg>
                                </button>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        })
        .filter(html => html !== '')
        .join('');
}

/**
 * Attach event listeners
 */
function attachEventListeners(instanceId) {
    const instance = queryBuilderInstances[instanceId];
    if (!instance) return;

    const container = document.getElementById(instance.containerId);
    if (!container) return;

    // Checkbox change handlers - clicking moves item from center to right
    container.querySelectorAll('.query-builder__checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            const category = e.target.dataset.category;
            const attribute = e.target.dataset.attribute;
            moveAttributeToSummary(instanceId, category, attribute);
        });
    });

    // Remove tag handlers - clicking removes item from summary and moves back to center
    container.querySelectorAll('.query-builder__summary-tag-remove').forEach(button => {
        button.addEventListener('click', (e) => {
            const category = e.target.closest('button').dataset.category;
            const attribute = e.target.closest('button').dataset.attribute;
            removeAttributeFromSummary(instanceId, category, attribute);
        });
    });

}

/**
 * Select a category
 */
function selectCategory(instanceId, categoryName) {
    const instance = queryBuilderInstances[instanceId];
    if (!instance) return;

    instance.selectedCategory = categoryName;
    instance.searchTerm = '';

    // Clear the search container before re-rendering
    const searchContainer = document.getElementById(`${instance.containerId}-search`);
    if (searchContainer) {
        searchContainer.innerHTML = '';
    }

    renderQueryBuilder(instanceId);
}

/**
 * Update search term
 */
function updateSearchTerm(instanceId, searchTerm) {
    const instance = queryBuilderInstances[instanceId];
    if (!instance) return;

    instance.searchTerm = searchTerm;
    
    // Re-render attributes section
    const currentCategory = instance.selectedCategory;
    const currentAttributes = instance.categories[currentCategory] || [];
    const selectedForCategory = instance.selectedAttributes.get(currentCategory) || new Set();
    
    // Filter out already selected attributes
    const availableAttributes = currentAttributes.filter(attr => !selectedForCategory.has(attr));
    
    // Filter based on search term
    const filteredAttributes = availableAttributes.filter(attr => {
        if (!instance.searchTerm) return true;
        return attr.toLowerCase().includes(instance.searchTerm.toLowerCase());
    });

    const attributesContent = document.querySelector(`#${instance.containerId} .query-builder__attributes-content`);
    if (attributesContent) {
        attributesContent.innerHTML = filteredAttributes.length === 0 ? (
            `<div class="query-builder__no-results">${instance.noResultsText}</div>`
        ) : (
            filteredAttributes.map(attr => {
                const safeId = `${instance.containerId}-attr-${attr.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`;
                return `
                    <div class="query-builder__attribute-item">
                        <input 
                            type="checkbox" 
                            id="${safeId}"
                            name="${safeId}"
                            class="query-builder__checkbox"
                            data-category="${currentCategory}"
                            data-attribute="${attr}"
                        />
                        <label 
                            for="${safeId}"
                            class="query-builder__attribute-label"
                        >
                            ${attr}
                        </label>
                    </div>
                `;
            }).join('')
        );

        // Re-attach checkbox listeners
        attributesContent.querySelectorAll('.query-builder__checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const category = e.target.dataset.category;
                const attribute = e.target.dataset.attribute;
                moveAttributeToSummary(instanceId, category, attribute);
            });
        });
    }
}

/**
 * Move an attribute from center column to summary (right column)
 */
function moveAttributeToSummary(instanceId, category, attribute) {
    const instance = queryBuilderInstances[instanceId];
    if (!instance) return;

    const categorySet = instance.selectedAttributes.get(category) || new Set();
    categorySet.add(attribute);
    instance.selectedAttributes.set(category, categorySet);

    // Re-render both attributes and summary sections
    renderQueryBuilder(instanceId);
}

/**
 * Remove an attribute from summary (moves it back to center column)
 */
function removeAttributeFromSummary(instanceId, category, attribute) {
    const instance = queryBuilderInstances[instanceId];
    if (!instance) return;

    const categorySet = instance.selectedAttributes.get(category);
    if (categorySet) {
        categorySet.delete(attribute);
        if (categorySet.size > 0) {
            instance.selectedAttributes.set(category, categorySet);
        } else {
            instance.selectedAttributes.delete(category);
        }
    }

    // Re-render to update both attributes and summary
    renderQueryBuilder(instanceId);
}


/**
 * Get selected attributes
 */
function getSelectedAttributes(instanceId) {
    const instance = queryBuilderInstances[instanceId];
    if (!instance) return {};

    const result = {};
    instance.selectedAttributes.forEach((attributes, category) => {
        if (attributes.size > 0) {
            result[category] = Array.from(attributes);
        }
    });

    return result;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initQueryBuilder,
        getSelectedAttributes,
        queryBuilderInstances
    };
}

