# Button Component - Kendo React Implementation

Kendo UI for React implementation of the button component.

## Status

🚧 **Coming Soon** - This implementation will be available in a future release.

## Planned Structure

```
kendo-react/
├── Button.tsx              # React component
├── Button.module.scss      # Styles (imports base styles)
└── README.md               # This file
```

## Usage (Planned)

### Installation

```bash
npm install @progress/kendo-react-buttons
```

### Import Styles

```scss
// In Button.module.scss
@import '../../../../styles/base.css';
@import '../base/base.css';
```

### Component Usage

```tsx
import React from 'react';
import { Button } from '@progress/kendo-react-buttons';
import styles from './Button.module.scss';

export const Example: React.FC = () => {
  return (
    <>
      <Button primary className={styles.primary}>Primary</Button>
      <Button className={styles.secondary}>Secondary</Button>
    </>
  );
};
```

## Dependencies

- React (version TBD)
- Kendo UI for React (version TBD)
- Design system base styles (`styles/base.css`)
- Component base styles (`base/base.css`)

## See Also

- [Main Component README](../README.md)
- [Vanilla Implementation](../vanilla/README.md)
- [PrimeNG Angular Implementation](../primeng-angular/README.md)
- [Kendo Angular Implementation](../kendo-angular/README.md)

