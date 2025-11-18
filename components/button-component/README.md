# Button Component

A reusable button component library for the S&P Global Design System, based on Adobe XD specifications. This component supports multiple front-end library implementations.

## Overview

The button component provides consistent, accessible button styles with multiple variants and states. It includes primary (filled), secondary (outlined), and link button styles, all with optional icon support.

## Multi-Library Support

This component is structured to support multiple front-end libraries:

- **Vanilla** - Pure JavaScript/CSS implementation (available now)
- **PrimeNG Angular** - PrimeNG implementation for Angular (coming soon)
- **Kendo Angular** - Kendo UI for Angular implementation (coming soon)
- **Kendo React** - Kendo UI for React implementation (coming soon)

## Component Structure

```
button-component/
├── base/                    # Shared base styles
│   └── base.css            # Base styles used by all implementations
├── vanilla/                 # Vanilla implementation
│   ├── button-component.css
│   ├── button-example.html
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
<link rel="stylesheet" href="vanilla/button-component.css">
```

```html
<button class="btn-primary">Primary Button</button>
<button class="btn-secondary">Secondary Button</button>
<button class="btn-link">Link Button</button>
```

### PrimeNG Angular

See [PrimeNG Angular Implementation README](primeng-angular/README.md) for details.

### Kendo Angular

See [Kendo Angular Implementation README](kendo-angular/README.md) for details.

### Kendo React

See [Kendo React Implementation README](kendo-react/README.md) for details.

## Design Tokens

All implementations use shared design tokens from `styles/base.css`:

- `--color-primary` - Primary brand color (#006d89)
- `--color-primary-hover` - Primary hover color (#00495b)
- `--color-white` - White color (#FFFFFF)
- `--color-gray-1` - Light gray for secondary hover (#eeeeee)
- `--color-gray-2` - Light gray for disabled state (#cccccc)
- `--color-gray-n` - Medium gray for disabled text (#999999)
- `--font-primary` - Primary font family
- `--text-paragraph` - Base font size (1.4rem)
- `--radius-sm` - Small border radius (2px)
- `--spacing-sm`, `--spacing-xs`, `--spacing-md` - Spacing tokens

## Button Variants

### Primary Button

- Dimensions: Auto width (min 90px) × 32px height
- Background: Primary blue (#006d89)
- Text: White
- Hover: Darker blue (#00495b) with 0.3s ease-out transition

### Secondary Button

- Dimensions: Auto width (min 87px) × 32px height
- Background: Transparent
- Border: 1px solid primary blue (#006d89)
- Text: Primary blue
- Hover: Light gray background (#eeeeee) with primary blue text (0.3s ease-out transition)

### Link Button

- Dimensions: Auto height, min 32px
- Background: Transparent
- Border: None
- Text: Primary blue (#006d89)
- Hover: Darker blue text (#00495b) with 0.3s ease-out transition

## Button States

All buttons support:
- Default - Normal, interactive state
- Hover - On mouse hover (0.3s ease-out transition)
- Active - On click (slight transform)
- Focus - Keyboard navigation (outline for accessibility)
- Disabled - Non-interactive state
- Disabled Hover - Hover state when disabled (opacity change)

## Size Variations

- Small: 28px height, smaller font
- Default: 32px height
- Large: 40px height, larger font

## Icon Support

All button types support icons:

```html
<!-- Primary button with icon -->
<button class="btn-primary">
    <span class="btn-icon">
        <svg viewBox="0 0 16 16">...</svg>
    </span>
    Button text
</button>

<!-- Secondary button with icon -->
<button class="btn-secondary">
    <span class="btn-icon">
        <svg viewBox="0 0 16 16">...</svg>
    </span>
    Button text
</button>

<!-- Link button with icon -->
<button class="btn-link">
    <span class="btn-icon">
        <svg viewBox="0 0 16 16">...</svg>
    </span>
    button
</button>

<!-- Icon-only button -->
<button class="btn-primary btn-icon-only" aria-label="Add">
    <span class="btn-icon">
        <svg viewBox="0 0 16 16">...</svg>
    </span>
</button>
```

Icons automatically inherit the button's text color using `currentColor`.

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
