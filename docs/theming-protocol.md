# Hospitality CMMS Theming Protocol

---

**Document Control**

| Item        | Value                                                                                                             |
| ----------- | ----------------------------------------------------------------------------------------------------------------- |
| Title       | Theming Protocol and MUI Component Styling Standards                                                              |
| Version     | 1.0                                                                                                               |
| Status      | Mandatory for all frontend development                                                                            |
| Purpose     | Define strict theming rules, MUI component usage patterns, and styling standards for the Hospitality CMMS project |
| Scope       | All frontend components, pages, and UI elements in `client/src/`                                                  |
| Enforcement | Mandatory - violations must be corrected before code review approval                                              |

---

## 1. Document Purpose and Authority

This document establishes the **mandatory theming architecture** and **styling standards** for the Hospitality CMMS web application. It is derived from comprehensive analysis of:

1. Current theme implementation in `client/src/theme/`
2. MUI v9 component customization patterns
3. Project requirements from `docs/prd.md`, `docs/requirements.md`, and `docs/design.md`
4. Responsive design requirements for mobile, tablet, and desktop

**Authority Level**: This protocol is **non-negotiable** and must be followed by all developers, AI agents, and code reviewers.

---

## 2. Theme Architecture Overview

### 2.1 Centralized Theme Location

**MANDATORY RULE**: All theme configuration MUST reside in `client/src/theme/`

**Current Theme Structure**:

```
client/src/theme/
├── AppTheme.jsx              # Main theme provider component
├── themePrimitives.js        # Color schemes, typography, shadows, shape
└── customizations/
    ├── index.js              # Exports all customizations
    ├── inputs.js             # Input component overrides
    ├── dataDisplay.js        # Data display component overrides
    ├── feedback.js           # Feedback component overrides
    ├── navigation.js         # Navigation component overrides
    ├── surfaces.js           # Surface component overrides
    ├── charts.js             # Chart component overrides
    ├── dataGrid.js           # Data grid component overrides
    └── datePickers.js        # Date picker component overrides
```

### 2.2 Theme Provider Implementation

The `AppTheme.jsx` component is the **single source of truth** for theme configuration:

```javascript
/**
 * App-wide MUI theme provider.
 *
 * @param {{ children: React.ReactNode }} props - Theme provider props.
 * @returns {JSX.Element} Theme provider wrapper.
 */
function AppTheme(props) {
  const { children } = props;
  const theme = useMemo(
    () =>
      createTheme({
        cssVariables: {
          colorSchemeSelector: "data-mui-color-scheme",
          cssVarPrefix: "template",
        },
        colorSchemes,
        typography,
        shadows,
        shape,
        components: {
          ...inputsCustomizations,
          ...dataDisplayCustomizations,
          ...feedbackCustomizations,
          ...navigationCustomizations,
          ...surfacesCustomizations,
          ...chartsCustomizations,
          ...dataGridCustomizations,
          ...datePickersCustomizations,
        },
      }),
    []
  );

  return (
    <ThemeProvider theme={theme} disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
```

**CRITICAL RULES**:

1. ✅ **DO**: Wrap the entire application with `<AppTheme>`
2. ✅ **DO**: Use `useMemo` to prevent unnecessary theme recalculations
3. ❌ **DO NOT**: Create multiple theme providers
4. ❌ **DO NOT**: Override theme at component level with inline `createTheme()`
5. ❌ **DO NOT**: Use `ThemeProvider` directly in components

---

## 3. Color System and Palette

### 3.1 Brand Colors

**Defined in**: `client/src/theme/themePrimitives.js`

```javascript
export const brand = {
  50: "hsl(210, 100%, 95%)",
  100: "hsl(210, 100%, 92%)",
  200: "hsl(210, 100%, 80%)",
  300: "hsl(210, 100%, 65%)",
  400: "hsl(210, 98%, 48%)", // Primary main
  500: "hsl(210, 98%, 42%)",
  600: "hsl(210, 98%, 55%)",
  700: "hsl(210, 100%, 35%)", // Primary dark
  800: "hsl(210, 100%, 16%)",
  900: "hsl(210, 100%, 21%)",
};
```

### 3.2 Semantic Color Palettes

**Gray Scale** (Neutral colors):

