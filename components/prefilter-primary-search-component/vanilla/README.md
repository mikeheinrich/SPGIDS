# Prefilter Primary Search Component - Vanilla Implementation

Vanilla JavaScript/CSS implementation of the prefilter primary search component.

## Overview

The prefilter primary search component provides a search input field with an integrated prefilter dropdown. Users can select a prefilter option (e.g., "CLM Pro" or "Snowflake") and then perform searches within that context.

## Features

- **Prefilter Dropdown**: Clickable dropdown to select search context
- **Search Input**: Primary search field with search icon
- **Red Underline**: Brand-colored underline spanning the entire component
- **Customizable Options**: Configurable prefilter options
- **Callbacks**: Support for prefilter change and search events
- **Keyboard Support**: Enter key to trigger search

## Quick Start

### 1. Include CSS

```html
<!-- Include design system base styles -->
<link rel="stylesheet" href="../../../../styles/base.css">

<!-- Include component base styles -->
<link rel="stylesheet" href="../base/base.css">

<!-- Include vanilla implementation -->
<link rel="stylesheet" href="prefilter-primary-search-component.css">
```

### 2. Include JavaScript

```html
<script src="prefilter-primary-search-component.js"></script>
```

### 3. Add Container

```html
<div id="prefilter-search-container"></div>
```

### 4. Initialize

```javascript
initPrefilterPrimarySearch({
    containerId: 'prefilter-search-container',
    placeholder: 'Search by Legal Name, LEI, Entity ID, RFO ID...',
    defaultPrefilter: 'CLM Pro',
    options: ['CLM Pro', 'Snowflake'],
    onPrefilterChange: function(value) {
        console.log('Prefilter changed to:', value);
    },
    onSearch: function(query) {
        console.log('Search query:', query);
    }
});
```

## Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `containerId` | string | `'prefilter-search-container'` | ID of the container element |
| `placeholder` | string | `'Search'` | Placeholder text for the search input |
| `defaultPrefilter` | string | `'CLM Pro'` | Default selected prefilter option |
| `options` | array | `['CLM Pro', 'Snowflake']` | Array of prefilter dropdown options |
| `onPrefilterChange` | function | `null` | Callback when prefilter selection changes |
| `onSearch` | function | `null` | Callback when search is performed (debounced 300ms) |

## API

### `initPrefilterPrimarySearch(options)`

Initializes the prefilter primary search component in the specified container.

**Parameters:**
- `options` (Object): Configuration options (see Options table above)

**Example:**
```javascript
initPrefilterPrimarySearch({
    containerId: 'my-search',
    placeholder: 'Search...',
    defaultPrefilter: 'CLM Pro',
    options: ['CLM Pro', 'Snowflake'],
    onPrefilterChange: function(value) {
        // Handle prefilter change
    },
    onSearch: function(query) {
        // Handle search
    }
});
```

### `createPrefilterPrimarySearch(options)`

Creates the HTML string for the component (used internally by `initPrefilterPrimarySearch`).

## Styling

The component uses CSS variables from the design system:

- `--color-brand`: Red underline color (#d6002a)
- `--color-white`: Background color
- `--color-gray-1`: Hover background
- `--color-gray-2`: Border color
- `--color-gray-4`: Placeholder text color
- `--color-gray-5`: Text color
- `--font-primary`: Font family
- `--radius-md`: Border radius

## Browser Support

- Modern browsers with CSS Variables support
- Flexbox support required
- JavaScript ES5+ support

## Dependencies

- Design system base styles (`styles/base.css`)
- Component base styles (`base/base.css`)
- CSS variables for colors, spacing, and fonts

## See Also

- [Main Component README](../README.md)


