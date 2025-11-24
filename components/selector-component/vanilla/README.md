# Selector Component - Vanilla Implementation

Vanilla JavaScript/CSS implementation of form selector components including checkboxes, radio buttons, and switches.

## Files

- `selector-component.css` - Complete selector styles using design system variables
- `selector-example.html` - Standalone example with all selector types

## Usage

### Include Styles

```html
<!-- Include design system base styles -->
<link rel="stylesheet" href="../../../../styles/base.css">

<!-- Include component base styles -->
<link rel="stylesheet" href="../base/base.css">

<!-- Include vanilla implementation -->
<link rel="stylesheet" href="selector-component.css">
```

### Checkbox

```html
<div class="selector-item">
    <input type="checkbox" id="checkbox1" class="selector-checkbox" checked />
    <label for="checkbox1">Label</label>
</div>
```

### Radio Button

```html
<div class="selector-item">
    <input type="radio" id="radio1" name="radio-group" class="selector-radio" checked />
    <label for="radio1">Label</label>
</div>
```

### Switch

```html
<div class="selector-item">
    <input type="checkbox" id="switch1" class="selector-switch" checked />
    <label for="switch1">Label</label>
</div>
```

### Selector Group

```html
<div class="selector-group">
    <div class="selector-item">
        <input type="checkbox" id="checkbox1" class="selector-checkbox" />
        <label for="checkbox1">Option 1</label>
    </div>
    <div class="selector-item">
        <input type="checkbox" id="checkbox2" class="selector-checkbox" />
        <label for="checkbox2">Option 2</label>
    </div>
</div>
```

## CSS Classes

### `.selector-checkbox`
Checkbox input element. 16px × 16px with red checkmark when selected.

### `.selector-radio`
Radio button input element. 16px × 16px circular with red fill when selected.

### `.selector-switch`
Switch/toggle input element. 40px × 20px with primary blue when on, gray when off.

### `.selector-group`
Container for grouping multiple selector items vertically.

### `.selector-item`
Container for a single selector with its label.

## Styling

All selectors use design system CSS variables:
- **Checkbox selected**: Red checkmark (`var(--color-brand)` = #d6002a)
- **Radio selected**: Red fill (`var(--color-brand)` = #d6002a)
- **Switch on**: Primary blue (`var(--color-primary)` = #006d89)
- **Switch off**: Gray (`var(--color-gray-2)`)
- **Label spacing**: 10px to the right of all controls
- **Border color**: `var(--color-gray-4)`

## States

All selectors support:
- **Default**: Unselected/unchecked state
- **Selected**: Selected/checked state
- **Disabled**: Reduced opacity, not-allowed cursor
- **Focus**: Primary blue outline for accessibility

## Dependencies

- Design system base styles (`styles/base.css`)
- Component base styles (`base/base.css`)
- CSS variables for colors, spacing, and fonts

## Browser Support

- Modern browsers with CSS variables support
- Flexbox support required

## See Also

- [Main Component README](../README.md)
- [PrimeNG Angular Implementation](../primeng-angular/README.md)
- [Kendo Angular Implementation](../kendo-angular/README.md)
- [Kendo React Implementation](../kendo-react/README.md)