```javascript
export const gray = {
  50: "hsl(220, 35%, 97%)",
  100: "hsl(220, 30%, 94%)",
  200: "hsl(220, 20%, 88%)",
  300: "hsl(220, 20%, 80%)",
  400: "hsl(220, 20%, 65%)",
  500: "hsl(220, 20%, 42%)",
  600: "hsl(220, 20%, 35%)",
  700: "hsl(220, 20%, 25%)",
  800: "hsl(220, 30%, 6%)",
  900: "hsl(220, 35%, 3%)",
};
```

**Status Colors**:

- **Success**: `green[400]` (light), `green[500]` (main), `green[800]` (dark)
- **Warning**: `orange[400]` (light), `orange[500]` (main), `orange[800]` (dark)
- **Error**: `red[400]` (light), `red[500]` (main), `red[800]` (dark)
- **Info**: `brand[300]` (light), `brand[400]` (main), `brand[600]` (dark)

### 3.3 Color Scheme (Light/Dark Mode)

**MANDATORY RULE**: Always support both light and dark color schemes

**Light Mode Palette**:

```javascript
light: {
  palette: {
    primary: {
      light: brand[200],
      main: brand[400],
      dark: brand[700],
      contrastText: brand[50],
    },
    background: {
      default: "hsl(0, 0%, 99%)",
      paper: "hsl(220, 35%, 97%)",
    },
    text: {
      primary: gray[800],
      secondary: gray[600],
    },
    divider: alpha(gray[300], 0.4),
  },
}
```

**Dark Mode Palette**:

```javascript
dark: {
  palette: {
    primary: {
      light: brand[300],
      main: brand[400],
      dark: brand[700],
      contrastText: brand[50],
    },
    background: {
      default: gray[900],
      paper: "hsl(220, 30%, 7%)",
    },
    text: {
      primary: "hsl(0, 0%, 100%)",
      secondary: gray[400],
    },
    divider: alpha(gray[700], 0.6),
  },
}
```

**CRITICAL RULES**:

1. ✅ **DO**: Use `theme.palette.primary.main` for primary actions
2. ✅ **DO**: Use `theme.palette.text.primary` for main text
3. ✅ **DO**: Use `theme.palette.background.paper` for card backgrounds
4. ✅ **DO**: Use `theme.applyStyles('dark', {...})` for dark mode overrides
5. ❌ **DO NOT**: Hardcode color values like `#1976d2` or `rgb(25, 118, 210)`
6. ❌ **DO NOT**: Use CSS color names like `'blue'`, `'red'`, `'white'`
7. ❌ **DO NOT**: Create custom color variables outside the theme

---

## 4. Typography System

### 4.1 Font Family

**Primary Font**: Inter (loaded via `@fontsource/inter`)

**Font Weights Loaded**:

- 300 (Light)
- 400 (Regular)
- 500 (Medium)
- 600 (Semi-Bold)
- 700 (Bold)

**Implementation** (`client/src/main.jsx`):

```javascript
import "@fontsource/inter/300.css";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
```

### 4.2 Typography Scale

**Defined in**: `client/src/theme/themePrimitives.js`

```javascript
export const typography = {
  fontFamily: "Inter, sans-serif",
  h1: {
    fontSize: defaultTheme.typography.pxToRem(48),
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: -0.5,
  },
  h2: {
    fontSize: defaultTheme.typography.pxToRem(36),
    fontWeight: 600,
    lineHeight: 1.2,
  },
  h3: {
    fontSize: defaultTheme.typography.pxToRem(30),
    lineHeight: 1.2,
  },
  h4: {
    fontSize: defaultTheme.typography.pxToRem(24),
    fontWeight: 600,
    lineHeight: 1.5,
  },
  h5: {
    fontSize: defaultTheme.typography.pxToRem(20),
    fontWeight: 600,
  },
  h6: {
    fontSize: defaultTheme.typography.pxToRem(18),
    fontWeight: 600,
  },
  subtitle1: {
    fontSize: defaultTheme.typography.pxToRem(18),
  },
  subtitle2: {
    fontSize: defaultTheme.typography.pxToRem(14),
    fontWeight: 500,
  },
  body1: {
    fontSize: defaultTheme.typography.pxToRem(14),
  },
  body2: {
    fontSize: defaultTheme.typography.pxToRem(14),
    fontWeight: 400,
  },
  caption: {
    fontSize: defaultTheme.typography.pxToRem(12),
    fontWeight: 400,
  },
};
```

