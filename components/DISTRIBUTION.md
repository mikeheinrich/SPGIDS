# Component Distribution Guide

This guide explains how to distribute and share design system components with others.

## Multi-Library Structure

Components are structured to support multiple front-end libraries:

- **Vanilla** - Pure JavaScript/CSS implementation
- **PrimeNG Angular** - PrimeNG implementation for Angular
- **Kendo Angular** - Kendo UI for Angular implementation
- **Kendo React** - Kendo UI for React implementation

Each component has:
- `base/` - Shared base styles used by all implementations
- `vanilla/` - Vanilla implementation
- `primeng-angular/` - PrimeNG Angular implementation
- `kendo-angular/` - Kendo Angular implementation
- `kendo-react/` - Kendo React implementation

## Distribution Methods

### Method 1: Copy Component Directory (Recommended for Internal Use)

The simplest way to share a component is to copy the entire component directory:

1. **Copy the component folder:**
   ```bash
   cp -r components/button-component /path/to/recipient/project/components/
   ```

2. **Recipient includes the files based on their implementation:**
   
   **For Vanilla:**
   ```html
   <link rel="stylesheet" href="../../styles/base.css">
   <link rel="stylesheet" href="components/button-component/base/base.css">
   <link rel="stylesheet" href="components/button-component/vanilla/button-component.css">
   ```
   
   **For PrimeNG Angular:**
   ```scss
   @import '../../styles/base.css';
   @import 'components/button-component/base/base.css';
   @import 'components/button-component/primeng-angular/button.component.scss';
   ```
   
   **For Kendo Angular:**
   ```scss
   @import '../../styles/base.css';
   @import 'components/button-component/base/base.css';
   @import 'components/button-component/kendo-angular/button.component.scss';
   ```
   
   **For Kendo React:**
   ```scss
   @import '../../styles/base.css';
   @import 'components/button-component/base/base.css';
   @import 'components/button-component/kendo-react/Button.module.scss';
   ```

3. **Recipient ensures dependencies:**
   - Include design system base styles (`styles/base.css`)
   - Include component base styles (`base/base.css`)
   - Include implementation-specific files

**Pros:**
- Simple and straightforward
- No build process required
- Easy to customize
- Supports all library implementations

**Cons:**
- Manual updates required
- No version management

### Method 2: Git Submodule (Recommended for Teams)

For teams using Git, components can be shared as submodules:

1. **Add as submodule:**
   ```bash
   git submodule add <repository-url> components/button-component
   ```

2. **Update submodule:**
   ```bash
   git submodule update --remote
   ```

**Pros:**
- Version controlled
- Easy to update
- Maintains component integrity
- Supports all library implementations

**Cons:**
- Requires Git knowledge
- Slightly more complex setup

### Method 3: NPM Package (Future)

For broader distribution, components can be packaged as NPM packages:

```json
{
  "name": "@spglobal/button-component",
  "version": "1.0.0",
  "main": "vanilla/button-component.css",
  "files": [
    "base/",
    "vanilla/",
    "primeng-angular/",
    "kendo-angular/",
    "kendo-react/",
    "README.md",
    "component.json"
  ]
}
```

**Installation:**
```bash
npm install @spglobal/button-component
```

**Usage (Vanilla):**
```html
<link rel="stylesheet" href="node_modules/@spglobal/button-component/base/base.css">
<link rel="stylesheet" href="node_modules/@spglobal/button-component/vanilla/button-component.css">
```

**Usage (PrimeNG Angular):**
```scss
@import '~@spglobal/button-component/base/base.css';
@import '~@spglobal/button-component/primeng-angular/button.component.scss';
```

**Pros:**
- Version management
- Easy installation
- Standard distribution method
- Supports all library implementations

**Cons:**
- Requires NPM setup
- Build process needed

### Method 4: CDN (Future)

Components can be hosted on a CDN for direct inclusion:

