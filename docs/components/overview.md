# Component Documentation

## Component Architecture

The Rocky Linux website uses a component-based architecture with:

- **UI Components** - Reusable, styled components based on shadcn/ui
- **Page Components** - Specific sections and features for pages
- **Layout Components** - Headers, footers, and structural elements

## Component Library

### Base UI Components (`/components/ui/`)

These are foundational components built on Radix UI primitives using Shadcn/ui component templates:

- **Button** - Primary interactive element
- **Card** - Content container with variants
- **Dialog** - Modal dialogs
- **Tabs** - Tabbed interfaces
- **Select** - Dropdown selections
- **Sheet** - Sliding panels
- **And more...**

### Key Custom Components

#### Logo Component

```typescript
import { Logo } from "@/components/logo";

// Usage
<Logo variant="default" className="h-8 w-auto" />
<Logo variant="white" />
<Logo variant="pride" />
```

#### Language Picker

```typescript
import { LanguagePicker } from "@/components/language-picker";

// Automatically handles 34 languages
<LanguagePicker />
```

#### Theme Toggle

```typescript
import { ThemeToggle } from "@/components/theme-toggle";

// Dark/light mode toggle
<ThemeToggle />
```

## Component Patterns

### Creating New Components

1. **Use TypeScript** - All components must be typed
2. **Follow CVA Pattern** - For variants
3. **Include ForwardRef** - For ref forwarding
4. **Add Display Name** - For debugging

Example template:

```typescript
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const componentVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "default-classes",
        secondary: "secondary-classes",
      },
      size: {
        default: "size-default",
        sm: "size-sm",
        lg: "size-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ComponentProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentVariants> {}

const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(componentVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Component.displayName = "Component";

export { Component };
```

### Using Components

```typescript
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FeatureCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature Title</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Feature description</p>
        <Button>Learn More</Button>
      </CardContent>
    </Card>
  );
}
```

## Styling Guidelines

### Tailwind v4 Classes

- Use Tailwind utilities first
- Group related utilities
- Use responsive prefixes consistently
- Apply dark mode classes when needed

```typescript
<div className="
  flex flex-col gap-4
  rounded-lg border bg-card p-6
  hover:shadow-lg transition-shadow
  dark:border-gray-800
">
```

### CSS Variables

The theme system uses CSS variables:

```css
--background: 0 0% 100%;
--foreground: 0 0% 3.9%;
--primary: 220 14.3% 95.9%;
--primary-foreground: 220 8.9% 46.1%;
/* etc... */
```

### Component Sizing

Use consistent sizing tokens:

```typescript
const sizes = {
  sm: "h-9 px-3",
  default: "h-10 px-4",
  lg: "h-11 px-8",
};
```

## Accessibility

All components must be accessible:

1. **Keyboard Navigation** - All interactive elements
2. **ARIA Labels** - Descriptive labels
3. **Focus States** - Visible focus indicators
4. **Screen Reader Support** - Proper semantics

Example:

```typescript
<Button
  aria-label="Download Rocky Linux"
  aria-pressed={isDownloading}
  disabled={isDownloading}
>
  {isDownloading ? "Downloading..." : "Download"}
</Button>
```

## Testing Components

Write tests for components:

```typescript
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders with text", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("handles click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    screen.getByText("Click me").click();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Component Best Practices

1. **Single Responsibility** - One component, one purpose
2. **Composition Over Inheritance** - Use composition patterns
3. **Props Over State** - Prefer controlled components
4. **Performance** - Use React.memo when needed
5. **Error Boundaries** - Handle errors gracefully

## Common Component Patterns

### Loading States

```typescript
if (isLoading) {
  return <Skeleton className="h-10 w-full" />;
}
```

### Empty States

```typescript
if (!data || data.length === 0) {
  return (
    <div className="text-center py-10 text-muted-foreground">
      No items found
    </div>
  );
}
```

### Error States

```typescript
if (error) {
  return (
    <Alert variant="destructive">
      <AlertDescription>{error.message}</AlertDescription>
    </Alert>
  );
}
```

## Component Documentation

When documenting components:

1. Include usage examples
2. List all props with types
3. Show different variants
4. Include accessibility notes