**CRITICAL RULES**:

1. ✅ **DO**: Use `theme.typography.h1` through `theme.typography.h6` for headings
2. ✅ **DO**: Use `theme.typography.body1` for standard body text
3. ✅ **DO**: Use `theme.typography.caption` for small text
4. ✅ **DO**: Use `defaultTheme.typography.pxToRem()` for custom font sizes
5. ❌ **DO NOT**: Use hardcoded font sizes like `fontSize: '16px'`
6. ❌ **DO NOT**: Use hardcoded font weights like `fontWeight: 'bold'`
7. ❌ **DO NOT**: Import or use fonts other than Inter

---

## 5. Spacing and Layout

### 5.1 Spacing System

**Base Unit**: 8px (MUI default)

**Usage**:

```javascript
// Correct usage
sx={{ padding: theme.spacing(2) }}  // 16px
sx={{ margin: theme.spacing(1, 2) }} // 8px 16px
sx={{ gap: theme.spacing(3) }}       // 24px

// Incorrect usage
sx={{ padding: '16px' }}             // ❌ Hardcoded
sx={{ margin: 16 }}                  // ❌ No theme reference
```

**Common Spacing Values**:

- `theme.spacing(0.5)` = 4px
- `theme.spacing(1)` = 8px
- `theme.spacing(2)` = 16px
- `theme.spacing(3)` = 24px
- `theme.spacing(4)` = 32px
- `theme.spacing(6)` = 48px
- `theme.spacing(8)` = 64px

### 5.2 Shape and Border Radius

**Defined in**: `client/src/theme/themePrimitives.js`

```javascript
export const shape = {
  borderRadius: 8,
};
```

**Usage**:

```javascript
// Correct
sx={{ borderRadius: theme.shape.borderRadius }}

// Incorrect
sx={{ borderRadius: '8px' }}  // ❌ Hardcoded
```

### 5.3 Layout Configuration

**Defined in**: `client/src/theme/themePrimitives.js`

```javascript
export const layoutConfig = {
  drawerWidth: 240,
  headerHeight: 64,
  mobileBreakpoint: "md",
};
```

**CRITICAL RULES**:

1. ✅ **DO**: Use `theme.spacing()` for all spacing values
2. ✅ **DO**: Use `theme.shape.borderRadius` for border radius
3. ✅ **DO**: Use `layoutConfig` constants for layout dimensions
4. ❌ **DO NOT**: Use hardcoded pixel values for spacing
5. ❌ **DO NOT**: Use hardcoded border radius values

---

## 6. Responsive Design and Breakpoints

### 6.1 Breakpoint System

**MUI Default Breakpoints**:

- `xs`: 0px (mobile)
- `sm`: 600px (tablet)
- `md`: 900px (small desktop)
- `lg`: 1200px (desktop)
- `xl`: 1536px (large desktop)

### 6.2 Responsive Patterns

**Mobile-First Approach**:

```javascript
// Correct: Mobile-first responsive styling
sx={{
  padding: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(4),
  },
  [theme.breakpoints.up('lg')]: {
    padding: theme.spacing(6),
  },
}}
```

**Breakpoint-Specific Styling**:

```javascript
// Correct: Conditional styling by breakpoint
sx={{
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
  },
}}
```

**CRITICAL RULES**:

1. ✅ **DO**: Use `theme.breakpoints.up()` for mobile-first design
2. ✅ **DO**: Use `theme.breakpoints.down()` for desktop-first exceptions
3. ✅ **DO**: Test all components on mobile, tablet, and desktop
4. ❌ **DO NOT**: Use hardcoded media queries like `@media (min-width: 768px)`
5. ❌ **DO NOT**: Assume desktop-only usage

---

## 7. Component Customization Standards

### 7.1 MUI Component Override Pattern

**Location**: `client/src/theme/customizations/`

**Structure**:

```javascript
const componentCustomizations = {
  MuiComponentName: {
    defaultProps: {
      // Default prop values
    },
    styleOverrides: {
      root: ({ theme }) => ({
        // Base styles
        ...theme.applyStyles("dark", {
          // Dark mode overrides
        }),
        variants: [
          {
            props: { variant: "custom" },
            style: {
              // Variant-specific styles
            },
          },
        ],
      }),
    },
  },
};

export default componentCustomizations;
```

