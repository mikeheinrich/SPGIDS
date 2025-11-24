# Text Input Component

A text input component with two layout options (stack and inline) and multiple states (empty, filled, error, disabled). Includes clear icon functionality for filled inputs.

## Features

- **Two Layout Options:**
  - Stack layout: Label above input field
  - Inline layout: Label to the left, right-aligned
  
- **Multiple States:**
  - Empty state: Default with italic lighter hint text
  - Filled state: Input with value and clear icon
  - Error state: Orange border with error message
  - Disabled state: Gray background, non-editable

- **Clear Icon:** Automatically appears when input has a value
- **Accessibility:** Proper label associations and ARIA attributes

## Usage

### Basic HTML Structure - Stack Layout

```html
<div class="text-input-group text-input-group--stack">
    <label class="text-input-label" for="input-id">Label</label>
    <div class="text-input-wrapper">
        <input type="text" class="text-input" id="input-id" placeholder="Hint text">
    </div>
</div>
```

### Inline Layout

```html
<div class="text-input-group text-input-group--inline">
    <label class="text-input-label" for="input-id">Label</label>
    <div class="text-input-wrapper">
        <input type="text" class="text-input" id="input-id" placeholder="Hint text">
    </div>
</div>
```

### Error State

```html
<div class="text-input-group text-input-group--stack">
    <label class="text-input-label" for="input-id">Label</label>
    <div class="text-input-wrapper">
        <input type="text" class="text-input text-input--error" id="input-id" value="Invalid input">
    </div>
    <span class="text-input-error-message">Error message here</span>
</div>
```

### Disabled State

```html
<div class="text-input-group text-input-group--stack">
    <label class="text-input-label" for="input-id">Label</label>
    <div class="text-input-wrapper">
        <input type="text" class="text-input" id="input-id" placeholder="Hint text" disabled>
    </div>
</div>
```

## JavaScript API

### Auto-initialization

The component automatically initializes all `.text-input` elements on page load. The clear icon will appear/disappear based on input value.

### Manual Initialization

```javascript
// Initialize a specific input
const textInput = initTextInput('#my-input', {
    onClear: function(input) {
        console.log('Input cleared:', input);
    }
});

// Clear programmatically
textInput.clear();

// Update clear button visibility
textInput.update();
```

### `initTextInput(inputSelector, options)`

Initializes a text input with clear icon functionality.

**Parameters:**
- `inputSelector` (string|HTMLElement, required) - CSS selector or element for the input
- `options` (object, optional) - Configuration options
  - `onClear` (function, optional) - Callback fired when input is cleared

**Returns:** Object with methods:
- `clear()` - Clear the input value
- `update()` - Update clear button visibility
- `input` - The input element
- `clearButton` - The clear button element

## CSS Classes

### Layout Classes
- `.text-input-group` - Main container
- `.text-input-group--stack` - Stack layout (label above)
- `.text-input-group--inline` - Inline layout (label to left)

### Element Classes
- `.text-input-label` - Label element
- `.text-input-wrapper` - Input wrapper (for clear icon positioning)
- `.text-input` - Input field
- `.text-input--error` - Error state modifier
- `.text-input-clear` - Clear icon button
- `.text-input-clear.visible` - Visible clear button
- `.text-input-error-message` - Error message text

## States

### Empty State
- Placeholder text in italic, lighter color
- Default border color (gray)
- No clear icon

### Filled State
- User-entered text in normal color
- Clear icon appears on the right
- Clear icon has hover state

### Error State
- Orange border (`var(--color-attention)`)
- Error message displayed below input
- Clear icon still functional

### Disabled State
- Gray background (`var(--color-gray-1)`)
- Gray border and text
- No clear icon
- Cursor: not-allowed

## Specifications

- **Font:** Akkurat LL (via `var(--font-primary)`)
- **Font Size:** 1.4rem (14px) via `var(--text-paragraph)`
- **Input Height:** 32px
- **Border Radius:** 2px (`var(--radius-sm)`)
- **Border Color (Default):** `var(--color-gray-2)`
- **Border Color (Focus):** `var(--color-primary)`
- **Border Color (Error):** `var(--color-attention)` (#C56C00)
- **Placeholder:** Italic, `var(--color-gray-n)` with 0.8 opacity
- **Clear Icon:** 16px × 16px, appears when input has value

## Browser Support

- Modern browsers with CSS variables support
- Flexbox support required
- JavaScript ES5+ for clear icon functionality

## Dependencies

- `styles/base.css` - Design system base styles and CSS variables
- `components/text-input-component/base/base.css` - Base component styles
- `components/text-input-component/vanilla/text-input-component.css` - Vanilla implementation styles
- `components/text-input-component/vanilla/text-input-component.js` - Clear icon functionality

## Examples

See `text-input-example.html` for complete examples of all layouts and states.




