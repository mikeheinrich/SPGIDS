# Button Component - Vanilla Implementation

Vanilla JavaScript/CSS implementation of the button component.

## Files

- `button-component.css` - Complete button styles
- `button-example.html` - Standalone example

## Usage

### Include Styles

```html
<!-- Include design system base styles -->
<link rel="stylesheet" href="../../../../styles/base.css">

<!-- Include component base styles -->
<link rel="stylesheet" href="../base/base.css">

<!-- Include vanilla implementation -->
<link rel="stylesheet" href="button-component.css">
```

### HTML

```html
<!-- Primary Button -->
<button class="btn-primary">Primary Button</button>

<!-- Secondary Button -->
<button class="btn-secondary">Secondary Button</button>

<!-- Link Button -->
<button class="btn-link">Link Button</button>

<!-- Buttons with Icons -->
<button class="btn-primary">
    <span class="btn-icon">
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
    </span>
    Button with icon
</button>

<!-- Icon-only Button -->
<button class="btn-primary btn-icon-only" aria-label="Add">
    <span class="btn-icon">
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3V13M3 8H13" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        </svg>
    </span>
</button>
```

## Button Variants

### Primary Button
- Filled background with white text
- Hover: Darker blue background

### Secondary Button
- Outlined style with transparent background
- Hover: Light gray background (#eeeeee) with primary blue text

### Link Button
- Text-only style, no background or border
- Hover: Text darkens to primary-hover color

## Icon Support

All button types support icons using the `.btn-icon` class. Icons automatically inherit the button's text color via `currentColor`.

For icon-only buttons, use the `.btn-icon-only` class and include an `aria-label` for accessibility.

## Dependencies

- Design system base styles (`styles/base.css`)
- Component base styles (`base/base.css`)

## See Also

- [Main Component README](../README.md)
- [PrimeNG Angular Implementation](../primeng-angular/README.md)
- [Kendo Angular Implementation](../kendo-angular/README.md)
- [Kendo React Implementation](../kendo-react/README.md)

