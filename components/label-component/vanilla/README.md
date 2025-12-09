# Label Component - Vanilla Implementation

Vanilla JavaScript/CSS implementation of the label component - colored tags without remove buttons.

## Overview

The label component provides colored tag elements for displaying status, categories, or other information. Labels come in four color variants: Default (gray), Success (green), Info (purple), and Attention (orange).

## Features

- **Four Variants**: Default, Success, Info, and Attention
- **Colored Borders and Text**: Matching border and text colors for each variant
- **No Remove Button**: Static display tags
- **Customizable**: Configurable text and variant

## Quick Start

### 1. Include CSS

```html
<!-- Include design system base styles -->
<link rel="stylesheet" href="../../../../styles/base.css">

<!-- Include component base styles -->
<link rel="stylesheet" href="../base/base.css">

<!-- Include vanilla implementation -->
<link rel="stylesheet" href="label-component.css">
```

### 2. Include JavaScript

```html
<script src="label-component.js"></script>
```

### 3. Create Labels

```javascript
// Single label
initLabel('label-container', {
    text: 'Default',
    variant: 'default' // 'default', 'success', 'info', or 'attention'
});

// Multiple labels
const labelItems = [
    { text: 'Default', variant: 'default' },
    { text: 'Success', variant: 'success' },
    { text: 'Info', variant: 'info' },
    { text: 'Attention', variant: 'attention' }
];
document.getElementById('labels-container').innerHTML = createLabels(labelItems);
```

## Variants

- **Default**: Gray border and text (#5c5c5c)
- **Success**: Green border and text (#009900)
- **Info**: Purple border and text (#782080)
- **Attention**: Orange border and text (#C56C00)

## API

### `createLabel(text, variant)`

Creates a label HTML string.

**Parameters:**
- `text` (string) - Text content of the label
- `variant` (string) - Variant: 'default', 'success', 'info', or 'attention'

**Returns:** HTML string

### `initLabel(containerId, options)`

Initializes a label in a container element.

**Parameters:**
- `containerId` (string) - ID of container element
- `options` (object):
  - `text` (string) - Text content
  - `variant` (string) - Variant type

### `createLabels(items)`

Creates multiple labels.

**Parameters:**
- `items` (array) - Array of strings or objects with `text` and `variant` properties

**Returns:** HTML string with multiple labels

## Styling

The component uses CSS variables from the design system:

- `--color-white`: Background color
- `--color-gray-4`: Default variant color (#5c5c5c)
- `--color-success`: Success variant color (#009900)
- `--color-info`: Info variant color (#782080)
- `--color-attention`: Attention variant color (#C56C00)
- `--font-primary`: Font family
- `--text-paragraph`: Font size (14px)
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



