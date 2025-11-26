# Data Grid Component - Vanilla Implementation

A powerful data grid component built on AG-Grid with design system styling.

## Overview

The Data Grid component provides a feature-rich table interface with sorting, filtering, column management, and row selection. It uses AG-Grid Community Edition as the underlying grid engine and applies design system styling for consistent appearance.

## Features

- **Sortable Columns** - Click column headers to sort
- **Column Filtering** - Built-in filter menu for each column
- **Row Selection** - Checkbox selection with select all functionality
- **Column Menu** - Access column options (pin, autosize, group by, reset)
- **Column Resizing** - Drag column borders to resize
- **Pagination** - Optional pagination for large datasets
- **Custom Cell Rendering** - Render custom content in cells
- **Responsive** - Adapts to different screen sizes

## Installation

### CDN (Recommended for Quick Start)

**IMPORTANT:** AG-Grid CSS must be loaded BEFORE the component CSS for proper styling.

Include AG-Grid and the component files in this order:

```html
<!-- 1. Design System Base (for CSS variables) -->
<link rel="stylesheet" href="styles/base.css">

<!-- 2. AG-Grid CSS - MUST BE LOADED FIRST -->
<link rel="stylesheet" href="https://unpkg.com/ag-grid-community@34.1.2/dist/styles/ag-grid.css">
<link rel="stylesheet" href="https://unpkg.com/ag-grid-community@34.1.2/dist/styles/ag-theme-alpine.css">

<!-- 3. Component CSS - Loads after AG-Grid to override styles -->
<link rel="stylesheet" href="components/data-grid-component/base/base.css">
<link rel="stylesheet" href="components/data-grid-component/vanilla/data-grid-component.css">

<!-- AG-Grid JS -->
<script src="https://unpkg.com/ag-grid-community@34.1.2/dist/ag-grid-community.min.js"></script>

<!-- Component JS -->
<script src="components/data-grid-component/vanilla/data-grid-component.js"></script>
```

### NPM

```bash
npm install ag-grid-community
```

Then import in your JavaScript:

```javascript
import { agGrid } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
```

## Usage

### Basic Example

```html
<div id="my-grid" class="data-grid-container ag-theme-alpine"></div>

<script>
initDataGrid({
    containerId: 'my-grid',
    columnDefs: [
        { field: 'name', headerName: 'Name' },
        { field: 'code', headerName: 'Code' },
        { field: 'description', headerName: 'Description' }
    ],
    rowData: [
        { name: 'Item 1', code: '001', description: 'First item' },
        { name: 'Item 2', code: '002', description: 'Second item' }
    ],
    height: 400
});
</script>
```

### Configuration Options

```javascript
initDataGrid({
    // Required
    containerId: 'my-grid',
    columnDefs: [...],  // Array of column definitions
    rowData: [...],     // Array of row data
    
    // Optional - Features
    enableCheckboxSelection: true,    // Enable row selection checkboxes
    enableSorting: true,               // Enable column sorting
    enableFilter: true,                // Enable column filtering
    enableColumnMenu: true,           // Enable column menu
    enableColumnResize: true,          // Enable column resizing
    enablePagination: false,           // Enable pagination
    paginationPageSize: 10,            // Page size for pagination
    
    // Optional - Layout
    height: 400,                       // Grid height in pixels
    
    // Optional - Event Handlers
    onRowClicked: function(event) {
        console.log('Row clicked:', event.data);
    },
    onSelectionChanged: function(event) {
        console.log('Selection changed');
    },
    onCellClicked: function(event) {
        console.log('Cell clicked:', event.value);
    },
    
    // Optional - Additional AG-Grid options
    gridOptions: {
        // Any additional AG-Grid options
    }
});
```

### Column Definitions

Column definitions follow AG-Grid format:

```javascript
columnDefs: [
    {
        field: 'name',              // Data field name
        headerName: 'Name',         // Column header text
        sortable: true,             // Enable sorting (default: true)
        filter: true,               // Enable filtering (default: true)
        resizable: true,            // Enable resizing (default: true)
        width: 200,                 // Column width
        pinned: 'left',             // Pin column ('left' or 'right')
        cellRenderer: function(params) {
            // Custom cell renderer
            return '<div>' + params.value + '</div>';
        }
    }
]
```

## API

The `initDataGrid()` function returns an API object with the following methods:

### `getGridApi()`
Returns the underlying AG-Grid API object for advanced operations.

### `updateRowData(rowData)`
Update the grid's row data.

```javascript
const gridApi = initDataGrid({...});
gridApi.updateRowData(newRowData);
```

### `updateColumnDefs(columnDefs)`
Update the grid's column definitions.

```javascript
gridApi.updateColumnDefs(newColumnDefs);
```

### `getSelectedRows()`
Get all selected rows.

```javascript
const selected = gridApi.getSelectedRows();
console.log(selected);
```

### `getSelectedNodes()`
Get all selected row nodes (AG-Grid format).

```javascript
const nodes = gridApi.getSelectedNodes();
```

### `selectAll()`
Select all rows.

```javascript
gridApi.selectAll();
```

### `deselectAll()`
Deselect all rows.

```javascript
gridApi.deselectAll();
```

### `refreshCells(params)`
Refresh specific cells.

```javascript
gridApi.refreshCells({ force: true });
```

### `sizeColumnsToFit()`
Size all columns to fit the grid width.

```javascript
gridApi.sizeColumnsToFit();
```

### `destroy()`
Destroy the grid instance and clean up.

```javascript
gridApi.destroy();
```

## Styling

The component uses design system CSS variables for consistent styling:

- Colors: `--color-gray-*`, `--color-primary`, `--color-brand`
- Spacing: `--spacing-xs`, `--spacing-sm`, etc.
- Typography: `--font-primary`, `--text-paragraph`, etc.
- Borders: `--color-gray-2`, `--radius-md`

Custom styling can be applied by overriding AG-Grid CSS variables or adding custom CSS rules.

## Examples

See `data-grid-example.html` for complete examples including:
- Basic grid
- Custom cell rendering
- Pagination
- API usage

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- AG-Grid Community Edition supports IE11+ (with polyfills)

## Dependencies

- AG-Grid Community Edition (v31.0.0 or higher)
- Design System Base Styles

## Resources

- [AG-Grid Documentation](https://www.ag-grid.com/documentation/)
- [AG-Grid Examples](https://www.ag-grid.com/example/)
- [Design System Documentation](../README.md)