### 7.2 Button Customizations

**Defined in**: `client/src/theme/customizations/inputs.js`

**Key Features**:

- Disabled ripple effects for performance
- Consistent sizing (small: 36px, medium: 40px)
- Variant-specific styling (contained, outlined, text)
- Color-specific styling (primary, secondary)
- Mobile-friendly touch targets (min 44px on mobile)

**Usage**:

```javascript
// Correct: Use theme-defined variants
<Button variant="contained" color="primary">
  Primary Action
</Button>

<Button variant="outlined" color="secondary">
  Secondary Action
</Button>

// Incorrect: Custom styling that bypasses theme
<Button sx={{ backgroundColor: '#1976d2' }}>  // ❌
  Custom Button
</Button>
```

### 7.3 Input Field Customizations

**Key Features**:

- Consistent border styling
- Focus state with outline
- Autofill styling preservation
- Size variants (small: 36px, medium: 40px)
- Multiline support

**Usage**:

```javascript
// Correct: Use theme-defined input components
<TextField
  variant="outlined"
  size="medium"
  fullWidth
/>

// Incorrect: Custom input styling
<TextField
  sx={{ '& .MuiOutlinedInput-root': { borderColor: 'blue' } }}  // ❌
/>
```

### 7.4 Card and Surface Customizations

**Defined in**: `client/src/theme/customizations/surfaces.js`

**Key Features**:

- Consistent padding (16px)
- Border and shadow styling
- Background color adaptation for light/dark mode
- Variant support (outlined)

**Usage**:

```javascript
// Correct: Use theme-defined Card
<Card variant="outlined">
  <CardContent>
    Content
  </CardContent>
</Card>

// Incorrect: Custom card styling
<Card sx={{ padding: '20px', border: '1px solid gray' }}>  // ❌
  Content
</Card>
```

---

## 8. Styling API Standards

### 8.1 Preferred Styling Methods (In Order)

**1. Theme Component Overrides** (Highest Priority)

```javascript
// In theme/customizations/
MuiButton: {
  styleOverrides: {
    root: {
      textTransform: 'none',
    },
  },
}
```

**2. MUI `styled()` API** (For Reusable Components)

```javascript
import { styled } from "@mui/material/styles";

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(4),
  },
}));
```

**3. `sx` Prop** (For One-Off Styling)

```javascript
<Box
  sx={{
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
  }}
>
  Content
</Box>
```

**4. Component Props** (For Semantic Styling)

```javascript
<Button variant="contained" color="primary" size="large">
  Action
</Button>
```

### 8.2 FORBIDDEN Styling Methods

❌ **DO NOT USE**:

1. Inline `style` prop with hardcoded values
2. CSS modules or separate CSS files
3. Styled-components library (use MUI `styled()` instead)
4. Emotion `css` prop directly
5. Global CSS overrides for MUI components

**Examples of Forbidden Patterns**:

```javascript
// ❌ FORBIDDEN: Inline style with hardcoded values
<div style={{ padding: "16px", color: "#333" }}>Content</div>;

// ❌ FORBIDDEN: CSS modules
import styles from "./Component.module.css";
<div className={styles.container}>Content</div>;

// ❌ FORBIDDEN: styled-components
import styled from "styled-components";
const StyledDiv = styled.div`
  padding: 16px;
`;
```

---

## 9. MUI Component Usage Rules

### 9.1 Import Standards

**MANDATORY**: Use tree-shakable imports

```javascript
// ✅ CORRECT: Tree-shakable imports
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

// ❌ INCORRECT: Non-tree-shakable imports
import { Button, TextField, Box } from "@mui/material";
```

### 9.2 Grid System

**MANDATORY**: Use `size` prop (MUI v9)

```javascript
// ✅ CORRECT: MUI v9 Grid with size prop
<Grid container spacing={2}>
  <Grid size={{ xs: 12, md: 6 }}>
    Content
  </Grid>
  <Grid size={{ xs: 12, md: 6 }}>
    Content
  </Grid>
</Grid>

// ❌ INCORRECT: Deprecated item prop
<Grid container spacing={2}>
  <Grid item xs={12} md={6}>  // ❌ Deprecated
    Content
  </Grid>
</Grid>
```

### 9.3 Slots and SlotProps API

**MANDATORY**: Use `slots` and `slotProps` for component customization

