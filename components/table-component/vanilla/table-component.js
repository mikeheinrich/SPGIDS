/**
 * Table Component - Vanilla JavaScript
 * 
 * This file contains the functionality for table components.
 * 
 * REFERENCE:
 * Components are based on patterns from SPGIDS (S&P Global Design System)
 * Repository: https://github.com/mikeheinrich/SPGIDS
 * 
 * USAGE:
 * 1. Include the CSS from table-component.css in your <head>
 * 2. Include this JavaScript file before the closing </body> tag
 * 3. Add a container: <div id="table-container"></div>
 * 4. Initialize the table: initTable(options)
 * 
 * DEPENDENCIES:
 * - None (pure vanilla JavaScript)
 * 
 * OPTIONS:
 * {
 *   containerId: string (ID of container element, default: 'table-container'),
 *   columns: array of column objects:
 *     {
 *       key: string (unique identifier),
 *       label: string (header text),
 *       sortable: boolean (default: true),
 *       render: function(cellData, rowData, rowIndex) (optional custom renderer)
 *     },
 *   data: array of row objects,
 *   showCheckboxes: boolean (default: false),
 *   selectAllId: string (ID for select all checkbox, default: 'selectAllCheckbox'),
 *   onRowClick: function(rowData, rowIndex) (optional),
 *   onSelectAll: function(selected) (optional),
 *   onRowSelect: function(rowData, selected, rowIndex) (optional)
 * }
 * 
 * FEATURES:
 * - Sortable columns (with ↕ indicator)
 * - Optional checkboxes for row selection
 * - Select all functionality
 * - Custom cell rendering
 * - Row click handlers
 * - Hover effects
 */

/**
 * Create table HTML
 * @param {Object} options - Table configuration options
 * @returns {string} Table HTML string
 */
function createTable(options = {}) {
    const {
        columns = [],
        data = [],
        showCheckboxes = false,
        selectAllId = 'selectAllCheckbox',
        onRowClick = null,
        onSelectAll = null,
        onRowSelect = null
    } = options;
    
    let tableHTML = '<div class="table-container">';
    tableHTML += '<table class="data-table">';
    
    // Table Header
    tableHTML += '<thead><tr>';
    
    if (showCheckboxes) {
        tableHTML += `<th>
            <input type="checkbox" id="${selectAllId}" class="file-checkbox" />
            <span>${columns[0]?.label || ''} <span>↕</span></span>
        </th>`;
        
        // Add remaining columns
        for (let i = 1; i < columns.length; i++) {
            const col = columns[i];
            const sortIndicator = col.sortable !== false ? ' <span>↕</span>' : '';
            tableHTML += `<th>${col.label}${sortIndicator}</th>`;
        }
    } else {
        // No checkboxes - add all columns
        columns.forEach(col => {
            const sortIndicator = col.sortable !== false ? ' <span>↕</span>' : '';
            tableHTML += `<th>${col.label}${sortIndicator}</th>`;
        });
    }
    
    tableHTML += '</tr></thead>';
    
    // Table Body
    tableHTML += '<tbody>';
    
    data.forEach((row, rowIndex) => {
        tableHTML += '<tr>';
        
        if (showCheckboxes) {
            // First cell with checkbox
            const firstCol = columns[0];
            const cellContent = firstCol.render 
                ? firstCol.render(row[firstCol.key], row, rowIndex)
                : (row[firstCol.key] || '');
            
            tableHTML += `<td>
                <input type="checkbox" class="file-checkbox" data-row-index="${rowIndex}" />
                ${cellContent}
            </td>`;
            
            // Remaining cells
            for (let i = 1; i < columns.length; i++) {
                const col = columns[i];
                const cellContent = col.render 
                    ? col.render(row[col.key], row, rowIndex)
                    : (row[col.key] || '');
                tableHTML += `<td>${cellContent}</td>`;
            }
        } else {
            // No checkboxes - render all cells
            columns.forEach(col => {
                const cellContent = col.render 
                    ? col.render(row[col.key], row, rowIndex)
                    : (row[col.key] || '');
                tableHTML += `<td>${cellContent}</td>`;
            });
        }
        
        tableHTML += '</tr>';
    });
    
    tableHTML += '</tbody>';
    tableHTML += '</table>';
    tableHTML += '</div>';
    
    return tableHTML;
}

/**
 * Initialize Table Function
 * @param {Object} options - Table configuration options
 */
function initTable(options = {}) {
    const {
        containerId = 'table-container',
        columns = [],
        data = [],
        showCheckboxes = false,
        selectAllId = 'selectAllCheckbox',
        onRowClick = null,
        onSelectAll = null,
        onRowSelect = null
    } = options;
    
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Table container not found. Add <div id="${containerId}"></div> to your HTML.`);
        return;
    }
    
    // Generate and insert table HTML
    container.innerHTML = createTable({
        columns,
        data,
        showCheckboxes,
        selectAllId,
        onRowClick,
        onSelectAll,
        onRowSelect
    });
    
    // Set up select all functionality
    if (showCheckboxes) {
        const selectAllCheckbox = document.getElementById(selectAllId);
        const rowCheckboxes = container.querySelectorAll('.data-table tbody .file-checkbox');
        
        if (selectAllCheckbox) {
            selectAllCheckbox.addEventListener('change', function() {
                const isChecked = this.checked;
                rowCheckboxes.forEach(checkbox => {
                    checkbox.checked = isChecked;
                });
                
                if (onSelectAll) {
                    onSelectAll(isChecked);
                }
            });
            
            // Update select all checkbox when individual checkboxes change
            rowCheckboxes.forEach((checkbox, index) => {
                checkbox.addEventListener('change', function() {
                    const checkedCount = Array.from(rowCheckboxes).filter(cb => cb.checked).length;
                    selectAllCheckbox.checked = checkedCount === rowCheckboxes.length;
                    selectAllCheckbox.indeterminate = checkedCount > 0 && checkedCount < rowCheckboxes.length;
                    
                    if (onRowSelect) {
                        const rowIndex = parseInt(this.getAttribute('data-row-index'));
                        onRowSelect(data[rowIndex], this.checked, rowIndex);
                    }
                });
            });
        }
    }
    
    // Set up row click handlers
    if (onRowClick) {
        const rows = container.querySelectorAll('.data-table tbody tr');
        rows.forEach((row, index) => {
            row.addEventListener('click', function(e) {
                // Don't trigger if clicking on checkbox
                if (e.target.type !== 'checkbox') {
                    onRowClick(data[index], index);
                }
            });
        });
    }
}

/**
 * Initialize all tables on the page (auto-initialization)
 */
function initAllTables() {
    const containers = document.querySelectorAll('[data-table-init]');
    containers.forEach(container => {
        if (!container.dataset.initialized) {
            const options = JSON.parse(container.dataset.tableInit || '{}');
            options.containerId = container.id || 'table-' + Date.now();
            if (!container.id) {
                container.id = options.containerId;
            }
            initTable(options);
            container.dataset.initialized = 'true';
        }
    });
}

// Auto-initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllTables);
} else {
    initAllTables();
}

// Export for module systems (if using ES6 modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { createTable, initTable, initAllTables };
}

