# Prefilter Primary Search Component

A search input component with an integrated prefilter dropdown for the S&P Global Design System.

## Overview

The prefilter primary search component combines a search input field with a prefilter dropdown selector. This allows users to select a search context (e.g., "CLM Pro" or "Snowflake") before performing their search.

## Features

- **Integrated Prefilter Dropdown**: Select search context before searching
- **Primary Search Input**: Main search field with search icon
- **Red Brand Underline**: Distinctive red line spanning the entire component
- **Customizable Options**: Configurable prefilter dropdown options
- **Event Callbacks**: Support for prefilter change and search events
- **Keyboard Support**: Enter key to trigger search
- **Debounced Search**: Automatic debouncing for search input (300ms)

## Multi-Library Support

This component is structured to support multiple front-end libraries:

- **Vanilla** - Pure JavaScript/CSS implementation (available now)
- **PrimeNG Angular** - PrimeNG implementation for Angular (coming soon)
- **Kendo Angular** - Kendo UI for Angular implementation (coming soon)
- **Kendo React** - Kendo UI for React implementation (coming soon)

## Component Structure

```
prefilter-primary-search-component/
├── base/                    # Shared base styles
│   └── base.css            # Base styles used by all implementations
├── vanilla/                 # Vanilla implementation
│   ├── prefilter-primary-search-component.css
│   ├── prefilter-primary-search-component.js
│   ├── prefilter-primary-search-example.html
│   └── README.md
├── primeng-angular/         # PrimeNG Angular implementation
│   └── README.md
├── kendo-angular/          # Kendo Angular implementation
│   └── README.md
├── kendo-react/            # Kendo React implementation
│   └── README.md
├── component.json           # Component manifest
└── README.md                # This file
```

## Quick Start

### Vanilla Implementation

See [Vanilla Implementation README](vanilla/README.md) for details.

```html
<!-- Include design system base styles -->
<link rel="stylesheet" href="../../styles/base.css">

<!-- Include component base styles -->
<link rel="stylesheet" href="base/base.css">

<!-- Include vanilla implementation -->
<link rel="stylesheet" href="vanilla/prefilter-primary-search-component.css">
<script src="vanilla/prefilter-primary-search-component.js"></script>
```

```html
<!-- Add a container div -->
<div id="prefilter-search-container"></div>

<script>
    initPrefilterPrimarySearch({
        containerId: 'prefilter-search-container',
        placeholder: 'Search by Legal Name, LEI, Entity ID, RFO ID...',
        defaultPrefilter: 'CLM Pro',
        options: ['CLM Pro', 'Snowflake']
    });
</script>
```

## Specifications

- **Height**: 32.5px (including red underline)
- **Prefilter Width**: 120px (adjustable)
- **Search Input**: Flexible width
- **Underline**: 2px solid red (#d6002a)
- **Font**: Akkurat LL, 14px
- **Border Radius**: 4px (dropdown menu)

## Features

### Prefilter Dropdown
- Clickable button to open dropdown menu
- Customizable options list
- Visual feedback on hover
- Click outside to close

### Search Input
- Placeholder text support
- Search icon on the right
- Italic placeholder styling
- Keyboard support (Enter key)

### Red Underline
- Spans entire component width
- Brand color (#d6002a)
- 2px height
- Always visible

## JavaScript API

- `initPrefilterPrimarySearch(options)` - Initialize component in a container
- `createPrefilterPrimarySearch(options)` - Create component HTML string

## Options

- `containerId` - Container element ID
- `placeholder` - Search input placeholder text
- `defaultPrefilter` - Default selected prefilter option
- `options` - Array of prefilter dropdown options
- `onPrefilterChange` - Callback for prefilter selection changes
- `onSearch` - Callback for search queries (debounced 300ms)

## Browser Support

- Modern browsers with CSS Variables support
- Flexbox support required
- JavaScript ES5+ support

## Dependencies

- Design system base styles (`styles/base.css`)
- Component base styles (`base/base.css`)
- CSS variables for colors, spacing, and fonts

## See Also

- [Vanilla Implementation](vanilla/README.md)
- [PrimeNG Angular Implementation](primeng-angular/README.md)
- [Kendo Angular Implementation](kendo-angular/README.md)
- [Kendo React Implementation](kendo-react/README.md)




