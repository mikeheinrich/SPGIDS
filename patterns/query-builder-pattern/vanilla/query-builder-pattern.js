/**
 * Query Builder Pattern - Vanilla JavaScript
 * 
 * A 3-column pattern for building queries with categories, attributes, and summary
 * 
 * USAGE:
 * 1. Include the required CSS files (list-group, search, query-builder)
 * 2. Include the required JS files (list-group, search, query-builder)
 * 3. Add a container: <div id="query-builder-container"></div>
 * 4. Initialize: initQueryBuilder({ containerId: '...', categories: {...} })
 * 
 * DEPENDENCIES:
 * - List Group Component (list-group-component.js)
 * - Search Component (search-component.js)
 */

// Store query builder instances
let queryBuilderInstances = {};

/**
 * Create the query builder HTML structure
 */
function createQueryBuilderHTML(instanceId) {
    const instance = queryBuilderInstances[instanceId];
    if (!instance) return '';

    return `
        <div class="query-builder">
            <!-- Column 1: Categories (using list-group component) -->
            <div class="query-builder__categories">
                <nav class="list-group query-builder__list-group" id="${instanceId}-list-group">
                    <ul class="list-group-list" id="${instanceId}-list-group-list"></ul>
                </nav>
            </div>
            
            <!-- Column 2: Attributes -->
            <div class="query-builder__attributes">
                <div class="query-builder__attributes-header">
                    <h3 class="query-builder__attributes-title" id="${instanceId}-attributes-title">${instance.title}</h3>
                    <div id="${instanceId}-search-container"></div>
                </div>
                <div class="query-builder__attributes-content" id="${instanceId}-attributes-content">
                    <!-- Attribute checkboxes will be rendered here -->
                </div>
            </div>
            
            <!-- Column 3: Summary -->
            <div class="query-builder__summary">
                <div class="query-builder__summary-header">
                    <h3 class="query-builder__summary-title">${instance.summaryTitle}</h3>
                </div>
                <div class="query-builder__summary-content" id="${instanceId}-summary-content">
                    <!-- Selected attributes will be rendered here -->
                </div>
            </div>
        </div>
    `;
}

/**
 * Render attributes for the selected category
 */
function renderAttributes(instanceId, searchQuery = '') {
    const instance = queryBuilderInstances[instanceId];
    if (!instance || !instance.selectedCategory) return;

    const container = document.getElementById(`${instanceId}-attributes-content`);
    if (!container) return;

    const category = instance.selectedCategory;
    const allAttributes = instance.categories[category] || [];
    const selectedAttrs = instance.selectedAttributes[category] || [];

    // Filter attributes based on search and exclude already selected
    let availableAttributes = allAttributes.filter(attr => !selectedAttrs.includes(attr));
    
    if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        availableAttributes = availableAttributes.filter(attr => 
            attr.toLowerCase().includes(query)
        );
    }

    if (availableAttributes.length === 0) {
        container.innerHTML = `<div class="query-builder__no-results">${instance.noResultsText}</div>`;
        return;
    }

    container.innerHTML = availableAttributes.map(attr => `
        <label class="query-builder__attribute-item">
            <input type="checkbox" class="query-builder__checkbox" data-attribute="${attr}" data-category="${category}">
            <span class="query-builder__attribute-label">${attr}</span>
        </label>
    `).join('');

    // Add click handlers
    container.querySelectorAll('.query-builder__checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            if (e.target.checked) {
                selectAttribute(instanceId, e.target.dataset.category, e.target.dataset.attribute);
            }
        });
    });
}

/**
 * Select an attribute (move from center to right column)
 */
function selectAttribute(instanceId, category, attribute) {
    const instance = queryBuilderInstances[instanceId];
    if (!instance) return;

    if (!instance.selectedAttributes[category]) {
        instance.selectedAttributes[category] = [];
    }

    if (!instance.selectedAttributes[category].includes(attribute)) {
        instance.selectedAttributes[category].push(attribute);
    }

    // Re-render attributes and summary
    renderAttributes(instanceId, getSearchQuery(instanceId));
    renderSummary(instanceId);

    // Call onChange callback if provided
    if (instance.onChange && typeof instance.onChange === 'function') {
        instance.onChange(instance.selectedAttributes);
    }
}

/**
 * Remove an attribute (move from right back to center column)
 */
function removeAttribute(instanceId, category, attribute) {
    const instance = queryBuilderInstances[instanceId];
    if (!instance) return;

    if (instance.selectedAttributes[category]) {
        instance.selectedAttributes[category] = instance.selectedAttributes[category].filter(
            attr => attr !== attribute
        );

        // Clean up empty categories
        if (instance.selectedAttributes[category].length === 0) {
            delete instance.selectedAttributes[category];
        }
    }

    // Re-render attributes and summary
    renderAttributes(instanceId, getSearchQuery(instanceId));
    renderSummary(instanceId);

    // Call onChange callback if provided
    if (instance.onChange && typeof instance.onChange === 'function') {
        instance.onChange(instance.selectedAttributes);
    }
}

/**
 * Render the summary (right column)
 */
