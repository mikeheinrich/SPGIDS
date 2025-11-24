# Modal Component - Vanilla Implementation

Vanilla JavaScript/CSS implementation of the modal component with overlay, header, and shadow effect.

## Files

- `modal-component.css` - Complete modal styles with shadow effect
- `modal-component.js` - Modal functionality (open, close, create)
- `modal-example.html` - Standalone example

## Usage

### Include Styles and Scripts

```html
<!-- Include design system base styles -->
<link rel="stylesheet" href="../../../../styles/base.css">

<!-- Include component base styles -->
<link rel="stylesheet" href="../base/base.css">

<!-- Include vanilla implementation -->
<link rel="stylesheet" href="modal-component.css">
<script src="modal-component.js"></script>
```

### HTML

```html
<!-- Basic Modal -->
<div class="modal-overlay" id="myModal">
    <div class="modal">
        <div class="modal-header">
            <h2 class="modal-title">Modal title</h2>
            <button class="modal-close" aria-label="Close modal" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                    <path d="M12.854 3.146a.5.5 0 0 0-.708 0L8 7.293 3.854 3.146a.5.5 0 1 0-.708.708L7.293 8l-4.147 4.146a.5.5 0 0 0 .708.708L8 8.707l4.146 4.147a.5.5 0 0 0 .708-.708L8.707 8l4.147-4.146a.5.5 0 0 0 0-.708z" fill="currentColor"/>
                </svg>
            </button>
        </div>
        <div class="modal-content">
            <p>Modal content here</p>
        </div>
    </div>
</div>

<script>
    // Initialize modal
    initModal('myModal');
    
    // Open modal
    openModal('myModal');
    
    // Close modal
    closeModal('myModal');
</script>
```

### Programmatic Creation

```javascript
// Create and open a modal programmatically
const modal = createModal({
    title: 'Modal title',
    content: '<p>Modal content here</p>',
    onOpen: function() {
        console.log('Modal opened');
    },
    onClose: function() {
        console.log('Modal closed');
    }
});

openModal(modal);
```

## API

### `initModal(modalElement)`

Initializes a modal element with event handlers.

**Parameters:**
- `modalElement` (HTMLElement|string) - The modal overlay element or its ID

**Example:**
```javascript
initModal('myModal');
// or
const modal = document.getElementById('myModal');
initModal(modal);
```

### `openModal(modalElement)`

Opens a modal by adding the `active` class.

**Parameters:**
- `modalElement` (HTMLElement|string) - The modal overlay element or its ID

**Example:**
```javascript
openModal('myModal');
```

### `closeModal(modalElement)`

Closes a modal by removing the `active` class.

**Parameters:**
- `modalElement` (HTMLElement|string) - The modal overlay element or its ID

**Example:**
```javascript
closeModal('myModal');
```

### `createModal(options)`

Creates a modal programmatically.

**Parameters:**
- `options` (Object) - Modal options
  - `title` (string) - Modal title (default: 'Panel title')
  - `content` (string) - Modal content HTML (default: '')
  - `containerId` (string) - Container ID to append modal to (default: body)
  - `modalId` (string) - Modal overlay ID (default: auto-generated)
  - `onOpen` (Function) - Callback when modal opens
  - `onClose` (Function) - Callback when modal closes

**Returns:** HTMLElement - The created modal overlay element

**Example:**
```javascript
const modal = createModal({
    title: 'My Modal',
    content: '<p>Content here</p>',
    onOpen: () => console.log('Opened'),
    onClose: () => console.log('Closed')
});
```

## CSS Classes

### `.modal-overlay`
Modal backdrop/overlay that covers the entire viewport.

**Properties:**
- Fixed position covering full viewport
- Semi-transparent black background (rgba(0, 0, 0, 0.5))
- Centered using flexbox
- Hidden by default, shown with `.active` class

### `.modal`
Modal container with shadow effect.

**Properties:**
- White background (`var(--color-white)`)
- Gray border (`#ccc`, 1px solid)
- Shadow effect matching SVG filter specifications
- Fixed dimensions: 639.133px × 346.5px (default)

### `.modal-header`
Header section with title and close button.

**Properties:**
- Flexbox layout
- Padding: `var(--spacing-md) var(--spacing-lg)`
- Border bottom: 1px solid #ccc

### `.modal-title`
Modal title text.

**Properties:**
- Font: `var(--font-primary)`
- Size: `var(--text-paragraph)`
- Color: `var(--color-brand)` (red #d6002a)

### `.modal-close`
Close button in header.

**Properties:**
- 16px × 16px
- Gray color (`var(--color-gray-4)`)
- Hover opacity: 0.7

### `.modal-content`
Content area below header.

**Properties:**
- Flexible height
- Padding: `var(--spacing-lg)`
- Overflow-y: auto (scrollable if content exceeds height)

## Events

### `modalOpen`

Dispatched when a modal is opened.

```javascript
modal.addEventListener('modalOpen', function(e) {
    console.log('Modal opened:', e.detail.modal);
});
```

### `modalClose`

Dispatched when a modal is closed.

```javascript
modal.addEventListener('modalClose', function(e) {
    console.log('Modal closed:', e.detail.modal);
});
```

## Behavior

- **Close on Escape:** Press Escape key to close active modal
- **Close on Overlay Click:** Click outside modal (on overlay) to close
- **Close Button:** Click X button in header to close
- **Body Scroll Lock:** Body scrolling is disabled when modal is open
- **Smooth Animations:** Fade in/out for overlay, scale animation for modal

## Shadow Effect

The modal shadow is based on the SVG filter specifications:
- **Offset:** 1.5px vertical
- **Blur:** 1.5px (Gaussian blur)
- **Color:** `rgba(138, 143, 149, 0.902)` (#8a8f95 with 90.2% opacity)

This is implemented using CSS `box-shadow`:
```css
box-shadow: 0 1.5px 3px rgba(138, 143, 149, 0.902);
```

## Specifications

- **Background:** White (`#fff`)
- **Border:** Gray (`#ccc`, 1px solid)
- **Shadow:** Gray shadow with 90.2% opacity
- **Dimensions:** 639.133px × 346.5px (default)
- **Title Color:** Red (`var(--color-brand)` = #d6002a)
- **Overlay:** Semi-transparent black (rgba(0, 0, 0, 0.5))

## Dependencies

- Design system base styles (`styles/base.css`)
- Component base styles (`base/base.css`)
- CSS variables for colors, spacing, and fonts

## See Also

- [Main Component README](../README.md)
- [PrimeNG Angular Implementation](../primeng-angular/README.md)
- [Kendo Angular Implementation](../kendo-angular/README.md)
- [Kendo React Implementation](../kendo-react/README.md)