```html
<!-- Vanilla -->
<link rel="stylesheet" href="https://cdn.spglobal.com/design-system/button-component/1.0.0/base/base.css">
<link rel="stylesheet" href="https://cdn.spglobal.com/design-system/button-component/1.0.0/vanilla/button-component.css">
```

**Pros:**
- No local files needed
- Always up-to-date (if using latest)
- Fast delivery
- Supports all library implementations

**Cons:**
- Requires hosting infrastructure
- Network dependency

## Library-Specific Distribution

### Vanilla Implementation

Distribute the entire component directory. Recipients use:
- `base/base.css` - Base styles
- `vanilla/*` - Implementation files

### PrimeNG Angular Implementation

Distribute:
- `base/base.css` - Base styles
- `primeng-angular/*` - Angular component files

Recipients need:
- Angular framework
- PrimeNG library

### Kendo Angular Implementation

Distribute:
- `base/base.css` - Base styles
- `kendo-angular/*` - Angular component files

Recipients need:
- Angular framework
- Kendo UI for Angular library

### Kendo React Implementation

Distribute:
- `base/base.css` - Base styles
- `kendo-react/*` - React component files

Recipients need:
- React framework
- Kendo UI for React library

## Component Package Contents

Each component directory should contain:

```
component-name/
├── base/                    # Shared base styles
│   └── base.css
├── vanilla/                 # Vanilla implementation
│   ├── component-name.css
│   ├── component-name.js (if needed)
│   ├── component-example.html
│   └── README.md
├── primeng-angular/         # PrimeNG Angular implementation
│   ├── component.component.ts
│   ├── component.component.html
│   ├── component.component.scss
│   └── README.md
├── kendo-angular/           # Kendo Angular implementation
│   ├── component.component.ts
│   ├── component.component.html
│   ├── component.component.scss
│   └── README.md
├── kendo-react/            # Kendo React implementation
│   ├── Component.tsx
│   ├── Component.module.scss
│   └── README.md
├── component.json           # Component manifest
└── README.md                # Main component documentation
```

## Dependencies

All components require the design system base styles. When distributing:

### Option A: Include Base Styles
Copy `styles/base.css` along with the component.

### Option B: Document Required Variables
List all required CSS variables in the component README so recipients can define them.

### Option C: Standalone CSS
Create a standalone version that includes minimal variable definitions (for simple components).

## Version Management

### Semantic Versioning

Components follow semantic versioning:
- **Major (1.0.0):** Breaking changes
- **Minor (0.1.0):** New features, backward compatible
- **Patch (0.0.1):** Bug fixes

### Changelog

Maintain a CHANGELOG.md in each component directory:

```markdown
# Changelog

## [1.0.0] - 2024-01-15
### Added
- Primary button styles
- Secondary button styles
- Size variations
- Disabled states
- Multi-library support structure
```

## Distribution Checklist

Before distributing a component:

- [ ] Component is self-contained
- [ ] README.md is complete and accurate
- [ ] Example HTML file works standalone (for vanilla)
- [ ] All dependencies are documented
- [ ] CSS variables are documented
- [ ] Browser support is documented
- [ ] Version number is set
- [ ] Component.json manifest is complete
- [ ] Code is commented and clean
- [ ] Accessibility features are included
- [ ] Base styles are properly separated
- [ ] Library-specific implementations are documented

## Best Practices

1. **Keep components independent:** Each component should work on its own
2. **Document everything:** Clear documentation reduces support burden
3. **Provide examples:** Working examples are more valuable than documentation
4. **Version your components:** Track changes and updates
5. **Test before distributing:** Ensure components work in isolation
6. **Follow naming conventions:** Consistent naming makes components easier to find and use
7. **Maintain base styles:** Keep shared styles in `base/` folder
8. **Library-specific code:** Keep implementation-specific code in respective folders

## Support

When distributing components, provide:
- Clear documentation
- Working examples
- Contact information for questions
- Issue tracking (if using Git/GitHub)
- Library-specific usage examples

## License

Specify license information in:
- Component README
- Component.json
- Main repository README

---

For questions about component distribution, contact the design system team.
