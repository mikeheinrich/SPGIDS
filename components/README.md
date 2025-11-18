# Design System Components

This directory contains reusable components for the S&P Global Design System. Components are structured to support multiple front-end library implementations.

## Multi-Library Support

All components support multiple front-end libraries:

- **Vanilla** - Pure JavaScript/CSS implementation (available now)
- **PrimeNG Angular** - PrimeNG implementation for Angular (coming soon)
- **Kendo Angular** - Kendo UI for Angular implementation (coming soon)
- **Kendo React** - Kendo UI for React implementation (coming soon)

## Component Structure

Each component follows this structure:

```
component-name/
├── base/                    # Shared base styles
│   └── base.css            # Base styles used by all implementations
├── vanilla/                 # Vanilla implementation
│   ├── component-name.css
│   ├── component-name.js (if needed)
│   ├── component-example.html
│   └── README.md
├── primeng-angular/         # PrimeNG Angular implementation
│   └── README.md
├── kendo-angular/           # Kendo Angular implementation
│   └── README.md
├── kendo-react/            # Kendo React implementation
│   └── README.md
├── component.json           # Component manifest
└── README.md                # Main component documentation
```

## Available Components

### Button Component

Primary and secondary button components with multiple variants and states.

- [Button Component README](button-component/README.md)
- [Vanilla Implementation](button-component/vanilla/README.md)

### Header Component

Fixed header component with logo, navigation, notifications, help, and user menu.

- [Header Component README](header-component/README.md)
- [Vanilla Implementation](header-component/vanilla/README.md)

### Footer Component

Collapsible footer component with copyright, links, and logo.

- [Footer Component README](footer-component/README.md)
- [Vanilla Implementation](footer-component/vanilla/README.md)

## Quick Start

### Using Vanilla Implementation

1. **Include design system base styles:**
   ```html
   <link rel="stylesheet" href="../styles/base.css">
   ```

2. **Include component base styles:**
   ```html
   <link rel="stylesheet" href="components/button-component/base/base.css">
   ```

3. **Include vanilla implementation:**
   ```html
   <link rel="stylesheet" href="components/button-component/vanilla/button-component.css">
   ```

### Using Library Implementations

See individual component README files for library-specific usage:
- [PrimeNG Angular](button-component/primeng-angular/README.md)
- [Kendo Angular](button-component/kendo-angular/README.md)
- [Kendo React](button-component/kendo-react/README.md)

## Design Tokens

All components use shared design tokens from `styles/base.css`:

- Colors: `--color-primary`, `--color-primary-hover`, `--color-white`, etc.
- Typography: `--font-primary`, `--text-paragraph`, `--text-small`, etc.
- Spacing: `--spacing-xs`, `--spacing-sm`, `--spacing-md`, etc.
- Border Radius: `--radius-sm`, `--radius-md`, etc.
- Shadows: `--shadow-sm`, `--shadow-md`, etc.

## Dependencies

All components require:
- Design system base styles (`styles/base.css`)
- Component base styles (`base/base.css` for each component)

## Distribution

See [DISTRIBUTION.md](DISTRIBUTION.md) for information on how to distribute and share components.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Custom Properties (CSS Variables) required
- Flexbox support required
- JavaScript ES6+ required (for components with JavaScript)

## License

S&P Global Design System - Internal Use
