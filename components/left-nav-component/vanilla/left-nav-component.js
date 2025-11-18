/**
 * Left Navigation Component - Shareable Export
 * 
 * This file contains all the code needed to use the left navigation component in your project.
 * 
 * USAGE:
 * 1. Include the CSS from left-nav-component.css in your <head>
 * 2. Include this JavaScript file before the closing </body> tag
 * 3. Add a container div: <nav class="left-nav" id="left-nav-container"><ul class="nav-list" id="navList"></ul></nav>
 * 4. Initialize the navigation: see example at the bottom
 * 
 * DEPENDENCIES:
 * - None (pure vanilla JavaScript)
 * 
 * CUSTOMIZATION:
 * The initLeftNav() function accepts an options object:
 * - navigationData: object with structure { gps: [{ id, name, funds: [{ id, name }] }] }
 * - onItemSelect: function(type, id) - callback when an item is selected
 * - initialSelection: object with { type: 'gp'|'fund', id: string } - initial selected item
 * 
 * FEATURES:
 * - Hierarchical navigation (GP -> Funds)
 * - Active state management
 * - Hover effects
 * - Visual dividers between items
 * - Red accent bar for active items
 * - Customizable selection callbacks
 */

// Navigation state
let navState = {
    selectedType: null, // 'gp' or 'fund'
    selectedId: null
};

// Navigation data
let navData = {
    gps: []
};

// Selection callback
let onItemSelectCallback = null;

// Create navigation HTML
function createNavigationHTML() {
    const navList = document.getElementById('navList');
    if (!navList) return;

    navList.innerHTML = '';

    navData.gps.forEach(gp => {
        // GP item
        const gpItem = document.createElement('li');
        gpItem.className = 'nav-item gp';
        gpItem.dataset.type = 'gp';
        gpItem.dataset.id = gp.id;
        gpItem.textContent = gp.name;
        gpItem.addEventListener('click', () => selectNavItem('gp', gp.id));
        
        // Set active state if this is the selected item
        if (navState.selectedType === 'gp' && navState.selectedId === gp.id) {
            gpItem.classList.add('active');
        }
        
        navList.appendChild(gpItem);

        // Divider
        const divider1 = document.createElement('hr');
        divider1.className = 'nav-divider';
        navList.appendChild(divider1);

        // Fund items
        gp.funds.forEach(fund => {
            const fundItem = document.createElement('li');
            fundItem.className = 'nav-item fund';
            fundItem.dataset.type = 'fund';
            fundItem.dataset.id = fund.id;
            fundItem.textContent = fund.name;
            fundItem.addEventListener('click', () => selectNavItem('fund', fund.id));
            
            // Set active state if this is the selected item
            if (navState.selectedType === 'fund' && navState.selectedId === fund.id) {
                fundItem.classList.add('active');
            }
            
            navList.appendChild(fundItem);

            // Divider
            const divider2 = document.createElement('hr');
            divider2.className = 'nav-divider';
            navList.appendChild(divider2);
        });
    });
}

// Select navigation item
function selectNavItem(type, id) {
    navState.selectedType = type;
    navState.selectedId = id;

    // Update navigation active states
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.type === type && item.dataset.id === id) {
            item.classList.add('active');
        }
    });

    // Call the callback if provided
    if (onItemSelectCallback && typeof onItemSelectCallback === 'function') {
        onItemSelectCallback(type, id);
    }
}

// Get selected item name
function getSelectedName() {
    if (navState.selectedType === 'gp') {
        const gp = navData.gps.find(g => g.id === navState.selectedId);
        return gp ? gp.name : '';
    } else if (navState.selectedType === 'fund') {
        for (const gp of navData.gps) {
            const fund = gp.funds.find(f => f.id === navState.selectedId);
            if (fund) return fund.name;
        }
    }
    return '';
}

// Get selected item data
function getSelectedItem() {
    if (navState.selectedType === 'gp') {
        const gp = navData.gps.find(g => g.id === navState.selectedId);
        return gp ? { type: 'gp', id: gp.id, name: gp.name, data: gp } : null;
    } else if (navState.selectedType === 'fund') {
        for (const gp of navData.gps) {
            const fund = gp.funds.find(f => f.id === navState.selectedId);
            if (fund) {
                return { type: 'fund', id: fund.id, name: fund.name, data: fund, gp: gp };
            }
        }
    }
    return null;
}

// Get GP ID from selected item
function getGPId() {
    if (navState.selectedType === 'gp') {
        return navState.selectedId;
    } else if (navState.selectedType === 'fund') {
        // Find which GP this fund belongs to
        for (const gp of navData.gps) {
            const fund = gp.funds.find(f => f.id === navState.selectedId);
            if (fund) return gp.id;
        }
    }
    return null;
}

// Initialize left navigation function
function initLeftNav(options = {}) {
    const {
        navigationData = { gps: [] },
        onItemSelect = null,
        initialSelection = null
    } = options;

    // Store navigation data
    navData = navigationData;
    onItemSelectCallback = onItemSelect;

    // Set initial selection
    if (initialSelection) {
        navState.selectedType = initialSelection.type;
        navState.selectedId = initialSelection.id;
    } else if (navData.gps.length > 0 && navData.gps[0].funds.length > 0) {
        // Default to first fund if no initial selection provided
        navState.selectedType = 'fund';
        navState.selectedId = navData.gps[0].funds[0].id;
    }

    // Build navigation
    createNavigationHTML();

    // Trigger initial selection callback if provided
    if (onItemSelectCallback && typeof onItemSelectCallback === 'function' && navState.selectedId) {
        onItemSelectCallback(navState.selectedType, navState.selectedId);
    }
}

// Update navigation data (useful for dynamic updates)
function updateNavigationData(newData) {
    navData = newData;
    createNavigationHTML();
}

// Programmatically select an item
function selectItem(type, id) {
    selectNavItem(type, id);
}

// Export for module systems (if using ES6 modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        initLeftNav, 
        selectItem, 
        getSelectedName, 
        getSelectedItem, 
        getGPId,
        updateNavigationData
    };
}

