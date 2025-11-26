/**
 * Dropdown Component - Vanilla JavaScript
 * 
 * Supports three variants:
 * - Default: Standard dropdown with border and background
 * - Light: Minimal dropdown with blue text, no border
 * - Multi-select: Dropdown with checkboxes and chip display for selected items
 * 
 * USAGE:
 * 1. Include the CSS from dropdown-component.css
 * 2. Include this JavaScript file
 * 3. Initialize: initDropdown(options)
 */

/**
 * Create dropdown HTML
 * @param {Object} options - Component configuration
 * @returns {string} HTML string
 */
function createDropdownHTML(options = {}) {
    const {
        variant = 'default',
        placeholder = 'Select an option',
        selectedItems = [],
        items = [],
        containerId = 'dropdown-container'
    } = options;
    
    const uniqueId = containerId.replace(/[^a-zA-Z0-9]/g, '_');
    const isMultiSelect = variant === 'multi-select';
    const isLight = variant === 'light';
    
    // Build variant classes
    let variantClass = '';
    if (isLight) {
        variantClass = 'dropdown--light';
    } else if (isMultiSelect) {
        variantClass = 'dropdown--multi-select';
    }
    
    // Build selected display
    let selectedDisplay = '';
    if (isMultiSelect && selectedItems.length > 0) {
        // Show first item as a pod/chip
        const firstItem = selectedItems[0];
        const displayText = typeof firstItem === 'string' ? firstItem : firstItem.label || firstItem.value;
        const valueAttr = typeof firstItem === 'string' ? firstItem : firstItem.value || firstItem.label;
        
        selectedDisplay = `<span class="dropdown-chip"><span class="dropdown-chip-text">${displayText}</span><span class="dropdown-chip-remove" data-value="${valueAttr}" role="button" tabindex="0" aria-label="Remove ${displayText}">×</span></span>`;
        
        if (selectedItems.length > 1) {
            selectedDisplay += `<span class="dropdown-more-text">+ ${selectedItems.length - 1} more</span>`;
        }
    } else if (!isMultiSelect && selectedItems.length > 0) {
        const selected = selectedItems[0];
        selectedDisplay = typeof selected === 'string' ? selected : selected.label || selected.value;
    } else {
        selectedDisplay = `<span class="dropdown-placeholder">${placeholder}</span>`;
    }
    
    // Build menu items
    let menuItemsHTML = '';
    if (items.length === 0) {
        menuItemsHTML = '<div class="dropdown-menu-empty">No options available</div>';
    } else {
        menuItemsHTML = items.map((item, index) => {
            const value = typeof item === 'string' ? item : item.value || item.label;
            const label = typeof item === 'string' ? item : item.label || item.value;
            const isSelected = selectedItems.some(sel => {
                const selValue = typeof sel === 'string' ? sel : sel.value || sel.label;
                return selValue === value;
            });
            const isDisabled = typeof item === 'object' && item.disabled;
            
            let itemClass = isSelected ? 'selected' : '';
            if (isDisabled) itemClass += ' disabled';
            if (isMultiSelect) itemClass += ' dropdown-menu-item--multi';
            
            if (isMultiSelect) {
                const checkboxId = `dropdown-checkbox-${uniqueId}-${index}`;
                return `
                    <div class="dropdown-menu-item ${itemClass}" data-value="${value}" data-index="${index}">
                        <input type="checkbox" id="${checkboxId}" class="selector-checkbox" ${isSelected ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
                        <label for="${checkboxId}" class="dropdown-menu-item-label">${label}</label>
                    </div>
                `;
            } else {
                return `
                    <div class="dropdown-menu-item ${itemClass}" data-value="${value}" data-index="${index}">
                        ${label}
                    </div>
                `;
            }
        }).join('');
    }
    
    return `
        <div class="dropdown-wrapper">
            <button type="button" class="dropdown ${variantClass}" id="dropdown_${uniqueId}" aria-haspopup="listbox" aria-expanded="false">
                <span class="dropdown-text">${selectedDisplay}</span>
                <span class="dropdown-chevron" aria-hidden="true">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                        <path d="M6 9L1 4h10L6 9z"/>
                    </svg>
                </span>
            </button>
            <div class="dropdown-menu" id="dropdown-menu_${uniqueId}" role="listbox">
                ${menuItemsHTML}
            </div>
        </div>
    `;
}

/**
 * Initialize dropdown component
 * @param {Object} options - Component configuration
 */
