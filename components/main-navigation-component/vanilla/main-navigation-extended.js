/**
 * Main Navigation Extended - Flyout Panel Add-on
 * 
 * This extends the standard main navigation by adding flyout panels.
 * It works WITH initMainNavigation - call this AFTER initializing the standard nav.
 * 
 * Usage:
 * 1. First initialize standard nav: initMainNavigation({ containerId: 'my-nav', menuItems: [...] })
 * 2. Then add flyout panels: addNavigationPanels({ navContainerId: 'my-nav', panels: [...] })
 */

/**
 * Add flyout panels to an existing main navigation
 * @param {Object} options - Configuration
 */
function addNavigationPanels(options = {}) {
    const {
        navContainerId,      // ID of the standard nav container (the aside element)
        panelContainerId,    // ID of container to put panels in (optional, will create next to nav)
        panels = [],         // Array of panel configs: { iconIndex, type, categories/items }
        isDemo = false,
        onItemClick = null,
        onPanelOpen = null,
        onPanelClose = null
    } = options;
    
    // Find the navigation
    const navContainer = document.getElementById(navContainerId);
    if (!navContainer) {
        console.error(`Navigation container not found: #${navContainerId}`);
        return null;
    }
    
    // Find the actual aside element (might be the container itself or a child)
    const navElement = navContainer.classList.contains('main-navigation') 
        ? navContainer 
        : navContainer.querySelector('.main-navigation');
    
    if (!navElement) {
        console.error('Main navigation element not found');
        return null;
    }
    
    // Get the icons
    const icons = navElement.querySelectorAll('.main-navigation-icon');
    if (icons.length === 0) {
        console.error('No navigation icons found');
        return null;
    }
    
    // Determine where to put panels
    let panelContainer;
    if (panelContainerId) {
        panelContainer = document.getElementById(panelContainerId);
    }
    if (!panelContainer) {
        // Create panel container as sibling to nav
        panelContainer = document.createElement('div');
        panelContainer.id = navContainerId + '-panels';
        navElement.parentNode.insertBefore(panelContainer, navElement.nextSibling);
    }
    
    // Check if in demo mode
    const autoIsDemo = isDemo || navElement.classList.contains('main-navigation-demo');
    
    // Create panel HTML for each panel config
    panels.forEach((panelConfig, idx) => {
        const iconIndex = panelConfig.iconIndex;
        const panel = document.createElement('div');
        panel.className = 'main-nav-flyout-panel' + (autoIsDemo ? ' demo-mode' : '');
        panel.dataset.panelIndex = iconIndex;
        // Ensure panel is hidden by default
        panel.style.display = 'none';
        panel.style.visibility = 'hidden';
        
        let panelHTML = '';
        
        if (panelConfig.type === 'categorized' && panelConfig.categories) {
            panelConfig.categories.forEach((category, catIndex) => {
                panelHTML += `
                    <div class="main-nav-panel-category">
                        <h3 class="main-nav-panel-header">${category.title}</h3>
                        <ul class="main-nav-panel-list">`;
                
                category.items.forEach((item, itemIndex) => {
                    const activeClass = item.active ? ' active' : '';
                    panelHTML += `
                            <li>
                                <a href="${item.href || '#'}" 
                                   class="main-nav-panel-item${activeClass}"
                                   data-item-id="${item.id}">
                                    ${item.label}
                                </a>
                            </li>`;
                    // Only add divider between items, not after the last one
                    if (itemIndex < category.items.length - 1) {
                        panelHTML += `<hr class="main-nav-panel-divider">`;
                    }
                });
                
                panelHTML += `
                        </ul>
                    </div>`;
            });
        } else if (panelConfig.type === 'simple' && panelConfig.items) {
            panelHTML += `<ul class="main-nav-panel-simple-list">`;
            
            panelConfig.items.forEach((item, itemIndex) => {
                const activeClass = item.active ? ' active' : '';
                panelHTML += `
                    <li>
                        <a href="${item.href || '#'}" 
                           class="main-nav-panel-item${activeClass}"
                           data-item-id="${item.id}">
                            ${item.label}
                        </a>
                    </li>`;
                // Only add divider between items, not after the last one
                if (itemIndex < panelConfig.items.length - 1) {
                    panelHTML += `<hr class="main-nav-panel-divider">`;
                }
            });
            
            panelHTML += `</ul>`;
        }
        
        panel.innerHTML = panelHTML;
        panelContainer.appendChild(panel);
        
        // Mark the icon as having a panel
        if (icons[iconIndex]) {
            icons[iconIndex].dataset.hasPanel = 'true';
        }
    });
    
    // Get all panels
    const allPanels = panelContainer.querySelectorAll('.main-nav-flyout-panel');
    const allPanelItems = panelContainer.querySelectorAll('.main-nav-panel-item');
    
    // Track state
    let currentOpenPanel = null;
    
    // Add click handlers to icons
    icons.forEach((icon, index) => {
        const hasPanel = icon.dataset.hasPanel === 'true';
        
        if (hasPanel) {
            // Override the click behavior for icons with panels
            icon.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent event bubbling
                e.stopImmediatePropagation(); // Prevent any other handlers
                const panel = panelContainer.querySelector(`[data-panel-index="${index}"]`);
                
                if (panel) {
                    const wasOpen = panel.classList.contains('open');
                    const previousPanel = currentOpenPanel;
                    
                    // Close all panels first (synchronously) - use both class and inline style
                    allPanels.forEach(p => {
                        p.classList.remove('open');
                        p.style.display = ''; // Clear inline style when closing via icon click
                    });
                    icons.forEach(i => i.classList.remove('panel-open'));
                    
                    // Call close callback for previous panel if it was different
                    if (previousPanel !== null && previousPanel !== index && onPanelClose) {
                        onPanelClose(previousPanel, panels.find(p => p.iconIndex === previousPanel));
                    }
                    
                    if (!wasOpen) {
                        // Open this panel - clear inline style and add class
                        panel.style.display = ''; // Clear any inline style
                        panel.style.visibility = ''; // Clear visibility
                        panel.classList.add('open');
                        icon.classList.add('panel-open');
                        currentOpenPanel = index;
                        if (onPanelOpen) onPanelOpen(index, panels.find(p => p.iconIndex === index));
                    } else {
                        currentOpenPanel = null;
                        if (onPanelClose) onPanelClose(index, panels.find(p => p.iconIndex === index));
                    }
                }
            });
        }
    });
    
    // Panel item click handlers - attach after panels are created
    // Use event delegation on the panel container with CAPTURE phase to ensure we handle it first
    panelContainer.addEventListener('click', function(e) {
        const item = e.target.closest('.main-nav-panel-item');
        if (!item) return;
        
        // Prevent default link behavior immediately
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        const itemId = item.dataset.itemId;
        
        // Always close all panels FIRST when item is clicked (before any navigation)
        // This must happen synchronously and immediately
        const panelToClose = currentOpenPanel;
        
        // Close panels immediately and synchronously - use both class removal AND inline style
        allPanels.forEach(p => {
            p.classList.remove('open');
            p.style.display = 'none'; // Force hide immediately via inline style
            p.style.visibility = 'hidden'; // Double ensure it's hidden
            // Force a reflow to ensure the changes are processed
            void p.offsetHeight;
        });
        icons.forEach(i => {
            i.classList.remove('panel-open');
        });
        currentOpenPanel = null;
        
        // Call close callback
        if (onPanelClose && panelToClose !== null) {
            onPanelClose(panelToClose, panels.find(p => p.iconIndex === panelToClose));
        }
        
        // Update active states
        const allItems = panelContainer.querySelectorAll('.main-nav-panel-item');
        allItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');
        
        // Find item data
        let itemData = null;
        panels.forEach(panel => {
            if (panel.type === 'categorized' && panel.categories) {
                panel.categories.forEach(cat => {
                    const found = cat.items.find(i => i.id === itemId);
                    if (found) itemData = found;
                });
            } else if (panel.type === 'simple' && panel.items) {
                const found = panel.items.find(i => i.id === itemId);
                if (found) itemData = found;
            }
        });
        
        // Call item click handlers (navigation happens here)
        // Use a small timeout to ensure panel is visually closed before navigation
        setTimeout(() => {
            if (onItemClick) {
                onItemClick(itemId, itemData);
            }
            if (itemData && itemData.onClick) {
                itemData.onClick(itemId, itemData);
            }
        }, 50); // Small delay to ensure panel closing is processed
    }, true); // Use capture phase to handle before other handlers
    
    // Close panel when clicking outside (only if not in demo mode)
    if (!autoIsDemo) {
        document.addEventListener('click', function(e) {
            // Don't close if clicking on navigation icons or panels
            if (navElement.contains(e.target) || panelContainer.contains(e.target)) {
                return;
            }
            
            // Close all panels if clicking outside
            if (currentOpenPanel !== null) {
                allPanels.forEach(p => {
                    p.classList.remove('open');
                    p.style.display = 'none'; // Force hide
                    p.style.visibility = 'hidden'; // Double ensure
                });
                icons.forEach(i => i.classList.remove('panel-open'));
                const panelToClose = currentOpenPanel;
                currentOpenPanel = null;
                if (onPanelClose && panelToClose !== null) {
                    onPanelClose(panelToClose, panels.find(p => p.iconIndex === panelToClose));
                }
            }
        });
    }
    
    // Return API
    return {
        openPanel(iconIndex) {
            const icon = icons[iconIndex];
            if (icon && icon.dataset.hasPanel === 'true') {
                icon.click();
            }
        },
        
        closeAllPanels() {
            allPanels.forEach(p => p.classList.remove('open'));
            icons.forEach(i => i.classList.remove('panel-open'));
            currentOpenPanel = null;
        },
        
        setActiveItem(itemId) {
            allPanelItems.forEach(i => i.classList.remove('active'));
            const item = panelContainer.querySelector(`[data-item-id="${itemId}"]`);
            if (item) item.classList.add('active');
        },
        
        getCurrentPanel() {
            return currentOpenPanel;
        }
    };
}

