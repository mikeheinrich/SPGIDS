/**
 * Query Builder Pattern - Vanilla JavaScript
 * A 3-column pattern for building queries with categories, attributes, and summary
 */

// Store query builder instances
let queryBuilderInstances = {};

/**
 * Initialize Query Builder
 */
function initQueryBuilder(options) {
    options = options || {};
    const containerId = options.containerId || 'query-builder-container';
    const categories = options.categories || {};
    const selectedAttributes = options.selectedAttributes || {};
    const onSave = options.onSave || null;
    const onCancel = options.onCancel || null;
    const title = options.title || 'Manage Attributes';
    const summaryTitle = options.summaryTitle || 'Summary';
    const addButtonText = options.addButtonText || 'Save';
    const cancelButtonText = options.cancelButtonText || 'Cancel';
    const searchPlaceholder = options.searchPlaceholder || 'Search...';
    const noFiltersText = options.noFiltersText || 'No filters selected';
    const noResultsText = options.noResultsText || 'No filters found';

    const container = document.getElementById(containerId);
    if (!container) {
        console.error('Query builder container #' + containerId + ' not found');
        return;
    }

    // Create instance
    const instanceId = containerId;
    const instance = {
        containerId: containerId,
        categories: categories,
        selectedAttributes: new Map(),
        selectedCategory: Object.keys(categories)[0] || '',
        searchTerm: '',
        onSave: onSave,
        onCancel: onCancel,
        title: title,
        summaryTitle: summaryTitle,
        addButtonText: addButtonText,
        cancelButtonText: cancelButtonText,
        searchPlaceholder: searchPlaceholder,
        noFiltersText: noFiltersText,
        noResultsText: noResultsText
    };

    // Initialize selected attributes from provided data
    Object.keys(selectedAttributes).forEach(function(category) {
        var items = selectedAttributes[category];
        instance.selectedAttributes.set(category, new Set(items));
    });

    queryBuilderInstances[instanceId] = instance;

    // Build the initial HTML structure
    buildQueryBuilderHTML(instanceId);
    
    // Render the content
    renderCategories(instanceId);
    renderAttributes(instanceId);
    renderSummary(instanceId);
    
    // Initialize search
    initializeSearch(instanceId);
}

/**
 * Build the static HTML structure
 */
function buildQueryBuilderHTML(instanceId) {
    var instance = queryBuilderInstances[instanceId];
    if (!instance) return;

    var container = document.getElementById(instance.containerId);
    if (!container) return;

    container.innerHTML = 
        '<div class="query-builder">' +
            '<div class="query-builder__categories">' +
                '<div class="query-builder__categories-list" id="' + instanceId + '-categories-list"></div>' +
            '</div>' +
            '<div class="query-builder__attributes">' +
                '<div class="query-builder__attributes-header">' +
                    '<h3 class="query-builder__attributes-title" id="' + instanceId + '-attributes-title">' + instance.selectedCategory + '</h3>' +
                    '<div id="' + instanceId + '-search"></div>' +
                '</div>' +
                '<div class="query-builder__attributes-content" id="' + instanceId + '-attributes-content"></div>' +
            '</div>' +
            '<div class="query-builder__summary">' +
                '<div class="query-builder__summary-header">' +
                    '<h3 class="query-builder__summary-title">' + instance.summaryTitle + '</h3>' +
                '</div>' +
                '<div class="query-builder__summary-content" id="' + instanceId + '-summary-content"></div>' +
            '</div>' +
        '</div>';
}

/**
 * Render categories list (Column 1)
 */
