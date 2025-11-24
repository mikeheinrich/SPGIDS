# Table Component - Vanilla Implementation

Vanilla JavaScript/CSS implementation of the table component with sortable columns, row selection, and custom rendering.

## Files

- `table-component.css` - Complete table styles using design system variables
- `table-component.js` - Table functionality (create, initialize, render)
- `table-example.html` - Standalone example with multiple use cases

## Usage

### Include Styles and Scripts

```html
<!-- Include design system base styles -->
<link rel="stylesheet" href="../../../../styles/base.css">

<!-- Include component base styles -->
<link rel="stylesheet" href="../base/base.css">

<!-- Include vanilla implementation -->
<link rel="stylesheet" href="table-component.css">
<script src="table-component.js"></script>
```

### Basic Usage

```html
<!-- Add a container div -->
<div id="table-container"></div>

<script>
    initTable({
        containerId: 'table-container',
        columns: [
            { key: 'name', label: 'Name', sortable: true },
            { key: 'date', label: 'Date', sortable: true },
            { key: 'size', label: 'Size', sortable: false }
        ],
        data: [
            { name: 'Document 1', date: '2024-01-01', size: '1.2 MB' },
            { name: 'Document 2', date: '2024-01-02', size: '2.5 MB' }
        ]
    });
</script>
```

## API

### `initTable(options)`

Initializes a table in a container element.

**Parameters:**
- `options` (Object) - Table configuration options
  - `containerId` (string, default: 'table-container') - ID of container element
  - `columns` (array, required) - Array of column configuration objects
  - `data` (array, required) - Array of row objects
  - `showCheckboxes` (boolean, default: false) - Whether to show checkboxes
  - `selectAllId` (string, default: 'selectAllCheckbox') - ID for select all checkbox
  - `onRowClick` (function, optional) - Callback when row is clicked
  - `onSelectAll` (function, optional) - Callback when select all is toggled
  - `onRowSelect` (function, optional) - Callback when row checkbox is toggled

**Example:**
```javascript
initTable({
    containerId: 'my-table',
    columns: [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'date', label: 'Date', sortable: true }
    ],
    data: [
        { name: 'Document 1', date: '2024-01-01' },
        { name: 'Document 2', date: '2024-01-02' }
    ]
});
```

### `createTable(options)`

Creates table HTML string (used internally by `initTable`).

**Parameters:**
- `options` (Object) - Same as `initTable` options

**Returns:** string - Table HTML string

**Example:**
```javascript
const html = createTable({
    columns: [{ key: 'name', label: 'Name' }],
    data: [{ name: 'Test' }]
});
```

## Column Configuration

Each column object can have the following properties:

- `key` (string, required) - Unique identifier matching data property
- `label` (string, required) - Header text
- `sortable` (boolean, default: true) - Whether column shows sort indicator (↕)
- `render` (function, optional) - Custom renderer function `(cellData, rowData, rowIndex) => string`

**Example:**
```javascript
{
    key: 'name',
    label: 'Name',
    sortable: true,
    render: function(cellData, rowData, rowIndex) {
        return '<svg class="file-icon">...</svg><span>' + cellData + '</span>';
    }
}
```

## Examples

### Basic Table (No Checkboxes)

```javascript
initTable({
    containerId: 'my-table',
    columns: [
        { key: 'entity', label: 'Booking Entity', sortable: true },
        { key: 'product', label: 'Product', sortable: true },
        { key: 'status', label: 'Status', sortable: true }
    ],
    data: [
        { entity: 'Mizuho Bank (USA)', product: 'Term Loans', status: 'Complete' },
        { entity: 'Mizuho Capital Markets LLC', product: 'Credit Default Swap', status: 'Complete' }
    ]
});
```

### Table with Checkboxes

```javascript
initTable({
    containerId: 'documents-table',
    columns: [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'uploadDate', label: 'Upload Date', sortable: true },
        { key: 'fileSize', label: 'File Size', sortable: true },
        { key: 'modifiedBy', label: 'Modified By', sortable: true },
        { key: 'type', label: 'Type', sortable: true }
    ],
    data: [
        { 
            name: 'Onboarding', 
            uploadDate: '19-Nov-2024', 
            fileSize: '4', 
            modifiedBy: 'sarah.mitchell@spglobal.com', 
            type: 'Folder' 
        },
        { 
            name: 'KYC', 
            uploadDate: '10-Oct-2024', 
            fileSize: '15', 
            modifiedBy: 'michael.chen@spglobal.com', 
            type: 'Folder' 
        }
    ],
    showCheckboxes: true,
    selectAllId: 'selectAllCheckbox',
    onSelectAll: function(selected) {
        console.log('Select all:', selected);
    },
    onRowSelect: function(rowData, selected, rowIndex) {
        console.log('Row selected:', rowData, selected, rowIndex);
    }
});
```