/**
 * Convenience function: Initialize nav AND add panels in one call
 */
function initMainNavigationExtended(options = {}) {
    const {
        containerId = 'main-navigation-extended-container',
        items = [],
        menuItems = [], // Legacy support
        panels = [], // Legacy support
        isDemo = false,
        onItemClick = null,
        onIconClick = null,
        onPanelOpen = null,
        onPanelClose = null
    } = options;
    
    // Support both 'items' format (new) and 'menuItems' + 'panels' format (legacy)
    let finalMenuItems = items.length > 0 ? items : menuItems;
    let finalPanels = [];
    
    // If using 'items' format, extract menuItems and panels
    if (items.length > 0) {
        finalMenuItems = items.map(item => ({
            label: item.label,
            svg: item.svg,
            active: item.active || false,
            onClick: item.onClick || onIconClick || function() {}
        }));
        
        // Build panels array from items that have panel property
        finalPanels = items
            .map((item, index) => {
                if (item.panel) {
                    return {
                        iconIndex: index,
                        type: item.panel.type,
                        categories: item.panel.categories,
                        items: item.panel.items
                    };
                }
                return null;
            })
            .filter(p => p !== null);
    } else {
        // Legacy format: use provided panels array
        finalPanels = panels;
    }
    
    // First initialize standard navigation
    if (typeof initMainNavigation === 'function') {
        initMainNavigation({
            containerId: containerId,
            menuItems: finalMenuItems
        });
    } else {
        console.error('initMainNavigation not found - include main-navigation-component.js first');
        return null;
    }
    
    // Then add panels
    return addNavigationPanels({
        navContainerId: containerId,
        panels: finalPanels,
        isDemo: isDemo,
        onItemClick: onItemClick,
        onPanelOpen: onPanelOpen,
        onPanelClose: onPanelClose
    });
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { addNavigationPanels, initMainNavigationExtended };
}
