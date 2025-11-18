# Alert Component - Vanilla Implementation

Vanilla JavaScript/CSS implementation of the alert component.

## Files

- `alert-component.css` - Complete alert styles
- `alert-component.js` - Alert functionality
- `alert-example.html` - Standalone example

## Usage

### Include Styles and Scripts

```html
<!-- Include design system base styles -->
<link rel="stylesheet" href="../../../../styles/base.css">

<!-- Include component base styles -->
<link rel="stylesheet" href="../base/base.css">

<!-- Include vanilla implementation -->
<link rel="stylesheet" href="alert-component.css">
<script src="alert-component.js"></script>
```

### HTML

```html
<!-- Default Alert -->
<div class="alert alert-default" data-alert>
    <span class="alert-text">
        <strong>Label</strong> could be combination of weights
    </span>
    <button class="alert-close" aria-label="Close alert">
        <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="8" cy="8" r="8" fill="#5c5c5c"/>
            <g transform="translate(4 4)">
                <line x1="8" y2="8" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
                <line x2="8" y2="8" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="1.5"/>
            </g>
        </svg>
    </button>
</div>

<!-- Success Alert -->
<div class="alert alert-success" data-alert>
    <span class="alert-icon">
        <svg viewBox="0 0 16 11.428">...</svg>
    </span>
    <span class="alert-text">
        <strong>Label</strong> could be combination of weights
    </span>
    <button class="alert-close" aria-label="Close alert">...</button>
</div>

<!-- Attention Alert -->
<div class="alert alert-attention" data-alert>
    <span class="alert-icon">
        <svg viewBox="0 0 18.444 16.989">...</svg>
    </span>
    <span class="alert-text">
        <strong>Label</strong> could be combination of weights
    </span>
    <button class="alert-close" aria-label="Close alert">...</button>
</div>
```

### Listening for Close Events

```javascript
const alert = document.querySelector('.alert');
alert.addEventListener('alertClose', function(e) {
    console.log('Alert closed:', e.detail.alert);
});
```

## API

### `initAlert(alertElement)`

Initializes an alert element.

**Parameters:**
- `alertElement` (HTMLElement) - The alert container element

**Example:**
```javascript
const alert = document.querySelector('.alert');
initAlert(alert);
```

### `initAllAlerts()`

Automatically initializes all alerts on the page that have the `data-alert` attribute or `.alert` class.

This is called automatically when the DOM is ready, but you can also call it manually if you add alerts dynamically.

## Accessibility

The component includes:
- ARIA labels on close buttons
- Keyboard support (Enter/Space on close button)
- Focus management
- Semantic HTML structure

## Dependencies

- Design system base styles (`styles/base.css`)
- Component base styles (`base/base.css`)
- Clear icon (`icons/icon-core-clear.svg`)
- Check icon (for success variant)
- Warning icon (for attention variant)

## See Also

- [Main Component README](../README.md)
- [PrimeNG Angular Implementation](../primeng-angular/README.md)
- [Kendo Angular Implementation](../kendo-angular/README.md)
- [Kendo React Implementation](../kendo-react/README.md)

