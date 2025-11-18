# Button Group Component

A reusable button group component library for the S&P Global Design System. Button groups act like tabs or radio buttons, allowing only one selection at a time.

## Overview

The button group component provides a tab-like interface where buttons are visually connected. Only one button can be active at a time. The active button has a gray background, red text, and a red top border.

## Multi-Library Support

This component is structured to support multiple front-end libraries:

- **Vanilla** - Pure JavaScript/CSS implementation (available now)
- **PrimeNG Angular** - PrimeNG implementation for Angular (coming soon)
- **Kendo Angular** - Kendo UI for Angular implementation (coming soon)
- **Kendo React** - Kendo UI for React implementation (coming soon)

## Component Structure

```
button-group-component/
├── base/                    # Shared base styles
│   └── base.css            # Base styles used by all implementations
├── vanilla/                 # Vanilla implementation
│   ├── button-group-component.css
│   ├── button-group-component.js
│   ├── button-group-example.html
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
<link rel="stylesheet" href="vanilla/button-group-component.css">
<script src="vanilla/button-group-component.js"></script>
```

```html
<div class="btn-group" data-button-group>
    <button class="btn-group-item active">Button 1</button>
    <button class="btn-group-item">Button 2</button>
    <button class="btn-group-item">Button 3</button>
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
- `--color-gray-1` - Light gray for active background (#eeeeee)
- `--color-gray-2` - Light gray for borders (#cccccc)
- `--color-gray-4` - Medium gray for inactive text (#5c5c5c)
- `--color-gray-n` - Medium gray for disabled text (#999999)
- `--font-primary` - Primary font family
- `--text-paragraph` - Base font size (1.4rem)

## Button Group States

### Active Button
- Background: Light gray (#eeeeee)
- Text: Brand red (#d6002a)
- Top border: 2px solid brand red (#d6002a)
- Border: 1px solid light gray (#cccccc)

### Inactive Button
- Background: Transparent
- Text: Medium gray (#5c5c5c)
- Border: 1px solid light gray (#cccccc)
- Hover: Slight background tint

### Disabled Button
- Text: Gray (#999999)
- Opacity: 0.6
- Cursor: not-allowed

## Behavior

- Only one button can be active at a time (radio button behavior)
- Clicking an inactive button makes it active and deactivates others
- Keyboard navigation: Arrow keys, Home, End
- Accessible: ARIA roles and attributes included

## Dependencies

All implementations require:
- Design system base styles (`styles/base.css`)
- Component base styles (`base/base.css`)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Custom Properties (CSS Variables) required
- Flexbox support required

## Version

1.0.0 - Initial release based on Adobe XD specifications

## License

S&P Global Design System - Internal Use

