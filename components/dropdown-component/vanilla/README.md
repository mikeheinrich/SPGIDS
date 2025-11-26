# Dropdown Component - Vanilla Implementation

Vanilla JavaScript/CSS implementation of the dropdown component with three variants: Default, Light, and Multi-select.

## Overview

The dropdown component provides a flexible selection interface with three distinct variants:

- **Default**: Standard dropdown with border and background
- **Light**: Minimal dropdown with blue text, no border
- **Multi-select**: Dropdown with checkboxes for multiple selection

## Features

- **Three Variants**: Default, Light, and Multi-select
- **Single & Multi-select**: Support for both selection modes
- **Keyboard Navigation**: Arrow keys, Enter, Escape
- **Chip Display**: Multi-select shows selected items as chips with "+ X more" format
- **Accessible**: ARIA attributes and keyboard support
- **Customizable**: Configurable items, placeholders, and callbacks

## Quick Start

### 1. Include CSS

```html
<!-- Include design system base styles -->
<link rel="stylesheet" href="../../../../styles/base.css">

<!-- Include component base styles -->
<link rel="stylesheet" href="../base/base.css">

<!-- Include vanilla implementation -->
<link rel="stylesheet" href="dropdown-component.css">
```

### 2. Include JavaScript

```html
<script src="dropdown-component.js"></script>
```

### 3. Add Container

```html
<div id="dropdown-container"></div>
```

### 4. Initialize

```javascript
initDropdown({
    containerId: 'dropdown-container',
    variant: 'default', // 'default', 'light', or 'multi-select'
    placeholder: 'Select an option',
    items: ['Option 1', 'Option 2', 'Option 3'],
    onSelect: function(value) {
        console.log('Selected:', value);
    }
});
```

## Variants

### Default Dropdown

Standard dropdown with gray background and border.

```javascript
initDropdown({
    containerId: 'dropdown-default',
    variant: 'default',
    placeholder: 'Select an option',
    items: ['List item', 'List item', 'List item']
});
```

### Light Dropdown

Minimal dropdown with blue text, no border or background.

```javascript
initDropdown({
    containerId: 'dropdown-light',
    variant: 'light',
    placeholder: 'Selected item',
    items: ['List item', 'List item', 'List item']
});
```

### Multi-select Dropdown

Dropdown with checkboxes for multiple selection.

```javascript
initDropdown({
    containerId: 'dropdown-multi',
    variant: 'multi-select',
    placeholder: 'Select items',
    items: ['Label', 'Label', 'Label'],
    selectedItems: ['Item One'],
    onSelect: function(value) {
        console.log('Selected:', value);
    },
    onDeselect: function(value) {
        console.log('Deselected:', value);
    },
    onChange: function(selectedItems) {
        console.log('All selected:', selectedItems);
    }
});
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `containerId` | string | `'dropdown-container'` | ID of the container element |
| `variant` | string | `'default'` | Variant: `'default'`, `'light'`, or `'multi-select'` |
| `placeholder` | string | `'Select an option'` | Placeholder text when no item is selected |
| `items` | array | `[]` | Array of items (strings or objects with `value`/`label`) |
| `selectedItems` | array | `[]` | Pre-selected items |
| `onSelect` | function | `null` | Callback when an item is selected |
| `onDeselect` | function | `null` | Callback when an item is deselected (multi-select only) |
| `onChange` | function | `null` | Callback when selection changes (returns all selected items) |
| `disabled` | boolean | `false` | Disable the dropdown |

## Items Format

Items can be provided as strings or objects:

```javascript
// Simple strings
items: ['Option 1', 'Option 2', 'Option 3']

// Objects with value and label
items: [
    { value: 'opt1', label: 'Option 1' },
    { value: 'opt2', label: 'Option 2', disabled: true },
    { value: 'opt3', label: 'Option 3' }
]
```

## API

### `initDropdown(options)`

Initializes the dropdown component.

**Returns:** Object with methods:
- `getSelected()` - Get currently selected items
- `setSelected(items)` - Set selected items programmatically
- `open()` - Open the dropdown menu
- `close()` - Close the dropdown menu
- `toggle()` - Toggle the dropdown menu

**Example:**
```javascript
const dropdown = initDropdown({
    containerId: 'my-dropdown',
    variant: 'multi-select',
    items: ['Item 1', 'Item 2', 'Item 3']
});

// Get selected items
const selected = dropdown.getSelected();

// Set selected items
dropdown.setSelected(['Item 1', 'Item 2']);

// Control menu
dropdown.open();
dropdown.close();
dropdown.toggle();
```

## Keyboard Navigation

- **Enter/Space**: Open dropdown (when closed) or select highlighted item (when open)
- **Arrow Down**: Move to next item
- **Arrow Up**: Move to previous item
- **Escape**: Close dropdown

## Styling

The component uses CSS variables from the design system:

- `--color-gray-bg`: Background color (#f8f8f8)
- `--color-gray-2`: Border color (#cccccc)
- `--color-gray-4`: Placeholder/icon color (#5c5c5c)
- `--color-gray-5`: Text color (#1a1a1a)
- `--color-primary`: Light variant text color (#006d89)
- `--color-brand`: Checkbox selected color (#d6002a)
- `--color-white`: Background color
- `--font-primary`: Font family
- `--radius-sm`: Border radius (2px)

## Browser Support

- Modern browsers with CSS Variables support
- Flexbox support required
- JavaScript ES5+ support

## Dependencies

- Design system base styles (`styles/base.css`)
- Component base styles (`base/base.css`)
- CSS variables for colors, spacing, and fonts

## See Also

- [Main Component README](../README.md)


