/**
 * Global Navigation Configuration
 * 
 * This file defines the navigation structure for the design system site.
 * Update this file to add new items to the global navigation.
 */

// Navigation configuration with inline SVG icons
const globalNavigationConfig = {
    menuItems: [
        {
            id: 'foundation',
            label: 'Foundation',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" width="24" height="24"><path d="M256 96C291.3 96 320 124.7 320 160V352C320 387.3 291.3 416 256 416H64C28.65 416 0 387.3 0 352V160C0 124.7 28.65 96 64 96H256zM256 144H64C55.16 144 48 151.2 48 160V352C48 360.8 55.16 368 64 368H256C264.8 368 272 360.8 272 352V160C272 151.2 264.8 144 256 144z"/></svg>`,
            active: false,
            panel: {
                type: 'simple',
                items: [
                    { id: 'overview', label: 'Overview', href: 'index.html', active: false },
                    { id: 'colors', label: 'Colors', href: 'colors.html', active: false },
                    { id: 'typography', label: 'Typography', href: 'typography.html', active: false },
                    { id: 'icons', label: 'Icons', href: 'icons.html', active: false }
                ]
            }
        },
        {
            id: 'components',
            label: 'Components',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="24" height="24"><path d="M236.1 5.865C248.9 1.011 263.1 1.011 275.9 5.865L475.9 81.73C497.6 89.98 512 110.8 512 134.1V377.9C512 401.2 497.6 422 475.9 430.3L275.9 506.1C263.1 510.1 248.9 510.1 236.1 506.1L36.14 430.3C14.39 422 0 401.2 0 377.9V134.1C0 110.8 14.39 89.98 36.14 81.73L236.1 5.865zM258.8 50.74C257 50.05 254.1 50.05 253.2 50.74L63.62 122.6L256 198.2L448.4 122.6L258.8 50.74zM53.16 385.4L232 453.2V240.4L48 168.1V377.9C48 381.2 50.06 384.2 53.16 385.4zM280 453.2L458.8 385.4C461.9 384.2 464 381.2 464 377.9V168.1L280 240.4V453.2z"/></svg>`,
            active: false,
            panel: {
                type: 'simple',
                items: [
                    { id: 'button', label: 'Button', href: 'components.html#button', active: false },
                    { id: 'button-group', label: 'Button Group', href: 'components.html#button-group', active: false },
                    { id: 'back-arrow-navigation', label: 'Back Arrow Navigation', href: 'components.html#back-arrow-navigation', active: false },
                    { id: 'tab', label: 'Tab', href: 'components.html#tab', active: false },
                    { id: 'search', label: 'Search', href: 'components.html#search', active: false },
                    { id: 'prefilter-primary-search', label: 'Prefilter Primary Search', href: 'components.html#prefilter-primary-search', active: false },
                    { id: 'text-input', label: 'Text Input', href: 'components.html#text-input', active: false },
                    { id: 'accordion', label: 'Accordion', href: 'components.html#accordion', active: false },
                    { id: 'list-group', label: 'List Group', href: 'components.html#list-group', active: false },
                    { id: 'left-nav', label: 'In-Page Nav', href: 'components.html#left-nav', active: false },
                    { id: 'alert', label: 'Alert', href: 'components.html#alert', active: false },
                    { id: 'header', label: 'Header', href: 'components.html#header', active: false },
                    { id: 'footer', label: 'Footer', href: 'components.html#footer', active: false },
                    { id: 'main-navigation', label: 'Main Navigation', href: 'components.html#main-navigation', active: false },
                    { id: 'modal', label: 'Modal', href: 'components.html#modal', active: false },
                    { id: 'table', label: 'Table', href: 'components.html#table', active: false },
                    { id: 'data-grid', label: 'Data Grid', href: 'components.html#data-grid', active: false },
                    { id: 'selector', label: 'Selectors', href: 'components.html#selector', active: false },
                    { id: 'dropdown', label: 'Dropdown', href: 'components.html#dropdown', active: false },
                    { id: 'pod', label: 'Pod', href: 'components.html#pod', active: false },
                    { id: 'label', label: 'Label', href: 'components.html#label', active: false }
                ]
            }
        },
        {
            id: 'patterns',
            label: 'Patterns',
            svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="24" height="24"><path d="M448 92.99V207.5L539.9 242.4C561.6 250.6 576 271.5 576 294.7V413.9C576 436.1 562.9 456.2 542.5 465.1L446.2 507.5C432.2 513.7 416.3 513.8 402.2 507.1L288 460.7L173.8 507.1C159.7 513.8 143.8 513.7 129.8 507.5L33.46 465.1C13.13 456.2 0 436.1 0 413.9V294.7C0 271.5 14.39 250.6 36.15 242.4L128 207.5V92.99C128 69.32 142.9 48.2 165.2 40.24L269.2 3.134C281.4-1.209 294.6-1.209 306.8 3.134L410.8 40.24C433.1 48.2 448 69.32 448 92.99V92.99zM290.7 48.34C288.1 47.72 287.1 47.72 285.3 48.34L204.1 77.32L288 109.5L371.9 77.32L290.7 48.34zM264 238.6V151.7L176 117.9V207.2L264 238.6zM312 238.6L400 207.2V117.9L312 151.7V238.6zM176 353.9V455.1L264 418.7V320.2L176 353.9zM52.78 421.2L128 454.3V353.9L48 323.2V413.9C48 417.1 49.88 419.9 52.78 421.2zM400 353.9L312 320.2V418.7L400 455.1V353.9zM448 454.3L523.2 421.2C526.1 419.9 528 417.1 528 413.9V323.2L448 353.9V454.3zM155 250.7C153.2 250 151.3 250.1 149.5 250.7L70.81 280.6L152 311.7L235.9 279.5L155 250.7zM340.1 279.5L424 311.7L505.2 280.6L426.5 250.7C424.7 250.1 422.8 250 420.1 250.7L340.1 279.5z"/></svg>`,
            active: false,
            panel: {
                type: 'simple',
                items: [
                    { id: 'query-builder', label: 'Query Builder', href: 'patterns.html#query-builder', active: false },
                    { id: 'file-upload', label: 'File Upload', href: 'patterns.html#file-upload', active: false },
                    { id: 'right-toolbar', label: 'Right Toolbar', href: 'patterns.html#right-toolbar', active: false }
                ]
            }
        }
    ]
};

