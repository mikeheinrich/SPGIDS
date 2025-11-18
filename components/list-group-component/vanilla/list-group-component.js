/**
 * List Group Component - Vanilla JavaScript
 * 
 * This file contains all the code needed to use the list group component in your project.
 * 
 * USAGE:
 * 1. Include the CSS from list-group-component.css in your <head>
 * 2. Include this JavaScript file before the closing </body> tag
 * 3. Add a container: <nav class="list-group" id="list-group-container"><ul class="list-group-list" id="listGroupList"></ul></nav>
 * 4. Initialize the list group: see example at the bottom
 * 
 * DEPENDENCIES:
 * - None (pure vanilla JavaScript)
 * 
 * CUSTOMIZATION:
 * The initListGroup() function accepts an options object:
 * - items: array of objects with structure [{ id, name, disabled? }]
 * - onItemSelect: function(id, item) - callback when an item is selected
 * - initialSelection: string - id of initially selected item
 * - showDividers: boolean - whether to show dividers between items (default: true)
 * 
 * FEATURES:
 * - Simple flat list (no hierarchy)
 * - Active state management
 * - Hover effects
 * - Visual dividers between items (optional)
 * - Red accent bar for active items
 * - Customizable selection callbacks
 * - Disabled item support
 */

// Store multiple list group instances
let listGroupInstances = {};

// Create list group HTML
function createListGroupHTML(instanceId) {
    const instance = listGroupInstances[instanceId];
    if (!instance) return;
    
    const listGroupList = document.getElementById(instance.listId);
    if (!listGroupList) return;

    listGroupList.innerHTML = '';

    instance.items.forEach((item, index) => {
        // List item
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';
        listItem.dataset.id = item.id;
        listItem.textContent = item.name;
        listItem.setAttribute('role', 'option');
        listItem.setAttribute('tabindex', '0');
        
        // Set active state if this is the selected item
        if (instance.selectedId === item.id) {
            listItem.classList.add('active');
            listItem.setAttribute('aria-selected', 'true');
        } else {
            listItem.setAttribute('aria-selected', 'false');
        }
        
        // Set disabled state
        if (item.disabled) {
            listItem.classList.add('disabled');
            listItem.setAttribute('aria-disabled', 'true');
        }
        
        // Click handler
        if (!item.disabled) {
            listItem.addEventListener('click', () => selectListItem(instanceId, item.id));
            listItem.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectListItem(instanceId, item.id);
                }
            });
        }
        
        listGroupList.appendChild(listItem);

        // Divider (if enabled and not last item)
        if (instance.showDividers && index < instance.items.length - 1) {
            const divider = document.createElement('hr');
            divider.className = 'list-group-divider';
            listGroupList.appendChild(divider);
        }
    });
    
    // Set ARIA attributes on the list
    listGroupList.setAttribute('role', 'listbox');
    if (instance.selectedId) {
        listGroupList.setAttribute('aria-activedescendant', instance.selectedId);
    }
}

// Select list item
function selectListItem(instanceId, id) {
    const instance = listGroupInstances[instanceId];
    if (!instance) return;
    
    const item = instance.items.find(i => i.id === id);
    if (!item || item.disabled) return;

    instance.selectedId = id;

    // Update list item active states for this instance only
    const listGroupList = document.getElementById(instance.listId);
    if (listGroupList) {
        listGroupList.querySelectorAll('.list-group-item').forEach(listItem => {
            listItem.classList.remove('active');
            listItem.setAttribute('aria-selected', 'false');
            if (listItem.dataset.id === id) {
                listItem.classList.add('active');
                listItem.setAttribute('aria-selected', 'true');
            }
        });
        
        // Update listbox aria-activedescendant
        listGroupList.setAttribute('aria-activedescendant', id);
    }

    // Call the callback if provided
    if (instance.onItemSelect && typeof instance.onItemSelect === 'function') {
        instance.onItemSelect(id, item);
    }
}

// Get selected item
function getSelectedItem(instanceId) {
    const instance = listGroupInstances[instanceId];
    if (!instance || !instance.selectedId) return null;
    const item = instance.items.find(i => i.id === instance.selectedId);
    return item || null;
}

// Get selected item name
function getSelectedName(instanceId) {
    const item = getSelectedItem(instanceId);
    return item ? item.name : '';
}

// Initialize list group function
function initListGroup(options = {}) {
    const {
        containerId = 'list-group-container',
        listId = 'listGroupList',
        items = [],
        onItemSelect = null,
        initialSelection = null,
        showDividers: dividers = true
    } = options;

    // Create instance
    const instanceId = containerId;
    listGroupInstances[instanceId] = {
        containerId: containerId,
        listId: listId,
        items: items,
        selectedId: null,
        onItemSelect: onItemSelect,
        showDividers: dividers
    };

    // Set initial selection
    if (initialSelection) {
        listGroupInstances[instanceId].selectedId = initialSelection;
    } else if (items.length > 0) {
        // Default to first non-disabled item if no initial selection provided
        const firstEnabled = items.find(item => !item.disabled);
        if (firstEnabled) {
            listGroupInstances[instanceId].selectedId = firstEnabled.id;
        }
    }

    // Build list group
    createListGroupHTML(instanceId);

    // Trigger initial selection callback if provided
    const instance = listGroupInstances[instanceId];
    if (instance.onItemSelect && typeof instance.onItemSelect === 'function' && instance.selectedId) {
        const selectedItem = getSelectedItem(instanceId);
        if (selectedItem) {
            instance.onItemSelect(instance.selectedId, selectedItem);
        }
    }
}

// Update list group items (useful for dynamic updates)
function updateListGroupItems(instanceId, newItems) {
    const instance = listGroupInstances[instanceId];
    if (!instance) return;
    instance.items = newItems;
    createListGroupHTML(instanceId);
}

// Programmatically select an item
function selectItem(instanceId, id) {
    selectListItem(instanceId, id);
}

// Export for module systems (if using ES6 modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        initListGroup, 
        selectItem, 
        getSelectedName, 
        getSelectedItem,
        updateListGroupItems,
        listGroupInstances
    };
}

