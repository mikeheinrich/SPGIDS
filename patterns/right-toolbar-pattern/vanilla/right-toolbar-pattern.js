/**
 * Right Toolbar Pattern - Vanilla JavaScript
 * 
 * A flexible vertical toolbar pattern that supports:
 * - Single actions (click handlers)
 * - Actions that open panels (flyouts)
 * - Actions that open modals
 * 
 * USAGE:
 * 1. Include the CSS from right-toolbar-pattern.css
 * 2. Include this JavaScript file
 * 3. Add a container: <div id="right-toolbar-container"></div>
 * 4. Initialize: initRightToolbar({ containerId: 'right-toolbar-container', items: [...] })
 */

// Store toolbar instances
let rightToolbarInstances = {};

/**
 * Initialize Right Toolbar
 * @param {Object} options - Configuration options
 * @param {string} options.containerId - ID of container element
 * @param {Array} options.items - Array of toolbar items
 * @param {boolean} options.demoMode - Whether in demo/preview mode (default: false)
 * @param {Function} options.onItemClick - Global callback for item clicks (optional)
 * @param {Function} options.onPanelOpen - Callback when panel opens (optional)
 * @param {Function} options.onPanelClose - Callback when panel closes (optional)
 * @param {Function} options.onModalOpen - Callback when modal opens (optional)
 * @param {Function} options.onModalClose - Callback when modal closes (optional)
 * 
 * Item structure:
 * {
 *   id: 'unique-id',                    // Required: unique identifier
 *   label: 'Action Name',               // Required: text label
 *   icon: 'icon-content-share-arrow',   // Required: icon name (without .svg) or SVG path
 *   iconPath: 'path/to/icon.svg',       // Optional: full path to icon (overrides icon)
 *   type: 'action',                     // Optional: 'action', 'panel', or 'modal' (default: 'action')
 *   onClick: function() {},              // Optional: click handler (for type: 'action')
 *   panelContent: '<div>...</div>',     // Optional: HTML content for panel (for type: 'panel')
 *   panelTitle: 'Panel Title',          // Optional: title for panel (for type: 'panel')
 *   modalContent: '<div>...</div>',      // Optional: HTML content for modal (for type: 'modal')
 *   modalTitle: 'Modal Title',          // Optional: title for modal (for type: 'modal')
 *   modalId: 'my-modal',                // Optional: ID for modal (auto-generated if not provided)
 *   disabled: false,                     // Optional: disable the item
 *   divider: true                        // Optional: show divider after item (default: true)
 * }
 */
function initRightToolbar(options = {}) {
    const {
        containerId = 'right-toolbar-container',
        items = [],
        demoMode = false,
        onItemClick = null,
        onPanelOpen = null,
        onPanelClose = null,
        onModalOpen = null,
        onModalClose = null
    } = options;

    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Right toolbar container #${containerId} not found`);
        return null;
    }
    
    // Log initialization for debugging
    console.log(`Initializing right toolbar in container: #${containerId}`, { items: items.length, demoMode });
    
    // Ensure container has proper positioning for demo mode
    if (demoMode) {
        container.style.position = 'relative';
        container.style.height = '500px';
        container.style.width = '100%';
    }

    // Create instance
    const instanceId = containerId;
    const instance = {
        containerId,
        items,
        demoMode,
        onItemClick,
        onPanelOpen,
        onPanelClose,
        onModalOpen,
        onModalClose,
        activePanel: null,
        activeModal: null
    };

    rightToolbarInstances[instanceId] = instance;

    // Render toolbar
    renderRightToolbar(instanceId);

    return {
        getInstance: () => instance,
        openPanel: (itemId) => openToolbarPanel(instanceId, itemId),
        closePanel: () => closeToolbarPanel(instanceId),
        openModal: (itemId) => openToolbarModal(instanceId, itemId),
        closeModal: () => closeToolbarModal(instanceId),
        setItemDisabled: (itemId, disabled) => setItemDisabled(instanceId, itemId, disabled),
        updateItem: (itemId, updates) => updateItem(instanceId, itemId, updates)
    };
}

