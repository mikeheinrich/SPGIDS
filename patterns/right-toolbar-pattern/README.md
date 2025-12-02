# Right Toolbar Pattern

A flexible vertical toolbar pattern positioned on the right side of the screen. Supports single actions, actions that open panels (flyouts), and actions that open modals.

## Overview

The Right Toolbar pattern provides a consistent interface for tool actions in applications. It features:

1. **Vertical Toolbar** - Fixed position on the right side of the screen
2. **Action Items** - Each item has an icon and text label
3. **Three Action Types**:
   - **Single Actions** - Trigger click handlers
   - **Panel Actions** - Open flyout panels to the left of the toolbar
   - **Modal Actions** - Open modal dialogs

## Features

- Fixed position vertical toolbar (50px wide)
- Icon and label for each action
- Support for single actions, panels, and modals
- Flexible configuration
- Hover and active states
- Disabled state support
- Divider lines between items
- Demo mode for component previews
- Responsive design

## Usage

### Basic Setup

```html
<!-- Include Design System Base (for CSS variables) -->
<link rel="stylesheet" href="../../../styles/base.css">

<!-- Include Modal Component CSS (if using modals) -->
<link rel="stylesheet" href="../../../components/modal-component/vanilla/modal-component.css">

<!-- Include pattern styles -->
<link rel="stylesheet" href="patterns/right-toolbar-pattern/vanilla/right-toolbar-pattern.css">

<!-- Container -->
<div id="right-toolbar-container"></div>

<!-- Include Modal Component JavaScript (if using modals) -->
<script src="components/modal-component/vanilla/modal-component.js"></script>

<!-- Include pattern JavaScript -->
<script src="patterns/right-toolbar-pattern/vanilla/right-toolbar-pattern.js"></script>

<!-- Initialize -->
<script>
    initRightToolbar({
        containerId: 'right-toolbar-container',
        items: [
            {
                id: 'share',
                label: 'Share',
                icon: 'icon-content-share-arrow',
                type: 'action',
                onClick: function(item, id) {
                    console.log('Share clicked');
                }
            }
        ]
    });
</script>
```

### Configuration Options

```javascript
initRightToolbar({
    // Required
    containerId: 'right-toolbar-container',
    
    // Required
    items: [
        {
            id: 'unique-id',                    // Required: unique identifier
            label: 'Action Name',               // Required: text label
            icon: 'icon-content-share-arrow',   // Required: icon name (without .svg) or SVG path
            iconPath: 'path/to/icon.svg',       // Optional: full path to icon (overrides icon)
            type: 'action',                     // Optional: 'action', 'panel', or 'modal' (default: 'action')
            onClick: function() {},              // Optional: click handler (for type: 'action')
            panelContent: '<div>...</div>',     // Optional: HTML content for panel (for type: 'panel')
            panelTitle: 'Panel Title',          // Optional: title for panel (for type: 'panel')
            modalContent: '<div>...</div>',      // Optional: HTML content for modal (for type: 'modal')
            modalTitle: 'Modal Title',          // Optional: title for modal (for type: 'modal')
            modalId: 'my-modal',                // Optional: ID for modal (auto-generated if not provided)
            disabled: false,                     // Optional: disable the item
            divider: true                        // Optional: show divider after item (default: true)
        }
    ],
    
    // Optional
    demoMode: false,                            // Whether in demo/preview mode (default: false)
    onItemClick: function(item, itemId) {},     // Global callback for item clicks
    onPanelOpen: function(item, itemId) {},     // Callback when panel opens
    onPanelClose: function(item, itemId) {},    // Callback when panel closes
    onModalOpen: function(item, itemId) {},     // Callback when modal opens
    onModalClose: function(item, itemId) {}     // Callback when modal closes
});
```

## Action Types

### Single Actions

Actions that trigger a click handler when clicked.

```javascript
{
    id: 'share',
    label: 'Share',
    icon: 'icon-content-share-arrow',
    type: 'action',
    onClick: function(item, id) {
        // Handle the action
        console.log('Share clicked');
    }
}
```

### Panel Actions

Actions that open a flyout panel to the left of the toolbar.

```javascript
{
    id: 'export',
    label: 'Export',
    icon: 'icon-content-download',
    type: 'panel',
    panelTitle: 'Export Options',
    panelContent: `
        <div>
            <h3>Export Options</h3>
            <p>Select export format and options.</p>
        </div>
    `
}
```

### Modal Actions

Actions that open a modal dialog.