function renderCategories(instanceId) {
    var instance = queryBuilderInstances[instanceId];
    if (!instance) return;

    var categoriesList = document.getElementById(instanceId + '-categories-list');
    if (!categoriesList) return;

    var categoryKeys = Object.keys(instance.categories);
    
    var html = '';
    categoryKeys.forEach(function(cat) {
        var isActive = cat === instance.selectedCategory;
        html += '<div class="query-builder__category-item ' + (isActive ? 'active' : '') + '" data-category="' + cat + '">' + cat + '</div>';
    });
    categoriesList.innerHTML = html;

    // Attach click handlers
    categoriesList.querySelectorAll('.query-builder__category-item').forEach(function(item) {
        item.addEventListener('click', function() {
            var category = item.dataset.category;
            if (category !== instance.selectedCategory) {
                instance.selectedCategory = category;
                instance.searchTerm = '';
                
                // Update active state
                categoriesList.querySelectorAll('.query-builder__category-item').forEach(function(el) {
                    el.classList.remove('active');
                });
                item.classList.add('active');
                
                // Update title
                var titleEl = document.getElementById(instanceId + '-attributes-title');
                if (titleEl) titleEl.textContent = category;
                
                // Re-render attributes
                renderAttributes(instanceId);
                
                // Reinitialize search with new category's attributes
                var searchContainer = document.getElementById(instanceId + '-search');
                if (searchContainer) {
                    searchContainer.innerHTML = '';
                    initializeSearch(instanceId);
                }
            }
        });
    });
}

/**
 * Render attributes list (Column 2)
 */
function renderAttributes(instanceId) {
    var instance = queryBuilderInstances[instanceId];
    if (!instance) return;

    var attributesContent = document.getElementById(instanceId + '-attributes-content');
    if (!attributesContent) return;

    var currentCategory = instance.selectedCategory;
    var currentAttributes = instance.categories[currentCategory] || [];
    var selectedForCategory = instance.selectedAttributes.get(currentCategory) || new Set();
    
    // Filter out already selected attributes
    var availableAttributes = currentAttributes.filter(function(attr) {
        return !selectedForCategory.has(attr);
    });
    
    // Filter based on search term
    var filteredAttributes = availableAttributes.filter(function(attr) {
        if (!instance.searchTerm) return true;
        return attr.toLowerCase().indexOf(instance.searchTerm.toLowerCase()) !== -1;
    });

    if (filteredAttributes.length === 0) {
        attributesContent.innerHTML = '<div class="query-builder__no-results">' + instance.noResultsText + '</div>';
        return;
    }

    var html = '';
    filteredAttributes.forEach(function(attr) {
        var safeId = instanceId + '-attr-' + attr.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase();
        html += '<div class="query-builder__attribute-item">' +
            '<input type="checkbox" id="' + safeId + '" name="' + safeId + '" class="query-builder__checkbox" data-category="' + currentCategory + '" data-attribute="' + attr + '" />' +
            '<label for="' + safeId + '" class="query-builder__attribute-label">' + attr + '</label>' +
        '</div>';
    });
    attributesContent.innerHTML = html;

    // Attach checkbox handlers
    attributesContent.querySelectorAll('.query-builder__checkbox').forEach(function(checkbox) {
        checkbox.addEventListener('change', function(e) {
            if (e.target.checked) {
                var category = e.target.dataset.category;
                var attribute = e.target.dataset.attribute;
                addToSummary(instanceId, category, attribute);
            }
        });
    });
}

/**
 * Render summary (Column 3)
 */
function renderSummary(instanceId) {
    var instance = queryBuilderInstances[instanceId];
    if (!instance) return;

    var summaryContent = document.getElementById(instanceId + '-summary-content');
    if (!summaryContent) return;

    var totalSelected = 0;
    instance.selectedAttributes.forEach(function(set) {
        totalSelected += set.size;
    });

    if (totalSelected === 0) {
        summaryContent.innerHTML = '<div class="query-builder__summary-empty">' + instance.noFiltersText + '</div>';
        return;
    }

    var html = '';
    instance.selectedAttributes.forEach(function(attributes, category) {
        if (attributes.size === 0) return;
        
        var attributeArray = Array.from(attributes);
        var tagsHtml = '';
        attributeArray.forEach(function(attr) {
            tagsHtml += createSummaryTag(instanceId, category, attr);
        });
        
        html += '<div class="query-builder__summary-category">' +
            '<h4 class="query-builder__summary-category-title">' + category + '</h4>' +
            '<div class="query-builder__summary-tags">' + tagsHtml + '</div>' +
        '</div>';
    });

    summaryContent.innerHTML = html;

    // Attach remove handlers
    summaryContent.querySelectorAll('.query-builder__summary-tag-remove').forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var category = button.dataset.category;
            var attribute = button.dataset.attribute;
            removeFromSummary(instanceId, category, attribute);
        });
    });

    // Handle pod remove buttons (if using pod component)
    summaryContent.querySelectorAll('.pod-remove').forEach(function(button) {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var pod = button.closest('.pod');
            if (pod) {
                var category = pod.dataset.category;
                var attribute = pod.dataset.attribute;
                if (category && attribute) {
                    removeFromSummary(instanceId, category, attribute);
                }
            }
        });
    });
}

