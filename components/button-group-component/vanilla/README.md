# Button Group Component - Vanilla Implementation

Vanilla JavaScript/CSS implementation of the button group component.

## Files

- `button-group-component.css` - Complete button group styles
- `button-group-component.js` - Button group functionality
- `button-group-example.html` - Standalone example

## Usage

### Include Styles and Scripts

```html
<!-- Include design system base styles -->
<link rel="stylesheet" href="../../../../styles/base.css">

<!-- Include component base styles -->
<link rel="stylesheet" href="../base/base.css">

<!-- Include vanilla implementation -->
<link rel="stylesheet" href="button-group-component.css">
<script src="button-group-component.js"></script>
```

### HTML

```html
<!-- Basic button group with auto-initialization -->
<div class="btn-group" data-button-group>
    <button class="btn-group-item active">Button 1</button>
    <button class="btn-group-item">Button 2</button>
    <button class="btn-group-item">Button 3</button>
</div>

<!-- Manual initialization -->
<div class="btn-group" id="myButtonGroup">
    <button class="btn-group-item active">Option 1</button>
    <button class="btn-group-item">Option 2</button>
</div>

<script>
    const group = document.getElementById('myButtonGroup');
    initButtonGroup(group);
</script>
```

### Listening for Changes

```javascript
const buttonGroup = document.querySelector('.btn-group');
buttonGroup.addEventListener('buttonGroupChange', function(e) {
    console.log('Selected index:', e.detail.selectedIndex);
    console.log('Selected button:', e.detail.selectedButton);
    console.log('Selected text:', e.detail.selectedText);
});
```

## API

### `initButtonGroup(groupElement)`

Initializes a button group element.

**Parameters:**
- `groupElement` (HTMLElement) - The button group container element

**Example:**
```javascript
const group = document.querySelector('.btn-group');
initButtonGroup(group);
```

### `initAllButtonGroups()`

Automatically initializes all button groups on the page that have the `data-button-group` attribute or `.btn-group` class.

This is called automatically when the DOM is ready, but you can also call it manually if you add button groups dynamically.

## Keyboard Navigation

- **Arrow Left/Up**: Select previous button
- **Arrow Right/Down**: Select next button
- **Home**: Select first button
- **End**: Select last button

## Accessibility

The component includes:
- ARIA roles (`role="tablist"` and `role="tab"`)
- ARIA selected states (`aria-selected`)
- Keyboard navigation support
- Focus management

## Dependencies

- Design system base styles (`styles/base.css`)
- Component base styles (`base/base.css`)

## See Also

- [Main Component README](../README.md)
- [PrimeNG Angular Implementation](../primeng-angular/README.md)
- [Kendo Angular Implementation](../kendo-angular/README.md)
- [Kendo React Implementation](../kendo-react/README.md)