```javascript
{
    id: 'delete',
    label: 'Delete',
    icon: 'icon-content-delete',
    type: 'modal',
    modalTitle: 'Confirm Delete',
    modalContent: `
        <div>
            <h3>Are you sure?</h3>
            <p>This action cannot be undone.</p>
        </div>
    `
}
```

## Icons

Icons can be specified in three ways:

1. **Icon Name** (recommended) - Uses icon from the design system icons directory:
   ```javascript
   icon: 'icon-content-share-arrow'  // Loads from icons/icon-content-share-arrow.svg
   ```

2. **Icon Path** - Full path to icon file:
   ```javascript
   iconPath: 'path/to/custom-icon.svg'
   ```

3. **Icon HTML** - Inline SVG HTML:
   ```javascript
   iconHTML: '<svg>...</svg>'
   ```

## API

### Functions

#### `initRightToolbar(options)`

Initializes a new right toolbar instance and returns an API object.

**Parameters:**
- `options.containerId` (string, required) - ID of the container element
- `options.items` (array, required) - Array of toolbar items
- `options.demoMode` (boolean, optional) - Whether in demo/preview mode (default: false)
- `options.onItemClick` (function, optional) - Global callback for item clicks
- `options.onPanelOpen` (function, optional) - Callback when panel opens
- `options.onPanelClose` (function, optional) - Callback when panel closes
- `options.onModalOpen` (function, optional) - Callback when modal opens
- `options.onModalClose` (function, optional) - Callback when modal closes

**Returns:** API object with the following methods:
- `getInstance()` - Returns the toolbar instance
- `openPanel(itemId)` - Opens a panel for the specified item
- `closePanel()` - Closes the active panel
- `openModal(itemId)` - Opens a modal for the specified item
- `closeModal()` - Closes the active modal
- `setItemDisabled(itemId, disabled)` - Enables/disables an item
- `updateItem(itemId, updates)` - Updates an item's properties

### Example with API Usage

```javascript
const toolbar = initRightToolbar({
    containerId: 'my-toolbar',
    items: [
        {
            id: 'share',
            label: 'Share',
            icon: 'icon-content-share-arrow',
            type: 'panel',
            panelTitle: 'Share',
            panelContent: '<div>Share options</div>'
        }
    ]
});

// Open panel programmatically
toolbar.openPanel('share');

// Close panel
toolbar.closePanel();

// Disable an item
toolbar.setItemDisabled('share', true);

// Update an item
toolbar.updateItem('share', {
    label: 'Share Item',
    disabled: false
});
```

## Behavior

- **Toolbar Position**: Fixed to the right side of the screen
- **Panel Position**: Panels appear to the left of the toolbar (320px wide)
- **Modal Position**: Modals appear centered on the screen
- **Click Outside**: Clicking outside the toolbar and panel closes the panel (when not in demo mode)
- **Escape Key**: Pressing Escape closes modals (if modal component is included)
- **Hover States**: Items show a subtle background color on hover
- **Active States**: Items show a darker background when clicked

## Styling

The pattern uses design system tokens for colors, spacing, and typography. Key CSS classes:

- `.right-toolbar` - Main toolbar container
- `.right-toolbar.demo-mode` - Demo mode modifier
- `.right-toolbar__item` - Individual toolbar item
- `.right-toolbar__item--disabled` - Disabled item state
- `.right-toolbar__icon` - Icon container
- `.right-toolbar__label` - Text label
- `.right-toolbar__divider` - Divider line between items
- `.right-toolbar__panel-container` - Panel container
- `.right-toolbar__panel-container.open` - Open panel state

## Dependencies

- **Design System Base** - Required for CSS variables
- **Modal Component** - Required only if using modal actions (for modal functionality)

## Structure

```
patterns/
  right-toolbar-pattern/
    vanilla/
      right-toolbar-pattern.css
      right-toolbar-pattern.js
      right-toolbar-example.html
    README.md
```

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- Uses CSS Grid and Flexbox

## Examples

See `vanilla/right-toolbar-example.html` for complete examples including:
- Basic actions
- Panel actions
- Modal actions
- Mixed actions
- Full example matching the design

## Design Specifications

- **Toolbar Width**: 50px
- **Item Height**: 51px
- **Icon Size**: 18px × 18px
- **Label Font Size**: 1.1rem (11px)
- **Color**: Primary color (#006d89)
- **Divider Color**: Gray-1 (#eeeeee)
- **Panel Width**: 320px (280px on mobile)
- **Shadow**: Subtle shadow on toolbar and panel

