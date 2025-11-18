# Header Component

A fixed header component with logo, navigation, notifications, help, and user menu for the S&P Global Design System. This component supports multiple front-end library implementations.

## Overview

The header component provides a consistent, fixed-position header with:
- S&P Global logo
- Product name display
- Notification bell with badge counter
- Help/question icon
- User avatar with initials
- Slide-out panels (user menu, help menu, notifications)

## Multi-Library Support

This component is structured to support multiple front-end libraries:

- **Vanilla** - Pure JavaScript/CSS implementation (available now)
- **PrimeNG Angular** - PrimeNG implementation for Angular (coming soon)
- **Kendo Angular** - Kendo UI for Angular implementation (coming soon)
- **Kendo React** - Kendo UI for React implementation (coming soon)

## Component Structure

```
header-component/
├── base/                    # Shared base styles
│   └── base.css            # Base styles used by all implementations
├── vanilla/                 # Vanilla implementation
│   ├── header-component.css
│   ├── header-component.js
│   ├── header-example.html
│   └── README.md
├── primeng-angular/         # PrimeNG Angular implementation
│   └── README.md
├── kendo-angular/           # Kendo Angular implementation
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
<link rel="stylesheet" href="vanilla/header-component.css">
<script src="vanilla/header-component.js"></script>
```

```html
<div id="header-container"></div>
<div id="header-panels-container"></div>
```

```javascript
initHeader({
    productName: 'My Product',
    userInitials: 'JD',
    notificationCount: 3
});
```

### PrimeNG Angular

See [PrimeNG Angular Implementation README](primeng-angular/README.md) for details.

### Kendo Angular

See [Kendo Angular Implementation README](kendo-angular/README.md) for details.

### Kendo React

See [Kendo React Implementation README](kendo-react/README.md) for details.

## Features

- Fixed position at top of page
- S&P Global logo
- Customizable product name
- Notification bell with badge counter
- Help/question icon
- User avatar with initials
- Slide-out panels (user, help, notifications)
- Fully responsive design
- Red accent border at top
- Keyboard navigation support
- Accessibility support

## Configuration Options

```javascript
{
    productName: 'Product Name',      // String - displayed next to logo
    userInitials: 'SS',               // String - shown in user avatar
    notificationCount: 3,             // Number - badge count (0 hides badge)
    userName: 'Sam Sample',            // String - user's full name
    userEmail: 'sam.sample@company.com', // String - user's email
    userDetails: {                     // Object - user details shown in "More" section
        phone: '000-000-0000',
        company: 'IHS Markit',
        department: 'The best one',
        jobTitle: 'Director of stuff',
        address: '1234 Street Dr.<br>Anytown, ST 00000<br>USA'
    }
}
```

## Dependencies

All implementations require:
- Design system base styles (`styles/base.css`)
- Component base styles (`base/base.css`)

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Custom Properties (CSS Variables) required
- Flexbox support required
- JavaScript ES6+ required

## Version

1.0.0 - Initial release

## License

S&P Global Design System - Internal Use
