# Pod Component - Vanilla Implementation

Vanilla JavaScript/CSS implementation of the pod component - a removable chip/tag with rounded pill shape.

## Overview

The pod component provides a removable chip/tag element with a rounded pill shape. It displays text content and includes a remove button (X icon) for dismissing the pod.

## Features

- **Rounded Pill Shape**: 16px border radius for pill appearance
- **Remove Button**: Circular gray button with white X icon
- **Hover States**: Remove button changes color on hover
- **Accessible**: Proper ARIA labels and keyboard support
- **Customizable**: Configurable text and remove callbacks

## Quick Start

### 1. Include CSS

```html
<!-- Include design system base styles -->
<link rel="stylesheet" href="../../../../styles/base.css">

<!-- Include component base styles -->
<link rel="stylesheet" href="../base/base.css">

<!-- Include vanilla implementation -->
<link rel="stylesheet" href="pod-component.css">
```

### 2. Include JavaScript

```html
<script src="pod-component.js"></script>
```

### 3. Create Pods

```javascript
// Single pod
initPod('pod-container', {
    text: 'Series A',
    onRemove: function(text, container) {
        console.log('Removed:', text);
    }
});

// Multiple pods
const podItems = ['Series A', 'Series B', 'Series C'];
document.getElementById('pods-container').innerHTML = createPods(podItems, function(text) {
    console.log('Removed:', text);
});
```

## API

### `createPod(text, onRemove, id)`

Creates a pod HTML string.

**Parameters:**
- `text` (string) - Text content of the pod
- `onRemove` (function, optional) - Callback when remove button is clicked
- `id` (string, optional) - Unique ID for the pod

**Returns:** HTML string

### `initPod(containerId, options)`

Initializes a pod in a container element.

**Parameters:**
- `containerId` (string) - ID of container element
- `options` (object):
  - `text` (string) - Text content
  - `onRemove` (function) - Callback when removed

### `createPods(items, onRemove)`

Creates multiple pods.

**Parameters:**
- `items` (array) - Array of strings or objects with `text` property
- `onRemove` (function, optional) - Callback when any pod is removed

**Returns:** HTML string with multiple pods

## Styling

The component uses CSS variables from the design system:

- `--color-gray-bg`: Background color (#f8f8f8)
- `--color-gray-2`: Border color (#cccccc)
- `--color-gray-4`: Remove button color (#5c5c5c)
- `--color-gray-5`: Text and hover color (#1a1a1a)
- `--color-white`: X icon color
- `--font-primary`: Font family
- `--text-paragraph`: Font size (14px)

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



