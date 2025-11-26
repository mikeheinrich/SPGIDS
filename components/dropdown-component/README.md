# Dropdown Component

A flexible dropdown component for the S&P Global Design System with three variants: Default, Light, and Multi-select.

## Overview

The dropdown component provides a consistent selection interface with three distinct styling variants and support for both single and multiple selection modes.

## Features

- **Three Variants**: Default (with border), Light (minimal), and Multi-select (with checkboxes)
- **Single & Multi-select**: Support for both selection modes
- **Chip Display**: Multi-select shows selected items as chips with "+ X more" format
- **Keyboard Navigation**: Full keyboard support (Arrow keys, Enter, Escape)
- **Accessible**: ARIA attributes and semantic HTML
- **Customizable**: Configurable items, placeholders, and callbacks

## Multi-Library Support

This component is structured to support multiple front-end libraries:

- **Vanilla** - Pure JavaScript/CSS implementation (available now)
- **PrimeNG Angular** - PrimeNG implementation for Angular (coming soon)
- **Kendo Angular** - Kendo UI for Angular implementation (coming soon)
- **Kendo React** - Kendo UI for React implementation (coming soon)

## Component Structure

```
dropdown-component/
├── base/                    # Shared base styles
│   └── base.css            # Base styles used by all implementations
├── vanilla/                 # Vanilla implementation
│   ├── dropdown-component.css
│   ├── dropdown-component.js
│   ├── dropdown-example.html
│   └── README.md
├── primeng-angular/         # PrimeNG Angular implementation
│   └── README.md
├── kendo-angular/          # Kendo Angular implementation
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
<link rel="stylesheet" href="vanilla/dropdown-component.css">
<script src="vanilla/dropdown-component.js"></script>
```

```html
<!-- Add a container div -->
<div id="dropdown-container"></div>

<script>
    initDropdown({
        containerId: 'dropdown-container',
        variant: 'default',
        placeholder: 'Select an option',
        items: ['Option 1', 'Option 2', 'Option 3']
    });
</script>
```

## Variants

### Default Dropdown

Standard dropdown with gray background (#f8f8f8) and border (#cccccc). Best for forms and standard UI contexts.

### Light Dropdown

Minimal dropdown with blue text (#006d89), no border or background. Best for navigation and less prominent selections.

### Multi-select Dropdown

Dropdown with checkboxes for multiple selection. Selected items display as chips with "+ X more" format when more than one item is selected.

## Specifications

- **Height**: 32px (default and light), auto (multi-select with chips)
- **Min Width**: 200px
- **Font**: Akkurat LL, 14px
- **Border Radius**: 2px
- **Colors**: 
  - Default: Gray background (#f8f8f8), gray border (#cccccc)
  - Light: Blue text (#006d89), transparent background
  - Multi-select: Same as default, with chip styling

## JavaScript API

- `initDropdown(options)` - Initialize dropdown component
- Returns object with methods: `getSelected()`, `setSelected()`, `open()`, `close()`, `toggle()`

## Options

- `containerId` - Container element ID
- `variant` - Variant: 'default', 'light', or 'multi-select'
- `placeholder` - Placeholder text when no item is selected
- `items` - Array of items (strings or objects)
- `selectedItems` - Pre-selected items
- `onSelect` - Callback when item is selected
- `onDeselect` - Callback when item is deselected (multi-select)
- `onChange` - Callback when selection changes
- `disabled` - Disable the dropdown

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