function initDropdown(options = {}) {
    const {
        containerId = 'dropdown-container',
        variant = 'default',
        placeholder = 'Select an option',
        items = [],
        selectedItems = [],
        onSelect = null,
        onDeselect = null,
        onChange = null,
        disabled = false
    } = options;
    
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Dropdown container #${containerId} not found`);
        return;
    }
    
    // Render HTML
    container.innerHTML = createDropdownHTML({
        containerId,
        variant,
        placeholder,
        items,
        selectedItems
    });
    
    const uniqueId = containerId.replace(/[^a-zA-Z0-9]/g, '_');
    const dropdown = document.getElementById(`dropdown_${uniqueId}`);
    const menu = document.getElementById(`dropdown-menu_${uniqueId}`);
    const isMultiSelect = variant === 'multi-select';
    
    if (!dropdown || !menu) {
        console.error('Dropdown elements not found after creation');
        return;
    }
    
    // Set disabled state
    if (disabled) {
        dropdown.classList.add('disabled');
    }
    
    // Track selected items
    let currentSelected = [...selectedItems];
    
    // Toggle menu
    dropdown.addEventListener('click', function(e) {
        if (disabled) return;
        e.stopPropagation();
        const isOpen = menu.classList.contains('open');
        
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Helper function for multi-select changes
    const handleMultiSelectChange = (itemElement, value, itemData, isSelected) => {
        const checkbox = itemElement.querySelector('.selector-checkbox');
        
        if (isSelected) {
            // Select
            if (checkbox) checkbox.checked = true;
            itemElement.classList.add('selected');
            if (!currentSelected.some(sel => {
                const selValue = typeof sel === 'string' ? sel : sel.value || sel.label;
                return selValue === value;
            })) {
                currentSelected.push(itemData || value);
            }
            
            if (onSelect) {
                onSelect(value, itemData);
            }
        } else {
            // Deselect
            if (checkbox) checkbox.checked = false;
            itemElement.classList.remove('selected');
            currentSelected = currentSelected.filter(sel => {
                const selValue = typeof sel === 'string' ? sel : sel.value || sel.label;
                return selValue !== value;
            });
            
            if (onDeselect) {
                onDeselect(value, itemData);
            }
        }
        
        // Update display
        updateDisplay();
        
        if (onChange) {
            onChange(currentSelected);
        }
    };
    
    // Handle menu item clicks
    const menuItems = menu.querySelectorAll('.dropdown-menu-item');
    menuItems.forEach((item, index) => {
        if (item.classList.contains('disabled')) return;
        
        item.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const value = this.getAttribute('data-value');
            const itemData = items.find(i => {
                const itemValue = typeof i === 'string' ? i : i.value || i.label;
                return itemValue === value;
            });
            
            if (isMultiSelect) {
                // For multi-select, handle checkbox clicks
                const checkbox = this.querySelector('.selector-checkbox');
                if (!checkbox) return;
                
                // If clicking directly on checkbox or label, let it handle first, then sync
                if (e.target.type === 'checkbox' || e.target.tagName === 'LABEL') {
                    setTimeout(() => {
                        const isSelected = checkbox.checked;
                        handleMultiSelectChange(this, value, itemData, isSelected);
                    }, 0);
                } else {
                    // Clicking elsewhere on the item toggles the checkbox
                    checkbox.checked = !checkbox.checked;
                    const isSelected = checkbox.checked;
                    handleMultiSelectChange(this, value, itemData, isSelected);
                }
            } else {
                // Single select
                currentSelected = [itemData || value];
                
                // Update display
                updateDisplay();
                
                // Close menu
                closeMenu();
                
                if (onSelect) {
                    onSelect(value, itemData);
                }
                
                if (onChange) {
                    onChange(currentSelected);
                }
            }
        });
        
        // Hover highlight
        item.addEventListener('mouseenter', function() {
            menuItems.forEach(i => i.classList.remove('highlighted'));
            this.classList.add('highlighted');
        });
    });
    
    // Handle chip removal (multi-select)
    if (isMultiSelect) {
        container.addEventListener('click', function(e) {
            if (e.target.closest('.dropdown-chip-remove')) {
                e.stopPropagation();
                const button = e.target.closest('.dropdown-chip-remove');
                const value = button.getAttribute('data-value');
                
                // Remove from selection
                currentSelected = currentSelected.filter(sel => {
                    const selValue = typeof sel === 'string' ? sel : sel.value || sel.label;
                    return selValue !== value;
                });
                
                // Update checkbox in menu
                const menuItem = menu.querySelector(`[data-value="${value}"]`);
                if (menuItem) {
                    const checkbox = menuItem.querySelector('.selector-checkbox');
                    if (checkbox) checkbox.checked = false;
                    menuItem.classList.remove('selected');
                }
                
                // Update display
                updateDisplay();
                
                if (onDeselect) {
                    onDeselect(value);
                }
                
                if (onChange) {
                    onChange(currentSelected);
                }
            }
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!container.contains(e.target)) {
            closeMenu();
        }
    });
    
    // Keyboard navigation
    let highlightedIndex = -1;
    dropdown.addEventListener('keydown', function(e) {
        if (disabled) return;
        
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!menu.classList.contains('open')) {
                openMenu();
            }
        } else if (e.key === 'Escape') {
            closeMenu();
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (!menu.classList.contains('open')) {
                openMenu();
            } else {
                highlightedIndex = (highlightedIndex + 1) % menuItems.length;
                updateHighlight();
            }
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (menu.classList.contains('open')) {
                highlightedIndex = highlightedIndex <= 0 ? menuItems.length - 1 : highlightedIndex - 1;
                updateHighlight();
            }
        }
    });
    
    menu.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (highlightedIndex >= 0 && menuItems[highlightedIndex]) {
                menuItems[highlightedIndex].click();
            }
        }
    });
    
    function openMenu() {
        menu.classList.add('open');
        dropdown.classList.add('open');
        dropdown.setAttribute('aria-expanded', 'true');
        highlightedIndex = currentSelected.length > 0 ? 
            Array.from(menuItems).findIndex(item => item.classList.contains('selected')) : 0;
        if (highlightedIndex < 0) highlightedIndex = 0;
        updateHighlight();
    }
    
    function closeMenu() {
        menu.classList.remove('open');
        dropdown.classList.remove('open');
        dropdown.setAttribute('aria-expanded', 'false');
        menuItems.forEach(item => item.classList.remove('highlighted'));
        highlightedIndex = -1;
    }
    
    function updateHighlight() {
        menuItems.forEach((item, index) => {
            item.classList.toggle('highlighted', index === highlightedIndex);
        });
        if (highlightedIndex >= 0 && menuItems[highlightedIndex]) {
            menuItems[highlightedIndex].scrollIntoView({ block: 'nearest' });
        }
    }
    
    function updateDisplay() {
        const textContainer = dropdown.querySelector('.dropdown-text');
        if (!textContainer) return;
        
        if (isMultiSelect && currentSelected.length > 0) {
            // Show first item as a pod/chip
            const firstItem = currentSelected[0];
            const displayText = typeof firstItem === 'string' ? firstItem : firstItem.label || firstItem.value;
            const valueAttr = typeof firstItem === 'string' ? firstItem : firstItem.value || firstItem.label;
            
            let display = `<span class="dropdown-chip"><span class="dropdown-chip-text">${displayText}</span><span class="dropdown-chip-remove" data-value="${valueAttr}" role="button" tabindex="0" aria-label="Remove ${displayText}">×</span></span>`;
            
            if (currentSelected.length > 1) {
                display += `<span class="dropdown-more-text">+ ${currentSelected.length - 1} more</span>`;
            }
            
            textContainer.innerHTML = display;
        } else if (!isMultiSelect && currentSelected.length > 0) {
            const selected = currentSelected[0];
            textContainer.textContent = typeof selected === 'string' ? selected : selected.label || selected.value;
        } else {
            textContainer.innerHTML = `<span class="dropdown-placeholder">${placeholder}</span>`;
        }
    }
    
    // Public API
    return {
        getSelected: () => [...currentSelected],
        setSelected: (items) => {
            currentSelected = Array.isArray(items) ? [...items] : [items];
            updateDisplay();
            // Update checkboxes in menu
            if (isMultiSelect) {
                menuItems.forEach(item => {
                    const value = item.getAttribute('data-value');
                    const checkbox = item.querySelector('.selector-checkbox');
                    const isSelected = currentSelected.some(sel => {
                        const selValue = typeof sel === 'string' ? sel : sel.value || sel.label;
                        return selValue === value;
                    });
                    if (checkbox) checkbox.checked = isSelected;
                    item.classList.toggle('selected', isSelected);
                });
            }
        },
        open: openMenu,
        close: closeMenu,
        toggle: () => {
            if (menu.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        }
    };
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createDropdownHTML, initDropdown };
}
