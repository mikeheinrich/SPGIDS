# Pod Component

A removable chip/tag component for the S&P Global Design System with rounded pill shape.

## Overview

The pod component provides a removable chip/tag element that displays text content with a remove button. It features a rounded pill shape and is commonly used for displaying selected items, filters, or tags that can be dismissed.

## Features

- **Rounded Pill Shape**: 16px border radius for modern pill appearance
- **Remove Button**: Circular gray button with white X icon
- **Hover States**: Interactive remove button with hover feedback
- **Accessible**: Proper ARIA labels and keyboard support
- **Customizable**: Configurable text and remove callbacks

## Multi-Library Support

This component is structured to support multiple front-end libraries:

- **Vanilla** - Pure JavaScript/CSS implementation (available now)
- **PrimeNG Angular** - PrimeNG implementation for Angular (coming soon)
- **Kendo Angular** - Kendo UI for Angular implementation (coming soon)
- **Kendo React** - Kendo UI for React implementation (coming soon)

## Component Structure

```
pod-component/
├── base/                    # Shared base styles
│   └── base.css            # Base styles used by all implementations
├── vanilla/                 # Vanilla implementation
│   ├── pod-component.css
│   ├── pod-component.js
│   ├── pod-example.html
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
<link rel="stylesheet" href="vanilla/pod-component.css">
<script src="vanilla/pod-component.js"></script>
```

```html
<!-- Add a container div -->
<div id="pod-container"></div>

<script>
    initPod('pod-container', {
        text: 'Series A',
        onRemove: function(text) {
            console.log('Removed:', text);
        }
    });
</script>
```

## Specifications

- **Padding**: 4px 10px
- **Border Radius**: 16px (pill shape)
- **Background**: Light gray (#f8f8f8)
- **Border**: Gray (#cccccc)
- **Remove Button**: 16px circular button with gray background (#5c5c5c) and white X icon

## JavaScript API

- `createPod(text, onRemove, id)` - Create pod HTML string
- `initPod(containerId, options)` - Initialize pod in container
- `createPods(items, onRemove)` - Create multiple pods

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



