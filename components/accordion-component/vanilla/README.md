# Accordion Component - Vanilla Implementation

Vanilla JavaScript/CSS implementation of the accordion component.

## Files

- `accordion-component.css` - Complete accordion styles
- `accordion-component.js` - Accordion functionality
- `accordion-example.html` - Standalone example

## Usage

### Include Styles and Scripts

```html
<!-- Include design system base styles -->
<link rel="stylesheet" href="../../../../styles/base.css">

<!-- Include component base styles -->
<link rel="stylesheet" href="../base/base.css">

<!-- Include vanilla implementation -->
<link rel="stylesheet" href="accordion-component.css">
<script src="accordion-component.js"></script>
```

### HTML

```html
<!-- Basic accordion with auto-initialization -->
<div class="accordion" data-accordion>
    <button class="accordion-header">
        <span>Accordion Light</span>
        <span class="accordion-icon">
            <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 0L14 7L7 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </span>
    </button>
    <div class="accordion-content">
        <div class="accordion-content-inner">
            Content goes here
        </div>
    </div>
</div>

<!-- Accordion opened by default -->
<div class="accordion active" data-accordion>
    <button class="accordion-header active">
        <span>Open Accordion</span>
        <span class="accordion-icon">
            <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 0L14 7L7 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </span>
    </button>
    <div class="accordion-content">
        <div class="accordion-content-inner">
            This accordion starts open
        </div>
    </div>
</div>

<!-- Manual initialization -->
<div class="accordion" id="myAccordion">
    <button class="accordion-header">
        <span>Manual Accordion</span>
        <span class="accordion-icon">
            <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 0L14 7L7 14" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        </span>
    </button>
    <div class="accordion-content">
        <div class="accordion-content-inner">
            Content
        </div>
    </div>
</div>

<script>
    const accordion = document.getElementById('myAccordion');
    initAccordion(accordion);
</script>
```

### Listening for Changes

```javascript
const accordion = document.querySelector('.accordion');
accordion.addEventListener('accordionToggle', function(e) {
    console.log('Accordion is open:', e.detail.isOpen);
    console.log('Accordion element:', e.detail.accordion);
    console.log('Header:', e.detail.header);
    console.log('Content:', e.detail.content);
});
```

## API

### `initAccordion(accordionElement)`

Initializes an accordion element.

**Parameters:**
- `accordionElement` (HTMLElement) - The accordion container element

**Example:**
```javascript
const accordion = document.querySelector('.accordion');
initAccordion(accordion);
```

### `initAllAccordions()`

Automatically initializes all accordions on the page that have the `data-accordion` attribute or `.accordion` class.

This is called automatically when the DOM is ready, but you can also call it manually if you add accordions dynamically.

## Keyboard Navigation

- **Enter**: Toggle accordion
- **Space**: Toggle accordion

## Accessibility

The component includes:
- ARIA expanded states (`aria-expanded`)
- ARIA controls (`aria-controls`)
- Role attributes (`role="region"`)
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

