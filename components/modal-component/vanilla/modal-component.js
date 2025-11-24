/**
 * Modal Component - Vanilla JavaScript
 * 
 * This file contains the functionality for modal components.
 * 
 * USAGE:
 * 1. Include the CSS from modal-component.css in your <head>
 * 2. Include this JavaScript file before the closing </body> tag
 * 3. Create modal HTML or use initModal() function
 * 4. Open modal: openModal(modalId) or modal.open()
 * 5. Close modal: closeModal(modalId) or modal.close()
 * 
 * HTML Structure:
 * <div class="modal-overlay" id="myModal">
 *     <div class="modal">
 *         <div class="modal-header">
 *             <h2 class="modal-title">Modal title</h2>
 *             <button class="modal-close" aria-label="Close modal">
 *                 <svg>...</svg>
 *             </button>
 *         </div>
 *         <div class="modal-content">
 *             <p>Modal content here</p>
 *         </div>
 *     </div>
 * </div>
 */

/**
 * Initialize a modal
 * @param {HTMLElement|string} modalElement - The modal overlay element or its ID
 */
function initModal(modalElement) {
    if (typeof modalElement === 'string') {
        modalElement = document.getElementById(modalElement);
    }
    
    if (!modalElement) {
        console.error('Modal element not found');
        return;
    }

    const modal = modalElement.querySelector('.modal');
    const closeButton = modalElement.querySelector('.modal-close');
    
    // Close button handler
    if (closeButton) {
        closeButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            closeModal(modalElement);
        });
    }
    
    // Close on overlay click (outside modal)
    modalElement.addEventListener('click', function(e) {
        if (e.target === modalElement) {
            closeModal(modalElement);
        }
    });
    
    // Close on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalElement.classList.contains('active')) {
            closeModal(modalElement);
        }
    });
    
    // Prevent modal content clicks from closing
    if (modal) {
        modal.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }
}

/**
 * Open a modal
 * @param {HTMLElement|string} modalElement - The modal overlay element or its ID
 */
function openModal(modalElement) {
    if (typeof modalElement === 'string') {
        modalElement = document.getElementById(modalElement);
    }
    
    if (!modalElement) {
        console.error('Modal element not found');
        return;
    }
    
    // Initialize if not already initialized
    if (!modalElement.dataset.initialized) {
        initModal(modalElement);
        modalElement.dataset.initialized = 'true';
    }
    
    modalElement.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent body scroll
    
    // Dispatch custom event
    const event = new CustomEvent('modalOpen', {
        detail: {
            modal: modalElement
        },
        bubbles: true
    });
    modalElement.dispatchEvent(event);
}

/**
 * Close a modal
 * @param {HTMLElement|string} modalElement - The modal overlay element or its ID
 */
function closeModal(modalElement) {
    if (typeof modalElement === 'string') {
        modalElement = document.getElementById(modalElement);
    }
    
    if (!modalElement) {
        console.error('Modal element not found');
        return;
    }
    
    modalElement.classList.remove('active');
    document.body.style.overflow = ''; // Restore body scroll
    
    // Dispatch custom event
    const event = new CustomEvent('modalClose', {
        detail: {
            modal: modalElement
        },
        bubbles: true
    });
    modalElement.dispatchEvent(event);
}

/**
 * Create a modal programmatically
 * @param {Object} options - Modal options
 * @param {string} options.title - Modal title
 * @param {string} options.content - Modal content HTML
 * @param {string} options.containerId - Container ID to append modal to (default: body)
 * @param {string} options.modalId - Modal overlay ID
 * @param {Function} options.onOpen - Callback when modal opens
 * @param {Function} options.onClose - Callback when modal closes
 * @returns {HTMLElement} The created modal overlay element
 */
function createModal(options = {}) {
    const {
        title = 'Modal title',
        content = '',
        containerId = null,
        modalId = 'modal-' + Date.now(),
        onOpen = null,
        onClose = null
    } = options;
    
    const container = containerId ? document.getElementById(containerId) : document.body;
    
    if (!container) {
        console.error('Container not found');
        return null;
    }
    
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';
    modalOverlay.id = modalId;
    
    modalOverlay.innerHTML = `
        <div class="modal">
            <div class="modal-header">
                <h2 class="modal-title">${title}</h2>
                <button class="modal-close" aria-label="Close modal" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18.828" height="18.828" viewBox="0 0 18.828 18.828">
                        <g id="icon-core-close" transform="translate(1.414 1.414)">
                            <g id="Group_4906" data-name="Group 4906" transform="translate(-1199 -290.227)">
                                <line id="Line_1086" data-name="Line 1086" x2="16" y2="16" transform="translate(1199 290.227)" fill="none" stroke="#707070" stroke-linecap="round" stroke-width="2"/>
                                <line id="Line_1087" data-name="Line 1087" x1="16" y2="16" transform="translate(1199 290.227)" fill="none" stroke="#707070" stroke-linecap="round" stroke-width="2"/>
                            </g>
                        </g>
                    </svg>
                </button>
            </div>
            <div class="modal-content">
                ${content}
            </div>
        </div>
    `;
    
    container.appendChild(modalOverlay);
    
    // Initialize the modal
    initModal(modalOverlay);
    
    // Add event listeners
    if (onOpen) {
        modalOverlay.addEventListener('modalOpen', onOpen);
    }
    if (onClose) {
        modalOverlay.addEventListener('modalClose', onClose);
    }
    
    return modalOverlay;
}

/**
 * Initialize all modals on the page (auto-initialization)
 */
function initAllModals() {
    const modals = document.querySelectorAll('.modal-overlay');
    modals.forEach(modal => {
        if (!modal.dataset.initialized) {
            initModal(modal);
            modal.dataset.initialized = 'true';
        }
    });
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllModals);
} else {
    initAllModals();
}

// Export for module systems (if using ES6 modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initModal,
        openModal,
        closeModal,
        createModal,
        initAllModals
    };
}