/**
 * Render the toolbar HTML
 */
function renderRightToolbar(instanceId) {
    const instance = rightToolbarInstances[instanceId];
    if (!instance) return;

    const container = document.getElementById(instance.containerId);
    if (!container) return;

    // Build toolbar HTML
    let toolbarHTML = '';
    
    // In demo mode, create panel container outside toolbar
    if (instance.demoMode) {
        toolbarHTML += '<div class="right-toolbar__panel-container" id="' + instance.containerId + '-panel"></div>';
    }
    
    toolbarHTML += `<div class="right-toolbar${instance.demoMode ? ' demo-mode' : ''}">`;
    
    // In non-demo mode, panel container goes inside toolbar
    if (!instance.demoMode) {
        toolbarHTML += '<div class="right-toolbar__panel-container" id="' + instance.containerId + '-panel"></div>';
    }
    
    // Build items
    instance.items.forEach((item, index) => {
        const itemId = item.id || `toolbar-item-${index}`;
        const disabledClass = item.disabled ? ' right-toolbar__item--disabled' : '';
        const iconHTML = getIconHTML(item);
        
        toolbarHTML += `
            <button 
                class="right-toolbar__item${disabledClass}" 
                id="${instance.containerId}-item-${itemId}"
                data-item-id="${itemId}"
                data-item-type="${item.type || 'action'}"
                ${item.disabled ? 'disabled' : ''}
                aria-label="${item.label || 'Toolbar action'}"
            >
                <div class="right-toolbar__icon">
                    ${iconHTML}
                </div>
                <div class="right-toolbar__label">${item.label || ''}</div>
            </button>
        `;
        
        // Add divider after item (default: true, unless explicitly false)
        if (item.divider !== false && index < instance.items.length - 1) {
            toolbarHTML += '<hr class="right-toolbar__divider">';
        }
    });
    
    toolbarHTML += '</div>';
    
    container.innerHTML = toolbarHTML;
    
    // Attach event listeners
    attachEventListeners(instanceId);
}

/**
 * Get icon HTML for an item
 */
function getIconHTML(item) {
    if (item.iconPath) {
        // Use provided icon path
        return `<img src="${item.iconPath}" alt="${item.label || ''}" />`;
    } else if (item.icon) {
        // Try to load from icons directory (relative to HTML file location)
        // This will work when icons/ is at the root level
        const iconPath = `icons/${item.icon}.svg`;
        return `<img src="${iconPath}" alt="${item.label || ''}" onerror="this.style.display='none'" />`;
    } else if (item.iconHTML) {
        // Use provided HTML
        return item.iconHTML;
    }
    return '';
}

/**
 * Attach event listeners
 */
function attachEventListeners(instanceId) {
    const instance = rightToolbarInstances[instanceId];
    if (!instance) return;

    const container = document.getElementById(instance.containerId);
    if (!container) return;

    // Item click handlers
    container.querySelectorAll('.right-toolbar__item').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const itemId = button.dataset.itemId;
            const itemType = button.dataset.itemType || 'action';
            const item = instance.items.find(i => (i.id || '') === itemId);
            
            if (!item || item.disabled) return;
            
            // Call global click handler
            if (instance.onItemClick) {
                instance.onItemClick(item, itemId);
            }
            
            // Handle based on type
            if (itemType === 'panel') {
                // Toggle panel - if already open for this item, close it; otherwise open it
                if (instance.activePanel === itemId) {
                    closeToolbarPanel(instanceId);
                } else {
                    openToolbarPanel(instanceId, itemId);
                }
            } else if (itemType === 'modal') {
                openToolbarModal(instanceId, itemId);
            } else if (item.onClick) {
                // Single action
                item.onClick(item, itemId);
            }
        });
    });
    
    // Close panel when clicking outside (if not in demo mode)
    if (!instance.demoMode) {
        document.addEventListener('click', (e) => {
            const panelContainer = document.getElementById(instance.containerId + '-panel');
            if (panelContainer && panelContainer.classList.contains('open')) {
                // Check if click is outside toolbar and panel
                if (!container.contains(e.target) && !panelContainer.contains(e.target)) {
                    closeToolbarPanel(instanceId);
                }
            }
        });
    }
}

