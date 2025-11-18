# List Group Component

A simple, flat list of selectable items for the S&P Global Design System. This component provides a clean interface for displaying and selecting from a list of items.

## Overview

The List Group component is a simplified version of the left navigation component, designed for scenarios where you need a flat list of selectable items without hierarchy. It features:

- Simple flat list structure (no nesting)
- Active state management with visual indicator
- Hover effects
- Optional dividers between items
- Red accent bar for active items
- Customizable selection callbacks
- Disabled item support
- Full keyboard navigation
- ARIA accessibility attributes

## Structure

```
list-group-component/
├── base/
│   └── base.css              # Shared base styles for all implementations
├── vanilla/
│   ├── list-group-component.css
│   ├── list-group-component.js
│   ├── list-group-example.html
│   └── README.md
├── primeng-angular/
│   └── README.md             # Coming soon
├── kendo-angular/
│   └── README.md             # Coming soon
├── kendo-react/
│   └── README.md             # Coming soon
├── component.json
└── README.md                  # This file
```

## Implementations

### Vanilla JavaScript
✅ **Available** - See [vanilla/README.md](vanilla/README.md) for details

### PrimeNG Angular
🚧 **Coming Soon**

### Kendo UI for Angular
🚧 **Coming Soon**

### Kendo UI for React
🚧 **Coming Soon**

## Quick Start

### Vanilla Implementation

1. Include the base styles:
```html
<link rel="stylesheet" href="../../styles/base.css">
```

2. Include the component CSS:
```html
<link rel="stylesheet" href="list-group-component.css">
```

3. Include the component JavaScript:
```html
<script src="list-group-component.js"></script>
```

4. Add the HTML:
```html
<nav class="list-group" id="list-group-container">
    <ul class="list-group-list" id="listGroupList"></ul>
</nav>
```

5. Initialize:
```javascript
initListGroup({
    items: [
        { id: '1', name: 'Item One' },
        { id: '2', name: 'Item Two' },
        { id: '3', name: 'Item Three' }
    ]
});
```

## Specifications

- **Container Width**: 361px (default, flexible)
- **Item Height**: 32px
- **Font Size**: 16px
- **Font Weight**: 400 (normal), 700 (active)
- **Active Indicator**: 3px red accent bar at top
- **Colors**: Uses design system tokens

## Dependencies

- Design system base styles (`styles/base.css`)
- CSS variables support
- Modern browser with flexbox support

## Browser Support

- Modern browsers with CSS variables support
- Flexbox support required
- ES5 JavaScript (no transpilation needed)

## Examples

See the [vanilla example file](vanilla/list-group-example.html) for complete working examples.

