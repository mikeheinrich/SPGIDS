# Selector Component

Form selector components for the S&P Global Design System including checkboxes, radio buttons, and switches.

## Overview

The selector component provides consistent form input controls with:
- **Checkboxes**: Multiple selection with red checkmark
- **Radio Buttons**: Single selection with red fill
- **Switches**: Toggle on/off with primary blue (on) and gray (off)
- **Consistent spacing**: 10px between control and label
- **Accessible**: Proper focus states and keyboard navigation

## Multi-Library Support

This component is structured to support multiple front-end libraries:

- **Vanilla** - Pure CSS implementation (available now)
- **PrimeNG Angular** - PrimeNG implementation for Angular (coming soon)
- **Kendo Angular** - Kendo UI for Angular implementation (coming soon)
- **Kendo React** - Kendo UI for React implementation (coming soon)

## Component Structure

```
selector-component/
├── base/                    # Shared base styles
│   └── base.css            # Base styles used by all implementations
├── vanilla/                 # Vanilla implementation
│   ├── selector-component.css
│   ├── selector-example.html
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
<link rel="stylesheet" href="vanilla/selector-component.css">
```

```html
<!-- Checkbox -->
<div class="selector-item">
    <input type="checkbox" id="checkbox1" class="selector-checkbox" />
    <label for="checkbox1">Label</label>
</div>

<!-- Radio Button -->
<div class="selector-item">
    <input type="radio" id="radio1" name="group" class="selector-radio" />
    <label for="radio1">Label</label>
</div>

<!-- Switch -->
<div class="selector-item">
    <input type="checkbox" id="switch1" class="selector-switch" />
    <label for="switch1">Label</label>
</div>
```

## Specifications

- **Checkbox**: 16px × 16px, red checkmark when selected
- **Radio**: 16px × 16px circular, red fill when selected
- **Switch**: 40px × 20px, primary blue when on, gray when off
- **Label spacing**: 10px to the right of all controls
- **Selected color**: Brand red (`var(--color-brand)` = #d6002a) for checkboxes and radios
- **Switch on color**: Primary blue (`var(--color-primary)` = #006d89)
- **Switch off color**: Gray (`var(--color-gray-2)`)

## Features

### Checkbox
- Square 16px × 16px control
- Red checkmark when selected
- Supports indeterminate state
- 10px spacing to label

### Radio Button
- Circular 16px × 16px control
- Red filled circle when selected
- Grouped by `name` attribute
- 10px spacing to label

### Switch
- 40px × 20px toggle control
- Primary blue background when on
- Gray background when off
- Smooth transition animation
- 10px spacing to label
- **Rule: Switches must always represent a binary on/off state. Do not use multiple labels or text on both sides. For choosing between multiple options, use a button group instead.**

## Browser Support

- Modern browsers with CSS Variables support
- Flexbox support required

## Dependencies

- Design system base styles (`styles/base.css`)
- Component base styles (`base/base.css`)
- CSS variables for colors, spacing, and fonts

## See Also

- [Vanilla Implementation](vanilla/README.md)
- [PrimeNG Angular Implementation](primeng-angular/README.md)
- [Kendo Angular Implementation](kendo-angular/README.md)
- [Kendo React Implementation](kendo-react/README.md)


