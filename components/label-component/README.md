# Label Component

A colored tag component for the S&P Global Design System without remove buttons.

## Overview

The label component provides colored tag elements for displaying status, categories, or other information. Labels come in four color variants and are static display elements (no remove functionality).

## Features

- **Four Color Variants**: Default (gray), Success (green), Info (purple), and Attention (orange)
- **Colored Borders and Text**: Matching border and text colors for each variant
- **No Remove Button**: Static display tags
- **Customizable**: Configurable text and variant

## Multi-Library Support

This component is structured to support multiple front-end libraries:

- **Vanilla** - Pure JavaScript/CSS implementation (available now)
- **PrimeNG Angular** - PrimeNG implementation for Angular (coming soon)
- **Kendo Angular** - Kendo UI for Angular implementation (coming soon)
- **Kendo React** - Kendo UI for React implementation (coming soon)

## Component Structure

```
label-component/
├── base/                    # Shared base styles
│   └── base.css            # Base styles used by all implementations
├── vanilla/                 # Vanilla implementation
│   ├── label-component.css
│   ├── label-component.js
│   ├── label-example.html
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
<link rel="stylesheet" href="vanilla/label-component.css">
<script src="vanilla/label-component.js"></script>
```

```html
<!-- Add a container div -->
<div id="label-container"></div>

<script>
    initLabel('label-container', {
        text: 'Success',
        variant: 'success'
    });
</script>
```

## Variants

- **Default**: Gray border and text (#5c5c5c)
- **Success**: Green border and text (#009900)
- **Info**: Purple border and text (#782080)
- **Attention**: Orange border and text (#C56C00)

## Specifications

- **Padding**: 4px 10px
- **Border Radius**: 2px
- **Background**: White
- **Border**: 1px solid, color matches variant
- **Text Color**: Matches variant color

## JavaScript API

- `createLabel(text, variant)` - Create label HTML string
- `initLabel(containerId, options)` - Initialize label in container
- `createLabels(items)` - Create multiple labels

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