/**
 * Create a summary tag HTML
 */
function createSummaryTag(instanceId, category, attr) {
    // Use pod component if available
    if (typeof createPod === 'function') {
        var podId = 'pod-' + category.replace(/\s+/g, '-') + '-' + attr.replace(/\s+/g, '-');
        var podHTML = createPod(attr, null, podId);
        var escapedCategory = category.replace(/"/g, '&quot;');
        var escapedAttribute = attr.replace(/"/g, '&quot;');
        return podHTML.replace(/<span class="pod"/, '<span class="pod" data-category="' + escapedCategory + '" data-attribute="' + escapedAttribute + '"');
    }
    
    // Fallback tag
    return '<div class="query-builder__summary-tag">' +
        '<span>' + attr + '</span>' +
        '<button type="button" class="query-builder__summary-tag-remove" data-category="' + category + '" data-attribute="' + attr + '" aria-label="Remove ' + attr + '">' +
            '<svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">' +
                '<circle cx="8" cy="8" r="8" fill="currentColor"/>' +
                '<g transform="translate(4 4)">' +
                    '<line x1="8" y2="8" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>' +
                    '<line x2="8" y2="8" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>' +
                '</g>' +
            '</svg>' +
        '</button>' +
    '</div>';
}

/**
 * Initialize search component
 */
function initializeSearch(instanceId) {
    var instance = queryBuilderInstances[instanceId];
    if (!instance) return;

    var searchContainer = document.getElementById(instanceId + '-search');
    if (!searchContainer) return;

    if (typeof initSearch === 'function') {
        var currentCategory = instance.selectedCategory;
        var currentAttributes = instance.categories[currentCategory] || [];
        var selectedForCategory = instance.selectedAttributes.get(currentCategory) || new Set();
        var availableAttributes = currentAttributes.filter(function(attr) {
            return !selectedForCategory.has(attr);
        });

        initSearch({
            containerId: instanceId + '-search',
            variant: 'secondary',
            placeholder: instance.searchPlaceholder,
            data: availableAttributes,
            onSearch: function(query) {
                instance.searchTerm = query;
                renderAttributes(instanceId);
            }
        });

        // Add id/name to search input
        var searchInput = searchContainer.querySelector('.search-input');
        if (searchInput && !searchInput.id) {
            searchInput.id = instanceId + '-search-input';
            searchInput.name = instanceId + '-search-input';
        }
    }
}

/**
 * Add an attribute to the summary
 */
function addToSummary(instanceId, category, attribute) {
    var instance = queryBuilderInstances[instanceId];
    if (!instance) return;

    var categorySet = instance.selectedAttributes.get(category) || new Set();
    categorySet.add(attribute);
    instance.selectedAttributes.set(category, categorySet);

    // Update both columns
    renderAttributes(instanceId);
    renderSummary(instanceId);
}

/**
 * Remove an attribute from the summary
 */
function removeFromSummary(instanceId, category, attribute) {
    var instance = queryBuilderInstances[instanceId];
    if (!instance) return;

    var categorySet = instance.selectedAttributes.get(category);
    if (categorySet) {
        categorySet.delete(attribute);
        if (categorySet.size === 0) {
            instance.selectedAttributes.delete(category);
        }
    }

    // Update both columns
    renderAttributes(instanceId);
    renderSummary(instanceId);
}

/**
 * Get selected attributes
 */
function getSelectedAttributes(instanceId) {
    var instance = queryBuilderInstances[instanceId];
    if (!instance) return {};

    var result = {};
    instance.selectedAttributes.forEach(function(attributes, category) {
        if (attributes.size > 0) {
            result[category] = Array.from(attributes);
        }
    });

    return result;
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initQueryBuilder: initQueryBuilder,
        getSelectedAttributes: getSelectedAttributes,
        queryBuilderInstances: queryBuilderInstances
    };
}