```javascript
// ✅ CORRECT: Using slots API
<TextField
  slots={{
    input: CustomInput,
  }}
  slotProps={{
    input: {
      customProp: 'value',
    },
  }}
/>

// ❌ INCORRECT: Using deprecated InputProps
<TextField
  InputProps={{  // ❌ Deprecated in v9
    component: CustomInput,
  }}
/>
```

### 9.4 Component Prop Standards

**Button Sizes**:

- `size="small"`: 36px height (44px on mobile)
- `size="medium"`: 40px height (44px on mobile)

**Input Sizes**:

- `size="small"`: 36px height
- `size="medium"`: 40px height

**Icon Sizes**:

- `fontSize="small"`: 1rem (16px)
- `fontSize="medium"`: 1.5rem (24px)
- `fontSize="large"`: 2rem (32px)

---

## 10. Dark Mode Implementation

### 10.1 Dark Mode Toggle

**Implementation Pattern**:

```javascript
// Use MUI's color scheme selector
<Box sx={{ colorScheme: 'dark' }}>
  {/* Dark mode content */}
</Box>

// Or use theme.applyStyles in component overrides
styleOverrides: {
  root: ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    ...theme.applyStyles('dark', {
      backgroundColor: theme.palette.background.paper,
    }),
  }),
}
```

### 10.2 Dark Mode Testing

**MANDATORY CHECKLIST**:

- [ ] All components render correctly in dark mode
- [ ] Text contrast meets WCAG AA standards
- [ ] Interactive elements are visible and accessible
- [ ] Images and icons adapt appropriately
- [ ] Shadows and borders are visible

---

## 11. Accessibility Standards

### 11.1 Color Contrast

**MANDATORY**: Meet WCAG AA standards

- Normal text: 4.5:1 contrast ratio
- Large text: 3:1 contrast ratio
- Interactive elements: 3:1 contrast ratio

### 11.2 Focus States

**MANDATORY**: All interactive elements must have visible focus states

```javascript
// Correct: Theme-defined focus state
'&:focus-visible': {
  outline: `3px solid ${alpha(theme.palette.primary.main, 0.5)}`,
  outlineOffset: '2px',
}
```

### 11.3 Touch Targets

**MANDATORY**: Minimum 44x44px touch targets on mobile

```javascript
// Correct: Mobile-friendly button sizing
[theme.breakpoints.down('md')]: {
  minWidth: 44,
  minHeight: 44,
}
```

---

## 12. Performance Optimization

### 12.1 Theme Memoization

**MANDATORY**: Use `useMemo` for theme creation

```javascript
const theme = useMemo(
  () => createTheme({...}),
  []  // Empty dependency array
);
```

### 12.2 Ripple Effects

**DISABLED**: Ripple effects are disabled for performance

```javascript
MuiButtonBase: {
  defaultProps: {
    disableTouchRipple: true,
    disableRipple: true,
  },
}
```

### 12.3 Transition Optimization

**DISABLED**: Theme transitions are disabled

```javascript
<ThemeProvider theme={theme} disableTransitionOnChange>
  {children}
</ThemeProvider>
```

---

## 13. Forbidden Practices

### 13.1 Absolutely Forbidden

❌ **NEVER DO**:

1. Hardcode color values (`#1976d2`, `rgb(25, 118, 210)`, `'blue'`)
2. Hardcode font sizes (`fontSize: '16px'`, `fontSize: 16`)
3. Hardcode spacing values (`padding: '16px'`, `margin: 20`)
4. Use non-tree-shakable MUI imports
5. Use `react-router-dom` (use `react-router` instead)
6. Use React Hook Form `watch()` (use `useWatch` or `Controller`)
7. Use deprecated Grid `item` prop (use `size` prop)
8. Create multiple theme providers
9. Override theme at component level with inline `createTheme()`
10. Use CSS modules or separate CSS files for MUI components
11. Use inline `style` prop with hardcoded values
12. Import fonts other than Inter
13. Use PowerShell or CMD-specific commands in documentation

### 13.2 Strongly Discouraged

⚠️ **AVOID**:

1. Using `sx` prop for styles that should be in theme customizations
2. Creating custom color variables outside the theme
3. Using absolute positioning without responsive considerations
4. Using fixed widths/heights without responsive breakpoints
5. Overriding MUI component internals without using `slots` API
6. Creating custom components that duplicate MUI functionality

