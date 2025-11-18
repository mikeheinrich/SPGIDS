# Header Component - Vanilla Implementation

Vanilla JavaScript/CSS implementation of the header component.

## Files

- `header-component.css` - Complete header styles
- `header-component.js` - Header functionality
- `header-example.html` - Standalone example

## Usage

### Include Styles and Scripts

```html
<!-- Include design system base styles -->
<link rel="stylesheet" href="../../../../styles/base.css">

<!-- Include component base styles -->
<link rel="stylesheet" href="../base/base.css">

<!-- Include vanilla implementation -->
<link rel="stylesheet" href="header-component.css">
<script src="header-component.js"></script>
```

### HTML

```html
<div id="header-container"></div>
<div id="header-panels-container"></div>
```

### JavaScript

```javascript
initHeader({
    productName: 'My Product',
    userInitials: 'JD',
    notificationCount: 3
});
```

## Dependencies

- Design system base styles (`styles/base.css`)
- Component base styles (`base/base.css`)

## See Also

- [Main Component README](../README.md)
- [PrimeNG Angular Implementation](../primeng-angular/README.md)
- [Kendo Angular Implementation](../kendo-angular/README.md)
- [Kendo React Implementation](../kendo-react/README.md)

