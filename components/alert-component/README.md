# Alert Component

A reusable alert component library for the S&P Global Design System. Alerts display messages with different states (default, success, attention) and can be dismissed.

## Overview

The alert component provides a flexible way to display messages to users. It supports multiple variants with distinct visual styling and optional leading icons.

## Multi-Library Support

This component is structured to support multiple front-end libraries:

- **Vanilla** - Pure JavaScript/CSS implementation (available now)
- **PrimeNG Angular** - PrimeNG implementation for Angular (coming soon)
- **Kendo Angular** - Kendo UI for Angular implementation (coming soon)
- **Kendo React** - Kendo UI for React implementation (coming soon)

## Component Structure

```
alert-component/
├── base/                    # Shared base styles
│   └── base.css            # Base styles used by all implementations
├── vanilla/                 # Vanilla implementation
│   ├── alert-component.css
│   ├── alert-component.js
│   ├── alert-example.html
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
<link rel="stylesheet" href="vanilla/alert-component.css">
<script src="vanilla/alert-component.js"></script>
```

```html
<!-- Default Alert -->
<div class="alert alert-default" data-alert>
    <span class="alert-text">
        <strong>Label</strong> could be combination of weights
    </span>
    <button class="alert-close" aria-label="Close alert">
        <svg>...</svg>
    </button>
</div>

<!-- Success Alert -->
<div class="alert alert-success" data-alert>
    <span class="alert-icon">...</span>
    <span class="alert-text">...</span>
    <button class="alert-close">...</button>
</div>
```

### PrimeNG Angular

See [PrimeNG Angular Implementation README](primeng-angular/README.md) for details.

### Kendo Angular

See [Kendo Angular Implementation README](kendo-angular/README.md) for details.

### Kendo React

See [Kendo React Implementation README](kendo-react/README.md) for details.

## Design Tokens

All implementations use shared design tokens from `styles/base.css`:

- `--color-gray-1` - Light gray for default background (#eeeeee)
- `--color-gray-4` - Medium gray for default border (#5c5c5c)
- `--color-success` - Green for success variant (#009900)
- `--color-attention` - Orange for attention variant (#C56C00)
- `--font-primary` - Primary font family
- `--text-paragraph` - Base font size (1.4rem)

## Alert Variants

### Default Alert
- Background: Light gray (#eeeeee)
- Top border: 2px solid medium gray (#5c5c5c)
- Text: Dark gray (#32363b)
- Leading icon: None
- Close button: Dark gray circle with white X

### Success Alert
- Background: Light green (#e6f7e6)
- Top border: 2px solid green (#009900)
- Text: Dark gray (#32363b)
- Leading icon: Green checkmark
- Close button: Dark gray circle with white X

### Attention Alert
- Background: Light orange (#fff4e6)
- Top border: 2px solid orange (#C56C00)
- Text: Dark gray (#32363b)
- Leading icon: Orange warning icon
- Close button: Dark gray circle with white X

## Behavior

- Click close button to dismiss alert
- Smooth fade-out animation when closing
- Custom event dispatched on close
- Flexible width: Adapts to container
- Text supports bold/regular weight combinations

## Dependencies

All implementations require:
- Design system base styles (`styles/base.css`)
- Component base styles (`base/base.css`)
- Clear icon (`icons/icon-core-clear.svg`)
- Check icon (for success variant)
- Warning icon (for attention variant)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Custom Properties (CSS Variables) required
- Flexbox support required

## Version

1.0.0 - Initial release based on Adobe XD specifications

## License

S&P Global Design System - Internal Use