/**
 * Open a panel for a toolbar item
 */
function openToolbarPanel(instanceId, itemId) {
    const instance = rightToolbarInstances[instanceId];
    if (!instance) return;

    const item = instance.items.find(i => (i.id || '') === itemId);
    if (!item || item.type !== 'panel') return;

    const panelContainer = document.getElementById(instance.containerId + '-panel');
    if (!panelContainer) return;

    // Close any existing panel
    if (instance.activePanel && instance.activePanel !== itemId) {
        closeToolbarPanel(instanceId);
    }

    // Set panel content (no header or close button)
    let panelHTML = '';
    
    if (item.panelContent) {
        panelHTML = item.panelContent;
    } else {
        panelHTML = '<div style="padding: var(--spacing-md);">Panel content</div>';
    }
    
    panelContainer.innerHTML = panelHTML;

    // Open panel - force visibility
    panelContainer.classList.add('open');
    panelContainer.style.display = 'flex';
    panelContainer.style.visibility = 'visible';
    panelContainer.style.opacity = '1';
    instance.activePanel = itemId;
    
    // Add active state to toolbar item
    const toolbarItem = document.getElementById(`${instance.containerId}-item-${itemId}`);
    if (toolbarItem) {
        toolbarItem.classList.add('right-toolbar__item--active');
    }
    
    // Add class to toolbar to indicate panel is open
    const toolbar = container.querySelector('.right-toolbar');
    if (toolbar) {
        toolbar.classList.add('right-toolbar--panel-open');
    }
    
    // Force display for debugging
    panelContainer.style.display = 'flex';

    // Call callback
    if (instance.onPanelOpen) {
        instance.onPanelOpen(item, itemId);
    }
}

/**
 * Close the active panel
 */
function closeToolbarPanel(instanceId) {
    const instance = rightToolbarInstances[instanceId];
    if (!instance) return;

    const panelContainer = document.getElementById(instance.containerId + '-panel');
    if (panelContainer) {
        panelContainer.classList.remove('open');
        panelContainer.style.display = 'none';
    }

    const itemId = instance.activePanel;
    
    // Remove active state from toolbar item and blur it
    if (itemId) {
        const toolbarItem = document.getElementById(`${instance.containerId}-item-${itemId}`);
        if (toolbarItem) {
            toolbarItem.classList.remove('right-toolbar__item--active');
            toolbarItem.blur();
        }
    }
    
    // Remove panel-open class from toolbar
    const container = document.getElementById(instance.containerId);
    if (container) {
        const toolbar = container.querySelector('.right-toolbar');
        if (toolbar) {
            toolbar.classList.remove('right-toolbar--panel-open');
        }
    }
    
    instance.activePanel = null;

    // Call callback
    if (instance.onPanelClose && itemId) {
        const item = instance.items.find(i => (i.id || '') === itemId);
        if (item) {
            instance.onPanelClose(item, itemId);
        }
    }
}

/**
 * Open a modal for a toolbar item
 */
