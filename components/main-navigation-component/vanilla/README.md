# Main Navigation Component - Vanilla Implementation

A fixed left sidebar navigation component with tooltips on hover for the S&P Global Design System.

## Overview

The Main Navigation component provides a fixed left sidebar with icon-based navigation items. Each icon displays a tooltip on hover and supports active states with visual indicators.

## Quick Start

### 1. Include CSS

```html
<!-- Include design system base styles -->
<link rel="stylesheet" href="../../../styles/base.css">

<!-- Include component base styles -->
<link rel="stylesheet" href="../base/base.css">

<!-- Include vanilla implementation -->
<link rel="stylesheet" href="main-navigation-component.css">
```

### 2. Include JavaScript

```html
<script src="main-navigation-component.js"></script>
```

### 3. Add Container

```html
<aside id="main-navigation-container"></aside>
```

### 4. Initialize

```html
<script>
    initMainNavigation({
        menuItems: [
            {
                label: 'Home',
                svg: '<svg>...</svg>',
                active: false,
                onClick: function(icon, item) {
                    console.log('Home clicked');
                }
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

## API

### `initMainNavigation(options)`

Initializes the main navigation component.

#### Parameters

- `options` (Object, optional)
  - `menuItems` (Array, optional): Array of menu item objects. Defaults to predefined items.
    - `label` (String, required): Tooltip text displayed on hover
    - `svg` (String, required): SVG markup for the icon
    - `active` (Boolean, optional): Whether the item is active. Defaults to `false`.
    - `onClick` (Function, optional): Click handler function. Receives `(iconElement, menuItem)` as parameters.

#### Example

```javascript
initMainNavigation({
    menuItems: [
        {
            label: 'Dashboard',
            svg: '<svg viewBox="0 0 24 24">...</svg>',
            active: true,
            onClick: function(icon, item) {
                // Navigate to dashboard
                window.location.href = '/dashboard';
            }
        },
        {
            label: 'Settings',
            svg: '<svg viewBox="0 0 24 24">...</svg>',
            active: false,
            onClick: function(icon, item) {
                // Navigate to settings
                window.location.href = '/settings';
            }
        }
    ]
});
```

## Features

- **Fixed Position**: Sidebar is fixed on the left side of the page
- **Tooltips**: Hover over icons to see tooltips
- **Active State**: Active items show a red left border indicator and red icon color
- **Click Handlers**: Custom click handlers for each menu item
- **Accessibility**: Focus states for keyboard navigation

## Styling

The component uses design system CSS variables:

- `--color-white`: Background color
- `--color-gray-2`: Border color
- `--color-gray-4`: Inactive icon color
- `--color-brand`: Active indicator and active icon color (#d6002a)
- `--color-gray-5`: Tooltip text color
- `--font-primary`: Font family
- `--radius-md`: Border radius for tooltips

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Custom Properties (CSS Variables) required
- Flexbox support required
- CSS Transitions required

## Version

1.0.0 - Initial release

