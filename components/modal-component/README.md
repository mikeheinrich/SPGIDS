# Modal Component

A reusable modal/dialog component with overlay, header, and shadow effect for the S&P Global Design System. This component provides a modal dialog with a white background, gray border, shadow effect, and a header with title and close button.

## Overview

The modal component provides a consistent dialog interface with:
- Overlay/backdrop (semi-transparent black)
- White modal container with shadow effect
- Header section with:
  - Red title text (`var(--color-brand)`)
  - Gray close button (X icon) on the right
  - Horizontal divider line
- Content area below header
- Smooth open/close animations

## Multi-Library Support

This component is structured to support multiple front-end libraries:

- **Vanilla** - Pure JavaScript/CSS implementation (available now)
- **PrimeNG Angular** - PrimeNG implementation for Angular (coming soon)
- **Kendo Angular** - Kendo UI for Angular implementation (coming soon)
- **Kendo React** - Kendo UI for React implementation (coming soon)

## Component Structure

```
modal-component/
├── base/                    # Shared base styles
│   └── base.css            # Base styles used by all implementations
├── vanilla/                 # Vanilla implementation
│   ├── modal-component.css
│   ├── modal-component.js
│   ├── panel-example.html
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
<link rel="stylesheet" href="vanilla/modal-component.css">
<script src="vanilla/modal-component.js"></script>
```

```html
<!-- Modal HTML -->
<div class="modal-overlay" id="myModal">
    <div class="modal">
        <div class="modal-header">
            <h2 class="modal-title">Modal title</h2>
            <button class="modal-close" aria-label="Close modal">...</button>
        </div>
        <div class="modal-content">
            <p>Modal content here</p>
        </div>
    </div>
</div>

<script>
    initModal('myModal');
    openModal('myModal');
</script>
```

## Specifications

- **Background:** White (`#fff`)
- **Border:** Gray (`#ccc`, 1px solid)
- **Shadow:** `0 1.5px 3px rgba(138, 143, 149, 0.902)`
- **Dimensions:** 639.133px × 346.5px (default)
- **Title Color:** Red (`var(--color-brand)` = #d6002a)
- **Overlay:** Semi-transparent black (rgba(0, 0, 0, 0.5))

The shadow effect is based on the SVG filter specifications:
- Offset: 1.5px vertical
- Gaussian blur: 1.5px
- Color: #8a8f95 with 90.2% opacity

## Features

### Header
- Title text in brand red color
- Close button (X icon) on the right
- Horizontal divider line separating header from content

### Behavior
- Opens/closes with smooth animations
- Closes on Escape key press
- Closes on overlay click (outside modal)
- Closes on close button click
- Locks body scroll when open

### JavaScript API
- `initModal(modalElement)` - Initialize modal
- `openModal(modalElement)` - Open modal
- `closeModal(modalElement)` - Close modal
- `createModal(options)` - Create modal programmatically

## Browser Support

- Modern browsers with CSS Variables support
- Box-shadow support required
- Flexbox support
- JavaScript required for functionality

## Dependencies

- Design system base styles (`styles/base.css`)
- CSS variables for colors, spacing, and fonts

## See Also

- [Vanilla Implementation](vanilla/README.md)
- [PrimeNG Angular Implementation](primeng-angular/README.md)
- [Kendo Angular Implementation](kendo-angular/README.md)
- [Kendo React Implementation](kendo-react/README.md)
