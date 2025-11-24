# Tab Component

A tab component that provides a tabbed interface for organizing content into multiple panels.

## Features

- Multiple tabs with customizable labels
- Tab content panels
- Active tab indicator (red underline)
- Hover effects
- JavaScript API for programmatic control
- Callback support for tab changes

## Usage

### Basic HTML Structure

```html
<div id="tabs-container"></div>

<script>
    initTabs({
        containerId: 'tabs-container',
        tabs: [
            { id: 'tab1', label: 'Tab 1', content: '<p>Content for tab 1</p>' },
            { id: 'tab2', label: 'Tab 2', content: '<p>Content for tab 2</p>' },
            { id: 'tab3', label: 'Tab 3', content: '<p>Content for tab 3</p>' }
        ]
    });
</script>
```

### With Callback

```html
<script>
    initTabs({
        containerId: 'tabs-container',
        tabs: [
            { id: 'tab1', label: 'Tab 1', content: '<p>Content 1</p>' },
            { id: 'tab2', label: 'Tab 2', content: '<p>Content 2</p>' }
        ],
        activeTabId: 'tab2',
        onTabChange: function(tabId, pane) {
            console.log('Tab changed to:', tabId);
        }
    });
</script>
```

## API

### `initTabs(options)`

Initializes a tab component.

**Parameters:**
- `containerId` (string, required) - ID of the container element
- `tabs` (array, required) - Array of tab objects with:
  - `id` (string) - Unique tab identifier
  - `label` (string) - Tab button label
  - `content` (string) - HTML content for the tab panel
- `activeTabId` (string, optional) - ID of the initially active tab
- `onTabChange` (function, optional) - Callback fired when tab changes

## CSS Classes

- `.tabs-component` - Main container
- `.tabs-container` - Tabs header container
- `.tabs` - Tabs button container
- `.tab` - Individual tab button
- `.tab.active` - Active tab button
- `.tab-content` - Tab content container
- `.tab-pane` - Individual tab panel
- `.tab-pane.active` - Active tab panel

## Specifications

- **Font:** Akkurat LL (via `var(--font-primary)`)
- **Font Size:** 1.6rem (16px) via `var(--text-4)`
- **Active Indicator:** 3px red underline using `var(--color-brand)`
- **Hover Color:** Red text using `var(--color-brand)`
- **Text Color:** Dark gray using `var(--color-gray-5)`
- **Divider:** Gray line using `var(--color-gray-2)`

## Dependencies

- Design system base styles (`styles/base.css`)
- CSS variables for colors and fonts

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- CSS Variables support required




