# Main Navigation Component

A reusable main navigation component library for the S&P Global Design System. The Main Navigation provides a fixed left sidebar with icon-based navigation items and tooltips.

## Overview

The Main Navigation component provides a fixed left sidebar navigation with:
- Icon-based menu items
- Tooltips on hover
- Active state indicators (red left border and icon color)
- Customizable click handlers
- Accessibility support

## Variants

### Standard Navigation
The basic main navigation with icons and tooltips. Best for simple applications that don't require sub-navigation.

### Extended Navigation (NEW)
An extended version with flyout panels for multi-level navigation. Supports:
- **Categorized Sub-Navigation** - Group sub-items under titled category headers (most complex)
- **Simple List Sub-Navigation** - Flat list of sub-items without categories
- **Mixed Mode** - Some icons can have panels, others just show tooltips

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
│   ├── main-navigation-component.css      # Standard nav styles
│   ├── main-navigation-component.js       # Standard nav JavaScript
│   ├── main-navigation-example.html       # Standard nav example
│   ├── main-navigation-extended.css       # Extended nav styles (NEW)
│   ├── main-navigation-extended.js        # Extended nav JavaScript (NEW)
│   ├── main-navigation-extended-example.html  # Extended nav example (NEW)
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

### Extended Navigation (Multi-Level)

For applications requiring sub-navigation with one or two additional levels:

```html
<!-- Include extended component styles and scripts -->
<link rel="stylesheet" href="vanilla/main-navigation-extended.css">
<script src="vanilla/main-navigation-extended.js"></script>
```

```html
<div id="main-navigation-extended-container"></div>

<script>
    initMainNavigationExtended({
        containerId: 'main-navigation-extended-container',
        items: [
            {
                id: 'styles',
                label: 'Styles',
                svg: '<svg>...</svg>',
                active: true,
                panel: {
                    type: 'categorized',  // Use 'simple' for flat list
                    categories: [
                        {
                            title: 'Typography',
                            items: [
                                { id: 'headings', label: 'Headings', active: true },
                                { id: 'body', label: 'Body Text' }
                            ]
                        },
                        {
                            title: 'Colors',
                            items: [
                                { id: 'primary', label: 'Primary' },
                                { id: 'secondary', label: 'Secondary' }
                            ]
                        }
                    ]
                }
            },
            {
                id: 'components',
                label: 'Components',
                svg: '<svg>...</svg>',
                panel: {
                    type: 'simple',
                    items: [
                        { id: 'buttons', label: 'Buttons' },
                        { id: 'inputs', label: 'Inputs' }
                    ]
                }
            }
        ],
        onIconClick: (id, item) => console.log('Icon clicked:', id),
        onItemClick: (id, item) => console.log('Item clicked:', id)
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

## Extended Navigation Panel Types

### Categorized Panel (Complex)
Best for organizing many sub-items into logical groups:
- Category headers with title text
- Multiple item groups per panel
- Visual hierarchy with headers and item lists
- Active state indicator on selected items (red top border)

### Simple Panel
Best for flat lists without categorization:
- Single list of items
- No category headers
- Same active state behavior as categorized items

### No Panel (Tooltip Only)
Icons without panels show tooltips on hover and trigger callbacks on click.

## Extended Navigation API

```javascript
const nav = initMainNavigationExtended({ ... });

// Open a specific panel by ID
nav.openPanel('styles');

// Close all panels
nav.closeAllPanels();

// Programmatically set active icon
nav.setActiveIcon('components');

// Programmatically set active sub-item
nav.setActiveItem('buttons');

// Get current open panel ID
const currentPanel = nav.getCurrentPanel();
```

## Version

1.0.0 - Initial release
1.1.0 - Added Extended Navigation with multi-level support

## License

S&P Global Design System - Internal Use

