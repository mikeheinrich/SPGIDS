# List Group Component - Vanilla Implementation

A simple, flat list of selectable items for the S&P Global Design System. This component is based on the left navigation component but simplified to remove hierarchy - it's just a straightforward list of items.

## Features

- Simple flat list (no hierarchy)
- Active state management with visual indicator
- Hover effects
- Optional dividers between items
- Red accent bar for active items
- Customizable selection callbacks
- Disabled item support
- Keyboard navigation support (Enter/Space)
- ARIA attributes for accessibility

## Installation

1. Include the design system base styles in your `<head>`:
```html
<link rel="stylesheet" href="../../styles/base.css">
```

2. Include the list group component CSS:
```html
<link rel="stylesheet" href="list-group-component.css">
```

3. Include the list group component JavaScript before the closing `</body>` tag:
```html
<script src="list-group-component.js"></script>
```

## Basic Usage

### HTML Structure

```html
<nav class="list-group" id="list-group-container">
    <ul class="list-group-list" id="listGroupList"></ul>
</nav>
```

### JavaScript Initialization

```javascript
initListGroup({
    containerId: 'list-group-container',
    listId: 'listGroupList',
    items: [
        { id: '1', name: 'Item One' },
        { id: '2', name: 'Item Two' },
        { id: '3', name: 'Item Three' }
    ]
});
```

## Options

The `initListGroup()` function accepts an options object with the following properties:

### `containerId` (optional)
ID of the container element. Defaults to `'list-group-container'`.

### `listId` (optional)
ID of the list element. Defaults to `'listGroupList'`.

### `items` (required)
Array of item objects. Each item should have:
- `id` (string, required): Unique identifier for the item
- `name` (string, required): Display text for the item
- `disabled` (boolean, optional): Whether the item is disabled

Example:
```javascript
items: [
    { id: '1', name: 'First Item' },
    { id: '2', name: 'Second Item', disabled: true },
    { id: '3', name: 'Third Item' }
]
```

### `onItemSelect` (optional)
Callback function that is called when an item is selected. Receives two parameters:
- `id` (string): The ID of the selected item
- `item` (object): The full item object

Example:
```javascript
onItemSelect: function(id, item) {
    console.log('Selected:', id, item.name);
    // Do something with the selection
}
```

### `initialSelection` (optional)
ID of the item that should be selected initially. If not provided, the first non-disabled item will be selected by default.

Example:
```javascript
initialSelection: '2'
```

### `showDividers` (optional)
Whether to show dividers between items. Defaults to `true`.

Example:
```javascript
showDividers: false
```

## API Methods

### `selectItem(instanceId, id)`
Programmatically select an item by its ID. Requires the container ID (instanceId).

```javascript
selectItem('list-group-container', '2');
```

### `getSelectedItem(instanceId)`
Get the currently selected item object, or `null` if nothing is selected. Requires the container ID.

```javascript
const selected = getSelectedItem('list-group-container');
if (selected) {
    console.log(selected.name);
}
```

### `getSelectedName(instanceId)`
Get the name of the currently selected item, or an empty string if nothing is selected. Requires the container ID.

```javascript
const name = getSelectedName('list-group-container');
```

### `updateListGroupItems(instanceId, newItems)`
Update the list group with new items. This will rebuild the entire list. Requires the container ID.

```javascript
updateListGroupItems('list-group-container', [
    { id: '1', name: 'New Item One' },
    { id: '2', name: 'New Item Two' }
]);
```

## Styling

The component uses CSS variables from the design system base styles. Key variables used:

- `--color-gray-bg`: Background color (#f8f8f8)
- `--color-gray-1`: Border and divider color (#eeeeee)
- `--color-brand`: Active item accent bar and text color (#d6002a)
- `--color-primary`: Focus outline color (#006d89)
- `--color-gray-n`: Disabled text color (#999999)
- `--font-primary`: Font family ('Akkurat LL')

## Accessibility

The component includes proper ARIA attributes:
- `role="listbox"` on the list container
- `role="option"` on each list item
- `aria-selected` to indicate selection state
- `aria-disabled` for disabled items
- `aria-activedescendant` to indicate the active item
- Keyboard support (Enter and Space keys)

## Examples

See `list-group-example.html` for complete working examples including:
- Basic list group
- List group with initial selection
- List group with disabled items
- List group without dividers
- List group with selection callback

## Browser Support

- Modern browsers with CSS variables support
- Flexbox support required
- ES5 JavaScript (no transpilation needed)

## Differences from Left Nav Component

This component is a simplified version of the left navigation component:
- **No hierarchy**: Removed GP/Fund structure - just a flat list
- **Simpler data structure**: Items are just `{ id, name, disabled? }` instead of nested GP/Fund structure
- **No GP ID tracking**: Removed `getGPId()` function since there's no hierarchy
- **Cleaner API**: Simplified function signatures and options

