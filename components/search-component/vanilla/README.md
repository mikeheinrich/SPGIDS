# Search Component

A search input component with typeahead/autocomplete functionality. Available in primary (red underline) and secondary (gray underline) variants.

## Features

- Primary and secondary variants
- Typeahead/autocomplete dropdown
- Clear button (appears when text is entered)
- Keyboard navigation (arrow keys, enter, escape)
- Customizable data source
- Callback support for selection and search events

## Usage

### Basic HTML Structure

```html
<div id="search-container"></div>

<script>
    initSearch({
        containerId: 'search-container',
        variant: 'primary',
        data: ['Apple', 'Banana', 'Cherry'],
        onSelect: function(value) {
            console.log('Selected:', value);
        }
    });
</script>
```

### Secondary Variant

```html
<script>
    initSearch({
        containerId: 'search-container',
        variant: 'secondary',
        data: ['Item 1', 'Item 2', 'Item 3']
    });
</script>
```

### With Custom Data

```html
<script>
    initSearch({
        containerId: 'search-container',
        variant: 'primary',
        data: [
            { label: 'Apple', value: 'apple' },
            { label: 'Banana', value: 'banana' },
            { label: 'Cherry', value: 'cherry' }
        ],
        onSelect: function(value) {
            console.log('Selected:', value);
        },
        onSearch: function(query, results) {
            console.log('Searching for:', query);
            console.log('Results:', results);
        }
    });
</script>
```

## API

### `initSearch(options)`

Initializes a search component.

**Parameters:**
- `containerId` (string, required) - ID of the container element
- `variant` (string, optional) - 'primary' (red underline) or 'secondary' (gray underline). Default: 'primary'
- `data` (array, optional) - Array of strings or objects with `label` and `value` properties. Default: built-in sample data
- `onSelect` (function, optional) - Callback fired when a typeahead item is selected
- `onSearch` (function, optional) - Callback fired on search input (query, results)
- `placeholder` (string, optional) - Placeholder text. Default: 'Search'

## CSS Classes

- `.search-container` - Main container
- `.search-input-wrapper` - Input wrapper
- `.search-input-wrapper--primary` - Primary variant (red underline)
- `.search-input-wrapper--secondary` - Secondary variant (gray underline)
- `.search-input-wrapper.focused` - Focused state
- `.search-input` - Input field
- `.search-icons` - Icons container
- `.clear-icon` - Clear button
- `.search-icon` - Search icon
- `.search-typeahead` - Typeahead dropdown
- `.search-typeahead-item` - Typeahead item
- `.search-typeahead-item.highlighted` - Highlighted item (keyboard navigation)

## Specifications

- **Font:** Akkurat LL (via `var(--font-primary)`)
- **Font Size:** 1.4rem (14px) via `var(--text-paragraph)`
- **Font Style:** Italic for placeholder
- **Primary Underline:** Red (#d6002a) via `var(--color-brand)`
- **Secondary Underline:** Gray (#5c5c5c) via `var(--color-gray-4)`
- **Height:** 32px
- **Width:** Flexible (max 325px default)

## Keyboard Navigation

- **Arrow Down:** Navigate down in typeahead
- **Arrow Up:** Navigate up in typeahead
- **Enter:** Select highlighted item
- **Escape:** Close typeahead and blur input

## Dependencies

- Design system base styles (`styles/base.css`)
- CSS variables for colors and fonts

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- CSS Variables support required