function openToolbarModal(instanceId, itemId) {
    const instance = rightToolbarInstances[instanceId];
    if (!instance) return;

    const item = instance.items.find(i => (i.id || '') === itemId);
    if (!item || item.type !== 'modal') return;

    // Close any existing modal
    if (instance.activeModal) {
        closeToolbarModal(instanceId);
    }

    // Create or get modal
    const modalId = item.modalId || `${instance.containerId}-modal-${itemId}`;
    let modalElement = document.getElementById(modalId);

    if (!modalElement) {
        // Create modal using createModal if available, otherwise create manually
        if (typeof createModal === 'function') {
            modalElement = createModal({
                modalId: modalId,
                title: item.modalTitle || item.label || 'Modal',
                content: item.modalContent || '',
                onOpen: () => {
                    instance.activeModal = itemId;
                    if (instance.onModalOpen) {
                        instance.onModalOpen(item, itemId);
                    }
                },
                onClose: () => {
                    instance.activeModal = null;
                    if (instance.onModalClose) {
                        instance.onModalClose(item, itemId);
                    }
                }
            });
        } else {
            // Fallback: create modal manually
            modalElement = document.createElement('div');
            modalElement.id = modalId;
            modalElement.className = 'modal-overlay';
            modalElement.innerHTML = `
                <div class="modal">
                    <div class="modal-header">
                        <h2 class="modal-title">${item.modalTitle || item.label || 'Modal'}</h2>
                        <button class="modal-close" aria-label="Close modal" type="button">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18.828" height="18.828" viewBox="0 0 18.828 18.828">
                                <g transform="translate(1.414 1.414)">
                                    <line x2="16" y2="16" fill="none" stroke="#707070" stroke-linecap="round" stroke-width="2"/>
                                    <line x1="16" y2="16" fill="none" stroke="#707070" stroke-linecap="round" stroke-width="2"/>
                                </g>
                            </svg>
                        </button>
                    </div>
                    <div class="modal-content">
                        ${item.modalContent || ''}
                    </div>
                </div>
            `;
            document.body.appendChild(modalElement);
            
            // Initialize modal if function exists
            if (typeof initModal === 'function') {
                initModal(modalElement);
            }
        }
    }

    // Open modal
    if (typeof openModal === 'function') {
        openModal(modalElement);
    } else {
        modalElement.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    instance.activeModal = itemId;

    // Call callback
    if (instance.onModalOpen) {
        instance.onModalOpen(item, itemId);
    }
}

/**
 * Close the active modal
 */
function closeToolbarModal(instanceId) {
    const instance = rightToolbarInstances[instanceId];
    if (!instance) return;

    if (!instance.activeModal) return;

    const item = instance.items.find(i => (i.id || '') === instance.activeModal);
    const modalId = item && item.modalId ? item.modalId : `${instance.containerId}-modal-${instance.activeModal}`;
    const modalElement = document.getElementById(modalId);

    if (modalElement) {
        if (typeof closeModal === 'function') {
            closeModal(modalElement);
        } else {
            modalElement.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    const itemId = instance.activeModal;
    instance.activeModal = null;

    // Call callback
    if (instance.onModalClose && item) {
        instance.onModalClose(item, itemId);
    }
}

/**
 * Set item disabled state
 */
function setItemDisabled(instanceId, itemId, disabled) {
    const instance = rightToolbarInstances[instanceId];
    if (!instance) return;

    const item = instance.items.find(i => (i.id || '') === itemId);
    if (!item) return;

    item.disabled = disabled;

    const button = document.getElementById(`${instance.containerId}-item-${itemId}`);
    if (button) {
        if (disabled) {
            button.classList.add('right-toolbar__item--disabled');
            button.disabled = true;
        } else {
            button.classList.remove('right-toolbar__item--disabled');
            button.disabled = false;
        }
    }
}

/**
 * Update an item
 */
function updateItem(instanceId, itemId, updates) {
    const instance = rightToolbarInstances[instanceId];
    if (!instance) return;

    const item = instance.items.find(i => (i.id || '') === itemId);
    if (!item) return;

    Object.assign(item, updates);

    // Re-render if needed
    renderRightToolbar(instanceId);
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initRightToolbar,
        rightToolbarInstances
    };
}

