# Button Component - PrimeNG Angular Implementation

PrimeNG Angular implementation of the button component.

## Status

🚧 **Coming Soon** - This implementation will be available in a future release.

## Planned Structure

```
primeng-angular/
├── button.component.ts      # Angular component
├── button.component.html   # Template
├── button.component.scss   # Styles (imports base styles)
└── README.md               # This file
```

## Usage (Planned)

### Installation

```bash
npm install primeng
```

### Import Styles

```scss
// In your component or global styles
@import '../../../../styles/base.css';
@import '../base/base.css';
@import 'button.component.scss';
```

### Component Usage

```typescript
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-example',
  template: `
    <p-button label="Primary" styleClass="btn-primary"></p-button>
    <p-button label="Secondary" styleClass="btn-secondary"></p-button>
  `
})
export class ExampleComponent {}
```

## Dependencies

- Angular (version TBD)
- PrimeNG (version TBD)
- Design system base styles (`styles/base.css`)
- Component base styles (`base/base.css`)

## See Also

- [Main Component README](../README.md)
- [Vanilla Implementation](../vanilla/README.md)
- [Kendo Angular Implementation](../kendo-angular/README.md)
- [Kendo React Implementation](../kendo-react/README.md)