---

## 14. Code Review Checklist

### 14.1 Theme Compliance

**Before Approving Code**:

- [ ] All colors use `theme.palette.*`
- [ ] All typography uses `theme.typography.*`
- [ ] All spacing uses `theme.spacing()`
- [ ] All border radius uses `theme.shape.borderRadius`
- [ ] All breakpoints use `theme.breakpoints.*`
- [ ] No hardcoded color values
- [ ] No hardcoded font sizes
- [ ] No hardcoded spacing values
- [ ] Tree-shakable MUI imports only
- [ ] Grid uses `size` prop (not `item`)
- [ ] Dark mode tested and working
- [ ] Mobile responsive tested
- [ ] Accessibility standards met

### 14.2 Component Standards

- [ ] Component uses theme-defined variants
- [ ] Component uses `styled()` for reusable custom styling
- [ ] Component uses `sx` prop only for one-off styling
- [ ] Component uses `slots` and `slotProps` for customization
- [ ] Component has JSDoc documentation
- [ ] Component follows naming conventions

---

## 15. Migration and Refactoring

### 15.1 Existing Code Violations

**If you find code that violates this protocol**:

1. Document the violation
2. Create a refactoring task
3. Prioritize based on impact
4. Refactor systematically

### 15.2 Refactoring Priority

**High Priority** (Fix Immediately):

- Hardcoded colors that break dark mode
- Non-tree-shakable imports
- Deprecated MUI patterns
- Accessibility violations

**Medium Priority** (Fix in Next Sprint):

- Hardcoded spacing/typography
- Inline styles that should be in theme
- Missing responsive breakpoints

**Low Priority** (Fix When Touching Code):

- Suboptimal `sx` prop usage
- Missing JSDoc
- Code organization improvements

---

## 16. Examples and Patterns

### 16.1 Complete Component Example

```javascript
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

/**
 * Styled card component with theme integration
 */
const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  [theme.breakpoints.up("md")]: {
    padding: theme.spacing(4),
  },
  ...theme.applyStyles("dark", {
    backgroundColor: theme.palette.background.default,
  }),
}));

/**
 * Example component following theming protocol
 */
export default function ExampleComponent() {
  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Title
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Description text
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ marginTop: (theme) => theme.spacing(2) }}
        >
          Action
        </Button>
      </CardContent>
    </StyledCard>
  );
}
```

### 16.2 Responsive Layout Example

```javascript
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

export default function ResponsiveLayout() {
  return (
    <Box sx={{ padding: (theme) => theme.spacing(2) }}>
      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>Content 1</Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <Card>Content 2</Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 12, md: 4 }}>
          <Card>Content 3</Card>
        </Grid>
      </Grid>
    </Box>
  );
}
```

---

## 17. Enforcement and Compliance

### 17.1 Automated Checks

**Recommended ESLint Rules**:

```javascript
{
  "rules": {
    "no-restricted-imports": ["error", {
      "patterns": ["@mui/material/*/*/*"]
    }],
    "no-restricted-syntax": ["error", {
      "selector": "JSXAttribute[name.name='style']",
      "message": "Use sx prop or styled() instead of inline style"
    }]
  }
}
```

### 17.2 Manual Review

**Code Review Focus Areas**:

1. Theme token usage
2. Responsive design implementation
3. Dark mode compatibility
4. Accessibility compliance
5. Performance considerations

---

## 18. Resources and References

### 18.1 Internal Documentation

- `docs/prd.md` - Product requirements
- `docs/requirements.md` - Implementation requirements
- `docs/design.md` - Design specifications
- `docs/tasks.md` - Implementation tasks
- `docs/task-execution-protocol.md` - Execution standards

### 18.2 External Documentation

- [MUI v9 Documentation](https://mui.com/material-ui/getting-started/)
- [MUI Theming Guide](https://mui.com/material-ui/customization/theming/)
- [MUI Migration Guide](https://mui.com/material-ui/migration/migration-v8/)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

## 19. Version History

| Version | Date       | Changes                           | Author      |
| ------- | ---------- | --------------------------------- | ----------- |
| 1.0     | 2026-04-30 | Initial theming protocol document | AI Analysis |

---

**END OF THEMING PROTOCOL**

This document is mandatory and must be followed by all developers working on the Hospitality CMMS frontend. Violations must be corrected before code review approval.
