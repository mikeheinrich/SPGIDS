/**
 * Data Grid Component - AG-Grid Wrapper
 * A wrapper around AG-Grid Community Edition with design system integration
 * 
 * Based on AG-Grid Community Edition: https://github.com/ag-grid/ag-grid
 * 
 * USAGE:
 * 1. Include AG-Grid CSS and JS from CDN (see data-grid-example.html)
 * 2. Include this JavaScript file
 * 3. Include the component CSS
 * 4. Add a container: <div id="data-grid-container" class="ag-theme-alpine"></div>
 * 5. Initialize: initDataGrid({ containerId: 'data-grid-container', ... })
 * 
 * DEPENDENCIES:
 * - AG-Grid Community Edition (ag-grid-community)
 */

// Store grid instances
let dataGridInstances = {};

/**
 * Initialize Data Grid
 * @param {Object} options - Configuration options
 * @param {string} options.containerId - ID of container element
 * @param {Array} options.columnDefs - Column definitions (AG-Grid format)
 * @param {Array} options.rowData - Row data array
 * @param {Object} options.gridOptions - Additional AG-Grid options
 * @param {boolean} options.enableCheckboxSelection - Enable row selection checkboxes (default: true)
 * @param {boolean} options.enableSorting - Enable column sorting (default: true)
 * @param {boolean} options.enableFilter - Enable column filtering (default: true)
 * @param {boolean} options.enableColumnMenu - Enable column menu (default: true)
 * @param {boolean} options.enableColumnResize - Enable column resizing (default: true)
 * @param {boolean} options.enablePagination - Enable pagination (default: false)
 * @param {number} options.paginationPageSize - Page size for pagination (default: 10)
 * @param {number} options.height - Grid height in pixels (default: 400)
 * @param {Function} options.onRowClicked - Callback when row is clicked
 * @param {Function} options.onSelectionChanged - Callback when selection changes
 * @param {Function} options.onCellClicked - Callback when cell is clicked
 */
function initDataGrid(options = {}) {
    const {
        containerId = 'data-grid-container',
        columnDefs = [],
        rowData = [],
        gridOptions = {},
        enableCheckboxSelection = true,
        enableSorting = true,
        enableFilter = true,
        enableColumnMenu = true,
        enableColumnResize = true,
        enablePagination = false,
        paginationPageSize = 10,
        height = 400,
        onRowClicked = null,
        onSelectionChanged = null,
        onCellClicked = null
    } = options;

    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Data grid container #${containerId} not found`);
        return null;
    }

    // Check if AG-Grid is available
    // AG-Grid v34 from CDN exposes as window.agGrid
    const agGridLib = window.agGrid || window.ag || (typeof agGrid !== 'undefined' ? agGrid : null);
    
    if (!agGridLib) {
        console.error('AG-Grid is not loaded. Please include AG-Grid library.');
        console.error('Add: <script src="vendor/ag-grid/ag-grid-community.min.js"></script>');
        console.error('Make sure the script is loaded before this component script.');
        return null;
    }
    
    if (!agGridLib.Grid) {
        console.error('AG-Grid.Grid is not available. Check AG-Grid version and CDN link.');
        console.error('AG-Grid object:', agGridLib);
        console.error('Available properties:', Object.keys(agGridLib));
        return null;
    }

    // Ensure container has the theme class
    if (!container.classList.contains('ag-theme-alpine')) {
        container.classList.add('ag-theme-alpine');
    }

    // Set container height and width explicitly
    container.style.height = `${height}px`;
    container.style.width = '100%';
    container.style.display = 'block';

    // Default column definitions
    const defaultColDef = {
        sortable: enableSorting,
        filter: enableFilter,
        resizable: enableColumnResize,
        // Explicitly configure menu
        menuTabs: ['generalMenuTab', 'filterMenuTab', 'columnsMenuTab'],
        suppressMenu: false
    };

    // Process column definitions
    let processedColumnDefs = columnDefs.map(col => ({
        ...defaultColDef,
        ...col
    }));

    // Add checkbox column if enabled
    if (enableCheckboxSelection && processedColumnDefs.length > 0) {
        processedColumnDefs.unshift({
            headerName: '',
            checkboxSelection: true,
            headerCheckboxSelection: true,
            width: 50,
            pinned: 'left',
            lockPosition: true,
            suppressMenu: true,
            sortable: false,
            filter: false,
            resizable: false
        });
    }

    // Grid options - using AG-Grid's recommended approach
    const finalGridOptions = {
        columnDefs: processedColumnDefs,
        rowData: rowData,
        defaultColDef: defaultColDef,
        rowSelection: enableCheckboxSelection ? 'multiple' : undefined,
        suppressRowClickSelection: !enableCheckboxSelection,
        animateRows: true,
        enableCellTextSelection: true,
        suppressMenuHide: true, // Always show menu button
        columnMenu: 'legacy', // Use legacy menu with hamburger button
        ...gridOptions
    };

    // Add pagination if enabled
    if (enablePagination) {
        finalGridOptions.pagination = true;
        finalGridOptions.paginationPageSize = paginationPageSize;
    }

    // Add event handlers
    if (onRowClicked) {
        finalGridOptions.onRowClicked = onRowClicked;
    }
    if (onSelectionChanged) {
        finalGridOptions.onSelectionChanged = onSelectionChanged;
    }
    if (onCellClicked) {
        finalGridOptions.onCellClicked = onCellClicked;
    }

    // Create grid using AG-Grid's recommended method
    // AG-Grid v34 uses: new agGrid.Grid(element, gridOptions)
    try {
        const gridApi = new agGridLib.Grid(container, finalGridOptions);
        
        // Store instance
        dataGridInstances[containerId] = {
            containerId,
            gridApi,
            container,
            options: finalGridOptions
        };

        // Return API
        return {
            getGridApi: () => gridApi,
            updateRowData: (rowData) => {
                gridApi.setGridOption('rowData', rowData);
            },
            updateColumnDefs: (columnDefs) => {
                gridApi.setGridOption('columnDefs', columnDefs);
            },
            getSelectedRows: () => {
                return gridApi.getSelectedRows();
            },
            getSelectedNodes: () => {
                return gridApi.getSelectedNodes();
            },
            selectAll: () => {
                gridApi.selectAll();
            },
            deselectAll: () => {
                gridApi.deselectAll();
            },
            refreshCells: (params) => {
                gridApi.refreshCells(params);
            },
            sizeColumnsToFit: () => {
                gridApi.sizeColumnsToFit();
            },
            destroy: () => {
                gridApi.destroy();
                delete dataGridInstances[containerId];
            }
        };
    } catch (error) {
        console.error('Error initializing AG-Grid:', error);
        console.error('Container:', container);
        console.error('Grid Options:', finalGridOptions);
        return null;
    }
}

/**
 * Get grid instance
 * @param {string} containerId - Container ID
 * @returns {Object|null} Grid instance or null
 */
function getDataGridInstance(containerId) {
    return dataGridInstances[containerId] || null;
}

/**
 * Destroy grid instance
 * @param {string} containerId - Container ID
 */
function destroyDataGrid(containerId) {
    const instance = dataGridInstances[containerId];
    if (instance && instance.gridApi) {
        instance.gridApi.destroy();
        delete dataGridInstances[containerId];
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initDataGrid,
        getDataGridInstance,
        destroyDataGrid,
        dataGridInstances
    };
}
