# Button Component - Kendo Angular Implementation

Kendo UI for Angular implementation of the button component.

## Status

🚧 **Coming Soon** - This implementation will be available in a future release.

## Planned Structure

```
kendo-angular/
├── button.component.ts      # Angular component
├── button.component.html   # Template
├── button.component.scss   # Styles (imports base styles)
└── README.md               # This file
```

## Usage (Planned)

### Installation

```bash
npm install @progress/kendo-angular-buttons
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
import { ButtonsModule } from '@progress/kendo-angular-buttons';

@Component({
  selector: 'app-example',
  template: `
    <button kendoButton [primary]="true" class="btn-primary">Primary</button>
    <button kendoButton class="btn-secondary">Secondary</button>
  `
})
export class ExampleComponent {}
```

## Dependencies

- Angular (version TBD)
- Kendo UI for Angular (version TBD)
- Design system base styles (`styles/base.css`)
- Component base styles (`base/base.css`)

## See Also

- [Main Component README](../README.md)
- [Vanilla Implementation](../vanilla/README.md)
- [PrimeNG Angular Implementation](../primeng-angular/README.md)
- [Kendo React Implementation](../kendo-react/README.md)

