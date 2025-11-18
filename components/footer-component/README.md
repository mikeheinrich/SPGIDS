# Footer Component

A collapsible footer component with copyright, links, and logo for the S&P Global Design System. This component supports multiple front-end library implementations.

## Overview

The footer component provides a consistent footer at the bottom of the page. It includes:
- Copyright text (auto-updates with current year)
- Footer links (Terms, Privacy, Customer Care)
- S&P Global logo
- Smooth toggle animation to expand/collapse
- Fixed position at bottom of page

## Multi-Library Support

This component is structured to support multiple front-end libraries:

- **Vanilla** - Pure JavaScript/CSS implementation (available now)
- **PrimeNG Angular** - PrimeNG implementation for Angular (coming soon)
- **Kendo Angular** - Kendo UI for Angular implementation (coming soon)
- **Kendo React** - Kendo UI for React implementation (coming soon)

## Component Structure

```
footer-component/
├── base/                    # Shared base styles
│   └── base.css            # Base styles used by all implementations
├── vanilla/                 # Vanilla implementation
│   ├── footer-component.css
│   ├── footer-component.js
│   ├── footer-example.html
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
<link rel="stylesheet" href="vanilla/footer-component.css">
<script src="vanilla/footer-component.js"></script>
```

```html
<div id="footer-container"></div>
```

The footer auto-initializes when the page loads.

### PrimeNG Angular

See [PrimeNG Angular Implementation README](primeng-angular/README.md) for details.

### Kendo Angular

See [Kendo Angular Implementation README](kendo-angular/README.md) for details.

### Kendo React

See [Kendo React Implementation README](kendo-react/README.md) for details.

## Features

- Fixed position footer
- Collapsible/expandable design
- Auto-updating copyright year
- Footer links (Terms, Privacy, Customer Care)
- S&P Global logo
- Smooth toggle animation
- Auto-initialization
- Responsive design
- Accessibility support

## Footer States

- **Collapsed**: 24px tall, showing only copyright and toggle button
- **Expanded**: 96px tall, showing copyright, links, and logo

## Dependencies

All implementations require:
- Design system base styles (`styles/base.css`)
- Component base styles (`base/base.css`)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Custom Properties (CSS Variables) required
- Flexbox support required
- JavaScript ES6+ required

## Version

1.0.0 - Initial release

## License

S&P Global Design System - Internal Use
