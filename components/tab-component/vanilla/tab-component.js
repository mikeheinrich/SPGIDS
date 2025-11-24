/**
 * Tab Component
 * 
 * Usage:
 * 1. Include tab-component.css
 * 2. Include tab-component.js
 * 3. Call initTabs({ containerId: '...', tabs: [...] })
 */

function createTabsHTML(tabs) {
    const tabsHeader = tabs.map((tab, index) => {
        const activeClass = index === 0 ? ' active' : '';
        return `<button class="tab${activeClass}" data-tab-id="${tab.id}">${tab.label}</button>`;
    }).join('');

    const tabsContent = tabs.map((tab, index) => {
        const activeClass = index === 0 ? ' active' : '';
        // Content can be provided as string
        const content = tab.content || '';
        return `<div class="tab-pane${activeClass}" id="tab-${tab.id}">${content}</div>`;
    }).join('');

    return `
        <div class="tabs-container">
            <div class="tabs">
                ${tabsHeader}
            </div>
        </div>
        <div class="tab-content">
            ${tabsContent}
        </div>
    `;
}

function initTabs(options = {}) {
    const {
        containerId,
        tabs = [],
        activeTabId,
        onTabChange
    } = options;

    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Tab container #${containerId} not found`);
        return;
    }

    // Add class for layout
    container.classList.add('tabs-component');

    // Render
    container.innerHTML = createTabsHTML(tabs);

    // Elements
    const tabButtons = container.querySelectorAll('.tab');
    const tabPanes = container.querySelectorAll('.tab-pane');

    // Handle click
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tabId;
            switchTab(tabId);
        });
    });

    function switchTab(tabId) {
        // Update buttons
        tabButtons.forEach(btn => {
            if (btn.dataset.tabId === tabId) btn.classList.add('active');
            else btn.classList.remove('active');
        });

        // Update panes
        tabPanes.forEach(pane => {
            if (pane.id === `tab-${tabId}`) pane.classList.add('active');
            else pane.classList.remove('active');
        });
        
        // Callback
        if (onTabChange) {
            const activePane = container.querySelector(`#tab-${tabId}`);
            onTabChange(tabId, activePane);
        }
    }
    
    // Initial active tab
    if (activeTabId) {
        switchTab(activeTabId);
    }
}

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createTabsHTML, initTabs };
}