function renderSummary(instanceId) {
    const instance = queryBuilderInstances[instanceId];
    if (!instance) return;

    const container = document.getElementById(`${instanceId}-summary-content`);
    if (!container) return;

    const categories = Object.keys(instance.selectedAttributes).filter(
        cat => instance.selectedAttributes[cat] && instance.selectedAttributes[cat].length > 0
    );

    if (categories.length === 0) {
        container.innerHTML = `<div class="query-builder__summary-empty">${instance.noFiltersText}</div>`;
        return;
    }

    container.innerHTML = categories.map(category => `
        <div class="query-builder__summary-category">
            <h4 class="query-builder__summary-category-title">${category}</h4>
            <div class="query-builder__summary-tags">
                ${instance.selectedAttributes[category].map(attr => `
                    <span class="query-builder__summary-tag">
                        ${attr}
                        <button class="query-builder__summary-tag-remove" data-category="${category}" data-attribute="${attr}" aria-label="Remove ${attr}">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </button>
                    </span>
                `).join('')}
            </div>
        </div>
    `).join('');

    // Add remove button handlers
    container.querySelectorAll('.query-builder__summary-tag-remove').forEach(button => {
        button.addEventListener('click', () => {
            removeAttribute(instanceId, button.dataset.category, button.dataset.attribute);
        });
    });
}

/**
 * Get current search query
 */
function getSearchQuery(instanceId) {
    const searchInput = document.querySelector(`#${instanceId}-search-container .search-input`);
    return searchInput ? searchInput.value : '';
}

/**
 * Handle category selection (from list-group component)
 */
function handleCategorySelect(instanceId, categoryId, category) {
    const instance = queryBuilderInstances[instanceId];
    if (!instance) return;

    instance.selectedCategory = category.name;

    // Update attributes title
    const titleEl = document.getElementById(`${instanceId}-attributes-title`);
    if (titleEl) {
        titleEl.textContent = category.name;
    }

    // Clear search and render attributes
    const searchInput = document.querySelector(`#${instanceId}-search-container .search-input`);
    if (searchInput) {
        searchInput.value = '';
    }

    renderAttributes(instanceId);
}

/**
 * Initialize the Query Builder
 */
function initQueryBuilder(options = {}) {
    const {
        containerId,
        categories = {},
        selectedAttributes = {},
        title = 'Manage Attributes',
        summaryTitle = 'Summary',
        searchPlaceholder = 'Search...',
        noFiltersText = 'No filters selected',
        noResultsText = 'No filters found',
        onChange = null
    } = options;

    if (!containerId) {
        console.error('Query Builder: containerId is required');
        return;
    }

    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Query Builder: container #${containerId} not found`);
        return;
    }

    // Create instance
    const instanceId = containerId;
    const categoryNames = Object.keys(categories);

    queryBuilderInstances[instanceId] = {
        containerId,
        categories,
        selectedAttributes: JSON.parse(JSON.stringify(selectedAttributes)), // Deep copy
        selectedCategory: categoryNames.length > 0 ? categoryNames[0] : null,
        title,
        summaryTitle,
        searchPlaceholder,
        noFiltersText,
        noResultsText,
        onChange
    };

    // Render HTML structure
    container.innerHTML = createQueryBuilderHTML(instanceId);

    // Initialize list-group component for categories
    const listGroupItems = categoryNames.map(name => ({
        id: name.toLowerCase().replace(/\s+/g, '-'),
        name: name
    }));

    if (typeof initListGroup === 'function') {
        initListGroup({
            containerId: `${instanceId}-list-group`,
            listId: `${instanceId}-list-group-list`,
            items: listGroupItems,
            initialSelection: listGroupItems.length > 0 ? listGroupItems[0].id : null,
            showDividers: true,
            onItemSelect: (id, item) => handleCategorySelect(instanceId, id, item)
        });
    } else {
        console.warn('Query Builder: list-group-component.js not loaded. Category list will not function.');
    }

    // Initialize search component
    const instance = queryBuilderInstances[instanceId];
    if (typeof initSearch === 'function' && instance.selectedCategory) {
        const allAttributesFlat = Object.values(categories).flat();
        initSearch({
            containerId: `${instanceId}-search-container`,
            variant: 'secondary',
            placeholder: searchPlaceholder,
            data: allAttributesFlat,
            onSearch: (query, results) => {
                renderAttributes(instanceId, query);
            }
        });
    } else if (typeof initSearch !== 'function') {
        console.warn('Query Builder: search-component.js not loaded. Search will not function.');
    }

    // Initial render
    renderAttributes(instanceId);
    renderSummary(instanceId);

    return {
        getSelectedAttributes: () => getSelectedAttributes(instanceId),
        selectAttribute: (category, attribute) => selectAttribute(instanceId, category, attribute),
        removeAttribute: (category, attribute) => removeAttribute(instanceId, category, attribute)
    };
}

/**
 * Get selected attributes for an instance
 */
function getSelectedAttributes(instanceId) {
    const instance = queryBuilderInstances[instanceId];
    if (!instance) return {};
    return JSON.parse(JSON.stringify(instance.selectedAttributes)); // Return deep copy
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initQueryBuilder,
        getSelectedAttributes,
        queryBuilderInstances
    };
}
