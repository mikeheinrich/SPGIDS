# Main Navigation Component

A reusable main navigation component library for the S&P Global Design System. The Main Navigation provides a fixed left sidebar with icon-based navigation items and tooltips.

## Overview

The Main Navigation component provides a fixed left sidebar navigation with:
- Icon-based menu items
- Tooltips on hover
- Active state indicators (red left border and icon color)
- Customizable click handlers
- Accessibility support

## Multi-Library Support

This component is structured to support multiple front-end libraries:

- **Vanilla** - Pure JavaScript/CSS implementation (available now)
- **PrimeNG Angular** - PrimeNG implementation for Angular (coming soon)
- **Kendo Angular** - Kendo UI for Angular implementation (coming soon)
- **Kendo React** - Kendo UI for React implementation (coming soon)

## Component Structure

```
main-navigation-component/
├── base/                    # Shared base styles
│   └── base.css            # Base styles used by all implementations
├── vanilla/                 # Vanilla implementation
│   ├── main-navigation-component.css
│   ├── main-navigation-component.js
│   ├── main-navigation-example.html
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
<link rel="stylesheet" href="vanilla/main-navigation-component.css">
<script src="vanilla/main-navigation-component.js"></script>
```

```html
<aside id="main-navigation-container"></aside>

<script>
    initMainNavigation({
        menuItems: [
            {
                label: 'Home',
                svg: '<svg>...</svg>',
                active: false
            },
            {
                label: 'Profile',
                svg: '<svg>...</svg>',
                active: true
            }
        ]
    });
</script>
```

### PrimeNG Angular

See [PrimeNG Angular Implementation README](primeng-angular/README.md) for details.

### Kendo Angular

See [Kendo Angular Implementation README](kendo-angular/README.md) for details.

### Kendo React

See [Kendo React Implementation README](kendo-react/README.md) for details.

## Design Tokens

All implementations use shared design tokens from `styles/base.css`:

- `--color-white` - White background (#FFFFFF)
- `--color-gray-2` - Border color (#cccccc)
- `--color-gray-4` - Inactive icon color (#5c5c5c)
- `--color-brand` - Active indicator and active icon color (#d6002a)
- `--color-gray-5` - Tooltip text color (#1a1a1a)
- `--font-primary` - Primary font family
- `--radius-md` - Border radius for tooltips (4px)

## Component States

### Default (Inactive)
- Icon color: Gray (#5c5c5c)
- Background: White
- Border: Gray right border

### Hover
- Tooltip: Appears on the right side of the icon
- Icon: Remains gray (inactive) or red (active)

### Active
- Left border: 2px solid red (#d6002a)
- Icon color: Red (#d6002a)
- Background: White

## Behavior

- Fixed position on the left side of the page
- Positioned below header (top: 55px) and above footer (bottom: 24px)
- Tooltips appear on hover with smooth fade-in animation
- Click handlers can be customized for each menu item
- Active state can be set programmatically or via click
- Keyboard accessible with focus states

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

1.0.0 - Initial release

## License

S&P Global Design System - Internal Use

