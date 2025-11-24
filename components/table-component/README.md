# Table Component

A reusable data table component with sortable columns, row selection, and custom rendering for the S&P Global Design System. This component provides a flexible table interface with optional checkboxes, row click handlers, and custom cell rendering.

## Overview

The table component provides a consistent data table interface with:
- Sortable columns with visual indicators (↕)
- Optional row selection with checkboxes
- Select all functionality
- Custom cell rendering support
- Row click handlers
- Hover effects for better UX
- Responsive design with horizontal scrolling

## Multi-Library Support

This component is structured to support multiple front-end libraries:

- **Vanilla** - Pure JavaScript/CSS implementation (available now)
- **PrimeNG Angular** - PrimeNG implementation for Angular (coming soon)
- **Kendo Angular** - Kendo UI for Angular implementation (coming soon)
- **Kendo React** - Kendo UI for React implementation (coming soon)

## Component Structure

```
table-component/
├── base/                    # Shared base styles
│   └── base.css            # Base styles used by all implementations
├── vanilla/                 # Vanilla implementation
│   ├── table-component.css
│   ├── table-component.js
│   ├── table-example.html
│   └── README.md
├── primeng-angular/         # PrimeNG Angular implementation
│   └── README.md
├── kendo-angular/           # Kendo Angular implementation
│   └── README.md
├── kendo-react/            # Kendo React implementation
│   └── README.md
├── component.json           # Component manifest
└── README.md                # This file
```

## Quick Start

### Vanilla Implementation

See [Vanilla Implementation README](vanilla/README.md) for details.

```html
<!-- Include design system base styles -->
<link rel="stylesheet" href="../../styles/base.css">

<!-- Include component base styles -->
<link rel="stylesheet" href="base/base.css">

<!-- Include vanilla implementation -->
<link rel="stylesheet" href="vanilla/table-component.css">
<script src="vanilla/table-component.js"></script>
```

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

## Specifications

- **Border:** 1px solid `var(--color-gray-2)`
- **Border Radius:** `var(--radius-md)` (4px)
- **Header Background:** `var(--color-gray-bg)`
- **Header Text Color:** `var(--color-gray-5)`
- **Row Hover:** `var(--color-gray-bg)`
- **Checkbox Border:** `var(--color-gray-4)`
- **Checkbox Checked:** Brand red (`var(--color-brand)` = #d6002a)
- **Link Color:** `var(--color-primary)` (#006d89)

## Features

### Sortable Columns
- Visual sort indicators (↕) on sortable columns
- Column headers are clickable (sorting logic can be implemented separately)

### Row Selection
- Optional checkboxes in the first column
- Select all checkbox in header
- Indeterminate state when some rows are selected
- Callbacks for selection events

### Custom Rendering
- Custom cell renderer functions for complex content
- Support for icons, HTML, and formatted data
- Access to cell data, row data, and row index

### Row Interaction
- Click handlers on table rows
- Hover effects for visual feedback
- Checkbox clicks don't trigger row clicks

### Responsive Design
- Horizontal scrolling on smaller screens
- Maintains usability across device sizes

## JavaScript API

- `initTable(options)` - Initialize table in a container
- `createTable(options)` - Create table HTML string
- `initAllTables()` - Auto-initialize all tables on page

## Options

- `containerId` - Container element ID
- `columns` - Array of column configuration objects
- `data` - Array of row data objects
- `showCheckboxes` - Enable row selection checkboxes
- `selectAllId` - ID for select all checkbox
- `onRowClick` - Callback for row clicks
- `onSelectAll` - Callback for select all toggle
- `onRowSelect` - Callback for individual row selection

## Browser Support

- Modern browsers with CSS Variables support
- Flexbox support required
- JavaScript ES5+ support

## Dependencies

- Design system base styles (`styles/base.css`)
- Component base styles (`base/base.css`)
- CSS variables for colors, spacing, and fonts

## See Also

- [Vanilla Implementation](vanilla/README.md)
- [PrimeNG Angular Implementation](primeng-angular/README.md)
- [Kendo Angular Implementation](kendo-angular/README.md)
- [Kendo React Implementation](kendo-react/README.md)