/**
 * Determine active state based on current page
 */
function determineActiveStates() {
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash.substring(1); // Remove #
    // Get just the filename from the path
    const currentPage = currentPath.split('/').pop() || 'index.html';
    // Handle case where pathname ends with / (index page)
    const normalizedCurrentPage = currentPage === '' ? 'index.html' : currentPage;
    
    // Reset all active states
    globalNavigationConfig.menuItems.forEach(item => {
        item.active = false;
        if (item.panel && item.panel.items) {
            item.panel.items.forEach(panelItem => {
                panelItem.active = false;
            });
        }
    });
    
    // Set active states based on current page
    globalNavigationConfig.menuItems.forEach(item => {
        if (item.panel && item.panel.items) {
            item.panel.items.forEach(panelItem => {
                const href = panelItem.href || '';
                const hrefPage = href.split('#')[0];
                const hrefHash = href.split('#')[1] || '';
                
                // Check if this item matches current page
                // Handle both cases: exact match or when current page is empty/index
                const matchesPage = hrefPage === normalizedCurrentPage || 
                                   (normalizedCurrentPage === 'index.html' && (hrefPage === 'index.html' || hrefPage === ''));
                
                if (matchesPage) {
                    // If there's a hash in the URL, match it; otherwise any item on this page is active
                    if (!currentHash || hrefHash === currentHash || (currentHash && hrefHash === '')) {
                        panelItem.active = true;
                        item.active = true; // Mark parent as active too
                    }
                }
            });
        }
    });
}

/**
 * Initialize global navigation
 */
function initGlobalNavigation() {
    // Determine active states
    determineActiveStates();
    
    // Initialize main navigation
    if (typeof initMainNavigation === 'function') {
        initMainNavigation({
            containerId: 'global-navigation-container',
            menuItems: globalNavigationConfig.menuItems.map(item => ({
                label: item.label, // This will be used for tooltips
                svg: item.svg,
                active: item.active,
                onClick: function(icon, menuItem) {
                    // Navigation handled by panels
                }
            }))
        });
        
        // Add panels using the extended navigation
        if (typeof addNavigationPanels === 'function') {
            const panels = globalNavigationConfig.menuItems.map((item, index) => ({
                iconIndex: index,
                type: item.panel.type,
                items: item.panel.items.map(panelItem => ({
                    id: panelItem.id,
                    label: panelItem.label,
                    href: panelItem.href,
                    active: panelItem.active
                }))
            }));
            
            const navAPI = addNavigationPanels({
                navContainerId: 'global-navigation-container',
                panels: panels,
                onItemClick: function(itemId, itemData) {
                    // Small delay to ensure panel closing is visually complete
                    // The panel should already be closed by the time this is called
                    setTimeout(() => {
                        if (itemData && itemData.href && itemData.href !== '#') {
                            window.location.href = itemData.href;
                        }
                    }, 50); // Small delay to ensure panel is closed
                },
                onPanelOpen: function(iconIndex) {
                    // Panel overlays content, no margin adjustment needed
                },
                onPanelClose: function(iconIndex) {
                    // Panel overlays content, no margin adjustment needed
                }
            });
            
            // NOTE: Panels are hidden by default
            // If you want to auto-open a panel on page load, uncomment the code below:
            // globalNavigationConfig.menuItems.forEach((item, index) => {
            //     if (item.active && item.panel && item.panel.items) {
            //         const activeItem = item.panel.items.find(pi => pi.active);
            //         if (activeItem && navAPI && navAPI.openPanel) {
            //             // Open the panel after a short delay to ensure DOM is ready
            //             setTimeout(() => {
            //                 navAPI.openPanel(index);
            //             }, 100);
            //         }
            //     }
            // });
        }
    } else {
        console.error('initMainNavigation not found. Make sure main-navigation-component.js is loaded first.');
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGlobalNavigation);
} else {
    initGlobalNavigation();
}

