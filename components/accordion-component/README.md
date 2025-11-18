# Accordion Component

A reusable accordion component library for the S&P Global Design System. Accordions allow content to be expanded and collapsed with smooth animations.

## Overview

The accordion component provides expandable/collapsible content sections. The header shows a chevron icon that rotates when opened. The component is flexible in width and can accommodate any amount of content.

## Multi-Library Support

This component is structured to support multiple front-end libraries:

- **Vanilla** - Pure JavaScript/CSS implementation (available now)
- **PrimeNG Angular** - PrimeNG implementation for Angular (coming soon)
- **Kendo Angular** - Kendo UI for Angular implementation (coming soon)
- **Kendo React** - Kendo UI for React implementation (coming soon)

## Component Structure

```
accordion-component/
├── base/                    # Shared base styles
│   └── base.css            # Base styles used by all implementations
├── vanilla/                 # Vanilla implementation
│   ├── accordion-component.css
│   ├── accordion-component.js
│   ├── accordion-example.html
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
<link rel="stylesheet" href="vanilla/accordion-component.css">
<script src="vanilla/accordion-component.js"></script>
```

```html
<div class="accordion" data-accordion>
    <button class="accordion-header">
        <span>Accordion Light</span>
        <span class="accordion-icon">
            <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 0L14 7L7 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </span>
    </button>
    <div class="accordion-content">
        <div class="accordion-content-inner">
            Content goes here
        </div>
    </div>
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

- `--color-brand` - Brand red color (#d6002a)
- `--color-white` - White color (#FFFFFF)
- `--color-gray-1` - Light gray for borders (#eeeeee)
- `--color-gray-4` - Medium gray for default border (#5c5c5c)
- `--color-gray-5` - Dark gray for text (#1a1a1a)
- `--color-gray-n` - Medium gray for disabled text (#999999)
- `--font-primary` - Primary font family
- `--text-paragraph` - Base font size (1.4rem)

## Accordion States

### Default (Closed)
- Background: White (#ffffff)
- Text: Dark gray (#1a1a1a), regular weight (400)
- Top border: 2px solid medium gray (#5c5c5c)
- Icon: Chevron pointing right (0deg rotation)

### Hover
- Background: White (#ffffff)
- Text: Dark gray (#32363b), bold (700)
- Top border: 2px solid brand red (#d6002a)
- Box shadow: Subtle shadow
- Icon: Chevron pointing right

### Open
- Background: White (#ffffff)
- Text: Dark gray (#32363b), bold (700)
- Top border: 2px solid brand red (#d6002a)
- Box shadow: Subtle shadow with gray tint
- Icon: Chevron pointing down (90deg rotation)
- Content: Expanded with smooth animation

### Disabled
- Text: Gray (#999999)
- Opacity: 0.6
- Cursor: not-allowed

## Behavior

- Click header to expand/collapse content
- Smooth height transition animation
- Icon rotates from right (closed) to down (open)
- Keyboard support: Enter and Space keys
- Accessible: ARIA roles and attributes included
- Flexible width: Adapts to container

## Dependencies

All implementations require:
- Design system base styles (`styles/base.css`)
- Component base styles (`base/base.css`)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Custom Properties (CSS Variables) required
- Flexbox support required
- CSS Transitions required

## Version

1.0.0 - Initial release based on Adobe XD specifications

## License

S&P Global Design System - Internal Use