### Table with Custom Cell Rendering

```javascript
initTable({
    containerId: 'custom-table',
    columns: [
        { 
            key: 'name', 
            label: 'Name', 
            sortable: true,
            render: function(cellData, rowData) {
                return `
                    <svg class="file-icon" viewBox="0 0 17 14">
                        <path d="M1 1h15v12H1z" fill="none" stroke="currentColor" stroke-width="1"/>
                    </svg>
                    <span>${cellData}</span>
                `;
            }
        },
        { key: 'date', label: 'Date', sortable: true },
        { key: 'size', label: 'Size', sortable: true }
    ],
    data: [
        { name: 'Document 1', date: '2024-01-01', size: '1.2 MB' }
    ],
    showCheckboxes: true
});
```

### Table with Row Click Handler

```javascript
initTable({
    containerId: 'clickable-table',
    columns: [
        { key: 'name', label: 'Name', sortable: true },
        { key: 'status', label: 'Status', sortable: true }
    ],
    data: [
        { name: 'Item 1', status: 'Active' },
        { name: 'Item 2', status: 'Inactive' }
    ],
    onRowClick: function(rowData, rowIndex) {
        console.log('Row clicked:', rowData, rowIndex);
        // Navigate to detail page, open modal, etc.
    }
});
```

## Options Reference

### `containerId` (string, default: 'table-container')
The ID of the container element where the table will be rendered.

### `columns` (array, required)
Array of column configuration objects:
- `key` (string, required): Unique identifier matching data property
- `label` (string, required): Header text
- `sortable` (boolean, default: true): Whether column shows sort indicator
- `render` (function, optional): Custom renderer function `(cellData, rowData, rowIndex) => string`

### `data` (array, required)
Array of row objects. Each object should have properties matching the column `key` values.

### `showCheckboxes` (boolean, default: false)
Whether to show checkboxes in the first column for row selection.

### `selectAllId` (string, default: 'selectAllCheckbox')
ID for the "select all" checkbox in the header.

### `onSelectAll` (function, optional)
Callback when select all checkbox is toggled: `(selected) => void`

### `onRowSelect` (function, optional)
Callback when individual row checkbox is toggled: `(rowData, selected, rowIndex) => void`

### `onRowClick` (function, optional)
Callback when a row is clicked (not triggered when clicking checkbox): `(rowData, rowIndex) => void`

## CSS Classes

The table uses the following CSS classes:
- `.table-container`: Outer container with border
- `.data-table`: The table element
- `.file-checkbox`: Checkbox styling
- `.file-icon`: Icon styling for file/folder icons

You can override styles by targeting these classes in your own CSS.

## Styling

The table component uses design system CSS variables:
- Colors: `var(--color-gray-2)`, `var(--color-gray-5)`, `var(--color-gray-bg)`, etc.
- Spacing: `var(--spacing-xs)`, `var(--spacing-sm)`, etc.
- Typography: `var(--font-primary)`, `var(--text-paragraph)`, etc.
- Border radius: `var(--radius-md)`

All styles are defined in `table-component.css` and can be customized by overriding the CSS variables or class selectors.

## Migration from Existing Tables

To migrate existing tables to use this component:

1. Extract column definitions from your `<thead>`
2. Extract row data from your `<tbody>`
3. Convert to the component format
4. Replace the table HTML with a container div
5. Call `initTable()` with your configuration

**Example migration:**
```javascript
// Before (HTML)
<table class="documents-table">
    <thead>
        <tr>
            <th>Name</th>
            <th>Date</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Document 1</td>
            <td>2024-01-01</td>
        </tr>
    </tbody>
</table>

// After (Component)
<div id="documents-table"></div>
<script>
initTable({
    containerId: 'documents-table',
    columns: [
        { key: 'name', label: 'Name' },
        { key: 'date', label: 'Date' }
    ],
    data: [
        { name: 'Document 1', date: '2024-01-01' }
    ]
});
</script>
```

## Features

- **Sortable Columns**: Visual sort indicators (↕) on sortable columns
- **Row Selection**: Optional checkboxes with select all functionality
- **Custom Rendering**: Custom cell renderers for complex content
- **Row Click Handlers**: Click events on table rows
- **Hover Effects**: Visual feedback on row hover
- **Responsive**: Horizontal scrolling on smaller screens
- **Accessible**: Proper focus states and keyboard navigation support

## Dependencies

- Design system base styles (`styles/base.css`)
- Component base styles (`base/base.css`)
- CSS variables for colors, spacing, and fonts

## Browser Support

- Modern browsers with CSS variables support
- Flexbox support required
- JavaScript ES5+ support

## See Also

- [Main Component README](../README.md)
- [PrimeNG Angular Implementation](../primeng-angular/README.md)
- [Kendo Angular Implementation](../kendo-angular/README.md)
- [Kendo React Implementation](../kendo-react/README.md)



