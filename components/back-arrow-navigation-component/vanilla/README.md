# Back Arrow Navigation Component

A navigation component that displays a back arrow icon, vertical divider, and customizable page title.

## Features

- Back arrow icon using the design system's arrow-left.svg
- Vertical divider line
- Customizable page title text
- Hover effects on the arrow icon
- Accessible markup support

## Usage

### Basic HTML Structure

```html
<nav class="back-arrow-navigation">
    <div class="back-arrow-navigation__icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15.46" viewBox="0 0 18 15.46">
            <path id="arrow-left" d="M18.005,71.73a1.257,1.257,0,0,1-1.252,1.288H4.405l4.243,4.243a1.289,1.289,0,0,1-1.825,1.821L.382,72.641a1.288,1.288,0,0,1,0-1.822l6.442-6.442A1.288,1.288,0,0,1,8.646,66.2L4.405,70.442H16.753A1.257,1.257,0,0,1,18.005,71.73Z" transform="translate(-0.005 -64)"/>
        </svg>
    </div>
    <div class="back-arrow-navigation__divider"></div>
    <h1 class="back-arrow-navigation__title">Page title</h1>
</nav>
```

### With Clickable Arrow

```html
<nav class="back-arrow-navigation">
    <button class="back-arrow-navigation__icon" onclick="goBack()" aria-label="Go back">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15.46" viewBox="0 0 18 15.46">
            <path id="arrow-left" d="M18.005,71.73a1.257,1.257,0,0,1-1.252,1.288H4.405l4.243,4.243a1.289,1.289,0,0,1-1.825,1.821L.382,72.641a1.288,1.288,0,0,1,0-1.822l6.442-6.442A1.288,1.288,0,0,1,8.646,66.2L4.405,70.442H16.753A1.257,1.257,0,0,1,18.005,71.73Z" transform="translate(-0.005 -64)"/>
        </svg>
    </button>
    <div class="back-arrow-navigation__divider"></div>
    <h1 class="back-arrow-navigation__title">Page title</h1>
</nav>
```

## CSS Classes

- `.back-arrow-navigation` - Main container
- `.back-arrow-navigation__icon` - Arrow icon container (can be a div or button)
- `.back-arrow-navigation__divider` - Vertical divider line
- `.back-arrow-navigation__title` - Page title text

## Specifications

- **Dimensions:** Auto width × 29px height
- **Arrow Icon:** 24px × 15.46px, primary blue color (#006d89)
- **Divider:** 1px width × 24px height, gray color (#ccc)
- **Title:** 24px font size, Akkurat LL Regular, dark gray (#32363b)
- **Spacing:** 10px gap between elements
- **Hover:** Arrow icon opacity reduces to 0.7 on hover

## Dependencies

- Design system base styles (`styles/base.css`)
- CSS variables for colors and fonts
- Arrow-left.svg icon from the icons library

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- CSS Variables support required





