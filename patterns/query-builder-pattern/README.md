# Query Builder Pattern

A 3-column pattern for building queries by selecting attributes across multiple categories.

## Overview

The Query Builder pattern provides a comprehensive interface for selecting attributes across multiple categories. It consists of three columns:

1. **Category List** (Left) - Displays available categories using the list-group component
2. **Attributes** (Center) - Shows selectable attributes for the current category with search functionality
3. **Summary** (Right) - Displays selected attributes grouped by category with removal capability

## Features

- Category navigation using list-group component (left column)
- Secondary search component for filtering attributes (center column)
- Checkbox selection moves attributes from center to right column
- Real-time summary of selections grouped by category
- Tag-based summary with individual removal (moves items back to center)
- Multiple selections allowed

## Usage

### Basic Setup

```html
<!-- Include CSS -->
<link rel="stylesheet" href="components/list-group-component/base/base.css">
<link rel="stylesheet" href="components/list-group-component/vanilla/list-group-component.css">
<link rel="stylesheet" href="components/search-component/base/base.css">
<link rel="stylesheet" href="components/search-component/vanilla/search-component.css">
<link rel="stylesheet" href="patterns/query-builder-pattern/vanilla/query-builder-pattern.css">

<!-- Include JavaScript -->
<script src="components/list-group-component/vanilla/list-group-component.js"></script>
<script src="components/search-component/vanilla/search-component.js"></script>
<script src="patterns/query-builder-pattern/vanilla/query-builder-pattern.js"></script>

<!-- Container -->
<div id="query-builder-container"></div>

<!-- Initialize -->
<script>
    initQueryBuilder({
        containerId: 'query-builder-container',
        categories: {
            'Deal Size': ['Seed Stage', 'Series A', 'Series B', 'Series C'],
            'Technology': ['Software', 'Hardware', 'AI/ML', 'Fintech'],
            'Healthcare': ['Pharmaceuticals', 'Medical Devices', 'Digital Health']
        }
    });
</script>
```

### Configuration Options

```javascript
initQueryBuilder({
    // Required
    containerId: 'query-builder-container',
    categories: {
        'Category Name': ['Attribute 1', 'Attribute 2', ...]
    },
    
    // Optional
    selectedAttributes: {
        'Category Name': ['Attribute 1', 'Attribute 2']
    },
    title: 'Manage Attributes',
    summaryTitle: 'Summary',
    searchPlaceholder: 'Search...',
    noFiltersText: 'No filters selected',
    noResultsText: 'No filters found'
});
```

## Behavior

- **Left Column**: Displays categories using the list-group component. Clicking a category shows its attributes in the center column.
- **Center Column**: Shows available attributes for the selected category. Uses the secondary search component for filtering. Clicking a checkbox moves the attribute to the right column (summary) and removes it from the center.
- **Right Column**: Displays selected attributes grouped by category. Clicking the X button on a tag removes it from the summary and moves it back to the center column.

## API

### Functions

#### `initQueryBuilder(options)`

Initializes a new query builder instance.

**Parameters:**
- `options.containerId` (string, required) - ID of the container element
- `options.categories` (object, required) - Object with category names as keys and arrays of attributes as values
- `options.selectedAttributes` (object, optional) - Initial selected attributes
- `options.title` (string, optional) - Title for the query builder (default: "Manage Attributes")
- `options.summaryTitle` (string, optional) - Title for summary section (default: "Summary")
- `options.searchPlaceholder` (string, optional) - Placeholder for search input (default: "Search...")
- `options.noFiltersText` (string, optional) - Text when no filters selected (default: "No filters selected")
- `options.noResultsText` (string, optional) - Text when no results found (default: "No filters found")

#### `getSelectedAttributes(containerId)`

Gets the currently selected attributes.

**Parameters:**
- `containerId` (string) - ID of the container element

**Returns:** Object with category names as keys and arrays of selected attributes as values

## Dependencies

- List Group Component (`list-group-component`)
- Search Component (`search-component`)

## Structure

```
patterns/
  query-builder-pattern/
    vanilla/
      query-builder-pattern.css
      query-builder-pattern.js
    README.md
```

## Styling

The pattern uses design system tokens for colors, spacing, and typography. Customization can be done by overriding CSS variables or modifying the component CSS.

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled

